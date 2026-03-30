import { useState } from "react";
import Navbar  from "./components/Navbar";
import Hero     from "./components/Hero";
import Skills   from "./components/Skills";
import Projects from "./components/Projects";
import Contact  from "./components/Contact";
import Loader   from "./components/Loader";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  const [loading, setLoading] = useState(true);
  
  // Initialize Lenis smooth scroll globally
  useLenis();

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      <div className="dark min-h-screen bg-dark-950 text-white antialiased">
        <Navbar />

        <main>
          {/* ── 1. Hero ────────────────────────────────────────────── */}
          <Hero />

          {/* ── 2. Projects ────────────────────────────────────────── */}
          <Projects />

          {/* ── 3. Skills ──────────────────────────────────────────── */}
          <Skills />

          {/* ── 4. Contact / Lead Gen ──────────────────────────────── */}
          <Contact />
        </main>
      </div>
    </>
  );
}
