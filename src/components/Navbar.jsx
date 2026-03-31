import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          className="nav-item flex items-center gap-2 group tracking-tighter"
          aria-label="Home"
        >
          {/* Logo text removed for minimal design */}
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

        {/* ── CTA button ────────────────────────────────────────── */}
        <div className="nav-item hidden md:block">
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
