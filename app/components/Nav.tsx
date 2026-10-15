"use client";
import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "pinout", label: "Pinout" },
  { id: "kernel-log", label: "Kernel log" },
  { id: "peripherals", label: "Peripherals" },
  { id: "shell", label: "Shell" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");
  const [mac, setMac] = useState(true);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 90);
      let current = "";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#pinout"
        className="mono"
        style={{
          position: "fixed", top: "-100px", left: "1rem", zIndex: 400,
          background: "var(--board-2)", border: "1px solid var(--gold)",
          padding: "0.5rem 0.9rem", borderRadius: "3px", fontSize: "0.72rem",
        }}
        onFocus={e => (e.currentTarget.style.top = "0.75rem")}
        onBlur={e => (e.currentTarget.style.top = "-100px")}
      >
        skip to content
      </a>

      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          display: "flex", alignItems: "center", gap: "1rem",
          padding: solid ? "0.6rem 1.5rem" : "1rem 1.5rem",
          background: solid ? "rgba(8,11,9,0.9)" : "transparent",
          backdropFilter: solid ? "blur(10px)" : "none",
          WebkitBackdropFilter: solid ? "blur(10px)" : "none",
          borderBottom: `1px solid ${solid ? "var(--line)" : "transparent"}`,
          transition: "all 0.3s ease",
        }}
      >
        <a
          href="#power-on"
          className="mono"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontSize: "0.78rem", fontWeight: 700, letterSpacing: "-0.01em",
          }}
        >
          <span className="led" />
          ishaan
        </a>

        <div
          className="mono"
          style={{
            display: "flex", gap: "1.15rem", alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <span className="nav-sections">
          {SECTIONS.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{
                fontSize: "0.72rem",
                color: active === s.id ? "var(--silk)" : "var(--silk-3)",
                whiteSpace: "nowrap",
                borderBottom: `1px solid ${active === s.id ? "var(--gold)" : "transparent"}`,
                paddingBottom: "2px",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
            >
              {s.label}
            </a>
          ))}
          </span>

          <button
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="mono"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              fontSize: "0.65rem", color: "var(--silk-3)",
              border: "1px solid var(--line-2)", borderRadius: "3px",
              padding: "0.25rem 0.45rem", flexShrink: 0,
              transition: "all 0.18s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "var(--silk)";
              e.currentTarget.style.borderColor = "var(--gold)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "var(--silk-3)";
              e.currentTarget.style.borderColor = "var(--line-2)";
            }}
          >
            {mac ? "⌘" : "ctrl"}K
          </button>
        </div>
      </nav>
    </>
  );
}
