import { useLocation } from "wouter";

/**
 * Styled as a kernel panic rather than a generic 404, so a wrong URL still
 * lands inside the Pi conceit.
 */
export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "#0d2320",
        color: "#d7ded8",
        fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
      }}
    >
      <div style={{ maxWidth: "46ch" }}>
        <p style={{ fontSize: "0.72rem", color: "#86a892", marginBottom: "1.25rem" }}>
          [ &nbsp;0.000000] kernel: mount failed
        </p>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 4rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: "1rem",
          }}
        >
          404
        </h1>

        <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#a8bcae", marginBottom: "2rem" }}>
          No such file or directory. That path is not mounted on this board.
        </p>

        <button
          onClick={() => setLocation("/")}
          style={{
            fontFamily: "inherit",
            fontSize: "0.8rem",
            padding: "0.6rem 1.2rem",
            borderRadius: "4px",
            border: "1px solid #2f5a48",
            background: "#163a30",
            color: "#e8f0ea",
            cursor: "pointer",
          }}
        >
          cd ~
        </button>
      </div>
    </div>
  );
}
