import { useRef } from "react";
import { kernelLog } from "../lib/content";
import { useStagger } from "../lib/useScroll";

export default function KernelLog() {
  const ref = useRef<HTMLDivElement>(null);
  useStagger(ref, ".log-entry");

  return (
    <section id="kernel-log" className="section" ref={ref}>
      <div className="shell">
        <div className="rv">
          <div className="section-label">03 / dmesg</div>
          <h2 className="section-title">Kernel log</h2>
          <p className="section-note">
            Where the time has gone, in the order it happened.
          </p>
        </div>

        <div className="mono log-stream">
          {kernelLog.map((e, i) => (
            <div key={i} className="log-entry">
              <div className="log-line">
                <span className="log-time">[{e.t.padStart(11, " ")}]</span>
                <span className="log-subsys">{e.subsys}:</span>
                <span className={`log-msg${e.level === "ok" ? " ok" : ""}`}>{e.msg}</span>
                {e.level === "ok" && <span className="log-ok">[&nbsp;&nbsp;OK&nbsp;&nbsp;]</span>}
              </div>

              {e.detail && (
                <ul className="log-detail">
                  {e.detail.map(d => (
                    <li key={d}>
                      <span className="mono log-bullet">/</span>
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
