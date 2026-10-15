"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    label: "Design",
    desc: "Schematics, PCB layout, and mechanical CAD. From napkin sketch to manufacturing files.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--copper)" strokeWidth="1.5">
        <rect x="4" y="4" width="24" height="24" rx="2" />
        <line x1="4" y1="12" x2="28" y2="12" />
        <line x1="12" y1="12" x2="12" y2="28" />
      </svg>
    ),
  },
  {
    num: "02",
    label: "Embed",
    desc: "Firmware and embedded software. Bare-metal C to Linux application stacks on ARM.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--copper)" strokeWidth="1.5">
        <rect x="8" y="6" width="16" height="20" rx="2" />
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="20" y1="2" x2="20" y2="6" />
        <line x1="12" y1="26" x2="12" y2="30" />
        <line x1="20" y1="26" x2="20" y2="30" />
        <circle cx="16" cy="16" r="3" />
      </svg>
    ),
  },
  {
    num: "03",
    label: "Perceive",
    desc: "Computer vision and sensor fusion. Real-time inference on edge hardware.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--copper)" strokeWidth="1.5">
        <circle cx="16" cy="16" r="10" />
        <circle cx="16" cy="16" r="4" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="16" y1="26" x2="16" y2="30" />
        <line x1="2" y1="16" x2="6" y2="16" />
        <line x1="26" y1="16" x2="30" y2="16" />
      </svg>
    ),
  },
  {
    num: "04",
    label: "Actuate",
    desc: "Motor control, robotics, and closed-loop systems. Software meets the physical world.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--copper)" strokeWidth="1.5">
        <path d="M6 26 L16 6 L26 26" />
        <line x1="10" y1="18" x2="22" y2="18" />
        <circle cx="16" cy="26" r="3" />
      </svg>
    ),
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".cap-heading",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".cap-heading", start: "top 85%" } }
      );

      const totalScroll = wrapper.scrollWidth - section.offsetWidth;

      if (totalScroll > 0) {
        gsap.to(wrapper, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 20%",
            end: () => `+=${totalScroll}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: "6rem 2rem", maxWidth: "960px", margin: "0 auto", overflow: "hidden",
    }}>
      <h2 className="cap-heading" style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: "2.25rem", fontWeight: 700, marginBottom: "3rem",
        letterSpacing: "-0.025em",
      }}>
        Pipeline
      </h2>

      <div ref={wrapperRef} className="horizontal-scroll-wrapper">
        {steps.map((s, i) => (
          <div key={s.num} style={{
            minWidth: "280px", maxWidth: "300px", flex: "0 0 auto",
            padding: "2rem",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            background: "var(--pcb-surface)",
            transition: "border-color 0.3s, transform 0.3s",
            cursor: "default",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--copper)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ marginBottom: "1.25rem", opacity: 0.8 }}>{s.icon}</div>
            <span style={{
              fontSize: "0.7rem", color: "var(--copper)", fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
            }}>{s.num}</span>
            <h3 style={{
              fontSize: "1.15rem", fontWeight: 600, margin: "0.35rem 0 0.65rem",
              letterSpacing: "-0.01em",
            }}>{s.label}</h3>
            <p style={{
              fontSize: "0.825rem", color: "var(--muted)", lineHeight: 1.65, fontWeight: 300,
            }}>{s.desc}</p>

            {i < steps.length - 1 && (
              <div style={{
                position: "absolute", right: "-1.25rem", top: "50%",
                transform: "translateY(-50%)",
                width: "24px", height: "2px",
                background: "var(--trace)",
              }} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
