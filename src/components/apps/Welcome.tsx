import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  FolderOpen,
  GraduationCap,
} from "lucide-react";
import BoardView from "../desktop/BoardView";
import type { AppId } from "@/lib/portfolio";

export default function Welcome({ openApp }: { openApp: (id: AppId) => void }) {
  return (
    <div className="welcome-content">
      <div className="welcome-path">
        <span>~/</span> welcome.md{" "}
        <span className="path-right">README · A little introduction</span>
      </div>
      <div className="welcome-hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="tiny-square" /> HELLO, WORLD.
          </div>
          <h1>
            Ishaan
            <br />
            Aras<span>.</span>
          </h1>
          <p className="hero-description">
            I make software meet
            <br />
            the physical world.
          </p>
          <p className="hero-detail">
            Mechatronics engineer. Hardware tinkerer.{" "}
            <br />
            Building at the intersection of robotics & edge AI.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => openApp("projects")}>
              Explore my projects <ArrowUpRight size={17} />
            </button>
            <button className="text-btn" onClick={() => openApp("contact")}>
              Say hello <ArrowRight size={16} />
            </button>
          </div>
          <div className="availability">
            <span className="status-dot" /> Open to W2027 co-op opportunities
          </div>
        </div>
        <BoardView openApp={openApp} />
      </div>
      <div className="welcome-metrics">
        <div>
          <strong>04</strong>
          <span>builds shipped</span>
        </div>
        <div>
          <strong>3×</strong>
          <span>OSHWA certified</span>
        </div>
        <div>
          <strong>
            &lt;100<span>ms</span>
          </strong>
          <span>edge inference</span>
        </div>
        <div className="metric-school">
          <GraduationCap size={23} />
          <span>
            University
            <br />
            <b>of Waterloo</b>
          </span>
        </div>
      </div>
      <div className="welcome-quick">
        <button onClick={() => openApp("about")}>
          <span className="quick-icon">
            <GraduationCap size={17} />
          </span>
          <span>A bit about me</span>
          <ArrowUpRight size={14} />
        </button>
        <button onClick={() => openApp("skills")}>
          <span className="quick-icon">
            <Code2 size={17} />
          </span>
          <span>My toolkit</span>
          <ArrowUpRight size={14} />
        </button>
        <button onClick={() => openApp("terminal")}>
          <span className="quick-icon">
            <FolderOpen size={17} />
          </span>
          <span>Prefer the terminal?</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}
