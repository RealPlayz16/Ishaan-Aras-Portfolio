import { useState } from "react";
import {
  ArrowRight,
  Award,
  Braces,
  Cpu,
  Eye,
  Layers3,
  CircuitBoard,
  Wrench,
  GraduationCap,
  MapPin,
  FolderOpen,
  Briefcase,
  Check,
} from "lucide-react";
import { pipeline, skillGroups, type AppId } from "@/lib/portfolio";
import { experience } from "@/lib/hardware";
import Pinout from "./Pinout";

export function About({ openApp }: { openApp: (id: AppId) => void }) {
  const [tab, setTab] = useState("Overview");
  return (
    <div className="profile-app">
      <div className="app-page-header">
        <div className="eyebrow">THE PERSON BEHIND THE PCB</div>
        <h2>
          A curious mind.
          <br />A hands-on approach.
        </h2>
        <p>Hi, I’m Ishaan. I take hardware from schematic to deployment.</p>
      </div>
      <div className="tabs" role="tablist" aria-label="About sections">
        {["Overview", "Kernel log", "My pipeline"].map(t => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            className={tab === t ? "selected" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "Overview" && (
        <div className="about-overview">
          <div className="about-main">
            <h3>Engineering beyond the screen.</h3>
            <p>
              I’m studying Mechatronics Engineering at the University of
              Waterloo, in co-op stream 4 and my 1A term. I work across embedded
              systems, robotics, and edge AI.
            </p>
            <p>
              As an Embedded Systems Intern at Fostride, I work on smart waste
              sorting, ESP32 sensor firmware, and an industrial conveyor sorting
              line. On the UW Formula Electric tractive and electrical subteam,
              I help connect electrical analysis with practical hardware.
            </p>
            <p>
              Whether it’s a robot navigating a farm or a system keeping a
              driver alert, I build with the real world in mind.
            </p>
            <button className="primary-btn" onClick={() => openApp("projects")}>
              See what I’ve built <ArrowRight size={16} />
            </button>
          </div>
          <aside className="profile-facts">
            <div>
              <GraduationCap />
              <span>
                <small>EDUCATION</small>University of Waterloo
                <br />
                <b>Mechatronics · stream 4 · 1A</b>
              </span>
            </div>
            <div>
              <Briefcase />
              <span>
                <small>CURRENT ROLE</small>Embedded Systems Intern
                <br />
                <b>Fostride</b>
              </span>
            </div>
            <div>
              <MapPin />
              <span>
                <small>TEAM</small>UW Formula Electric
                <br />
                <b>Tractive & Electrical</b>
              </span>
            </div>
            <div>
              <Award />
              <span>
                <small>RECOGNITION</small>3× OSHWA certified
                <br />
                <b>Smart India Hackathon finalist</b>
              </span>
            </div>
          </aside>
        </div>
      )}
      {tab === "Kernel log" && (
        <div className="experience-body">
          <span className="section-label">DMESG / THE ENGINEERING JOURNEY</span>
          <h3>Where the time has gone.</h3>
          <p>
            Experience and milestones, in the order they appear in the updated
            portfolio.
          </p>
          {experience.map(item => (
            <div className="experience-row" key={item.driver}>
              <span>[{item.time}]</span>
              <div>
                <div className="experience-title">
                  <h4>{item.title}</h4>
                  <span>
                    <Check size={12} /> OK
                  </span>
                </div>
                <span className="experience-driver">
                  {item.driver}: {item.subtitle}
                </span>
                <ul>
                  {item.details.map(d => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="info-callout">
            <span className="status-dot" /> Co-op slot open for W2027. Accepting
            interrupts in embedded systems, robotics, and hardware engineering.
          </div>
          <small className="source-note">
            Adapted from the updated original portfolio. Kernel timestamps are a
            visual metaphor, not employment dates.
          </small>
        </div>
      )}
      {tab === "My pipeline" && (
        <div className="pipeline-body">
          <p className="pipeline-intro">
            Every build is a conversation between hardware and software.
          </p>
          {pipeline.map((p, i) => (
            <div className="pipeline-row" key={p.title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
              <ArrowRight size={21} />
            </div>
          ))}
          <button className="text-btn" onClick={() => openApp("projects")}>
            See the process in practice <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

const categoryIcons = [Braces, Cpu, Eye, Layers3, CircuitBoard, Wrench];
export function Skills({ openApp }: { openApp: (id: AppId) => void }) {
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState("GPIO pinout");
  const group = skillGroups[selected];
  const Icon = categoryIcons[selected];
  return (
    <div className="skills-app">
      <div className="app-page-header">
        <div className="eyebrow">HARDWARE / SOFTWARE / EVERYTHING BETWEEN</div>
        <h2>
          Skills, wired in<span>.</span>
        </h2>
        <p>A real 40-pin header. A toolkit that spans hardware and software.</p>
      </div>
      <div className="tabs" role="tablist" aria-label="Skill explorer view">
        {["GPIO pinout", "Toolkit"].map(t => (
          <button
            key={t}
            role="tab"
            aria-selected={view === t}
            className={view === t ? "selected" : ""}
            onClick={() => setView(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {view === "GPIO pinout" ? (
        <Pinout openApp={openApp} />
      ) : (
        <>
          <div className="skills-layout">
            <nav aria-label="Skill categories" className="skills-categories">
              {skillGroups.map((g, i) => {
                const CategoryIcon = categoryIcons[i];
                return (
                  <button
                    key={g.name}
                    className={selected === i ? "selected" : ""}
                    onClick={() => setSelected(i)}
                  >
                    <CategoryIcon size={17} />
                    <span>{g.name}</span>
                    <span className="count">{g.items.length}</span>
                  </button>
                );
              })}
            </nav>
            <div className="skills-detail">
              <div className="skill-category-icon">
                <Icon size={31} />
              </div>
              <span className="section-label">{group.name.toUpperCase()}</span>
              <h3>{group.label}</h3>
              <p>{group.description}</p>
              <div className="skill-items">
                {group.items.map((item, i) => (
                  <div key={item}>
                    <span>0{i + 1}</span>
                    <b>{item}</b>
                    <span className="status-dot" />
                  </div>
                ))}
              </div>
              <button className="text-btn" onClick={() => openApp("projects")}>
                <FolderOpen size={16} /> See these tools in action{" "}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="skills-footer">
            <Cpu size={17} />
            <span>
              24 tools across 6 disciplines. Always learning the next one.
            </span>
          </div>
        </>
      )}
    </div>
  );
}
