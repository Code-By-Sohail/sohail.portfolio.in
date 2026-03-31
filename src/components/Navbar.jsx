import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
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
          <span className="font-sans text-xl font-bold text-white uppercase italic">
            Code By <span className="text-neon-cyan not-italic">Sohail</span>
          </span>
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

        {/* ── Mobile hamburger (visual only — menu added in future) ─ */}
        <button
          className="md:hidden nav-item flex flex-col gap-1.5 p-2"
          aria-label="Open menu"
        >
          <span className="block w-6 h-0.5 bg-neon-cyan rounded-full" />
          <span className="block w-4 h-0.5 bg-neon-blue rounded-full" />
          <span className="block w-6 h-0.5 bg-neon-emerald rounded-full" />
        </button>
      </nav>
    </header>
  );
}
