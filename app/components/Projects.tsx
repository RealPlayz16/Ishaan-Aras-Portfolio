"use client";
import { useState } from "react";

const projects = [
  {
    id: "01",
    title: "Krushi Yantra",
    subtitle: "Autonomous & Remote Agricultural Rover",
    tags: ["Mobile Robotics", "Mechatronics", "Embedded Systems"],
    summary: "Open-source multi-terrain rover engineered for precision farming, soil telemetry, and long-range remote monitoring. Designed for rugged field deployment.",
    highlights: [
      "Custom PCBs for power management, LEDs, and sensor lines",
      "Arduino + ESP32 with soil moisture, ultrasonic, DHT-11, and NeoPixel sensors",
      "Upgraded to Raspberry Pi with data logging and high-torque motors",
      "Modeled in Fusion 360, fabricated via FDM 3D printing and laser cutting",
      "HC-05 Bluetooth for wireless control",
    ],
    badges: ["OSHWA v1.0 / v2.0 / v3.0", "Star Innovator Award"],
    color: "#6C47FF",
  },
  {
    id: "02",
    title: "FocusGuard",
    subtitle: "Windows Parental Control & Digital Wellbeing Platform",
    tags: ["Desktop Architecture", "Systems & Security"],
    summary: "Modular Windows desktop app using C#, .NET 8, WPF, and MVVM with continuous parental control and digital wellbeing management.",
    highlights: [
      "Real-time process monitoring with background workers — detects and terminates blocked apps",
      "Service-oriented architecture: process blocking, website filtering, auth, scheduling, analytics",
      "Multi-layer website protection: browser extension + ASP.NET Core REST API + desktop services",
      "BCrypt password hashing, system tray integration, password-protected exit",
      "Published as self-contained Windows executable — no .NET runtime required",
    ],
    badges: ["Self-contained .exe", "Service-oriented architecture"],
    color: "#9B6FFF",
  },
  {
    id: "03",
    title: "HandSteer",
    subtitle: "Vision-Based Virtual Controller",
    tags: ["Computer Vision", "Human-Machine Interface"],
    summary: "Contact-free, webcam-driven virtual controller translating hand gestures into low-latency analog inputs for PC gaming and vehicle control.",
    highlights: [
      "Python pipeline with OpenCV and MediaPipe for 2D/3D landmark detection across 21 hand keypoints",
      "Trigonometric algorithms for real-time palm angle calculation from spatial landmark deltas",
      "Smooth analog steering vectors with minimal latency — eliminates quantized input artifacts",
      "Mapped to virtual Xbox 360 controller bindings via vgamepad / ViGEmBus",
      "Compatible with any DirectInput/XInput application",
    ],
    badges: ["Open source", "No extra hardware required"],
    color: "#7B5CFF",
  },
  {
    id: "04",
    title: "Edge AI Waste Sorting",
    subtitle: "Industrial IoT / Real-Time Conveyor System",
    tags: ["Industrial IoT", "Embedded Systems", "Fostride Internship"],
    summary: "End-to-end industrial automation pipeline combining single-board computers, long-range wireless, and ML inference at the edge for real-world conveyor sorting.",
    highlights: [
      "Deployed real-time object classification on NVIDIA Jetson Orin Nano — sub-100ms end-to-end",
      "Automated material sorting on conveyor systems with closed-loop camera feedback",
      "Synchronized Raspberry Pi 5 and ESP32 nodes driving NEMA steppers, servos, and delta robot arms",
      "Integrated ToF sensors for closed-loop conveyor control",
      "Long-range LoRa wireless telemetry for remote monitoring",
    ],
    badges: ["<100ms inference", "Production deployed"],
    color: "#8A6FFF",
  },
];

export default function Projects() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="projects" style={{ padding: "6rem 2rem", maxWidth: "960px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, marginBottom: "0.75rem" }}>
        Projects
      </h2>
      <p style={{ color: "var(--muted)", marginBottom: "3rem", fontSize: "0.95rem" }}>
        Hardware shipped into real environments.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
        {projects.map((p) => {
          const isOpen = open === p.id;
          return (
            <div key={p.id} style={{ background: isOpen ? "var(--surface2)" : "var(--surface)", transition: "background 0.25s" }}>
              {/* Header row — always visible */}
              <button
                onClick={() => setOpen(isOpen ? null : p.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  padding: "1.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    color: p.color,
                    minWidth: "28px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {p.id}
                </span>

                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.05rem", color: "var(--text)" }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: "0.2rem" }}>
                    {p.subtitle}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ fontSize: "0.7rem", color: "var(--lavender)", background: "rgba(108,71,255,0.12)", padding: "0.2rem 0.6rem", borderRadius: "4px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, whiteSpace: "nowrap" }}>
                      {t}
                    </span>
                  ))}
                </div>

                <span style={{ color: "var(--muted)", fontSize: "1rem", transition: "transform 0.25s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0 }}>
                  +
                </span>
              </button>

              {/* Expandable detail */}
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: isOpen ? "600px" : "0",
                  transition: "max-height 0.35s ease",
                }}
              >
                <div style={{ padding: "0 1.5rem 1.75rem 1.5rem", paddingLeft: "calc(1.5rem + 28px + 1.5rem)" }}>
                  <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                    {p.summary}
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                    {p.highlights.map((h) => (
                      <li key={h} style={{ display: "flex", gap: "0.75rem", fontSize: "0.875rem", color: "var(--text)" }}>
                        <span style={{ color: p.color, flexShrink: 0, marginTop: "0.05rem" }}>▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {p.badges.map((b) => (
                      <span key={b} style={{ fontSize: "0.72rem", border: `1px solid ${p.color}44`, color: "var(--lavender)", padding: "0.25rem 0.65rem", borderRadius: "4px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
