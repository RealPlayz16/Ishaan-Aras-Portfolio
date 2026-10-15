"use client";
import { useEffect, useState, useRef, type RefObject } from "react";

/**
 * Reports which child panel is currently nearest the reading line.
 * Used to drive the board illumination from scroll position, so the
 * scrolling itself does the work rather than a decorative animation.
 */
export function useActivePanel(
  containerRef: RefObject<HTMLElement | null>,
  selector: string,
  count: number
) {
  const [active, setActive] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const panels = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (!panels.length) return;

    const measure = () => {
      // The reading line sits a little above centre, where the eye rests.
      const line = window.innerHeight * 0.42;
      let best = 0;
      let bestDist = Infinity;

      panels.forEach((p, i) => {
        const r = p.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const dist = Math.abs(mid - line);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });

      setActive(best);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerRef, selector, count]);

  return active;
}

/**
 * 0 to 1 progress of an element through the viewport. Drives the
 * power rail fill.
 */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return p;
}

/** Reveals each matching child once, staggered, as it enters view. */
export function useStagger(
  containerRef: RefObject<HTMLElement | null>,
  selector: string
) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(el => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) return;
          const el = entry.target as HTMLElement;
          const i = items.indexOf(el);
          el.style.transitionDelay = `${Math.min(i, 8) * 55}ms`;
          el.classList.add("in");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );

    items.forEach(el => io.observe(el));
    const failsafe = window.setTimeout(
      () => items.forEach(el => el.classList.add("in")),
      2500
    );

    return () => { io.disconnect(); window.clearTimeout(failsafe); };
  }, [containerRef, selector]);
}
