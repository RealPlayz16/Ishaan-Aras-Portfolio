"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function MagneticButton({ children, href, style }: {
  children: React.ReactNode;
  href: string;
  style: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
    };
    const leave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, []);

  return <a ref={ref} href={href} className="magnetic-btn" style={style}>{children}</a>;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = nameRef.current?.querySelectorAll(".word-inner");
      if (words) {
        gsap.fromTo(words,
          { yPercent: 110, rotateX: -20 },
          { yPercent: 0, rotateX: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.3 }
        );
      }

      gsap.fromTo(".hero-tagline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.7 }
      );
      gsap.fromTo(".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.9 }
      );
      gsap.fromTo(".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 1.1 }
      );
      gsap.fromTo(".hero-stats > div",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1, delay: 1.3 }
      );

      gsap.to(".pcb-trace-1", {
        y: -30, rotation: 2, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
      gsap.to(".pcb-trace-2", {
        y: 20, rotation: -1.5, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "6rem 2rem 4rem", maxWidth: "960px",
      margin: "0 auto", position: "relative", overflow: "hidden",
    }}>
      {/* Floating PCB trace SVGs */}
      <svg className="pcb-trace-1" style={{
        position: "absolute", right: "-5%", top: "15%", width: "300px", height: "300px",
        opacity: 0.06, pointerEvents: "none",
      }} viewBox="0 0 200 200">
        <path d="M20 100 h60 v-40 h40 v60 h40" stroke="var(--copper)" strokeWidth="2" fill="none" />
        <path d="M40 140 h30 v-60 h50 v30 h40" stroke="var(--copper)" strokeWidth="1.5" fill="none" />
        <circle cx="80" cy="60" r="4" fill="none" stroke="var(--copper)" strokeWidth="1.5" />
        <circle cx="120" cy="120" r="4" fill="none" stroke="var(--copper)" strokeWidth="1.5" />
        <circle cx="160" cy="100" r="3" fill="none" stroke="var(--copper)" strokeWidth="1.5" />
      </svg>
      <svg className="pcb-trace-2" style={{
        position: "absolute", left: "-8%", bottom: "20%", width: "250px", height: "250px",
        opacity: 0.04, pointerEvents: "none",
      }} viewBox="0 0 200 200">
        <path d="M10 80 h50 v40 h30 v-60 h50 v20" stroke="var(--copper)" strokeWidth="2" fill="none" />
        <rect x="90" y="50" width="8" height="8" fill="none" stroke="var(--copper)" strokeWidth="1.5" />
        <circle cx="60" cy="120" r="3" fill="none" stroke="var(--copper)" strokeWidth="1.5" />
      </svg>

      <div style={{ position: "relative", zIndex: 1 }}>
        <p className="hero-tagline" style={{
          fontSize: "0.8rem", color: "var(--copper)", fontWeight: 500,
          marginBottom: "1.5rem", letterSpacing: "0.02em", opacity: 0,
        }}>
          Mechatronics Engineering, University of Waterloo
        </p>

        <h1 ref={nameRef} style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "clamp(3.5rem, 9vw, 8rem)",
          fontWeight: 800, color: "var(--silk)",
          lineHeight: 0.92, letterSpacing: "-0.04em",
          marginBottom: "2.5rem", perspective: "600px",
        }}>
          <span className="word"><span className="word-inner">Ishaan</span></span>
          <br />
          <span className="word"><span className="word-inner">Aras</span></span>
        </h1>

        <div className="hero-sub" style={{ opacity: 0 }}>
          <div style={{
            width: "80px", height: "2px", background: "var(--copper)", marginBottom: "2rem",
          }} />
          <p style={{
            fontSize: "1.1rem", color: "var(--muted)", maxWidth: "440px",
            lineHeight: 1.7, fontWeight: 300,
          }}>
            Embedded systems, robotics, and edge AI. I take hardware from schematic to deployment.
          </p>
        </div>

        <div className="hero-cta" style={{
          display: "flex", gap: "1rem", flexWrap: "wrap",
          margin: "2.5rem 0 3.5rem", opacity: 0,
        }}>
          <MagneticButton href="#projects" style={{
            background: "var(--raspberry)", color: "#fff",
            padding: "0.75rem 1.75rem", borderRadius: "4px",
            fontWeight: 600, fontSize: "0.85rem",
            boxShadow: "0 0 30px var(--raspberry-glow)",
          }}>
            View projects
          </MagneticButton>
          <MagneticButton href="#contact" style={{
            border: "1px solid var(--border)", color: "var(--silk)",
            padding: "0.75rem 1.75rem", borderRadius: "4px",
            fontWeight: 500, fontSize: "0.85rem",
          }}>
            Get in touch
          </MagneticButton>
        </div>

        <div className="hero-stats" style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          {[
            { val: "3x", note: "OSHWA certified" },
            { val: "<100ms", note: "edge inference" },
            { val: "4", note: "builds shipped" },
          ].map(s => (
            <div key={s.note} style={{ opacity: 0 }}>
              <div style={{
                fontWeight: 700, fontSize: "1.5rem", color: "var(--copper)",
                lineHeight: 1.2, fontVariantNumeric: "tabular-nums",
              }}>{s.val}</div>
              <div style={{
                fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.25rem", fontWeight: 400,
              }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
