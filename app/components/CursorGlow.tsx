"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
    };
    const enter = () => { el.style.opacity = "1"; };
    const leave = () => { el.style.opacity = "0"; };
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" />;
}
