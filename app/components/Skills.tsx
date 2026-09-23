"use client";

const skills = [
  {
    category: "Languages",
    items: ["C / C++", "Python", "Arduino"],
  },
  {
    category: "Hardware",
    items: ["ESP32", "Raspberry Pi 5", "Jetson Orin Nano"],
  },
  {
    category: "Vision & AI",
    items: ["OpenCV", "MediaPipe", "PyTorch", "RF-DETR"],
  },
  {
    category: "CAD & Fabrication",
    items: ["Fusion 360", "SolidWorks (CSWA)", "FDM 3D Printing", "Laser Cutting"],
  },
  {
    category: "Electronics",
    items: ["PCB Layout (KiCAD, EAGLE)", "LoRa RYLR Modules", "NEMA Motors", "Hand-soldered PCB"],
  },
  {
    category: "Frameworks",
    items: ["ROS2", "Docker"],
  },
];

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "6rem 2rem", maxWidth: "960px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, marginBottom: "0.75rem", color: "var(--text)" }}>
        Core Skills
      </h2>
      <p style={{ color: "var(--muted)", marginBottom: "3rem", fontSize: "0.95rem" }}>
        Across the full stack from mechanical design to edge AI inference.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1px",
          background: "var(--border)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {skills.map((s) => (
          <div
            key={s.category}
            style={{
              background: "var(--surface)",
              padding: "1.5rem",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface)")}
          >
            <div
              style={{
                fontSize: "0.7rem",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                color: "var(--lavender)",
                marginBottom: "0.75rem",
                letterSpacing: "0.06em",
              }}
            >
              {s.category.toUpperCase()}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {s.items.map((item) => (
                <span key={item} style={{ color: "var(--text)", fontSize: "0.9rem", fontWeight: 400 }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
