"use client";
import { useEffect } from "react";

/**
 * One restrained reveal, applied once per element.
 *
 * Deliberately also reveals anything that is already ABOVE the viewport.
 * A plain isIntersecting check leaves content permanently invisible when a
 * reader jumps past it (hash link, command palette, in-page anchor), which
 * is the usual way scroll reveals break.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    if (!els.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(el => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const past = entry.boundingClientRect.top < 0;
          if (entry.isIntersecting || past) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );

    els.forEach(el => io.observe(el));

    // Safety net: nothing stays hidden, whatever the observer does.
    const failsafe = window.setTimeout(() => {
      els.forEach(el => el.classList.add("in"));
    }, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);
}
