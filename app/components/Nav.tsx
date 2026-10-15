"use client";
import { useState, useEffect } from "react";

const links = ["Skills", "Projects", "Contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const sections = links.map(l => document.getElementById(l.toLowerCase()));
      let current = "";
      for (const sec of sections) {
        if (sec && sec.getBoundingClientRect().top < window.innerHeight * 0.4) {
          current = sec.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? "0.75rem 2rem" : "1.25rem 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(6,18,16,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(12px) saturate(1.4)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(12px) saturate(1.4)" : "none",
      borderBottom: scrolled ? "1px solid rgba(26,51,36,0.6)" : "1px solid transparent",
      transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    }}>
      <a href="#" style={{
        fontWeight: 600, fontSize: "0.875rem", letterSpacing: "-0.01em",
        color: "var(--silk)",
      }}>
        Ishaan Aras
      </a>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="link-hover" style={{
            color: active === l.toLowerCase() ? "var(--silk)" : "var(--muted)",
            fontSize: "0.8rem", fontWeight: 500, transition: "color 0.3s",
          }}>{l}</a>
        ))}
      </div>
    </nav>
  );
}
