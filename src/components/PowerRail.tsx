import { useScrollProgress } from "../lib/useScroll";

/** Scroll position as a power rail filling along the top of the board. */
export default function PowerRail() {
  const p = useScrollProgress();

  return (
    <div className="power-rail" aria-hidden="true">
      <div className="power-rail-fill" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
