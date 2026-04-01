import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll Progress for the Logo Fill
  const { scrollYProgress } = useScroll();
  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* ── GSAP: fade-in from top on mount ─────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // fromTo ensures the final state is always explicitly set
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2, clearProps: "transform,opacity" }
      );

      // Stagger nav items into view
      gsap.fromTo(
        ".nav-item",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.08, delay: 0.5, clearProps: "transform,opacity" }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  /* ── Scroll: toggle glass/shadow on scroll ────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Smooth scroll helper ─────────────────────────────────── */
  const handleNavClick = (e, href) => {
    e.preventDefault();
    // Delay slightly so the mobile menu unmount doesn't cancel the scroll action
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        const topPos = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: topPos, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
        ? "glass border-b border-glass"
        : "bg-transparent"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

        {/* ── Logo ─────────────────────────────────────────────── */}
        <a
          href="#"
          className="nav-item flex items-center group active:scale-95 transition-transform duration-300"
          aria-label="Home"
        >
          <div className="relative text-xl font-bold tracking-widest select-none">
            {/* Background Layer (Whiter Base) */}
            <span className="text-white/50 whitespace-nowrap">
              Sohail<span className="text-white/50">.</span>
            </span>
            
            {/* Fill Layer (Cyan-Blue Gradient) */}
            <motion.div
              style={{ width: fillWidth }}
              className="absolute inset-0 border-none overflow-hidden whitespace-nowrap"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Sohail<span className="text-cyan-400">.</span>
              </span>
            </motion.div>
          </div>
        </a>

        {/* ── Nav Links (desktop) ───────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label} className="nav-item">
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="nav-link-underline text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Social + CTA (desktop) ────────────────────────────── */}
        <div className="nav-item hidden md:flex items-center gap-4">
          {/* GitHub */}
          <a
            href="https://github.com/Code-By-Sohail"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-slate-500 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sohail-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-slate-500 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <MagneticButton>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="
                relative inline-flex items-center gap-2 px-6 py-2 rounded-full
                text-xs font-bold uppercase tracking-widest text-dark-950
                bg-white transition-all duration-300
                hover:scale-105 active:scale-95
                interactive
              "
            >
              Hire Me
            </a>
          </MagneticButton>
        </div>

        {/* ── Mobile hamburger ─ */}
        <button
          className="md:hidden nav-item flex flex-col gap-1.5 p-2 z-[60] relative"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-neon-cyan rounded-full transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-4 h-0.5 bg-neon-blue rounded-full transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-neon-emerald rounded-full transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 overflow-hidden origin-top shadow-2xl z-[45]"
          >
            <div className="bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 items-center">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => {
                    handleNavClick(e, href);
                    setMenuOpen(false);
                  }}
                  className="text-slate-300 hover:text-white text-base font-bold uppercase tracking-[0.15em] transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  handleNavClick(e, "#contact");
                  setMenuOpen(false);
                }}
                className="mt-4 w-full max-w-xs text-center py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] text-[#050505] bg-white hover:bg-slate-200 active:scale-95 transition-all duration-300"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
