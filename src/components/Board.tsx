import { useState } from "react";
import { useReveal } from "../lib/useReveal";
import BootSequence from "./BootSequence";
import PowerRail from "./PowerRail";
import Nav from "./Nav";
import Hero from "./Hero";
import Pinout from "./Pinout";
import Projects from "./Projects";
import KernelLog from "./KernelLog";
import Terminal from "./Terminal";
import Contact from "./Contact";
import CommandPalette from "./CommandPalette";
import StatusBar from "./StatusBar";

export default function Board() {
  const [booted, setBooted] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useReveal();

  return (
    <>
      {!booted && <BootSequence onDone={() => setBooted(true)} />}

      <PowerRail />
      <Nav onOpenPalette={() => setPaletteOpen(true)} />

      <main>
        <Hero booted={booted} />
        <Pinout />
        <Projects />
        <KernelLog />
        <Terminal />
        <Contact />
      </main>

      <StatusBar />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  );
}
