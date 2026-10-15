"use client";
import { pins, groupColor, type Pin } from "../lib/content";

function padStyle(p: Pin, lit: boolean, selected: boolean): React.CSSProperties {
  let bg = "var(--board-2)";
  let border = "var(--line-2)";

  if (p.kind === "5v")        { bg = "#3A1714"; border = "var(--rail-5v)"; }
  else if (p.kind === "3v3")  { bg = "#33280F"; border = "var(--gold)"; }
  else if (p.kind === "gnd")  { bg = "#161C18"; border = "var(--gnd)"; }
  else if (p.kind === "id")   { bg = "var(--board-2)"; border = "var(--line)"; }
  else if (p.kind === "spare"){ bg = "var(--board-2)"; border = "var(--line-2)"; }
  else if (p.group)           { bg = groupColor(p.group) + "26"; border = groupColor(p.group); }

  const glow = p.group ? groupColor(p.group) : "var(--gold)";

  return {
    background: bg,
    borderColor: border,
    opacity: lit ? 1 : 0.2,
    transform: selected ? "scale(1.3)" : lit ? "scale(1.08)" : "scale(1)",
    boxShadow: selected
      ? `0 0 0 2px var(--board), 0 0 0 3.5px ${border}, 0 0 16px ${glow}`
      : lit
      ? `0 0 10px ${glow}66`
      : "none",
  };
}

interface Props {
  /** Pin numbers currently energised. Everything else dims. */
  lit: Set<number> | null;
  selected?: number | null;
  onSelect?: (n: number) => void;
  /** Compact strip used inside a project card. */
  compact?: boolean;
}

export default function PinHeader({ lit, selected, onSelect, compact }: Props) {
  const rows: [Pin, Pin][] = [];
  for (let i = 0; i < pins.length; i += 2) rows.push([pins[i], pins[i + 1]]);

  const isLit = (p: Pin) => (lit === null ? true : lit.has(p.n));

  if (compact) {
    return (
      <div className="pin-strip" aria-hidden="true">
        {pins.map(p => (
          <span
            key={p.n}
            className="pin-pad pin-pad-sm"
            style={padStyle(p, isLit(p), false)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="pin-board">
      <div
        className="mono"
        style={{
          display: "flex", justifyContent: "space-between",
          fontSize: "0.58rem", color: "var(--silk-3)", marginBottom: "0.7rem",
        }}
      >
        <span>J8 · 40-PIN GPIO</span>
        <span>odd / even</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {rows.map(([l, r]) => (
          <div key={l.n} className="pin-row">
            <PinLabel pin={l} lit={isLit(l)} selected={selected === l.n} align="right" />
            <PinPad pin={l} lit={isLit(l)} selected={selected === l.n} onSelect={onSelect} />
            <PinPad pin={r} lit={isLit(r)} selected={selected === r.n} onSelect={onSelect} />
            <PinLabel pin={r} lit={isLit(r)} selected={selected === r.n} align="left" />
          </div>
        ))}
      </div>

      <div
        className="mono"
        style={{
          display: "flex", gap: "0.9rem", flexWrap: "wrap",
          marginTop: "0.9rem", paddingTop: "0.75rem",
          borderTop: "1px solid var(--line)",
          fontSize: "0.58rem", color: "var(--silk-3)",
        }}
      >
        {[["5V", "var(--rail-5v)"], ["3V3", "var(--gold)"], ["GND", "var(--gnd)"]].map(([l, c]) => (
          <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "1px",
              border: `1px solid ${c}`, background: `${c}33`,
            }} />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function PinLabel({
  pin, lit, selected, align,
}: { pin: Pin; lit: boolean; selected: boolean; align: "left" | "right" }) {
  return (
    <span
      className="mono pin-label"
      style={{
        textAlign: align,
        color: selected ? "var(--silk)" : lit ? "var(--silk-2)" : "var(--silk-3)",
        opacity: lit ? 1 : 0.35,
      }}
    >
      {pin.skill ?? pin.fn}
    </span>
  );
}

function PinPad({
  pin, lit, selected, onSelect,
}: { pin: Pin; lit: boolean; selected: boolean; onSelect?: (n: number) => void }) {
  const label = pin.skill
    ? `Pin ${pin.n}, ${pin.fn}, ${pin.skill}`
    : `Pin ${pin.n}, ${pin.fn}`;

  if (!onSelect) {
    return <span className="pin-pad" style={padStyle(pin, lit, selected)} />;
  }

  return (
    <button
      onClick={() => onSelect(pin.n)}
      aria-pressed={selected}
      aria-label={label}
      title={label}
      className="pin-btn"
    >
      <span className="pin-pad" style={padStyle(pin, lit, selected)} />
    </button>
  );
}
