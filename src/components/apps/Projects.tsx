import { useState } from "react";
import {
  Search,
  ArrowUpRight,
  ArrowLeft,
  Bot,
  Eye,
  Hand,
  Recycle,
  FolderOpen,
  ChevronRight,
  Check,
  ExternalLink,
} from "lucide-react";
import { projects, type AppId } from "@/lib/portfolio";

const projectIcons = { robot: Bot, eye: Eye, hand: Hand, recycle: Recycle };
export default function Projects({
  openApp,
}: {
  openApp: (id: AppId) => void;
}) {
  const [filter, setFilter] = useState("All projects");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const project = projects.find(p => p.id === selected);
  const filtered = projects.filter(
    p =>
      (filter === "All projects" ||
        p.category === filter ||
        (filter === "Raspberry Pi" &&
          p.tags.some(t => t.includes("Raspberry")))) &&
      `${p.name} ${p.description} ${p.tags.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );
  if (project) {
    const Icon = projectIcons[project.symbol as keyof typeof projectIcons];
    return (
      <div className="project-detail">
        <div className="explorer-toolbar">
          <button className="back-btn" onClick={() => setSelected(null)}>
            <ArrowLeft size={16} /> All projects
          </button>
          <span>
            projects <ChevronRight size={13} /> {project.name}
          </span>
        </div>
        <div className={`detail-art ${project.color}`}>
          <div className="art-grid" />
          <Icon size={84} strokeWidth={1.2} />
          <span className="art-coordinate">
            PROJECT / 0{projects.indexOf(project) + 1}
          </span>
          <span className="art-detail">
            {project.category.toUpperCase()} · CONCEPT VISUAL
          </span>
        </div>
        <div className="detail-copy">
          <div className="detail-heading">
            <div>
              <span className="section-label">
                {project.category.toUpperCase()}
              </span>
              <h2>{project.name}</h2>
            </div>
            <div className="project-metric">
              <b>{project.metric}</b>
              <small>{project.metricLabel}</small>
            </div>
          </div>
          <p className="detail-description">{project.description}</p>
          <div className="project-tags">
            {project.tags.map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <h3>Under the hood</h3>
          <div className="project-highlights">
            {project.highlights.map(h => (
              <p key={h}>
                <Check size={15} />
                {h}
              </p>
            ))}
          </div>
          <div className="detail-actions">
            <button className="primary-btn" onClick={() => openApp("contact")}>
              Let’s talk about this build <ArrowUpRight size={16} />
            </button>
          </div>
          <p className="source-note">
            Illustration is conceptual. Source repository not yet published.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="projects-app">
      <div className="app-page-header">
        <div className="eyebrow">/HOME/ISHAAN/PROJECTS</div>
        <h2>
          Ideas, made real<span>.</span>
        </h2>
        <p>Four builds at the intersection of code, circuits, and curiosity.</p>
      </div>
      <div className="project-filters">
        <div role="group" aria-label="Filter projects">
          {["All projects", "Robotics", "Edge AI", "Raspberry Pi"].map(f => (
            <button
              key={f}
              className={filter === f ? "selected" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <label className="project-search">
          <Search size={15} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Find a project…"
            aria-label="Search projects"
          />
        </label>
      </div>
      <div className="project-grid">
        {filtered.map(p => {
          const Icon = projectIcons[p.symbol as keyof typeof projectIcons];
          return (
            <button
              className="project-card"
              key={p.id}
              onClick={() => setSelected(p.id)}
            >
              <div className={`project-art ${p.color}`}>
                <div className="art-grid" />
                <Icon size={60} strokeWidth={1.2} />
                <span className="art-coordinate">
                  0{projects.indexOf(p) + 1} / {p.category.toUpperCase()}
                </span>
                <ArrowUpRight className="project-art-arrow" size={17} />
              </div>
              <div className="project-card-copy">
                <h3>
                  {p.name}
                  <ArrowUpRight size={17} />
                </h3>
                <p>{p.short}</p>
                <div className="project-tags">
                  {p.tags.slice(0, 3).map(t => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <FolderOpen size={36} />
          <h3>No projects found</h3>
          <p>Try another search or explore all four builds.</p>
          <button
            className="primary-btn"
            onClick={() => {
              setSearch("");
              setFilter("All projects");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
      <div className="project-count">
        <FolderOpen size={14} />
        {filtered.length} of 4 projects{" "}
        <span>Built with purpose, not just for the demo.</span>
      </div>
    </div>
  );
}
