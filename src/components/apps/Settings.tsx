import {
  Monitor,
  Palette,
  Volume2,
  Sparkles,
  RotateCcw,
  Keyboard,
  Check,
} from "lucide-react";

export type Preferences = {
  wallpaper: "landscape" | "circuit" | "midnight";
  accent: "berry" | "mint" | "blue";
  sounds: boolean;
  reduceMotion: boolean;
  clock24: boolean;
};
export const defaultPreferences: Preferences = {
  wallpaper: "landscape",
  accent: "berry",
  sounds: false,
  reduceMotion: false,
  clock24: false,
};
export function loadPreferences(): Preferences {
  try {
    const saved = JSON.parse(
      localStorage.getItem("pi-workspace-preferences") || "{}"
    );
    return {
      wallpaper: ["landscape", "circuit", "midnight"].includes(saved.wallpaper)
        ? saved.wallpaper
        : "landscape",
      accent: ["berry", "mint", "blue"].includes(saved.accent)
        ? saved.accent
        : "berry",
      sounds: typeof saved.sounds === "boolean" ? saved.sounds : false,
      reduceMotion:
        typeof saved.reduceMotion === "boolean" ? saved.reduceMotion : false,
      clock24: typeof saved.clock24 === "boolean" ? saved.clock24 : false,
    };
  } catch {
    return defaultPreferences;
  }
}

type Props = {
  preferences: Preferences;
  update: (values: Partial<Preferences>) => void;
  resetLayout: () => void;
};
export default function Settings({ preferences, update, resetLayout }: Props) {
  return (
    <div className="settings-app">
      <div className="app-page-header">
        <div className="eyebrow">YOUR DESKTOP, YOUR WAY</div>
        <h2>Make yourself at home.</h2>
        <p>Preferences are saved only in this browser.</p>
      </div>
      <div className="settings-section">
        <h3>
          <Monitor size={17} /> Desktop wallpaper
        </h3>
        <div className="wallpaper-options">
          {(
            [
              { id: "landscape", label: "Pi Peaks" },
              { id: "circuit", label: "Circuit lab" },
              { id: "midnight", label: "Midnight" },
            ] as const
          ).map(w => (
            <button
              key={w.id}
              className={`wallpaper-option ${w.id} ${preferences.wallpaper === w.id ? "selected" : ""}`}
              onClick={() => update({ wallpaper: w.id })}
            >
              <span className="wallpaper-preview">
                {preferences.wallpaper === w.id && <Check size={20} />}
              </span>
              <span>{w.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="settings-section">
        <h3>
          <Palette size={17} /> Accent color
        </h3>
        <div className="accent-options">
          {(["berry", "mint", "blue"] as const).map(a => (
            <button
              key={a}
              onClick={() => update({ accent: a })}
              className={preferences.accent === a ? "selected" : ""}
            >
              <i className={a} />
              {a === "berry"
                ? "Raspberry"
                : a === "mint"
                  ? "Mint"
                  : "Electric blue"}
              {preferences.accent === a && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>
      <div className="settings-section settings-toggles">
        <div>
          <Volume2 size={18} />
          <span>
            <b>Interface sounds</b>
            <small>A little ping when an app opens.</small>
          </span>
          <button
            className={`toggle ${preferences.sounds ? "on" : ""}`}
            role="switch"
            aria-checked={preferences.sounds}
            aria-label="Interface sounds"
            onClick={() => update({ sounds: !preferences.sounds })}
          >
            <i />
          </button>
        </div>
        <div>
          <Sparkles size={18} />
          <span>
            <b>Reduce motion</b>
            <small>
              Keep transitions quiet. System preferences are also respected.
            </small>
          </span>
          <button
            className={`toggle ${preferences.reduceMotion ? "on" : ""}`}
            role="switch"
            aria-checked={preferences.reduceMotion}
            aria-label="Reduce motion"
            onClick={() => update({ reduceMotion: !preferences.reduceMotion })}
          >
            <i />
          </button>
        </div>
        <div>
          <Monitor size={18} />
          <span>
            <b>24-hour clock</b>
            <small>Switch the panel clock format.</small>
          </span>
          <button
            className={`toggle ${preferences.clock24 ? "on" : ""}`}
            role="switch"
            aria-checked={preferences.clock24}
            aria-label="24-hour clock"
            onClick={() => update({ clock24: !preferences.clock24 })}
          >
            <i />
          </button>
        </div>
      </div>
      <div className="settings-section">
        <h3>
          <Keyboard size={17} /> A few keyboard shortcuts
        </h3>
        <div className="keyboard-shortcuts">
          <div>
            <span>Application launcher</span>
            <kbd>Ctrl / ⌘ + K</kbd>
          </div>
          <div>
            <span>Open terminal</span>
            <kbd>Ctrl + Alt + T</kbd>
          </div>
          <div>
            <span>Close active window</span>
            <kbd>Alt + W</kbd>
          </div>
          <div>
            <span>Dismiss menus</span>
            <kbd>Esc</kbd>
          </div>
        </div>
      </div>
      <button className="reset-layout" onClick={resetLayout}>
        <RotateCcw size={15} /> Reset window positions
      </button>
      <p className="source-note">
        An independent, Raspberry Pi-inspired portfolio. Not an official
        Raspberry Pi product.
      </p>
    </div>
  );
}
