const skills: Record<string, string[]> = {
  Languages: ["Python", "C/C++", "MATLAB", "JavaScript"],
  Hardware: ["Raspberry Pi", "Arduino", "NVIDIA Jetson", "ESP32"],
  "Vision & AI": ["OpenCV", "TensorFlow Lite", "YOLOv8", "MediaPipe"],
  "CAD & Fabrication": ["SolidWorks", "KiCad", "Fusion 360", "3D Printing"],
  Electronics: ["PCB Design", "Soldering", "Oscilloscope", "Signal Processing"],
  Frameworks: ["ROS 2", "Linux", "Git", "Docker"],
};

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "5rem 2rem", maxWidth: "880px", margin: "0 auto" }}>
      <h2 style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: "2rem", fontWeight: 700, marginBottom: "2.5rem",
        letterSpacing: "-0.02em",
      }}>
        Skills
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "0",
        border: "1px solid var(--border)",
      }}>
        {Object.entries(skills).map(([category, items], i) => (
          <div key={category} style={{
            padding: "1.25rem 1.5rem",
            borderRight: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}>
            <h3 style={{
              fontSize: "0.78rem", fontWeight: 600, color: "var(--copper)",
              marginBottom: "0.75rem",
            }}>
              {category}
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {items.map(item => (
                <li key={item} style={{
                  fontSize: "0.875rem", color: "var(--silk)", lineHeight: 1.85,
                  fontWeight: 300,
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
