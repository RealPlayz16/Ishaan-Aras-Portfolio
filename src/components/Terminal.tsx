import { useState, useRef, useEffect, useCallback } from "react";
import { board, specs, projects, pins, kernelLog, postResults } from "../lib/content";

type Line = { kind: "in" | "out" | "ok" | "err" | "dim"; text: string };

const PI_ASCII = [
  "    .~~.   .~~.  ",
  "   '. \\ ' ' / .'  ",
  "    .~ .~~~..~.   ",
  "   : .~.'~'.~. :  ",
  "  ~ (   ) (   ) ~ ",
  " ( : '~'.~.'~' : )",
  "  ~ .~ (   ) ~. ~ ",
  "   (  : '~' :  )  ",
  "    '~ .~~~. ~'   ",
  "        '~'       ",
];

const BANNER: Line[] = [
  { kind: "dim", text: "Linux ishaan 6.6.0-rpi #1 SMP aarch64" },
  { kind: "dim", text: "" },
  { kind: "out", text: "Type `help` for commands. `neofetch` is a good start." },
  { kind: "dim", text: "" },
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mounted = useRef(false);

  // Keep the view pinned to the newest output, but never steal the page
  // scroll on first paint.
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const push = useCallback((ls: Line[]) => setLines(prev => [...prev, ...ls]), []);

  const run = useCallback((raw: string) => {
    const input = raw.trim();
    push([{ kind: "in", text: input }]);
    if (!input) return;

    setHistory(h => [input, ...h]);
    setHIndex(-1);

    const [cmd, ...rest] = input.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();

    switch (cmd.toLowerCase()) {
      case "help":
        push([
          { kind: "out", text: "available commands" },
          { kind: "dim", text: "" },
          ...[
            ["neofetch", "board summary"],
            ["whoami", "who is running this"],
            ["ls", "list the builds"],
            ["cat <name>", "read a build in full"],
            ["skills", "everything on the GPIO header"],
            ["gpio readall", "dump the 40-pin header"],
            ["dmesg", "kernel log (experience)"],
            ["post", "self-test results"],
            ["uptime", "how long this has been running"],
            ["contact", "how to reach me"],
            ["clear", "clear the screen"],
          ].map(([c, d]) => ({
            kind: "out" as const,
            text: `  ${c.padEnd(14)} ${d}`,
          })),
        ]);
        break;

      case "neofetch": {
        const info = [
          `${board.name.toLowerCase().replace(" ", "")}@uwaterloo`,
          "─────────────────────",
          ...specs.map(s => `${s.label}: ${s.value}`),
        ];
        const rows = Math.max(PI_ASCII.length, info.length);
        const out: Line[] = [];
        for (let i = 0; i < rows; i++) {
          const art = (PI_ASCII[i] ?? "").padEnd(20);
          out.push({ kind: i < 2 ? "ok" : "out", text: `${art}  ${info[i] ?? ""}` });
        }
        push([...out, { kind: "dim", text: "" }]);
        break;
      }

      case "whoami":
        push([
          { kind: "out", text: "ishaan" },
          { kind: "dim", text: `${board.model}, rev ${board.revision}` },
        ]);
        break;

      case "ls":
      case "lsusb":
        push([
          ...projects.map(p => ({
            kind: "out" as const,
            text: `${p.bus}: ${p.name}  ·  ${p.metric} ${p.metricLabel}`,
          })),
          { kind: "dim", text: "" },
          { kind: "dim", text: "use `cat <name>` for detail, e.g. cat krushi" },
        ]);
        break;

      case "cat": {
        if (!arg) { push([{ kind: "err", text: "cat: missing operand" }]); break; }
        const p = projects.find(
          x => x.id.includes(arg) || x.name.toLowerCase().includes(arg)
        );
        if (!p) {
          push([
            { kind: "err", text: `cat: ${arg}: No such build` },
            { kind: "dim", text: "try `ls` to see the builds" },
          ]);
          break;
        }
        push([
          { kind: "ok", text: p.name },
          { kind: "dim", text: p.tagline },
          { kind: "dim", text: `${p.bus}  ·  ${p.metric} ${p.metricLabel}` },
          { kind: "dim", text: "" },
          { kind: "out", text: p.summary },
          { kind: "dim", text: "" },
          ...p.lines.map(l => ({ kind: "out" as const, text: `  / ${l}` })),
          { kind: "dim", text: "" },
          { kind: "dim", text: "skills: " + p.skills.join(", ") },
        ]);
        break;
      }

      case "skills": {
        const byGroup = new Map<string, string[]>();
        pins.forEach(p => {
          if (!p.skill || !p.group) return;
          byGroup.set(p.group, [...(byGroup.get(p.group) ?? []), p.skill]);
        });
        const out: Line[] = [];
        byGroup.forEach((v, k) => {
          out.push({ kind: "ok", text: k });
          out.push({ kind: "out", text: "  " + v.join(", ") });
          out.push({ kind: "dim", text: "" });
        });
        push(out);
        break;
      }

      case "gpio":
        if (arg === "readall" || arg === "") {
          push([
            { kind: "dim", text: " +-----+------------------+------+" },
            { kind: "dim", text: " | Pin | Function         | BCM  |" },
            { kind: "dim", text: " +-----+------------------+------+" },
            ...pins.map(p => ({
              kind: (p.skill ? "out" : "dim") as Line["kind"],
              text: ` | ${String(p.n).padStart(3)} | ${(p.skill ?? p.fn).slice(0, 16).padEnd(16)} | ${(p.bcm !== undefined ? String(p.bcm) : "-").padStart(4)} |`,
            })),
            { kind: "dim", text: " +-----+------------------+------+" },
          ]);
        } else {
          push([{ kind: "err", text: `gpio: unknown subcommand '${arg}'` }]);
        }
        break;

      case "dmesg":
        push(
          kernelLog.flatMap(e => [
            {
              kind: (e.level === "ok" ? "ok" : "out") as Line["kind"],
              text: `[${e.t.padStart(11)}] ${e.subsys}: ${e.msg}`,
            },
            ...(e.detail ?? []).map(d => ({ kind: "dim" as const, text: `                  ${d}` })),
          ])
        );
        break;

      case "post":
        push([
          ...postResults.map(r => ({
            kind: "ok" as const,
            text: `  [PASS]  ${r.test.padEnd(32)} ${r.result}`,
          })),
          { kind: "dim", text: "" },
          { kind: "ok", text: "POST: all tests passed" },
        ]);
        break;

      case "uptime":
        push([
          { kind: "out", text: "up 4 builds, 3 certifications, 0 unresolved bugs" },
          { kind: "dim", text: "load average: shipping, shipping, shipping" },
        ]);
        break;

      case "contact":
      case "email":
        push([
          { kind: "ok", text: board.email },
          { kind: "out", text: board.linkedin },
          { kind: "dim", text: "" },
          { kind: "dim", text: `${board.availability}, accepting interrupts` },
        ]);
        break;

      case "clear":
        setLines([]);
        break;

      case "sudo":
        push([
          { kind: "err", text: "ishaan is not in the sudoers file." },
          { kind: "dim", text: "This incident has been reported." },
        ]);
        break;

      case "exit":
      case "logout":
        push([{ kind: "dim", text: "There is no exit. Scroll instead." }]);
        break;

      case "rm":
        push([{ kind: "err", text: "rm: permission denied (read-only board)" }]);
        break;

      default:
        push([
          { kind: "err", text: `${cmd}: command not found` },
          { kind: "dim", text: "type `help`" },
        ]);
    }
  }, [push]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIndex + 1, history.length - 1);
      if (next >= 0) { setHIndex(next); setValue(history[next]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIndex - 1;
      setHIndex(next);
      setValue(next >= 0 ? history[next] : "");
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setLines([]);
    }
  };

  const color = (k: Line["kind"]) =>
    k === "ok" ? "var(--act)"
    : k === "err" ? "var(--raspberry-2)"
    : k === "dim" ? "var(--silk-3)"
    : "var(--silk-2)";

  return (
    <section id="shell" className="section">
      <div className="shell">
        <div className="rv">
          <div className="section-label">04 / shell</div>
          <h2 className="section-title">Open a shell</h2>
          <p className="section-note">
            This one actually works. Every command reads from the same data as the rest of the page.
            Start with <code className="mono" style={{ color: "var(--act)" }}>neofetch</code>, or{" "}
            <code className="mono" style={{ color: "var(--act)" }}>help</code> for the full list.
          </p>
        </div>

        <div
          className="rv term-frame"
          style={{
            marginTop: "2rem",
            border: "1px solid var(--line-2)",
            borderRadius: "5px",
            overflow: "hidden",
            background: "var(--board-2)",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          {/* title bar */}
          <div
            className="mono"
            style={{
              display: "flex", alignItems: "center", gap: "0.6rem",
              padding: "0.5rem 0.8rem",
              borderBottom: "1px solid var(--line)",
              background: "var(--board)",
              fontSize: "0.65rem", color: "var(--silk-3)",
            }}
          >
            <span className="led" />
            <span>ishaan@uwaterloo: ~</span>
            <span style={{ marginLeft: "auto" }}>ssh · 115200 8N1</span>
          </div>

          {/* output */}
          <div
            ref={bodyRef}
            onClick={() => inputRef.current?.focus()}
            className="mono"
            style={{
              height: "clamp(300px, 46vh, 460px)",
              overflowY: "auto",
              padding: "0.9rem 1rem",
              fontSize: "0.73rem",
              lineHeight: 1.75,
              cursor: "text",
            }}
          >
            {lines.map((l, i) => (
              <div key={i} style={{ color: color(l.kind), whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {l.kind === "in" ? (
                  <>
                    <span style={{ color: "var(--act)" }}>ishaan@uwaterloo</span>
                    <span style={{ color: "var(--silk-3)" }}>:~$ </span>
                    <span style={{ color: "var(--silk)" }}>{l.text}</span>
                  </>
                ) : l.text || " "}
              </div>
            ))}

            {/* live prompt */}
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ color: "var(--act)" }}>ishaan@uwaterloo</span>
              <span style={{ color: "var(--silk-3)" }}>:~$&nbsp;</span>
              <input
                ref={inputRef}
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Terminal input"
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                className="term-input"
                style={{
                  flex: 1, minWidth: "8ch",
                  fontFamily: "var(--mono)", fontSize: "0.73rem",
                  color: "var(--silk)", caretColor: "var(--act)",
                }}
              />
            </div>
          </div>

          {/* hint rail */}
          <div
            className="mono"
            style={{
              display: "flex", gap: "0.4rem", flexWrap: "wrap",
              padding: "0.6rem 0.8rem",
              borderTop: "1px solid var(--line)",
              background: "var(--board)",
            }}
          >
            {["neofetch", "ls", "skills", "dmesg", "post", "contact"].map(c => (
              <button
                key={c}
                onClick={() => { run(c); inputRef.current?.focus(); }}
                style={{
                  fontSize: "0.63rem", padding: "0.2rem 0.5rem",
                  border: "1px solid var(--line-2)", borderRadius: "2px",
                  color: "var(--silk-3)", transition: "all 0.15s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "var(--act)";
                  e.currentTarget.style.borderColor = "var(--act)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "var(--silk-3)";
                  e.currentTarget.style.borderColor = "var(--line-2)";
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
