import { useRef } from "react";
import {
  projects, pinsForProject, pinBySkill, groupColor, type Project,
} from "../lib/content";
import { useStagger } from "../lib/useScroll";
import PinHeader from "./PinHeader";

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  useStagger(ref, ".project-panel");

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="shell">
        <div className="rv">
          <div className="section-label">02 / builds</div>
          <h2 className="section-title">Four things that had to work outside a lab</h2>
          <p className="section-note">
            Each one shipped to real hardware and had to keep running once nobody was watching it.
            The strip under each build shows the pins it lit up on the header.
          </p>
        </div>

        <div className="project-list">
          {projects.map((p, i) => (
            <ProjectPanel key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const litPins = new Set(pinsForProject(project));

  return (
    <article id={project.id} className="project-panel">
      {/* header */}
      <div className="project-head">
        <div className="mono project-index">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mono project-bus">
            <span>{project.bus}</span>
            <span className="project-category">{project.category}</span>
          </div>
          <h3 className="project-name">{project.name}</h3>
          <p className="project-tagline">{project.tagline}</p>
        </div>

        <div className="project-metric">
          <div className="mono project-metric-value">{project.metric}</div>
          <div className="mono project-metric-label">{project.metricLabel}</div>
        </div>
      </div>

      <div className="project-body">
        <div className="project-main">
          <p className="project-summary">{project.summary}</p>

          <ul className="project-lines">
            {project.lines.map(l => (
              <li key={l}>
                <span className="mono project-bullet">/</span>
                {l}
              </li>
            ))}
          </ul>
        </div>

        {/* the cross-reference back to the header */}
        <aside className="project-aside">
          <div className="mono project-aside-label">
            pins used
            <span className="project-aside-count">{litPins.size}</span>
          </div>

          <div className="project-pinstrip">
            <PinHeader lit={litPins} compact />
          </div>

          <div className="project-skills">
            {project.skills.map(s => {
              const pin = pinBySkill(s);
              if (!pin) return null;
              const c = groupColor(pin.group!);
              return (
                <a
                  key={s}
                  href="#pinout"
                  className="mono project-skill"
                  style={{ borderColor: c + "66", color: "var(--silk-2)" }}
                  title={`Pin ${pin.n}, ${pin.fn}`}
                >
                  <span style={{ color: c }}>{String(pin.n).padStart(2, "0")}</span>
                  {s}
                </a>
              );
            })}
          </div>
        </aside>
      </div>
    </article>
  );
}
