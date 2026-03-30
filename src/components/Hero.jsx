import { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";


export default function Hero() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Orbs
      tl.fromTo(
        orbRef.current,
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out", clearProps: "transform,opacity" }
      );

      // 2. Badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, clearProps: "transform,opacity" },
        "-=1.2"
      );

      // 3. Headline — word-by-word 3D reveal
      tl.fromTo(
        ".hero-word",
        { opacity: 0, y: 60, rotateX: -40 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.07,
          transformOrigin: "bottom center",
          clearProps: "transform,opacity",
        },
        "-=0.4"
      );

      // 4. Subtitle
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.65, clearProps: "transform,opacity" },
        "-=0.25"
      );

      // 5. CTA buttons
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 25, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.12,
          clearProps: "transform,opacity",
        },
        "-=0.25"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="
        relative min-h-screen flex items-center justify-center
        bg-dark-950 bg-hero-gradient overflow-hidden
      "
    >
      {/* ── Ambient orbs ──────────────────────────────────────── */}
      <div ref={orbRef} aria-hidden className="pointer-events-none absolute inset-0">
        {/* Top-left blue orb */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,136,255,0.22) 0%, rgba(0,136,255,0.05) 50%, transparent 75%)",
            filter: "blur(40px)",
          }}
        />
        {/* Bottom-right cyan orb */}
        <div
          className="absolute -bottom-40 -right-10 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,245,255,0.18) 0%, rgba(0,245,255,0.04) 50%, transparent 75%)",
            filter: "blur(40px)",
          }}
        />
        {/* Centre-right emerald accent */}
        <div
          className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,163,0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Grid lines overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>


      {/* ── Main content ──────────────────────────────────────── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Available badge */}
        <div ref={badgeRef} className="flex justify-center mb-8">
          <span
            className="
              inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              border border-neon-cyan/30 glass
              text-neon-cyan text-sm font-mono font-medium
              shadow-neon-cyan/20
            "
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
            </span>
            Available for new projects
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="
            text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight
            text-white mb-6 perspective-[1000px]
          "
          style={{ perspective: "1000px" }}
          aria-label="Hi, I'm Sohail, building high-converting websites for businesses"
        >
          {"Hi, I'm Sohail, building high-converting websites for businesses"
            .split(" ")
            .map((word, i) => (
              <span
                key={i}
                className={`hero-word inline-block mr-[0.22em] ${word.includes("high-converting") || word.includes("websites") || word.includes("Sohail")
                    ? "text-neon-gradient"
                    : "text-white"
                  }`}
              >
                {word}
              </span>
            ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="
            text-lg sm:text-xl lg:text-2xl text-slate-400 font-light
            max-w-2xl mx-auto mb-10 leading-relaxed
          "
        >
          Turning visitors into customers with{" "}
          <span className="text-white font-medium">real-world technical solutions</span>{" "}
          that solve{" "}
          <span className="text-neon-blue font-medium">your business problems</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Primary — View Work */}
          <MagneticButton className="hero-cta">
            <a
              href="#work"
              className="
                group relative inline-flex items-center gap-2
                px-8 py-3.5 rounded-full
                font-semibold text-base text-dark-950
                bg-btn-neon shadow-neon-cyan
                hover:shadow-neon-blue hover:scale-105
                active:scale-95
                transition-all duration-300 overflow-hidden interactive
              "
              aria-label="View my work"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Work
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
              {/* Hover overlay */}
              <span className="absolute inset-0 bg-btn-neon-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </a>
          </MagneticButton>

          {/* Secondary — Contact Me */}
          <MagneticButton className="hero-cta">
            <a
              href="#contact"
              className="
                group relative inline-flex items-center gap-2
                px-8 py-3.5 rounded-full
                font-semibold text-base text-white
                border border-neon-blue/50 glass
                hover:border-neon-blue hover:shadow-neon-blue
                hover:scale-105 active:scale-95
                transition-all duration-300 overflow-hidden interactive
              "
              aria-label="Contact me"
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </span>
              {/* Hover glow fill */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-neon-blue rounded-full transition-opacity duration-300" />
            </a>
          </MagneticButton>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs font-mono tracking-widest text-slate-500 uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-neon-cyan to-transparent" />
        </div>
      </div>

    </section>
  );
}
