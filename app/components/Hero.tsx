"use client";
import { board, specs } from "../lib/content";

export default function Hero({ booted }: { booted: boolean }) {
  const step = (n: number): React.CSSProperties => ({
    opacity: booted ? 1 : 0,
    transform: booted ? "none" : "translateY(10px)",
    transition: `opacity 0.5s ease ${n * 80}ms, transform 0.5s cubic-bezier(0.2,0.7,0.3,1) ${n * 80}ms`,
  });

  return (
    <header
      id="power-on"
      className="shell"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "6rem",
        paddingBottom: "4rem",
      }}
    >
      {/* shell prompt — the boot log resolved into this */}
      <div className="mono" style={{ ...step(0), fontSize: "0.78rem", color: "var(--silk-3)", marginBottom: "1.75rem" }}>
        <span style={{ color: "var(--act)" }}>ishaan@uwaterloo</span>
        <span>:~$ </span>
        <span style={{ color: "var(--silk-2)" }}>cat /proc/board</span>
      </div>

      <h1
        className="mono"
        style={{
          ...step(1),
          fontSize: "clamp(2.6rem, 8.5vw, 6.5rem)",
          fontWeight: 800,
          letterSpacing: "-0.055em",
          lineHeight: 0.92,
          color: "var(--silk)",
        }}
      >
        Ishaan<br />Aras
      </h1>

      {/* gold trace, like a pad run on the silkscreen */}
      <div
        style={{
          ...step(2),
          width: booted ? "96px" : "0px",
          height: "2px",
          background: "var(--gold)",
          margin: "2rem 0 1.75rem",
          transition: "width 0.7s cubic-bezier(0.2,0.7,0.3,1) 260ms, opacity 0.4s ease 200ms",
        }}
      />

      <p style={{ ...step(3), fontSize: "1.05rem", color: "var(--silk-2)", maxWidth: "46ch", lineHeight: 1.7 }}>
        {board.tagline}
      </p>

      <div style={{ ...step(4), display: "flex", gap: "0.65rem", flexWrap: "wrap", margin: "2.25rem 0 3.25rem" }}>
        <a
          href="#shell"
          className="mono"
          style={{
            background: "var(--raspberry)",
            color: "#fff",
            padding: "0.6rem 1.15rem",
            borderRadius: "3px",
            fontSize: "0.78rem",
            fontWeight: 500,
            transition: "background 0.18s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--raspberry-2)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--raspberry)")}
        >
          open a shell
        </a>
        <a
          href="#peripherals"
          className="mono"
          style={{
            border: "1px solid var(--line-2)",
            color: "var(--silk)",
            padding: "0.6rem 1.15rem",
            borderRadius: "3px",
            fontSize: "0.78rem",
            transition: "border-color 0.18s ease, background 0.18s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "var(--gold)";
            e.currentTarget.style.background = "var(--board-2)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--line-2)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          list peripherals
        </a>
      </div>

      {/* /proc readout, in place of a stat row */}
      <dl
        className="mono"
        style={{
          ...step(5),
          display: "grid",
          gridTemplateColumns: "minmax(0, max-content) minmax(0, 1fr)",
          columnGap: "1.5rem",
          rowGap: "0.3rem",
          fontSize: "0.74rem",
          borderLeft: "1px solid var(--line)",
          paddingLeft: "1.1rem",
          maxWidth: "52ch",
        }}
      >
        {specs.map(s => (
          <div key={s.label} style={{ display: "contents" }}>
            <dt style={{ color: "var(--silk-3)" }}>{s.label}</dt>
            <dd style={{ color: "var(--silk-2)" }}>{s.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
