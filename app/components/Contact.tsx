"use client";

export default function Contact() {
  return (
    <section id="contact" style={{
      padding: "5rem 2rem 6rem", maxWidth: "880px", margin: "0 auto",
      borderTop: "1px solid var(--border)",
    }}>
      <h2 style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: "2rem", fontWeight: 700, marginBottom: "1rem",
        letterSpacing: "-0.02em",
      }}>
        Get in touch
      </h2>

      <p style={{
        fontSize: "0.95rem", color: "var(--muted)", maxWidth: "420px",
        lineHeight: 1.65, fontWeight: 300, marginBottom: "2rem",
      }}>
        W2027 co-op available. Open to embedded systems, robotics, and hardware engineering roles.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2.5rem" }}>
        <a href="mailto:i2aras@uwaterloo.ca" style={{
          fontSize: "0.9rem", color: "var(--silk)", fontWeight: 500,
          transition: "color 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--copper)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--silk)")}
        >
          i2aras@uwaterloo.ca
        </a>
        <a href="https://www.linkedin.com/in/ishaan-aras" target="_blank" rel="noopener noreferrer" style={{
          fontSize: "0.9rem", color: "var(--silk)", fontWeight: 500,
          transition: "color 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--copper)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--silk)")}
        >
          LinkedIn
        </a>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
        <h3 style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--copper)", marginBottom: "0.75rem" }}>
          Certifications & recognition
        </h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {[
            "3x OSHWA certified open-source hardware",
            "Smart India Hackathon finalist",
            "Published research in embedded AI systems",
          ].map(item => (
            <li key={item} style={{
              fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.8, fontWeight: 300,
            }}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
