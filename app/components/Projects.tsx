"use client";
import { useState } from "react";

interface Project {
  title: string;
  tagline: string;
  bullets: string[];
  tech: string[];
}

const projects: Project[] = [
  {
    title: "Krushi Yantra",
    tagline: "Autonomous agri-robot for small-plot Indian farms. Real-time weed detection, GPS waypoint navigation, solar-powered.",
    bullets: [
      "Custom PCB with Raspberry Pi CM4 and dual motor drivers",
      "YOLOv8 weed detection at 22 FPS on edge hardware",
      "RTK-GPS waypoint navigation with 2cm accuracy",
      "Solar charging system with 8hr runtime per cycle",
    ],
    tech: ["Raspberry Pi CM4", "YOLOv8", "KiCad", "ROS 2", "Python"],
  },
  {
    title: "FocusGuard",
    tagline: "Driver drowsiness detection system using real-time facial landmark analysis and alerting.",
    bullets: [
      "MediaPipe face mesh with 468-point landmark tracking",
      "Eye aspect ratio algorithm for blink and drowsiness detection",
      "Sub-100ms inference pipeline on Raspberry Pi 4",
      "Audio and visual alert system with configurable thresholds",
    ],
    tech: ["MediaPipe", "OpenCV", "Raspberry Pi 4", "Python"],
  },
  {
    title: "HandSteer",
    tagline: "Gesture-controlled vehicle interface. Hand tracking replaces physical steering for accessibility research.",
    bullets: [
      "21-point hand landmark detection via MediaPipe",
      "Custom gesture classifier trained on 2000+ samples",
      "PWM motor control mapped to hand angle and finger state",
      "Latency under 80ms from gesture to actuator response",
    ],
    tech: ["MediaPipe", "TensorFlow Lite", "Arduino", "C++"],
  },
  {
    title: "Edge AI Waste Sorting",
    tagline: "Real-time waste classification on embedded hardware. Sorts recyclables from landfill at conveyor speed.",
    bullets: [
      "MobileNetV2 classifier with 94% accuracy across 6 categories",
      "TensorFlow Lite quantized model for Jetson Nano deployment",
      "Servo-actuated sorting mechanism triggered by classification",
      "OSHWA-certified open hardware design",
    ],
    tech: ["TensorFlow Lite", "Jetson Nano", "SolidWorks", "Python"],
  },
];

export default function Projects() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="projects" style={{ padding: "5rem 2rem", maxWidth: "880px", margin: "0 auto" }}>
      <h2 style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: "2rem", fontWeight: 700, marginBottom: "2.5rem",
        letterSpacing: "-0.02em",
      }}>
        Projects
      </h2>

      <div style={{ position: "relative", paddingLeft: "1.5rem" }}>
        {/* Vertical copper trace */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: "2px", background: "var(--trace)",
        }} />

        {projects.map((p, i) => {
          const isOpen = open === i;
          return (
            <div key={p.title} style={{ marginBottom: "0.5rem", position: "relative" }}>
              {/* Trace node */}
              <div style={{
                position: "absolute", left: "-1.5rem", top: "1.15rem",
                width: "8px", height: "8px", borderRadius: "50%",
                background: isOpen ? "var(--copper)" : "var(--border)",
                border: isOpen ? "none" : "2px solid var(--border)",
                transition: "background 0.2s",
                transform: "translateX(-3px)",
              }} />

              <button
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: isOpen ? "var(--pcb-surface)" : "transparent",
                  border: "1px solid",
                  borderColor: isOpen ? "var(--border)" : "transparent",
                  borderRadius: "4px",
                  padding: "1rem 1.25rem",
                  cursor: "pointer", color: "inherit",
                  transition: "background 0.2s, border-color 0.2s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>{p.title}</h3>
                  <span style={{
                    color: "var(--muted)", fontSize: "1.2rem", fontWeight: 300,
                    transition: "transform 0.2s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                    display: "inline-block",
                  }}>+</span>
                </div>

                {!isOpen && (
                  <p style={{ fontSize: "0.825rem", color: "var(--muted)", marginTop: "0.3rem", fontWeight: 300 }}>
                    {p.tagline}
                  </p>
                )}
              </button>

              {isOpen && (
                <div style={{
                  padding: "0 1.25rem 1.25rem",
                  background: "var(--pcb-surface)",
                  borderLeft: "1px solid var(--border)",
                  borderRight: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                  borderRadius: "0 0 4px 4px",
                  marginTop: "-1px",
                }}>
                  <p style={{ fontSize: "0.9rem", color: "var(--muted)", marginBottom: "1rem", lineHeight: 1.6, fontWeight: 300 }}>
                    {p.tagline}
                  </p>

                  <ul style={{ listStyle: "none", padding: 0, marginBottom: "1rem" }}>
                    {p.bullets.map(b => (
                      <li key={b} style={{
                        fontSize: "0.85rem", color: "var(--silk)", lineHeight: 1.7,
                        paddingLeft: "0.75rem", position: "relative", fontWeight: 300,
                      }}>
                        <span style={{
                          position: "absolute", left: 0, color: "var(--copper)",
                        }}>/</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {p.tech.map(t => (
                      <span key={t} style={{
                        fontSize: "0.72rem", padding: "0.2rem 0.55rem",
                        border: "1px solid var(--border)", borderRadius: "3px",
                        color: "var(--muted)", fontWeight: 400,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
