import { useState } from "react";
import { ArrowUpRight, Cpu, Zap, CircleDot } from "lucide-react";
import { pins } from "@/lib/hardware";
import { skillGroups, type AppId } from "@/lib/portfolio";

export default function Pinout({ openApp }: { openApp: (id: AppId) => void }) {
  const [selectedPin, setSelectedPin] = useState(16);
  const [category, setCategory] = useState<string | null>(null);
  const pin = pins[selectedPin - 1];
  return (
    <div className="pinout-app">
      <div
        className="pin-categories"
        role="group"
        aria-label="Highlight GPIO skill category"
      >
        {skillGroups.map(g => (
          <button
            key={g.name}
            aria-pressed={category === g.name}
            className={category === g.name ? "selected" : ""}
            onClick={() =>
              setCategory(prev => (prev === g.name ? null : g.name))
            }
          >
            {g.name}
          </button>
        ))}
      </div>
      <div className="pinout-layout">
        <div className="header-panel">
          <div className="gpio-heading">
            <span>J8 · 40-PIN GPIO</span>
            <span>ODD / EVEN</span>
          </div>
          <div className="gpio-header">
            {Array.from({ length: 20 }, (_, i) => (
              <div className="gpio-pair" key={i}>
                {[pins[i * 2], pins[i * 2 + 1]].map(p => (
                  <button
                    key={p.physical}
                    className={`gpio-pin ${p.kind} ${selectedPin === p.physical ? "selected" : ""} ${category && p.group !== category ? "dimmed" : ""}`}
                    aria-label={`Pin ${p.physical}, ${p.label}${p.skill ? ", " + p.skill : ""}`}
                    aria-pressed={selectedPin === p.physical}
                    title={`Physical ${p.physical} · ${p.label}${p.skill ? " · " + p.skill : ""}`}
                    onClick={() => setSelectedPin(p.physical)}
                  >
                    <span className="pin-label">{p.skill || p.label}</span>
                    <span className="pin-contact">
                      <i />
                    </span>
                    <span className="pin-number">{p.physical}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="pin-legend">
            <span>
              <i className="power" /> 5V / 3V3
            </span>
            <span>
              <i className="ground" /> GND
            </span>
            <span>
              <i className="gpio" /> GPIO
            </span>
          </div>
        </div>
        <div className="pin-detail">
          <div className={`physical-pin-badge ${pin.kind}`}>
            {pin.physical}
            <span>PHYSICAL PIN</span>
          </div>
          <div className="pin-bcm">
            {pin.bcm !== undefined ? `BCM ${pin.bcm}` : pin.kind.toUpperCase()}
          </div>
          <code>{pin.label}</code>
          <span className="section-label">
            {pin.group || "HARDWARE HEADER"}
          </span>
          <h3>
            {pin.skill ||
              (pin.kind === "power"
                ? "Power rail"
                : pin.kind === "ground"
                  ? "Common ground"
                  : pin.kind === "reserved"
                    ? "Reserved for HAT ID"
                    : "Room to grow.")}
          </h3>
          <p>
            {pin.description ||
              (pin.kind === "power"
                ? "A supply pin on the Raspberry Pi header. No portfolio skill is mapped to this power rail."
                : pin.kind === "ground"
                  ? "The common electrical reference. No portfolio skill is mapped to a ground pin."
                  : pin.kind === "reserved"
                    ? "Reserved for the HAT identification EEPROM. Kept separate from the portfolio skill mapping."
                    : "This GPIO pin is still open in the portfolio map. There’s always another skill to learn.")}
          </p>
          <button className="text-btn" onClick={() => openApp("projects")}>
            See the connected projects <ArrowUpRight size={15} />
          </button>
          <div className="pin-tip">
            <CircleDot size={14} />
            <span>
              Pick a pin or highlight a category to explore the toolkit.
            </span>
          </div>
        </div>
      </div>
      <div className="pinout-footnote">
        <Cpu size={15} />
        <span>
          Accurate physical header functions. Skills mapped conceptually — no
          electrical interaction.
        </span>
        <Zap size={13} />
      </div>
    </div>
  );
}
