import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar  from "./components/Navbar";
import Hero     from "./components/Hero";
import Skills   from "./components/Skills";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact  from "./components/Contact";
import Loader   from "./components/Loader";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  const [loading, setLoading] = useState(true);
  
  // Framer Motion Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Initialize Lenis smooth scroll globally
  useLenis();

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-neon-cyan origin-left z-[9999]"
        style={{ scaleX }}
      />

      <div className="dark min-h-screen bg-dark-950 text-white antialiased">
        <Navbar />

        <main>
          {/* ── 1. Hero ────────────────────────────────────────────── */}
          <Hero />

          {/* ── 2. Projects ────────────────────────────────────────── */}
          <Projects />

          {/* ── 3. Services ────────────────────────────────────────── */}
          <Services />

          {/* ── 4. Skills ──────────────────────────────────────────── */}
          <Skills />

          {/* ── 4. Contact / Lead Gen ──────────────────────────────── */}
          <Contact />
        </main>
      </div>
    </>
  );
}
