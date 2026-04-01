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
          {/* WhatsApp */}
          <a
            href="https://wa.me/919712376801"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-slate-500 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="https://instagram.com/sohail_ansari_90"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-slate-500 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
