import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Wifi,
  Volume2,
  VolumeX,
  Bell,
  Power,
  Search,
  ArrowUpRight,
  Maximize,
  Command,
  Check,
  Info,
  RotateCcw,
  SquareTerminal,
  Settings2,
  X,
} from "lucide-react";
import { apps, type AppId } from "@/lib/portfolio";
import AppWindow, { type WindowState } from "@/components/desktop/AppWindow";
import { BerryMark } from "@/components/desktop/BoardView";
import Welcome from "@/components/apps/Welcome";
import { About, Skills } from "@/components/apps/ProfileApps";
import Projects from "@/components/apps/Projects";
import Terminal from "@/components/apps/Terminal";
import Contact from "@/components/apps/Contact";
import Settings, {
  loadPreferences,
  type Preferences,
} from "@/components/apps/Settings";
import { clampWindowPosition, desktopWindowWidth } from "@/lib/windowGeometry";

function initialWindow(id: AppId, offset = 0): WindowState {
  const width = desktopWindowWidth(window.innerWidth);
  const left = Math.max(
    8,
    Math.min(
      Math.max(135, (window.innerWidth - width) / 2 + 28) + offset,
      window.innerWidth - width - 10
    )
  );
  return {
    id,
    x: left,
    y: Math.min(100 + offset, Math.max(56, (window.innerHeight - 600) / 2)),
    z: 30,
    minimized: false,
    maximized: false,
  };
}
function playSound() {
  try {
    const audio = new AudioContext();
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(660, audio.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audio.currentTime + 0.08);
    gain.gain.setValueAtTime(0.025, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start();
    osc.stop(audio.currentTime + 0.16);
    osc.onended = () => {
      void audio.close();
    };
  } catch {
    /* Audio can be unavailable in restricted browsers. */
  }
}

export default function Home() {
  const [windows, setWindows] = useState<WindowState[]>(() => [
    initialWindow("welcome"),
  ]);
  const [preferences, setPreferences] = useState(loadPreferences);
  const [menu, setMenu] = useState<
    "apps" | "network" | "notifications" | "power" | null
  >(null);
  const [menuSearch, setMenuSearch] = useState("");
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [clock, setClock] = useState(new Date());
  const [booting, setBooting] = useState(true);
  const [notice, setNotice] = useState("");
  const z = useRef(30);
  const launcherInput = useRef<HTMLInputElement>(null);
  const bootTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibleWindows = windows.filter(w => !w.minimized);
  const active = [...visibleWindows].sort((a, b) => b.z - a.z)[0]?.id;
  const updatePreferences = useCallback(
    (values: Partial<Preferences>) =>
      setPreferences(prev => {
        const next = { ...prev, ...values };
        try {
          localStorage.setItem(
            "pi-workspace-preferences",
            JSON.stringify(next)
          );
        } catch {
          /* Private-mode storage may be restricted. */
        }
        return next;
      }),
    []
  );
  const openApp = useCallback(
    (id: AppId) => {
      setWindows(prev => {
        const found = prev.find(w => w.id === id);
        const nextZ = ++z.current;
        if (found)
          return prev.map(w =>
            w.id === id ? { ...w, minimized: false, z: nextZ } : w
          );
        const newWindow = initialWindow(id, Math.min(prev.length, 4) * 18);
        return [...prev, { ...newWindow, z: nextZ }];
      });
      if (preferences.sounds) playSound();
      setMenu(null);
      setContextMenu(null);
      setMenuSearch("");
    },
    [preferences.sounds]
  );
  const closeApp = useCallback(
    (id: AppId) => setWindows(prev => prev.filter(w => w.id !== id)),
    []
  );
  const focusApp = (id: AppId) =>
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, z: ++z.current } : w))
    );
  const minimizeApp = (id: AppId) =>
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, minimized: true } : w))
    );
  const maximizeApp = (id: AppId) =>
    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, maximized: !w.maximized, z: ++z.current } : w
      )
    );
  const resetLayout = () => {
    setWindows(prev =>
      prev.map((w, i) => ({ ...initialWindow(w.id, i * 14), z: ++z.current }))
    );
    setContextMenu(null);
    setNotice("Window positions reset. Make yourself at home.");
  };
  const skipBoot = useCallback(() => {
    if (bootTimer.current) clearTimeout(bootTimer.current);
    setBooting(false);
    setWindows([{ ...initialWindow("welcome"), z: ++z.current }]);
  }, []);
  const reboot = useCallback(() => {
    setMenu(null);
    setBooting(true);
    if (bootTimer.current) clearTimeout(bootTimer.current);
    bootTimer.current = setTimeout(() => {
      setWindows([{ ...initialWindow("welcome"), z: ++z.current }]);
      setBooting(false);
    }, 1300);
  }, []);
  useEffect(() => {
    bootTimer.current = setTimeout(() => setBooting(false), 900);
    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => {
      clearInterval(timer);
      if (bootTimer.current) clearTimeout(bootTimer.current);
    };
  }, []);
  useEffect(() => {
    if (menu === "apps") launcherInput.current?.focus();
  }, [menu]);
  useEffect(() => {
    const keepWindowsReachable = () =>
      setWindows(prev =>
        prev.map(w => ({
          ...w,
          ...clampWindowPosition(
            w.x,
            w.y,
            window.innerWidth,
            window.innerHeight
          ),
        }))
      );
    window.addEventListener("resize", keepWindowsReachable);
    return () => window.removeEventListener("resize", keepWindowsReachable);
  }, []);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4200);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMenu(prev => (prev === "apps" ? null : "apps"));
        setMenuSearch("");
      }
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        openApp("terminal");
      }
      if (e.altKey && e.key.toLowerCase() === "w" && active) {
        e.preventDefault();
        closeApp(active);
      }
      if (e.key === "Escape") {
        setMenu(null);
        setContextMenu(null);
        if (booting) skipBoot();
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [active, closeApp, openApp, booting, skipBoot]);
  const fullscreen = async () => {
    setMenu(null);
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      setNotice(
        "Fullscreen isn’t available in this preview. Open the site in a new tab to try it."
      );
    }
  };
  const appContent = (id: AppId) => {
    switch (id) {
      case "welcome":
        return <Welcome openApp={openApp} />;
      case "about":
        return <About openApp={openApp} />;
      case "projects":
        return <Projects openApp={openApp} />;
      case "skills":
        return <Skills openApp={openApp} />;
      case "terminal":
        return <Terminal openApp={openApp} reboot={reboot} />;
      case "contact":
        return <Contact />;
      case "settings":
        return (
          <Settings
            preferences={preferences}
            update={updatePreferences}
            resetLayout={resetLayout}
          />
        );
    }
  };
  return (
    <main
      className={`desktop wallpaper-${preferences.wallpaper} accent-${preferences.accent} ${preferences.reduceMotion ? "reduce-motion" : ""}`}
      onPointerDown={e => {
        if (
          !(e.target as HTMLElement).closest(
            ".panel-popover, .panel-button, .context-menu"
          )
        ) {
          setMenu(null);
          setContextMenu(null);
        }
      }}
      onContextMenu={e => {
        if (
          !(e.target as HTMLElement).closest(".app-window, .dock, .top-panel")
        ) {
          e.preventDefault();
          setContextMenu({
            x: Math.min(e.clientX, window.innerWidth - 230),
            y: Math.min(e.clientY, window.innerHeight - 160),
          });
        }
      }}
    >
      <div className="desktop-wallpaper" />
      <div className="wallpaper-shade" />
      <header className="top-panel">
        <div className="panel-left">
          <button
            className={`panel-button app-menu-button ${menu === "apps" ? "selected" : ""}`}
            onClick={() => {
              setMenu(menu === "apps" ? null : "apps");
              setMenuSearch("");
            }}
            aria-expanded={menu === "apps"}
            aria-label="Open applications menu"
          >
            <BerryMark />
            <span>Applications</span>
            <ChevronDown size={12} />
          </button>
          <span className="panel-divider" />
          <button
            className="panel-button panel-home"
            onClick={() => openApp("welcome")}
          >
            ishaan<span>@raspberrypi</span>{" "}
            <span className="panel-tilde">~</span>
          </button>
        </div>
        <div className="panel-center">
          <span className="status-dot" /> PI WORKSPACE{" "}
          <span className="edition">/ WEB EDITION</span>
        </div>
        <div className="panel-right">
          <button
            className="panel-button tray-button"
            aria-label="Workspace network information"
            onClick={() => setMenu(menu === "network" ? null : "network")}
          >
            <Wifi size={16} />
          </button>
          <button
            className="panel-button tray-button"
            aria-label={
              preferences.sounds
                ? "Turn interface sounds off"
                : "Turn interface sounds on"
            }
            title="Toggle interface sounds"
            onClick={() => updatePreferences({ sounds: !preferences.sounds })}
          >
            {preferences.sounds ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            className={`panel-button tray-button bell-button ${menu === "notifications" ? "selected" : ""}`}
            aria-label="Workspace notes"
            onClick={() =>
              setMenu(menu === "notifications" ? null : "notifications")
            }
          >
            <Bell size={15} />
            <i />
          </button>
          <span className="panel-divider" />
          <button
            className="panel-button clock-button"
            onClick={() =>
              setMenu(menu === "notifications" ? null : "notifications")
            }
            aria-label="Clock and workspace notes"
          >
            <span>
              {clock.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            <b>
              {clock.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: !preferences.clock24,
              })}
            </b>
          </button>
          <button
            className="panel-button tray-button power-button"
            aria-label="Workspace power menu"
            onClick={() => setMenu(menu === "power" ? null : "power")}
          >
            <Power size={15} />
          </button>
        </div>
      </header>
      {menu === "apps" && (
        <div className="panel-popover application-menu">
          <div className="launcher-heading">
            <BerryMark />
            <div>
              <b>Pi Workspace</b>
              <small>A personal corner of the internet.</small>
            </div>
            <button
              onClick={() => setMenu(null)}
              aria-label="Close application launcher"
            >
              <X size={17} />
            </button>
          </div>
          <label className="launcher-search">
            <Search size={16} />
            <input
              ref={launcherInput}
              placeholder="Find an application…"
              value={menuSearch}
              onChange={e => setMenuSearch(e.target.value)}
              aria-label="Search applications"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  const first = apps.find(a =>
                    `${a.title} ${a.subtitle}`
                      .toLowerCase()
                      .includes(menuSearch.toLowerCase())
                  );
                  if (first) openApp(first.id);
                }
              }}
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className="launcher-apps">
            {apps
              .filter(a =>
                `${a.title} ${a.subtitle}`
                  .toLowerCase()
                  .includes(menuSearch.toLowerCase())
              )
              .map(a => {
                const Icon = a.icon;
                return (
                  <button key={a.id} onClick={() => openApp(a.id)}>
                    <span className={`app-icon ${a.color}`}>
                      <Icon size={21} />
                    </span>
                    <span>
                      <b>{a.title}</b>
                      <small>{a.subtitle}</small>
                    </span>
                    <ArrowUpRight size={15} />
                  </button>
                );
              })}
            {!apps.some(a =>
              `${a.title} ${a.subtitle}`
                .toLowerCase()
                .includes(menuSearch.toLowerCase())
            ) && (
              <p className="launcher-empty">
                No matching apps. Try “projects” or “terminal”.
              </p>
            )}
          </div>
          <div className="launcher-footer">
            <span className="status-dot" /> ishaan · available for W2027 co-op
            <button
              onClick={() => openApp("settings")}
              aria-label="Open desktop settings"
            >
              <Settings2 size={15} />
            </button>
          </div>
        </div>
      )}
      {menu === "network" && (
        <div className="panel-popover network-popover">
          <div className="popover-heading">
            <Wifi size={18} />
            <h3>Workspace connection</h3>
          </div>
          <div className="connection-row">
            <span className="status-dot" />
            <span>Browser workspace</span>
            <Check size={16} />
          </div>
          <p>
            You’re exploring a Raspberry Pi-inspired web desktop, not a remotely
            connected computer.
          </p>
          <div className="network-detail">
            <span>Real hardware</span>
            <b>Not connected</b>
            <span>Telemetry</span>
            <b>Not collected</b>
          </div>
        </div>
      )}
      {menu === "notifications" && (
        <div className="panel-popover notifications-popover">
          <div className="popover-heading">
            <Bell size={17} />
            <h3>A little heads-up</h3>
          </div>
          <div className="notification-card">
            <span className="status-dot" />
            <div>
              <h4>Open for W2027 co-op</h4>
              <p>
                Embedded systems, robotics, and hardware engineering
                opportunities.
              </p>
              <button className="text-btn" onClick={() => openApp("contact")}>
                Let’s connect <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
          <div className="notification-card">
            <Info size={17} />
            <div>
              <h4>Make yourself at home</h4>
              <p>
                Drag a window. Explore a project. Type <code>help</code> in the
                terminal. Nothing here controls real hardware.
              </p>
            </div>
          </div>
          <span className="notification-date">
            {clock.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      )}
      {menu === "power" && (
        <div className="panel-popover power-popover">
          <h3>Workspace controls</h3>
          <button onClick={reboot}>
            <RotateCcw size={16} /> Restart presentation
          </button>
          <button
            onClick={() => {
              setWindows(prev => prev.map(w => ({ ...w, minimized: true })));
              setMenu(null);
            }}
          >
            <MonitorDesktop /> Show desktop
          </button>
          <button onClick={fullscreen}>
            <Maximize size={16} /> Toggle fullscreen
          </button>
          <button onClick={() => openApp("settings")}>
            <Settings2 size={16} /> Desktop preferences
          </button>
          <p>Just a web desktop. No actual power controls.</p>
        </div>
      )}
      <nav className="desktop-shortcuts" aria-label="Desktop shortcuts">
        {apps
          .filter(a =>
            ["about", "projects", "skills", "terminal", "contact"].includes(
              a.id
            )
          )
          .map(a => {
            const Icon = a.icon;
            return (
              <button
                key={a.id}
                onClick={() => openApp(a.id)}
                title={`Open ${a.title}`}
              >
                <span className={`app-icon desktop-icon ${a.color}`}>
                  <Icon size={26} strokeWidth={1.6} />
                </span>
                <span>{a.id === "about" ? "About Ishaan" : a.title}</span>
              </button>
            );
          })}
      </nav>
      <div className="desktop-watermark">
        <BerryMark />
        <span>
          Small board.
          <br />
          Endless possibilities.
        </span>
      </div>
      <div className="desktop-title">
        <span className="tiny-square" /> THE PI WORKSPACE
        <span>Personal portfolio · Interactive edition</span>
      </div>
      <div className="workspace-windows">
        {windows.map(w => (
          <AppWindow
            key={w.id}
            state={w}
            active={active === w.id}
            onFocus={() => focusApp(w.id)}
            onClose={() => closeApp(w.id)}
            onMinimize={() => minimizeApp(w.id)}
            onMaximize={() => maximizeApp(w.id)}
            onMove={(x, y) =>
              setWindows(prev =>
                prev.map(item => (item.id === w.id ? { ...item, x, y } : item))
              )
            }
          >
            {appContent(w.id)}
          </AppWindow>
        ))}
      </div>
      <div className="desktop-bottom-left">
        <span className="status-dot" />
        <span>
          System status: curious.
          <br />
          <small>Designed for exploration. Built for the web.</small>
        </span>
      </div>
      <div className="desktop-bottom-right">
        <span>DRAG. CLICK. EXPLORE.</span>
        <small>Your curiosity is the only prerequisite.</small>
      </div>
      <nav className="dock" aria-label="Application dock">
        {apps.map((a, i) => {
          const Icon = a.icon;
          const running = windows.some(w => w.id === a.id);
          const focused = active === a.id;
          return (
            <div
              key={a.id}
              className={`dock-item ${i === apps.length - 1 ? "dock-settings" : ""}`}
            >
              <button
                className={`${focused ? "focused" : ""}`}
                aria-label={`${a.title}${running ? " (running)" : ""}`}
                title={a.title}
                onClick={() => {
                  if (focused) minimizeApp(a.id);
                  else openApp(a.id);
                }}
              >
                <span className={`app-icon ${a.color}`}>
                  {a.id === "welcome" ? (
                    <BerryMark />
                  ) : (
                    <Icon size={24} strokeWidth={1.7} />
                  )}
                </span>
                <span className="dock-tooltip">{a.title}</span>
              </button>
              <i className={`dock-running ${running ? "running" : ""}`} />
            </div>
          );
        })}
        <span className="dock-hint">
          <Command size={13} />
          <kbd>K</kbd>
        </span>
      </nav>
      {contextMenu && (
        <div
          className="context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button onClick={() => openApp("terminal")}>
            <SquareTerminal size={15} /> Open terminal
          </button>
          <button onClick={resetLayout}>
            <RotateCcw size={15} /> Reset window positions
          </button>
          <button onClick={() => openApp("settings")}>
            <Settings2 size={15} /> Desktop preferences
          </button>
        </div>
      )}
      {notice && (
        <div className="desktop-toast" role="status">
          <Info size={16} />
          {notice}
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      )}
      {booting && (
        <div className="boot-screen" role="status">
          <BerryMark />
          <div className="boot-wordmark">
            pi workspace<span>by Ishaan Aras</span>
          </div>
          <div className="boot-progress">
            <i />
          </div>
          <p>
            Booting a little corner of the internet
            <span className="boot-dots">…</span>
          </p>
          <div className="boot-console">
            <p>
              [0.184215] uwaterloo: mechatronics · stream 4 <span>OK</span>
            </p>
            <p>
              [1.402887] fostride: embedded systems intern <span>OK</span>
            </p>
            <p>
              [2.118640] uwfe: tractive + electrical <span>OK</span>
            </p>
            <p>
              [3.556102] portfolio: 4 builds ready <span>OK</span>
            </p>
          </div>
          <button className="boot-skip" onClick={skipBoot}>
            Press Esc or click to skip boot
          </button>
        </div>
      )}
    </main>
  );
}
function MonitorDesktop() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 16v5" />
    </svg>
  );
}
