"use client";
import { useState } from "react";
import { useReveal } from "../lib/useReveal";
import BootSequence from "./BootSequence";
import Nav from "./Nav";
import Hero from "./Hero";
import Pinout from "./Pinout";
import KernelLog from "./KernelLog";
import Peripherals from "./Peripherals";
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

      <Nav onOpenPalette={() => setPaletteOpen(true)} />

      <main>
        <Hero booted={booted} />
        <Pinout />
        <KernelLog />
        <Peripherals />
        <Terminal />
        <Contact />
      </main>

      <StatusBar />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  );
}
