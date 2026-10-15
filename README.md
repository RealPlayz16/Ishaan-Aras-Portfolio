# Ishaan Aras, portfolio

An interactive portfolio built around one idea: the site is a Raspberry Pi. It boots, exposes a
40-pin header, keeps a kernel log, and accepts a shell.

Live at [ishaanaras-portfolio.vercel.app](https://ishaanaras-portfolio.vercel.app/).

## Run it

```
npm install
npm run dev      # vite dev server
npm run build    # typecheck, then production build to dist/
npm run preview  # serve the production build
```

Deploys automatically to Vercel on push to `main`. Config is in `vercel.json`.

## How it is put together

`src/lib/content.ts` is the single source of truth. Every section, and every terminal command,
reads from it. Each project declares the skills it used, and the pin-to-project links are derived
from that one list rather than kept as a second copy, so the pinout and the builds section cannot
drift apart.

`src/components/` holds one file per section plus the shared pieces:

- `BootSequence` runs a dmesg-style boot on first load. Escape skips it, and it only runs once per
  browser session.
- `PinHeader` renders the 40-pin header. Power rails, grounds, bus functions and BCM numbers are
  accurate to real hardware. It takes a set of lit pins, so the same component serves the full
  interactive board and the compact strip on each project.
- `Pinout` sticks the board in place while the skill groups scroll past, lighting the matching pins
  as each group reaches the reading line. Picking a skill isolates its pin and lists the builds that
  used it.
- `Projects` is the main section. Each build shows its metric, what it does, and which pins it lit.
- `Terminal` is a working shell. `help` lists the commands.
- `CommandPalette` is ⌘K / ctrl-K.

`src/lib/useScroll.ts` holds the scroll hooks. There is no animation library; scroll position is
read with `requestAnimationFrame` and an `IntersectionObserver`.

## Scope

This is a browser simulation, not remote access to a Raspberry Pi. Terminal commands only read the
portfolio data and move around the page. No command reaches a real shell, no pin controls hardware,
and the SoC temperature in the status bar is decorative. Kernel timestamps are a design device, not
employment dates.
