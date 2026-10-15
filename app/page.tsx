import SmoothScroll from "./components/SmoothScroll";
import CursorGlow from "./components/CursorGlow";
import ScrollProgress from "./components/ScrollProgress";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Capabilities from "./components/Capabilities";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <CursorGlow />
      <ScrollProgress />
      <div className="noise" />
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Capabilities />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
