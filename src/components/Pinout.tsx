import { useRef, useState, useMemo, useEffect } from "react";
import {
  skillGroups, skillsInGroup, pinsInGroup, pins,
  projectsUsingSkill, groupColor, type Pin,
} from "../lib/content";
import { useActivePanel } from "../lib/useScroll";
import PinHeader from "./PinHeader";

export default function Pinout() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useActivePanel(ref, ".skill-panel", skillGroups.length);
  const [pinned, setPinned] = useState<Pin | null>(null);

  const group = skillGroups[active];

  // Scroll drives the board unless the reader has explicitly picked a pin.
  const lit = useMemo(() => {
    if (pinned) return new Set([pinned.n]);
    return new Set(pinsInGroup(group.name));
  }, [group.name, pinned]);

  // Moving to a new group clears a manual selection, so scrolling always
  // takes back control rather than leaving the board stuck.
  useEffect(() => { setPinned(null); }, [active]);

  return (
    <section id="pinout" className="section" ref={ref}>
      <div className="shell">
        <div className="rv">
          <div className="section-label">01 / pinout</div>
          <h2 className="section-title">Skills, mapped to the header</h2>
          <p className="section-note">
            A real Raspberry Pi 40-pin header. Power, ground and bus functions are accurate to the
            hardware. Scroll and the board lights up group by group. Pick a skill to see which
            builds used it.
          </p>
        </div>

        <div className="pinout-layout">
          {/* sticky board */}
          <div className="pinout-board">
            <PinHeader
              lit={lit}
              selected={pinned?.n ?? null}
              onSelect={n => {
                const p = pins.find(x => x.n === n) ?? null;
                setPinned(prev => (prev?.n === n ? null : p));
              }}
            />
            <div
              className="mono"
              style={{
                marginTop: "0.75rem", fontSize: "0.6rem",
                color: "var(--silk-3)", textAlign: "center",
              }}
            >
              {pinned
                ? `pin ${pinned.n} selected`
                : `${lit.size} pins energised · ${group.name.toLowerCase()}`}
            </div>
          </div>

          {/* scrolling group panels */}
          <div className="pinout-panels">
            {skillGroups.map((g, i) => (
              <article
                key={g.name}
                className={`skill-panel${i === active ? " active" : ""}`}
                style={{ ["--accent" as string]: g.color }}
              >
                <div className="mono skill-panel-index">
                  {String(i + 1).padStart(2, "0")} / {skillGroups.length}
                </div>

                <h3 className="skill-panel-title">{g.label}</h3>
                <div className="mono skill-panel-group">{g.name}</div>
                <p className="skill-panel-desc">{g.description}</p>

                <div className="skill-chips">
                  {skillsInGroup(g.name).map(p => (
                    <SkillChip
                      key={p.skill}
                      pin={p}
                      selected={pinned?.n === p.n}
                      onClick={() => setPinned(prev => (prev?.n === p.n ? null : p))}
                    />
                  ))}
                </div>

                {pinned && pinned.group === g.name && (
                  <SkillDetail pin={pinned} />
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillChip({
  pin, selected, onClick,
}: { pin: Pin; selected: boolean; onClick: () => void }) {
  const c = groupColor(pin.group!);
  const used = projectsUsingSkill(pin.skill!).length;

  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className="skill-chip"
      style={{
        borderColor: selected ? c : "var(--line-2)",
        background: selected ? c + "1F" : "transparent",
        color: selected ? "var(--silk)" : "var(--silk-2)",
      }}
    >
      <span className="mono skill-chip-pin" style={{ color: c }}>
        {String(pin.n).padStart(2, "0")}
      </span>
      {pin.skill}
      {used > 0 && (
        <span className="mono skill-chip-count" title={`${used} projects`}>
          {used}
        </span>
      )}
    </button>
  );
}

function SkillDetail({ pin }: { pin: Pin }) {
  const used = projectsUsingSkill(pin.skill!);
  const c = groupColor(pin.group!);

  return (
    <div className="skill-detail" style={{ borderLeftColor: c }}>
      <div className="mono skill-detail-head">
        <span style={{ color: c }}>pin {String(pin.n).padStart(2, "0")}</span>
        <span style={{ color: "var(--silk-3)" }}>{pin.fn}</span>
        {pin.bcm !== undefined && (
          <span style={{ color: "var(--silk-3)", marginLeft: "auto" }}>BCM {pin.bcm}</span>
        )}
      </div>

      <p className="skill-detail-body">{pin.detail}</p>

      {used.length > 0 ? (
        <div className="skill-detail-projects">
          <span className="mono skill-detail-label">used in</span>
          {used.map(p => (
            <a key={p.id} href={`#${p.id}`} className="mono project-link">
              {p.name}
              <span className="project-link-metric">{p.metric}</span>
            </a>
          ))}
        </div>
      ) : (
        <div className="mono skill-detail-label" style={{ marginTop: "0.75rem" }}>
          not yet used in a shipped build
        </div>
      )}
    </div>
  );
}
