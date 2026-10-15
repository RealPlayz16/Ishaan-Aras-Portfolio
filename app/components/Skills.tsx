"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills: Record<string, string[]> = {
  Languages: ["Python", "C/C++", "MATLAB", "JavaScript"],
  Hardware: ["Raspberry Pi", "Arduino", "NVIDIA Jetson", "ESP32"],
  "Vision & AI": ["OpenCV", "TensorFlow Lite", "YOLOv8", "MediaPipe"],
  "CAD & Fabrication": ["SolidWorks", "KiCad", "Fusion 360", "3D Printing"],
  Electronics: ["PCB Design", "Soldering", "Oscilloscope", "Signal Processing"],
  Frameworks: ["ROS 2", "Linux", "Git", "Docker"],
};

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-heading",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".skill-heading", start: "top 85%" } }
      );

      gsap.fromTo(".skill-cell",
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out", stagger: 0.08,
          scrollTrigger: { trigger: ".skill-grid", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={ref} style={{ padding: "6rem 2rem", maxWidth: "960px", margin: "0 auto" }}>
      <h2 className="skill-heading" style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: "2.25rem", fontWeight: 700, marginBottom: "3rem",
        letterSpacing: "-0.025em",
      }}>
        Skills
      </h2>

      <div className="skill-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        border: "1px solid var(--border)",
      }}>
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="skill-cell" style={{
            padding: "1.5rem 1.75rem",
            borderRight: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            transition: "background 0.3s",
            cursor: "default",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--pcb-surface)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <h3 style={{
              fontSize: "0.75rem", fontWeight: 600, color: "var(--copper)",
              marginBottom: "0.85rem", letterSpacing: "0.01em",
            }}>
              {category}
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {items.map(item => (
                <li key={item} style={{
                  fontSize: "0.875rem", color: "var(--silk-dim)",
                  lineHeight: 1.9, fontWeight: 300,
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
