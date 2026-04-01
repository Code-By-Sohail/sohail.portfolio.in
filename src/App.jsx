import { motion, useScroll, useSpring } from "framer-motion";
import Navbar       from "./components/Navbar";
import Hero         from "./components/Hero";
import Stats        from "./components/Stats";
import Projects     from "./components/Projects";
import About        from "./components/About";
import Services     from "./components/Services";
import Pricing      from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Contact      from "./components/Contact";
import Footer       from "./components/Footer";
import { useLenis } from "./hooks/useLenis";

export default function App() {
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

          {/* ── 2. About Me ────────────────────────────────────────── */}
          <About />

          {/* ── 3. Projects ────────────────────────────────────────── */}
          <Projects />

          {/* ── 4. Services ────────────────────────────────────────── */}
          <Services />

          {/* ── 5. Pricing ─────────────────────────────────────────── */}
          <Pricing />

          {/* ── 6. Stats bar ───────────────────────────────────────── */}
          <Stats />

          {/* ── 7. Testimonials ────────────────────────────────────── */}
          <Testimonials />

          {/* ── 8. Contact / Lead Gen ──────────────────────────────── */}
          <Contact />
        </main>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <Footer />
      </div>
    </>
  );
}
