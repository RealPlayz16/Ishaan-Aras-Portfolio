import { useState } from "react";
import { ArrowUpRight, Cpu, Radio, Zap } from "lucide-react";
import type { AppId } from "@/lib/portfolio";

export function BerryMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 44 50"
      fill="none"
      aria-hidden="true"
    >
      <path d="M22 12C9 13 9 3 10 2c8-1 12 4 12 10Z" fill="#98c965" />
      <path d="M22 12C35 13 35 3 34 2c-8-1-12 4-12 10Z" fill="#98c965" />
      <g fill="currentColor">
        <ellipse
          cx="14"
          cy="20"
          rx="7.5"
          ry="7"
          transform="rotate(-20 14 20)"
        />
        <ellipse cx="30" cy="20" rx="7.5" ry="7" transform="rotate(20 30 20)" />
        <ellipse cx="9" cy="31" rx="7" ry="7.5" transform="rotate(-15 9 31)" />
        <ellipse cx="22" cy="30" rx="7" ry="8" />
        <ellipse cx="35" cy="31" rx="7" ry="7.5" transform="rotate(15 35 31)" />
        <ellipse cx="15" cy="42" rx="7" ry="6.5" transform="rotate(30 15 42)" />
        <ellipse
          cx="29"
          cy="42"
          rx="7"
          ry="6.5"
          transform="rotate(-30 29 42)"
        />
      </g>
    </svg>
  );
}

const details = [
  {
    title: "Embedded systems",
    text: "From schematic to deployment.",
    icon: Cpu,
  },
  { title: "Computer vision", text: "Perception at the edge.", icon: Radio },
  {
    title: "Robotics & control",
    text: "Code that moves the real world.",
    icon: Zap,
  },
];

export default function BoardView({
  openApp,
}: {
  openApp: (id: AppId) => void;
}) {
  const [selected, setSelected] = useState(0);
  const Icon = details[selected].icon;
  return (
    <div className="board-visual">
      <div className="board-grid" />
      <div className="board-topline">
        <span>SMALL BOARD. BIG IDEAS.</span>
        <span className="board-led" />
      </div>
      <div className="pcb" aria-label="Interactive conceptual circuit board">
        <div className="pcb-screw s1" />
        <div className="pcb-screw s2" />
        <div className="pcb-screw s3" />
        <div className="pcb-screw s4" />
        <div className="gpio">
          <span>GPIO</span>
          {Array.from({ length: 20 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <div className="pcb-traces">
          <i />
          <i />
          <i />
          <i />
        </div>
        <button
          className={`chip main-chip ${selected === 0 ? "selected" : ""}`}
          onClick={() => setSelected(0)}
          aria-label="Explore embedded systems"
        >
          <Cpu size={30} />
          <span>ARM</span>
        </button>
        <button
          className={`chip vision-chip ${selected === 1 ? "selected" : ""}`}
          onClick={() => setSelected(1)}
          aria-label="Explore computer vision"
        >
          <Radio size={19} />
          <span>VISION</span>
        </button>
        <button
          className={`chip control-chip ${selected === 2 ? "selected" : ""}`}
          onClick={() => setSelected(2)}
          aria-label="Explore robotics and control"
        >
          <Zap size={17} />
        </button>
        <div className="pcb-brand">
          <BerryMark />
          <span>
            ishaan.dev
            <br />
            <small>rev. 01 / concept</small>
          </span>
        </div>
        <div className="pcb-port port-one" />
        <div className="pcb-port port-two" />
        <div className="pcb-port port-three" />
      </div>
      <p className="board-hint">Go on, click a chip.</p>
      <button className="board-caption" onClick={() => openApp("skills")}>
        <Icon size={19} />
        <span>
          <b>{details[selected].title}</b>
          <small>{details[selected].text}</small>
        </span>
        <ArrowUpRight size={17} />
      </button>
    </div>
  );
}
