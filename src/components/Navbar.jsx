import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

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
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
          ? "glass border-b border-white/5 shadow-glass"
          : "bg-transparent"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

        {/* ── Logo ─────────────────────────────────────────────── */}
        <a
          href="#"
          className="nav-item flex items-center gap-2 group"
          aria-label="Home"
        >
          {/* Animated bracket logo */}
          <span className="font-mono text-xl font-bold text-neon-cyan group-hover:glow-cyan transition-all duration-300">
            &lt;
          </span>
          <span className="font-mono text-lg font-bold text-white tracking-wider">
            dev
          </span>
          <span className="font-mono text-xl font-bold text-neon-purple group-hover:text-neon-pink transition-colors duration-300">
            /&gt;
          </span>
        </a>

        {/* ── Nav Links (desktop) ───────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label} className="nav-item">
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="nav-link-underline text-slate-300 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
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
                relative inline-flex items-center gap-2 px-5 py-2 rounded-full
                text-sm font-semibold text-dark-950
                bg-btn-neon
                shadow-neon-cyan
                hover:shadow-neon-purple
                transition-all duration-300
                hover:scale-105 active:scale-95
                overflow-hidden group interactive
              "
            >
              <span className="relative z-10">Hire Me</span>
              {/* Hover shimmer */}
              <span
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  bg-btn-neon-hover transition-opacity duration-400
                "
              />
            </a>
          </MagneticButton>
        </div>

        {/* ── Mobile hamburger (visual only — menu added in future) ─ */}
        <button
          className="md:hidden nav-item flex flex-col gap-1.5 p-2"
          aria-label="Open menu"
        >
          <span className="block w-6 h-0.5 bg-neon-cyan rounded-full" />
          <span className="block w-4 h-0.5 bg-neon-purple rounded-full" />
          <span className="block w-6 h-0.5 bg-neon-pink rounded-full" />
        </button>
      </nav>
    </header>
  );
}
