const steps = [
  {
    num: "01",
    label: "Design",
    desc: "Schematics, PCB layout, and mechanical CAD. From napkin sketch to manufacturing files.",
  },
  {
    num: "02",
    label: "Embed",
    desc: "Firmware and embedded software. Bare-metal C to Linux application stacks on ARM.",
  },
  {
    num: "03",
    label: "Perceive",
    desc: "Computer vision and sensor fusion. Real-time inference on edge hardware.",
  },
  {
    num: "04",
    label: "Actuate",
    desc: "Motor control, robotics, and closed-loop systems. Software meets the physical world.",
  },
];

export default function Capabilities() {
  return (
    <section style={{ padding: "5rem 2rem", maxWidth: "880px", margin: "0 auto" }}>
      <h2 style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: "2rem", fontWeight: 700, marginBottom: "2.5rem",
        letterSpacing: "-0.02em",
      }}>
        Pipeline
      </h2>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "1.5rem",
      }}>
        {steps.map(s => (
          <div key={s.num}>
            <span style={{
              fontSize: "0.72rem", color: "var(--copper)", fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
            }}>{s.num}</span>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "0.35rem 0 0.5rem" }}>{s.label}</h3>
            <p style={{ fontSize: "0.825rem", color: "var(--muted)", lineHeight: 1.6, fontWeight: 300 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
