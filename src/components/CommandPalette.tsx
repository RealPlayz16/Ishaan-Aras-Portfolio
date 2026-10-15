import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { board } from "../lib/content";

interface Action {
  label: string;
  hint: string;
  group: string;
  run: () => void;
}

export default function CommandPalette({
  open, setOpen,
}: {
  open: boolean; setOpen: (v: boolean) => void;
}) {
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => { setOpen(false); setQ(""); setI(0); }, [setOpen]);

  const go = useCallback((id: string) => {
    close();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [close]);

  const actions: Action[] = useMemo(() => [
    { label: "Power on", hint: "top of board", group: "navigate", run: () => go("power-on") },
    { label: "Pinout", hint: "skills on the header", group: "navigate", run: () => go("pinout") },
    { label: "Kernel log", hint: "experience", group: "navigate", run: () => go("kernel-log") },
    { label: "Builds", hint: "four projects", group: "navigate", run: () => go("projects") },
    { label: "Shell", hint: "terminal", group: "navigate", run: () => go("shell") },
    { label: "Contact", hint: "get in touch", group: "navigate", run: () => go("contact") },
    {
      label: "Copy email", hint: board.email, group: "actions",
      run: () => {
        navigator.clipboard?.writeText(board.email).catch(() => {});
        close();
      },
    },
    {
      label: "Send email", hint: "opens mail client", group: "actions",
      run: () => { window.location.href = `mailto:${board.email}`; close(); },
    },
    {
      label: "Open LinkedIn", hint: "new tab", group: "actions",
      run: () => { window.open(board.linkedin, "_blank", "noopener"); close(); },
    },
    {
      label: "Open a shell", hint: "jump to terminal and focus it", group: "actions",
      run: () => {
        close();
        const sec = document.getElementById("shell");
        sec?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => {
          sec?.querySelector<HTMLInputElement>('input[aria-label="Terminal input"]')?.focus();
        }, 650);
      },
    },
  ], [go, close]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return actions;
    return actions.filter(
      a => a.label.toLowerCase().includes(needle) || a.hint.toLowerCase().includes(needle)
    );
  }, [q, actions]);

  // Global shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen, close]);

  useEffect(() => {
    if (open) {
      setI(0);
      // focus after the scrim paints
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => { setI(0); }, [q]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setI(v => Math.min(v + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setI(v => Math.max(v - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[i]?.run();
    }
  };

  let lastGroup = "";

  return (
    <div
      className="palette-scrim"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="palette" onClick={e => e.stopPropagation()}>
        <div
          style={{
            display: "flex", alignItems: "center", gap: "0.65rem",
            padding: "0.8rem 1rem", borderBottom: "1px solid var(--line)",
          }}
        >
          <span className="mono" style={{ color: "var(--act)", fontSize: "0.8rem" }}>$</span>
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="jump to a section, or run something"
            aria-label="Search commands"
            spellCheck={false}
            className="mono"
            style={{ flex: 1, fontSize: "0.82rem", color: "var(--silk)" }}
          />
          <kbd
            className="mono"
            style={{
              fontSize: "0.6rem", color: "var(--silk-3)",
              border: "1px solid var(--line-2)", borderRadius: "2px", padding: "0.1rem 0.3rem",
            }}
          >
            esc
          </kbd>
        </div>

        <div ref={listRef} style={{ maxHeight: "48vh", overflowY: "auto", padding: "0.4rem" }}>
          {results.length === 0 && (
            <div
              className="mono"
              style={{ padding: "1.5rem 0.75rem", fontSize: "0.75rem", color: "var(--silk-3)" }}
            >
              no matches
            </div>
          )}

          {results.map((a, idx) => {
            const showGroup = a.group !== lastGroup;
            lastGroup = a.group;
            const active = idx === i;
            return (
              <div key={a.label}>
                {showGroup && (
                  <div
                    className="mono"
                    style={{
                      fontSize: "0.58rem", color: "var(--silk-3)",
                      padding: "0.6rem 0.65rem 0.3rem",
                    }}
                  >
                    {a.group}
                  </div>
                )}
                <button
                  onClick={a.run}
                  onMouseEnter={() => setI(idx)}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    width: "100%", textAlign: "left",
                    padding: "0.5rem 0.65rem", borderRadius: "3px",
                    background: active ? "var(--board-3)" : "transparent",
                    transition: "background 0.1s ease",
                  }}
                >
                  <span
                    style={{
                      width: "3px", height: "14px", borderRadius: "1px",
                      background: active ? "var(--act)" : "transparent",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: "0.85rem", color: "var(--silk)" }}>{a.label}</span>
                  <span
                    className="mono"
                    style={{
                      marginLeft: "auto", fontSize: "0.65rem",
                      color: "var(--silk-3)", textAlign: "right",
                    }}
                  >
                    {a.hint}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div
          className="mono"
          style={{
            display: "flex", gap: "1rem",
            padding: "0.55rem 1rem", borderTop: "1px solid var(--line)",
            fontSize: "0.6rem", color: "var(--silk-3)",
          }}
        >
          <span>↑↓ move</span>
          <span>↵ run</span>
          <span style={{ marginLeft: "auto" }}>{results.length} result{results.length === 1 ? "" : "s"}</span>
        </div>
      </div>
    </div>
  );
}
