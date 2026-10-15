"use client";
import { useState, useEffect, useRef } from "react";

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function StatusBar() {
  // Static first paint, so server and client markup agree.
  const [uptime, setUptime] = useState(0);
  const [temp, setTemp] = useState(47.2);
  const [live, setLive] = useState(false);
  const start = useRef(0);

  useEffect(() => {
    setLive(true);
    start.current = Date.now();

    const id = window.setInterval(() => {
      setUptime((Date.now() - start.current) / 1000);
      // A real SoC idles around here and wanders a little.
      setTemp(t => {
        const next = t + (Math.random() - 0.5) * 0.6;
        return Math.min(52, Math.max(44, next));
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  const cell = (label: string, value: string, color = "var(--silk-2)") => (
    <span style={{ display: "inline-flex", gap: "0.4rem", whiteSpace: "nowrap", flexShrink: 0 }}>
      <span style={{ color: "var(--silk-3)" }}>{label}</span>
      <span style={{ color }}>{value}</span>
    </span>
  );

  return (
    <div className="statusbar" role="status" aria-label="Board status">
      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", flexShrink: 0 }}>
        <span className="led" />
        <span style={{ color: "var(--act)" }}>ACT</span>
      </span>

      {cell("soc", live ? `${temp.toFixed(1)}°C` : "47.2°C")}
      {cell("throttle", "none", "var(--act)")}
      {cell("session", fmt(uptime))}
      {cell("gpio", "26/40 mapped")}
      {cell("usb", "4 devices")}

      <span
        style={{
          marginLeft: "auto",
          color: "var(--silk-3)",
          whiteSpace: "nowrap",
          flexShrink: 0,
          paddingLeft: "1rem",
        }}
      >
        ⌘K for everything
      </span>
    </div>
  );
}
