"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    const content = contentRef.current;
    const inner = innerRef.current;
    if (!content || !inner) return;

    if (!isOpen) {
      setIsOpen(true);
      gsap.set(content, { height: 0, overflow: "hidden" });
      gsap.to(content, {
        height: inner.offsetHeight, duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => gsap.set(content, { height: "auto", overflow: "visible" }),
      });
      gsap.fromTo(inner.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, delay: 0.15, ease: "power2.out" }
      );
    } else {
      gsap.to(content, {
        height: 0, duration: 0.4, ease: "power3.inOut",
        onComplete: () => setIsOpen(false),
      });
    }
  }, [isOpen]);

  return (
    <div className="project-item" style={{ marginBottom: "0.25rem", position: "relative" }}>
      {/* Trace node */}
      <div style={{
        position: "absolute", left: "-1.5rem", top: "1.35rem",
        width: "8px", height: "8px", borderRadius: "50%",
        background: isOpen ? "var(--copper)" : "transparent",
        border: `2px solid ${isOpen ? "var(--copper)" : "var(--border)"}`,
        transition: "all 0.4s", transform: "translateX(-3px)",
        boxShadow: isOpen ? "0 0 12px var(--copper-dim)" : "none",
      }} />

      <button onClick={toggle} style={{
        display: "block", width: "100%", textAlign: "left",
        background: isOpen ? "var(--pcb-surface)" : "transparent",
        border: "1px solid", borderColor: isOpen ? "var(--border)" : "transparent",
        borderRadius: isOpen ? "6px 6px 0 0" : "6px",
        padding: "1.15rem 1.5rem", cursor: "pointer", color: "inherit",
        transition: "all 0.3s",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.01em" }}>{project.title}</h3>
          <span style={{
            color: "var(--copper)", fontSize: "1.3rem", fontWeight: 300,
            transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transform: isOpen ? "rotate(45deg)" : "rotate(0)",
            display: "inline-block",
          }}>+</span>
        </div>
        {!isOpen && (
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.35rem", fontWeight: 300, lineHeight: 1.5 }}>
            {project.tagline}
          </p>
        )}
      </button>

      <div ref={contentRef} className="project-content" style={{
        height: isOpen ? "auto" : 0, overflow: isOpen ? "visible" : "hidden",
      }}>
        <div ref={innerRef} style={{
          padding: "0 1.5rem 1.5rem",
          background: "var(--pcb-surface)",
          borderLeft: "1px solid var(--border)",
          borderRight: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          borderRadius: "0 0 6px 6px",
        }}>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1.25rem", lineHeight: 1.65, fontWeight: 300 }}>
            {project.tagline}
          </p>

          <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.25rem" }}>
            {project.bullets.map(b => (
              <li key={b} style={{
                fontSize: "0.85rem", color: "var(--silk-dim)", lineHeight: 1.8,
                paddingLeft: "1rem", position: "relative", fontWeight: 300,
              }}>
                <span style={{ position: "absolute", left: 0, color: "var(--copper)", fontWeight: 500 }}>/</span>
                {b}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {project.tech.map(t => (
              <span key={t} style={{
                fontSize: "0.7rem", padding: "0.25rem 0.6rem",
                border: "1px solid var(--border)", borderRadius: "3px",
                color: "var(--muted)", fontWeight: 400,
                transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--copper)"; e.currentTarget.style.color = "var(--copper)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
              >{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".project-heading",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".project-heading", start: "top 85%" } }
      );
      gsap.fromTo(".project-item",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.12,
          scrollTrigger: { trigger: ".project-list", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={ref} style={{ padding: "6rem 2rem", maxWidth: "960px", margin: "0 auto" }}>
      <h2 className="project-heading" style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: "2.25rem", fontWeight: 700, marginBottom: "3rem",
        letterSpacing: "-0.025em",
      }}>
        Projects
      </h2>

      <div className="project-list" style={{ position: "relative", paddingLeft: "1.5rem" }}>
        {/* Vertical copper trace */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: "2px",
          background: "linear-gradient(to bottom, var(--copper-dim), var(--trace), transparent)",
        }} />
        {projects.map((p, i) => <ProjectItem key={p.title} project={p} index={i} />)}
      </div>
    </section>
  );
}
