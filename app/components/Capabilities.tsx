"use client";

const caps = [
  { num: "01", title: "Design", desc: "CAD modeling in Fusion 360 and SolidWorks, custom PCB layout and hand-soldering. Converted simple concept to prototype.", items: ["CAD", "PCB", "Mechanical Fabrication"] },
  { num: "02", title: "Embed", desc: "Firmware in C/C++ for ESP32, Raspberry Pi, and Jetson. ROS2, Docker, and microcontroller integration.", items: ["ESP32", "Raspberry Pi", "Jetson", "Firmware"] },
  { num: "03", title: "Perceive", desc: "Edge AI inference at sub-500ms. Object detection, pose estimation, and ToF sensor fusion.", items: ["OpenCV", "MediaPipe", "ToF", "Edge AI"] },
  { num: "04", title: "Actuate", desc: "Closed-loop control of stepper motors, industrial servos, and conveyor belt sorting system. Long-range LoRa telemetry.", items: ["Steppers", "Servos", "Conveyor Sorting", "LoRa"] },
];

export default function Capabilities() {
  return (
    <section style={{ padding: "6rem 2rem", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, marginBottom: "0.75rem" }}>
          Capabilities
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: "3rem", fontSize: "0.95rem" }}>
          End-to-end hardware engineering — comfortable across the full stack from SolidWorks to bare-metal C.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "2rem" }}>
          {caps.map((c) => (
            <div key={c.num}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "2.5rem", color: "var(--border)", lineHeight: 1, marginBottom: "1rem", userSelect: "none" }}>
                {c.num}
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.15rem", color: "var(--text)", marginBottom: "0.6rem" }}>
                {c.title}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "0.83rem", lineHeight: 1.65, marginBottom: "1rem" }}>
                {c.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {c.items.map((i) => (
                  <span key={i} style={{ fontSize: "0.7rem", color: "var(--lavender)", background: "rgba(108,71,255,0.1)", padding: "0.2rem 0.55rem", borderRadius: "3px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
