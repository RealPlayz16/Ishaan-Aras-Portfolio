"use client";

export default function Contact() {
  return (
    <section id="contact" style={{ padding: "6rem 2rem 8rem", maxWidth: "960px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
        <div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, marginBottom: "1rem" }}>
            Let&apos;s work together
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "400px" }}>
            Actively seeking Winter 2027 co-op opportunities in embedded systems, robotics, and hardware design. I bring hands-on experience shipping real hardware into real environments.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <a
              href="https://www.linkedin.com/in/ishaanaras"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", color: "var(--text)", textDecoration: "none", fontSize: "0.9rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lavender)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
            >
              <span style={{ color: "var(--lavender)" }}>↗</span> LinkedIn
            </a>
            <a
              href="mailto:ishaan.aras@gmail.com"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", color: "var(--text)", textDecoration: "none", fontSize: "0.9rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lavender)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
            >
              <span style={{ color: "var(--lavender)" }}>↗</span> Mail
            </a>
          </div>
        </div>

        <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "4rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ fontSize: "0.72rem", color: "var(--lavender)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "0.5rem" }}>CERTIFICATIONS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {["OSHWA Open-Source Hardware Certified v1.0 / v2.0 / v3.0", "Google AI Essentials Specialization", "SolidWorks CSWA Certified"].map((c) => (
                <span key={c} style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{c}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.72rem", color: "var(--lavender)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "0.5rem" }}>RECOGNITION</div>
            <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Star Innovator Award Recipient</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "6rem", paddingTop: "2rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Ishaan Aras · Mechatronics Engineering · University of Waterloo</span>
        <span style={{ fontSize: "0.8rem", color: "var(--border)" }}>Winter 2027 Co-op</span>
      </div>
    </section>
  );
}
