"use client";
import { useState } from "react";
import { peripherals, type Peripheral } from "../lib/content";

export default function Peripherals() {
  const [open, setOpen] = useState<string | null>(peripherals[0].id);

  return (
    <section id="peripherals" className="section">
      <div className="shell">
        <div className="rv">
          <div className="section-label">04 / lsusb</div>
          <h2 className="section-title">Attached peripherals</h2>
          <p className="section-note">
            Four things I built and then had to make work outside a lab. Each one is listed the way
            the system would see it.
          </p>
        </div>

        <div
          className="rv"
          style={{
            marginTop: "2.25rem",
            border: "1px solid var(--line)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {peripherals.map((p, i) => (
            <Device
              key={p.id}
              p={p}
              open={open === p.id}
              onToggle={() => setOpen(open === p.id ? null : p.id)}
              last={i === peripherals.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Device({
  p, open, onToggle, last,
}: {
  p: Peripheral; open: boolean; onToggle: () => void; last: boolean;
}) {
  return (
    <div style={{ borderBottom: last ? "none" : "1px solid var(--line)" }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          display: "block",
          width: "100%",
          textAlign: "left",
          padding: "1.1rem 1.25rem",
          background: open ? "var(--board-2)" : "transparent",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = "var(--board-2)"; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = "transparent"; }}
      >
        <div
          className="mono"
          style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            fontSize: "0.63rem", color: "var(--silk-3)", marginBottom: "0.4rem",
          }}
        >
          <span>{p.bus}</span>
          <span
            style={{
              marginLeft: "auto",
              color: open ? "var(--act)" : "var(--silk-3)",
              transition: "color 0.2s ease",
            }}
          >
            {open ? "mounted" : "detached"}
          </span>
          <span
            style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: open ? "var(--act)" : "var(--gnd)",
              boxShadow: open ? "0 0 6px var(--act)" : "none",
              transition: "all 0.2s ease",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
          <h3
            className="mono"
            style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            {p.name}
          </h3>
          <span className="mono" style={{ fontSize: "0.68rem", color: "var(--gold)" }}>
            {p.metric}
          </span>
        </div>

        {!open && (
          <p
            style={{
              fontSize: "0.85rem", color: "var(--silk-2)",
              marginTop: "0.35rem", lineHeight: 1.6, maxWidth: "68ch",
            }}
          >
            {p.summary}
          </p>
        )}
      </button>

      {/* grid-template-rows animates cleanly without measuring height */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.34s cubic-bezier(0.2,0.7,0.3,1)",
          background: "var(--board-2)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: "0 1.25rem 1.4rem" }}>
            <p
              style={{
                fontSize: "0.9rem", color: "var(--silk-2)",
                lineHeight: 1.7, maxWidth: "66ch", marginBottom: "1.1rem",
              }}
            >
              {p.summary}
            </p>

            <ul style={{ listStyle: "none", marginBottom: "1.2rem" }}>
              {p.lines.map(l => (
                <li
                  key={l}
                  style={{
                    fontSize: "0.875rem", color: "var(--silk-2)",
                    lineHeight: 1.75, paddingLeft: "1.1rem",
                    position: "relative", maxWidth: "66ch",
                  }}
                >
                  <span
                    className="mono"
                    style={{ position: "absolute", left: 0, color: "var(--gold)" }}
                  >
                    /
                  </span>
                  {l}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {p.stack.map(t => (
                <span
                  key={t}
                  className="mono"
                  style={{
                    fontSize: "0.63rem", padding: "0.2rem 0.5rem",
                    border: "1px solid var(--line-2)", borderRadius: "2px",
                    color: "var(--silk-3)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
