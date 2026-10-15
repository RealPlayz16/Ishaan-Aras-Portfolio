"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const LINES: [string, string][] = [
  ["0.000000", "Raspberry Pi Compute Module 4, rev 1.1"],
  ["0.000114", "Booting Linux on physical CPU 0x0"],
  ["0.000331", "CPU: ARM Cortex-A72 r0p3, 4 cores"],
  ["0.084210", "Machine model: ishaan-aras rev 1A"],
  ["0.118440", "Memory: 8192MB available"],
  ["0.204117", "mmc0: SDHCI controller on fe340000 [mmc0] using ADMA"],
  ["0.391055", "uwaterloo: mechatronics engineering, co-op stream 4"],
  ["0.552381", "i2c_bcm2835: probe successful"],
  ["0.618902", "spi_bcm2835: 2 chip selects registered"],
  ["0.774120", "gpio: 26 signal pins mapped"],
  ["0.998317", "fostride: embedded systems intern [  OK  ]"],
  ["1.204466", "uwfe: tractive + electrical subteam [  OK  ]"],
  ["1.455018", "oshwa: 3 designs certified [  OK  ]"],
  ["1.690234", "usb 1-1: 4 peripherals attached"],
  ["1.882901", "POST: all tests passed"],
  ["2.104772", "systemd: reached target Multi-User System"],
  ["2.230118", "sched: co-op slot open for W2027"],
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [fading, setFading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFading(true);
    window.setTimeout(onDone, 500);
  }, [onDone]);

  useEffect(() => {
    // Returning visitors and reduced-motion users skip straight through.
    const seen = (() => {
      try { return sessionStorage.getItem("booted") === "1"; } catch { return false; }
    })();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduced) { finish(); return; }

    try { sessionStorage.setItem("booted", "1"); } catch { /* private mode */ }

    let i = 0;
    const tick = () => {
      i += 1;
      setShown(i);
      if (i >= LINES.length) {
        window.setTimeout(finish, 380);
        return;
      }
      // Irregular cadence — a real boot log does not arrive on a metronome.
      timer = window.setTimeout(tick, 42 + Math.random() * 78);
    };
    let timer = window.setTimeout(tick, 180);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown]);

  return (
    <div
      className={`boot${fading ? " done" : ""}`}
      role="status"
      aria-live="off"
      aria-label="System boot log"
    >
      <div ref={scrollRef} style={{ flex: 1, overflow: "hidden" }}>
        {LINES.slice(0, shown).map(([t, msg], i) => {
          const ok = msg.includes("[  OK  ]");
          return (
            <div key={i} style={{ display: "flex", gap: "0.75rem", whiteSpace: "pre" }}>
              <span style={{ color: "var(--silk-3)", flexShrink: 0 }}>
                [{t.padStart(11, " ")}]
              </span>
              <span style={{ color: ok ? "var(--silk)" : "var(--silk-2)" }}>
                {msg.replace("[  OK  ]", "")}
                {ok && <span style={{ color: "var(--act)" }}>[  OK  ]</span>}
              </span>
            </div>
          );
        })}
        {shown > 0 && shown < LINES.length && <span className="caret" />}
      </div>

      <button
        onClick={finish}
        style={{
          alignSelf: "flex-start",
          marginTop: "1.25rem",
          fontFamily: "var(--mono)",
          fontSize: "0.72rem",
          color: "var(--silk-3)",
          borderBottom: "1px solid var(--line-2)",
          paddingBottom: "1px",
        }}
      >
        press esc to skip boot
      </button>
    </div>
  );
}
