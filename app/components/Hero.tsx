"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const raf = requestAnimationFrame(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8rem 2rem 4rem",
        maxWidth: "960px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,71,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div ref={containerRef}>
        <p style={{ color: "var(--lavender)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "0.875rem", marginBottom: "1.5rem", letterSpacing: "0.04em" }}>
          Mechatronics Engineering · University of Waterloo
        </p>

        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "1.5rem",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Ishaan Aras
        </h1>

        <p
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            color: "var(--muted)",
            maxWidth: "560px",
            lineHeight: 1.6,
            marginBottom: "3rem",
            fontWeight: 300,
          }}
        >
          Embedded systems, robotics, automation, and edge AI. I take hardware from schematic to deployment.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", marginBottom: "4rem" }}>
          <a
            href="#projects"
            style={{
              background: "var(--violet)",
              color: "#fff",
              padding: "0.75rem 1.75rem",
              borderRadius: "6px",
              textDecoration: "none",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "0.9rem",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            View Projects
          </a>
          <a
            href="#contact"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text)",
              padding: "0.75rem 1.75rem",
              borderRadius: "6px",
              textDecoration: "none",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: "0.9rem",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--lavender)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            Get in touch
          </a>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          {[
            { val: "3×", label: "OSHWA Certified" },
            { val: "<500ms", label: "Edge AI latency" },
            { val: "4", label: "Projects" },
            { val: "Winter 2027", label: "Co-op available" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "var(--lavender)" }}>{s.val}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.25rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
