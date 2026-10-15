import { describe, expect, it, vi, afterEach } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { apps, projects, skillGroups } from "@/lib/portfolio";
import { pins, experience } from "@/lib/hardware";
import { commands, runCommand } from "@/lib/terminal";
import {
  desktopWindowWidth,
  clampWindowPosition,
} from "@/lib/windowGeometry";
import {
  loadPreferences,
  defaultPreferences,
} from "@/components/apps/Settings";
import AppWindow from "@/components/desktop/AppWindow";

afterEach(() => vi.unstubAllGlobals());

describe("portfolio and updated reference", () => {
  it("has seven unique and discoverable desktop apps", () => {
    expect(apps).toHaveLength(7);
    expect(new Set(apps.map(a => a.id)).size).toBe(7);
  });
  it("preserves all four original projects with descriptions and technical details", () => {
    expect(projects.map(p => p.name)).toEqual([
      "Krushi Yantra",
      "FocusGuard",
      "HandSteer",
      "Edge AI Waste Sorting",
    ]);
    projects.forEach(p => {
      expect(p.highlights).toHaveLength(4);
      expect(p.tags.length).toBeGreaterThan(2);
    });
  });
  it("keeps 24 skills across six disciplines", () => {
    expect(skillGroups).toHaveLength(6);
    expect(skillGroups.flatMap(g => g.items)).toHaveLength(24);
  });
  it("includes the updated work and engineering-team experience", () => {
    expect(
      experience.find(e => e.driver === "fostride")?.details.join(" ")
    ).toContain("Raspberry Pi 5");
    expect(
      experience.find(e => e.driver === "uwfe")?.details.join(" ")
    ).toContain("EMI");
    expect(experience[0].subtitle).toContain("1A");
  });
});

describe("Raspberry Pi GPIO map", () => {
  it("maps the complete physical header in sequential order", () => {
    expect(pins).toHaveLength(40);
    expect(pins.map(p => p.physical)).toEqual(
      Array.from({ length: 40 }, (_, i) => i + 1)
    );
  });
  it("preserves power, ground, and reserved pins without mapping skills to them", () => {
    expect(pins.filter(p => p.kind === "power")).toHaveLength(4);
    expect(pins.filter(p => p.kind === "ground")).toHaveLength(8);
    expect(
      pins.filter(p => p.kind === "reserved").map(p => p.physical)
    ).toEqual([27, 28]);
    expect(pins.filter(p => p.kind !== "gpio").every(p => !p.skill)).toBe(true);
  });
  it("has 24 mapped skills, two open GPIOs, and no repeated BCM signal", () => {
    expect(pins.filter(p => p.skill)).toHaveLength(24);
    expect(
      pins.filter(p => p.kind === "gpio" && !p.skill).map(p => p.bcm)
    ).toEqual([20, 21]);
    const bcm = pins.filter(p => p.bcm !== undefined).map(p => p.bcm);
    expect(new Set(bcm).size).toBe(26);
  });
  it("assigns YOLOv8 to physical pin 16, GPIO23 as in the updated reference", () => {
    expect(pins[15]).toMatchObject({
      physical: 16,
      bcm: 23,
      skill: "YOLOv8",
      group: "Vision & AI",
    });
  });
  it("maps exactly four skills to every category", () => {
    skillGroups.forEach(g =>
      expect(pins.filter(p => p.group === g.name)).toHaveLength(4)
    );
  });
});

describe("portfolio shell", () => {
  it("documents all main commands", () => {
    commands.forEach(c => expect(runCommand("help").output).toContain(c));
  });
  it.each([
    ["about", "about"],
    ["projects", "projects"],
    ["skills", "skills"],
    ["pinout", "skills"],
    ["contact", "contact"],
  ])("routes %s to its real app", (cmd, app) => {
    expect(runCommand(cmd).app).toBe(app);
  });
  it("reads project data from the same source as the explorer", () => {
    const text = runCommand("cat projects.txt").output!;
    projects.forEach(p => expect(text).toContain(p.name));
  });
  it("includes latest experience in whoami and the kernel log", () => {
    expect(runCommand("whoami").output).toContain("Fostride");
    expect(runCommand("dmesg").output).toContain("UW Formula Electric");
    expect(runCommand("dmesg").output).toContain("visual metaphor");
  });
  it("returns safe explicit actions for clear and reboot", () => {
    expect(runCommand("clear")).toEqual({ clear: true });
    expect(runCommand("reboot").reboot).toBe(true);
  });
  it("handles whitespace, unknown commands and missing files", () => {
    expect(runCommand("")).toEqual({});
    expect(runCommand("  WHOAMI  ").output).toContain("Ishaan Aras");
    expect(runCommand("nope").output).toContain("command not found");
    expect(runCommand("cat").output).toContain("Usage");
    expect(runCommand("cat nonexistent").output).toContain("No such file");
  });
  it("does not imply genuine hardware diagnostics", () => {
    expect(runCommand("post").output).toContain("not live hardware tests");
    expect(runCommand("neofetch").output).toContain("Simulated desktop");
    expect(runCommand("cat desktop.conf").output).toContain(
      "real_hardware_connected=false"
    );
  });
});

describe("desktop geometry and state", () => {
  it.each([320, 390, 760, 850, 1024, 1280, 1440, 1600])(
    "keeps the full window within a %dpx viewport",
    width => {
      const pos = clampWindowPosition(900, 1400, width, 900);
      expect(pos.x).toBeGreaterThanOrEqual(8);
      expect(pos.x + desktopWindowWidth(width)).toBeLessThanOrEqual(width - 8);
      expect(pos.y).toBeLessThanOrEqual(720);
    }
  );
  it("keeps minimized app contents mounted for restoring drafts and terminal history", () => {
    const noop = () => {};
    const html = renderToStaticMarkup(
      createElement(AppWindow, {
        state: {
          id: "contact",
          x: 8,
          y: 52,
          z: 1,
          minimized: true,
          maximized: false,
        },
        active: false,
        onFocus: noop,
        onClose: noop,
        onMinimize: noop,
        onMaximize: noop,
        onMove: noop,
        children: createElement("p", {}, "Preserved draft"),
      })
    );
    expect(html).toContain("display:none");
    expect(html).toContain("Preserved draft");
  });
  it("uses defaults when local storage is blocked", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("blocked");
      },
    });
    expect(loadPreferences()).toEqual(defaultPreferences);
  });
  it("validates stored settings and preserves valid choices", () => {
    vi.stubGlobal("localStorage", {
      getItem: () =>
        JSON.stringify({
          wallpaper: "broken",
          accent: "mint",
          sounds: true,
          reduceMotion: "yes",
          clock24: true,
        }),
    });
    expect(loadPreferences()).toEqual({
      wallpaper: "landscape",
      accent: "mint",
      sounds: true,
      reduceMotion: false,
      clock24: true,
    });
  });
});
