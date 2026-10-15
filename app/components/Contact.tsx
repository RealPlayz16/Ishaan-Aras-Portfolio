"use client";
import { useState } from "react";
import { board, postResults } from "../lib/content";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(board.email)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {});
  };

  return (
    <section id="contact" className="section" style={{ paddingBottom: "6rem" }}>
      <div className="shell">
        {/* POST results — recognition framed as a self-test */}
        <div className="rv">
          <div className="section-label">06 / post</div>
          <h2 className="section-title">Self-test</h2>
          <div
            className="mono"
            style={{
              marginTop: "1.5rem",
              fontSize: "0.75rem",
              lineHeight: 2,
              borderLeft: "1px solid var(--line)",
              paddingLeft: "1.25rem",
              marginBottom: "4.5rem",
            }}
          >
            {postResults.map(r => (
              <div key={r.test} style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
                <span style={{ color: "var(--act)", flexShrink: 0 }}>[PASS]</span>
                <span style={{ color: "var(--silk-2)", flex: 1, minWidth: "20ch" }}>{r.test}</span>
                <span style={{ color: "var(--silk)", flexShrink: 0 }}>{r.result}</span>
              </div>
            ))}
            <div style={{ color: "var(--act)", marginTop: "0.6rem" }}>
              POST: all tests passed
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="rv">
          <div className="section-label">07 / interrupt</div>
          <h2 className="section-title">Send an interrupt</h2>
          <p className="section-note" style={{ marginTop: "0.75rem" }}>
            {board.availability} is open and I am looking for embedded systems, robotics, and
            hardware roles. The board is idle and listening.
          </p>

          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "2rem" }}>
            <a
              href={`mailto:${board.email}`}
              className="mono"
              style={{
                background: "var(--raspberry)",
                color: "#fff",
                padding: "0.6rem 1.15rem",
                borderRadius: "3px",
                fontSize: "0.78rem",
                fontWeight: 500,
                transition: "background 0.18s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--raspberry-2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--raspberry)")}
            >
              {board.email}
            </a>

            <button
              onClick={copy}
              className="mono"
              style={{
                border: "1px solid var(--line-2)",
                color: copied ? "var(--act)" : "var(--silk)",
                borderColor: copied ? "var(--act)" : "var(--line-2)",
                padding: "0.6rem 1.15rem",
                borderRadius: "3px",
                fontSize: "0.78rem",
                transition: "all 0.18s ease",
              }}
            >
              {copied ? "copied" : "copy address"}
            </button>

            <a
              href={board.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mono"
              style={{
                border: "1px solid var(--line-2)",
                color: "var(--silk)",
                padding: "0.6rem 1.15rem",
                borderRadius: "3px",
                fontSize: "0.78rem",
                transition: "border-color 0.18s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--line-2)")}
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* footer */}
        <footer
          className="mono"
          style={{
            marginTop: "6rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--line)",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            fontSize: "0.65rem",
            color: "var(--silk-3)",
          }}
        >
          <span>{board.name} · rev {board.revision}</span>
          <span>·</span>
          <span>built with Next.js, no UI kit</span>
          <span style={{ marginLeft: "auto" }}>halt</span>
        </footer>
      </div>
    </section>
  );
}
