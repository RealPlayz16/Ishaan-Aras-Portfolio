"use client";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      padding: "0.875rem 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(8,26,15,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "background 0.3s, border-color 0.3s",
    }}>
      <a href="#" style={{ fontWeight: 600, fontSize: "0.9rem", letterSpacing: "-0.01em" }}>
        Ishaan Aras
      </a>
      <div style={{ display: "flex", gap: "1.75rem" }}>
        {["Skills", "Projects", "Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            color: "var(--muted)", fontSize: "0.825rem", fontWeight: 500,
            transition: "color 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--silk)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
          >{l}</a>
        ))}
      </div>
    </nav>
  );
}
