"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-inner > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1,
          scrollTrigger: { trigger: ".contact-inner", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={ref} style={{
      padding: "6rem 2rem 8rem", maxWidth: "960px", margin: "0 auto",
    }}>
      <div className="contact-inner">
        <div style={{
          width: "100%", height: "1px",
          background: "linear-gradient(to right, var(--copper-dim), var(--border), transparent)",
          marginBottom: "4rem",
        }} />

        <h2 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "2.25rem", fontWeight: 700, marginBottom: "1.25rem",
          letterSpacing: "-0.025em",
        }}>
          Get in touch
        </h2>

        <p style={{
          fontSize: "0.95rem", color: "var(--muted)", maxWidth: "400px",
          lineHeight: 1.7, fontWeight: 300, marginBottom: "2.5rem",
        }}>
          W2027 co-op available. Open to embedded systems, robotics, and hardware engineering roles.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "3rem" }}>
          <a href="mailto:i2aras@uwaterloo.ca" className="link-hover" style={{
            fontSize: "0.9rem", color: "var(--silk)", fontWeight: 500,
            width: "fit-content",
          }}>
            i2aras@uwaterloo.ca
          </a>
          <a href="https://www.linkedin.com/in/ishaan-aras" target="_blank" rel="noopener noreferrer"
            className="link-hover" style={{
              fontSize: "0.9rem", color: "var(--silk)", fontWeight: 500,
              width: "fit-content",
            }}>
            LinkedIn
          </a>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
          <h3 style={{
            fontSize: "0.75rem", fontWeight: 600, color: "var(--copper)",
            marginBottom: "0.85rem", letterSpacing: "0.01em",
          }}>
            Certifications & recognition
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              "3x OSHWA certified open-source hardware",
              "Smart India Hackathon finalist",
              "Published research in embedded AI systems",
            ].map(item => (
              <li key={item} style={{
                fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.85, fontWeight: 300,
              }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
