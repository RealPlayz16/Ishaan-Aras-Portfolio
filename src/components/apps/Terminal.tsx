import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { commands, runCommand } from "@/lib/terminal";
import type { AppId } from "@/lib/portfolio";

type Entry = { command: string; output: string };
export default function Terminal({
  openApp,
  reboot,
}: {
  openApp: (id: AppId) => void;
  reboot: () => void;
}) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "instant",
    });
  }, [entries]);
  const submit = (value: string) => {
    const command = value.trim();
    if (!command) return;
    const result = runCommand(command);
    if (result.clear) setEntries([]);
    else
      setEntries(prev => [...prev, { command, output: result.output || "" }]);
    setHistory(prev => [command, ...prev]);
    setHistoryIndex(-1);
    setInput("");
    if (result.app) openApp(result.app);
    if (result.reboot) reboot();
  };
  return (
    <div className="terminal-app">
      <div className="terminal-toolbar">
        <span>
          <i className="status-dot" /> PORTFOLIO SHELL
        </span>
        <span>bash-inspired · browser simulation</span>
        <button
          title="Copy terminal output"
          aria-label="Copy terminal output"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(
                entries.map(e => `$ ${e.command}\n${e.output}`).join("\n\n")
              );
              setCopied(true);
              setCopyError(false);
              setTimeout(() => setCopied(false), 2000);
            } catch {
              setCopyError(true);
            }
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <div
        className="terminal-body"
        ref={bodyRef}
        onClick={() => {
          if (!window.getSelection()?.toString()) inputRef.current?.focus();
        }}
      >
        <div className="terminal-greeting">
          <pre>{`   ┌─ pi workspace ──────────────────────┐\n   │  A little hardware. A lot of ideas. │\n   └────────────────────────────────────┘`}</pre>
          <p>Portfolio Shell v1.0 — no actual shell commands are executed.</p>
          <p>
            Type <b>help</b> to explore, or take a shortcut below.
          </p>
        </div>
        {entries.map((entry, i) => (
          <div className="terminal-entry" key={i}>
            <div>
              <span className="terminal-user">ishaan@raspberrypi</span>
              <span className="terminal-path">:~ $ </span>
              {entry.command}
            </div>
            <pre>{entry.output}</pre>
          </div>
        ))}
        <form
          onSubmit={e => {
            e.preventDefault();
            submit(input);
          }}
          className="terminal-input-row"
        >
          <label htmlFor="shell-input">
            <span className="terminal-user">ishaan@raspberrypi</span>
            <span className="terminal-path">:~ $</span>
          </label>
          <input
            ref={inputRef}
            id="shell-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            aria-label="Terminal command"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="none"
            onKeyDown={e => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                const next = Math.min(historyIndex + 1, history.length - 1);
                setHistoryIndex(next);
                setInput(history[next] || "");
              }
              if (e.key === "ArrowDown") {
                e.preventDefault();
                const next = Math.max(-1, historyIndex - 1);
                setHistoryIndex(next);
                setInput(history[next] || "");
              }
              if (e.key === "Tab") {
                e.preventDefault();
                const matches = commands.filter(c =>
                  c.startsWith(input.toLowerCase())
                );
                if (matches.length === 1) setInput(matches[0]);
              }
            }}
          />
        </form>
        {copyError && (
          <p className="terminal-copy-error" role="status">
            Clipboard unavailable. Select terminal text to copy it manually.
          </p>
        )}
      </div>
      <div className="terminal-shortcuts">
        <span>TRY A COMMAND</span>
        {["help", "neofetch", "projects", "pinout", "dmesg", "post"].map(
          command => (
            <button key={command} onClick={() => submit(command)}>
              {command}
              <span>↵</span>
            </button>
          )
        )}
      </div>
    </div>
  );
}
