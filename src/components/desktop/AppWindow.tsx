import { useRef, type ReactNode } from "react";
import { Minus, X, Maximize2, Minimize2 } from "lucide-react";
import { apps, type AppId } from "@/lib/portfolio";
import { clampWindowPosition } from "@/lib/windowGeometry";

export type WindowState = {
  id: AppId;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};
type Props = {
  state: WindowState;
  active: boolean;
  children: ReactNode;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (x: number, y: number) => void;
};

export default function AppWindow({
  state,
  active,
  children,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
}: Props) {
  const app = apps.find(a => a.id === state.id)!;
  const drag = useRef<{
    x: number;
    y: number;
    startX: number;
    startY: number;
  } | null>(null);
  const Icon = app.icon;
  return (
    <section
      className={`app-window ${state.id}-window ${active ? "active" : ""} ${state.maximized ? "maximized" : ""}`}
      style={{
        left: state.x,
        top: state.y,
        zIndex: state.z,
        display: state.minimized ? "none" : undefined,
      }}
      aria-label={`${app.title} application`}
      onPointerDown={onFocus}
      onFocusCapture={onFocus}
    >
      <header
        className="window-titlebar"
        onDoubleClick={onMaximize}
        onPointerDown={e => {
          if (
            (e.target as HTMLElement).closest("button") ||
            state.maximized ||
            window.innerWidth < 760
          )
            return;
          onFocus();
          drag.current = {
            x: e.clientX,
            y: e.clientY,
            startX: state.x,
            startY: state.y,
          };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={e => {
          if (!drag.current) return;
          const position = clampWindowPosition(
            drag.current.startX + e.clientX - drag.current.x,
            drag.current.startY + e.clientY - drag.current.y,
            window.innerWidth,
            window.innerHeight
          );
          onMove(position.x, position.y);
        }}
        onPointerUp={e => {
          drag.current = null;
          if (e.currentTarget.hasPointerCapture(e.pointerId))
            e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div className="window-title">
          <Icon size={15} />
          <span>{app.file}</span>
        </div>
        <span className="window-app-name">{app.title}</span>
        <div className="window-controls">
          <button
            aria-label={`Minimize ${app.title}`}
            title="Minimize"
            onClick={onMinimize}
          >
            <Minus size={15} />
          </button>
          <button
            aria-label={`${state.maximized ? "Restore" : "Maximize"} ${app.title}`}
            title={state.maximized ? "Restore" : "Maximize"}
            onClick={onMaximize}
          >
            {state.maximized ? (
              <Minimize2 size={13} />
            ) : (
              <Maximize2 size={13} />
            )}
          </button>
          <button
            aria-label={`Close ${app.title}`}
            title="Close"
            className="window-close"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>
      </header>
      <div className="window-content">{children}</div>
      <footer className="window-status">
        <span>
          <i className="status-dot" />{" "}
          {state.id === "terminal"
            ? "Browser shell simulation"
            : "/home/ishaan/" + app.file}
        </span>
        <span>
          {state.id === "welcome"
            ? "Made of curiosity & caffeine"
            : "Pi Workspace"}
        </span>
      </footer>
    </section>
  );
}
