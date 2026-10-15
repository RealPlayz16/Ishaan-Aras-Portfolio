"use client";
import { kernelLog } from "../lib/content";

export default function KernelLog() {
  return (
    <section id="kernel-log" className="section">
      <div className="shell">
        <div className="rv">
          <div className="section-label">03 / dmesg</div>
          <h2 className="section-title">Kernel log</h2>
          <p className="section-note">
            Where the time has gone, in the order it happened.
          </p>
        </div>

        <div
          className="rv mono"
          style={{
            marginTop: "2.25rem",
            fontSize: "0.75rem",
            lineHeight: 1.8,
            borderLeft: "1px solid var(--line)",
            paddingLeft: "1.25rem",
          }}
        >
          {kernelLog.map((e, i) => (
            <div key={i} style={{ marginBottom: e.detail ? "1.25rem" : "0.35rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ color: "var(--silk-3)", flexShrink: 0 }}>
                  [{e.t.padStart(11, " ")}]
                </span>
                <span style={{ color: "var(--gold)", flexShrink: 0 }}>{e.subsys}:</span>
                <span style={{ color: e.level === "ok" ? "var(--silk)" : "var(--silk-2)", flex: 1, minWidth: "16ch" }}>
                  {e.msg}
                </span>
                {e.level === "ok" && (
                  <span style={{ color: "var(--act)", flexShrink: 0 }}>[&nbsp;&nbsp;OK&nbsp;&nbsp;]</span>
                )}
              </div>

              {e.detail && (
                <ul style={{ listStyle: "none", marginTop: "0.45rem", paddingLeft: "1rem" }}>
                  {e.detail.map(d => (
                    <li
                      key={d}
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "0.875rem",
                        color: "var(--silk-2)",
                        lineHeight: 1.65,
                        paddingLeft: "1rem",
                        position: "relative",
                        maxWidth: "62ch",
                      }}
                    >
                      <span
                        className="mono"
                        style={{ position: "absolute", left: 0, color: "var(--silk-3)" }}
                      >
                        /
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
