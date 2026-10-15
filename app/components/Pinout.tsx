"use client";
import { useState, useMemo, useCallback } from "react";
import { pins, pinGroups, type Pin } from "../lib/content";

const GROUP_COLOR: Record<string, string> = {
  "Languages": "#C51A4A",
  "Hardware": "#D9A842",
  "Vision & AI": "#75A928",
  "Electronics": "#4D9FD6",
  "CAD & Fabrication": "#B07BC4",
  "Frameworks": "#D4785A",
};

function padColor(p: Pin, selected: boolean, dimmed: boolean): React.CSSProperties {
  let bg = "var(--board-2)";
  let border = "var(--line-2)";

  if (p.kind === "5v")       { bg = "#3A1714"; border = "var(--rail-5v)"; }
  else if (p.kind === "3v3") { bg = "#33280F"; border = "var(--gold)"; }
  else if (p.kind === "gnd") { bg = "#161C18"; border = "var(--gnd)"; }
  else if (p.kind === "id")  { bg = "var(--board-2)"; border = "var(--line)"; }
  else if (p.kind === "spare") { bg = "var(--board-2)"; border = "var(--line-2)"; }
  else if (p.group)          { bg = GROUP_COLOR[p.group] + "28"; border = GROUP_COLOR[p.group]; }

  return {
    background: bg,
    borderColor: border,
    opacity: dimmed ? 0.22 : 1,
    boxShadow: selected ? `0 0 0 2px var(--board), 0 0 0 3.5px ${border}, 0 0 14px ${border}88` : "none",
    transform: selected ? "scale(1.25)" : undefined,
  };
}

