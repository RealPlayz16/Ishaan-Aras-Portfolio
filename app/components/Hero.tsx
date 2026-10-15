"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "6rem 2rem 4rem", maxWidth: "880px", margin: "0 auto",
    }}>
      <div ref={ref}>
        <p style={{
          fontSize: "0.825rem", color: "var(--copper)", fontWeight: 500,
          marginBottom: "1.25rem",
        }}>
          Mechatronics Engineering, University of Waterloo
        </p>

        <h1 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
          fontWeight: 800, color: "var(--silk)",
          lineHeight: 0.95, letterSpacing: "-0.035em",
          marginBottom: "2rem",
        }}>
          Ishaan<br />Aras
        </h1>

        {/* Copper trace line — the PCB reference */}
        <div style={{
          width: "120px", height: "2px", background: "var(--copper)",
          marginBottom: "2rem", borderRadius: "1px",
        }} />

        <p style={{
          fontSize: "1.125rem", color: "var(--muted)", maxWidth: "480px",
          lineHeight: 1.65, fontWeight: 300, marginBottom: "2.5rem",
        }}>
          Embedded systems, robotics, and edge AI. I take hardware from schematic to deployment.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "4rem" }}>
          <a href="#projects" style={{
            background: "var(--raspberry)", color: "#fff",
            padding: "0.7rem 1.5rem", borderRadius: "4px",
            fontWeight: 600, fontSize: "0.85rem",
            transition: "opacity 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >View projects</a>
          <a href="#contact" style={{
            border: "1px solid var(--border)", color: "var(--silk)",
            padding: "0.7rem 1.5rem", borderRadius: "4px",
            fontWeight: 500, fontSize: "0.85rem",
            transition: "border-color 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--copper)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >Get in touch</a>
        </div>

        {/* Compact stats — no labels above, no ALL-CAPS */}
        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
          {[
            { val: "3x", note: "OSHWA certified" },
            { val: "<100ms", note: "edge inference" },
            { val: "4", note: "builds shipped" },
          ].map(s => (
            <div key={s.note}>
              <div style={{ fontWeight: 700, fontSize: "1.35rem", color: "var(--copper)", lineHeight: 1.2 }}>{s.val}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.15rem" }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