export default function Pinout() {
  const [sel, setSel] = useState<number>(16);        // opens on YOLOv8
  const [filter, setFilter] = useState<string | null>(null);

  const selected = useMemo(() => pins.find(p => p.n === sel) ?? null, [sel]);

  const rows = useMemo(() => {
    const out: [Pin, Pin][] = [];
    for (let i = 0; i < pins.length; i += 2) out.push([pins[i], pins[i + 1]]);
    return out;
  }, []);

  const isDimmed = useCallback(
    (p: Pin) => filter !== null && p.group !== filter,
    [filter]
  );

  const assigned = pins.filter(p => p.skill).length;
  const spare = pins.filter(p => p.kind === "spare").length;

  return (
    <section id="pinout" className="section">
      <div className="shell">
        <div className="rv">
          <div className="section-label">02 / pinout</div>
          <h2 className="section-title">Skills, mapped to the header</h2>
          <p className="section-note">
            A real Raspberry Pi 40-pin header. Power, ground and bus functions are accurate to the
            hardware. The {assigned} signal pins carry what I actually work with, and {spare} are
            still open. Pick a pin.
          </p>
        </div>

        {/* legend doubles as a filter */}
        <div
          className="rv"
          style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", margin: "2rem 0 1.75rem" }}
        >
          {pinGroups.map(g => {
            const on = filter === g;
            return (
              <button
                key={g}
                onClick={() => setFilter(on ? null : g)}
                aria-pressed={on}
                className="mono"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  fontSize: "0.68rem",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "3px",
                  border: `1px solid ${on ? GROUP_COLOR[g] : "var(--line)"}`,
                  background: on ? GROUP_COLOR[g] + "1A" : "transparent",
                  color: on ? "var(--silk)" : "var(--silk-3)",
                  transition: "all 0.16s ease",
                }}
              >
                <span
                  style={{
                    width: "7px", height: "7px", borderRadius: "1px",
                    background: GROUP_COLOR[g], flexShrink: 0,
                  }}
                />
                {g}
              </button>
            );
          })}
          {filter && (
            <button
              onClick={() => setFilter(null)}
              className="mono"
              style={{ fontSize: "0.68rem", padding: "0.3rem 0.5rem", color: "var(--silk-3)" }}
            >
              clear
            </button>
          )}
        </div>

        <div className="rv pinout-grid">
          {/* ── the header ── */}
          <div
            style={{
              border: "1px solid var(--line-2)",
              borderRadius: "4px",
              background: "var(--board-2)",
              padding: "1rem 0.9rem",
            }}
          >
            <div
              className="mono"
              style={{
                display: "flex", justifyContent: "space-between",
                fontSize: "0.6rem", color: "var(--silk-3)", marginBottom: "0.7rem",
              }}
            >
              <span>J8 · 40-PIN GPIO</span>
              <span>odd / even</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {rows.map(([left, right]) => (
                <div
                  key={left.n}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 22px 22px 1fr",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {/* left label */}
                  <span
                    className="mono"
                    style={{
                      fontSize: "0.58rem", textAlign: "right",
                      color: sel === left.n ? "var(--silk)" : "var(--silk-3)",
                      opacity: isDimmed(left) ? 0.3 : 1,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}
                  >
                    {left.skill ?? left.fn}
                  </span>

                  <PinButton pin={left} sel={sel} setSel={setSel} dimmed={isDimmed(left)} />
                  <PinButton pin={right} sel={sel} setSel={setSel} dimmed={isDimmed(right)} />

                  <span
                    className="mono"
                    style={{
                      fontSize: "0.58rem",
                      color: sel === right.n ? "var(--silk)" : "var(--silk-3)",
                      opacity: isDimmed(right) ? 0.3 : 1,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}
                  >
                    {right.skill ?? right.fn}
                  </span>
                </div>
              ))}
            </div>

            {/* rail legend */}
            <div
              className="mono"
              style={{
                display: "flex", gap: "0.9rem", flexWrap: "wrap",
                marginTop: "0.9rem", paddingTop: "0.75rem",
                borderTop: "1px solid var(--line)",
                fontSize: "0.58rem", color: "var(--silk-3)",
              }}
            >
              {[
                ["5V", "var(--rail-5v)"],
                ["3V3", "var(--gold)"],
                ["GND", "var(--gnd)"],
              ].map(([l, c]) => (
                <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "1px", border: `1px solid ${c}`, background: `${c}33` }} />
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* ── readout ── */}
          <div
            className="mono pin-readout"
            aria-live="polite"
            style={{
              border: "1px solid var(--line-2)",
              borderRadius: "4px",
              background: "var(--board-2)",
              padding: "1.4rem 1.5rem",
              minHeight: "230px",
            }}
          >
            {selected && (
              <>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.7rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
                    {String(selected.n).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: "0.68rem", color: "var(--silk-3)" }}>physical pin</span>
                  {selected.bcm !== undefined && (
                    <span
                      style={{
                        fontSize: "0.62rem", color: "var(--silk-3)",
                        border: "1px solid var(--line-2)", borderRadius: "2px",
                        padding: "0.1rem 0.4rem", marginLeft: "auto",
                      }}
                    >
                      BCM {selected.bcm}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    fontSize: "0.72rem", color: "var(--silk-2)",
                    marginTop: "0.5rem", paddingBottom: "0.9rem",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  {selected.fn}
                </div>

                {selected.skill ? (
                  <div style={{ marginTop: "1.1rem" }}>
                    <div
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.45rem",
                        fontSize: "0.63rem", color: "var(--silk-3)", marginBottom: "0.55rem",
                      }}
                    >
                      <span
                        style={{
                          width: "7px", height: "7px", borderRadius: "1px",
                          background: GROUP_COLOR[selected.group!],
                        }}
                      />
                      {selected.group}
                    </div>
                    <h3
                      style={{
                        fontSize: "1.15rem", fontWeight: 700,
                        letterSpacing: "-0.02em", marginBottom: "0.6rem",
                      }}
                    >
                      {selected.skill}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--sans)", fontSize: "0.88rem",
                        color: "var(--silk-2)", lineHeight: 1.7, maxWidth: "46ch",
                      }}
                    >
                      {selected.detail}
                    </p>
                  </div>
                ) : (
                  <div style={{ marginTop: "1.1rem" }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                      {selected.kind === "gnd" && "Ground"}
                      {selected.kind === "5v" && "5V rail"}
                      {selected.kind === "3v3" && "3V3 rail"}
                      {selected.kind === "id" && "Reserved"}
                      {selected.kind === "spare" && "Unassigned"}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--sans)", fontSize: "0.88rem",
                        color: "var(--silk-2)", lineHeight: 1.7, maxWidth: "46ch",
                      }}
                    >
                      {selected.kind === "gnd" && "Common return path. Every signal on this header is measured against it."}
                      {selected.kind === "5v" && "Unregulated 5V straight off the supply. Drives motors and servos, never logic."}
                      {selected.kind === "3v3" && "Regulated 3V3 logic rail. What the GPIO pins actually swing between."}
                      {selected.kind === "id" && "Reserved for HAT identification EEPROM. Not available for general use."}
                      {selected.kind === "spare" && "Free pin. Room for whatever I pick up next."}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PinButton({
  pin, sel, setSel, dimmed,
}: {
  pin: Pin; sel: number; setSel: (n: number) => void; dimmed: boolean;
}) {
  const selected = sel === pin.n;
  const label = pin.skill
    ? `Pin ${pin.n}, ${pin.fn}, ${pin.skill}`
    : `Pin ${pin.n}, ${pin.fn}`;

  return (
    <button
      onClick={() => setSel(pin.n)}
      aria-pressed={selected}
      aria-label={label}
      title={label}
      className="pin-btn"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <span className="pin-pad" style={padColor(pin, selected, dimmed)} />
    </button>
  );
}
