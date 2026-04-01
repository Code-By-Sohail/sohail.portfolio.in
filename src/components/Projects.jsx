import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "sonu-fitness",
    index: "01",
    title: "Sonu Fitness",
    subtitle: "Gym Management & E-commerce Platform",
    description:
      "A full-stack gym management system built for a real client. Handles member registration, invoice PDF generation, an online supplement store, and an admin dashboard with live revenue and membership analytics. It helped the team save time on invoices and track revenue easily.",
    tech: ["React", "Firebase", "Firestore", "Tailwind CSS", "Vite"],
    status: "live",
    statusLabel: "Live",
    liveUrl: "https://sonufitness.vercel.app",
    accentColor: "#00f5ff",
    highlights: [
      "Member management",
      "Invoice PDF generation",
      "Online supplement store",
      "Admin analytics dashboard",
    ],
  },
  {
    id: "electronics-shop",
    index: "02",
    title: "Electronics Shop",
    subtitle: "Modern E-commerce Platform",
    description:
      "A feature-rich electronics e-commerce platform with product listings, advanced filtering, cart management, AI-powered recommendations, and a seamless checkout experience. Currently under active development. Designed to help owners improve product discovery, reduce friction, and increase sales.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS", "OpenAI API"],
    status: "progress",
    statusLabel: "In Progress",
    liveUrl: null,
    accentColor: "#0088ff",
    highlights: [
      "Dynamic product catalog",
      "AI recommendations",
      "Cart & checkout",
      "Payment integration",
    ],
  },
];

/* ─── Status Badge ───────────────────────────────────────────────── */
function StatusBadge({ status, label }) {
  const color = status === "live" ? "var(--neon-cyan)" : "var(--neon-blue)";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/10 glass"
      style={{ color }}
    >
      {status === "live" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-75 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {label}
    </span>
  );
}

/* ─── Project Card ───────────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;

    /* Scroll-triggered card entrance */
    gsap.fromTo(
      card,
      { opacity: 0, y: 70, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
        delay: index * 0.1,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    /* GSAP hover — subtle lift */
    const onEnter = () => {
      gsap.to(card, { y: -6, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      gsap.to(glow, { opacity: 0.4, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    };
    const onLeave = () => {
      gsap.to(card, { y: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      gsap.to(glow, { opacity: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    };

    if (card) {
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
    }
    return () => {
      if (card) {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      }
    };
  }, [index]);

  useLayoutEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setScale(width / 1440); // Standard desktop breakpoint
      }
    };
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    updateScale();
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative glass rounded-3xl overflow-hidden border border-glass flex flex-col transition-colors duration-500 hover:border-white/10"
    >
      {/* Hover glow layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${project.accentColor}10 0%, transparent 70%)`,
        }}
      />

      {/* Top accent bar */}
      <div
        className="h-[3px] w-full flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}44, transparent)`,
        }}
      />

      {/* Visual header */}
      <div
        className="relative h-52 overflow-hidden flex-shrink-0"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${project.accentColor}18 0%, transparent 60%), 
                       linear-gradient(135deg, #10101e 0%, #050508 100%)`,
        }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gigantic Background Title (for loading/fallback) */}
        <div className="absolute inset-0 flex items-center justify-center px-8 pointer-events-none">
          <span
            className="font-black text-4xl text-center leading-tight select-none transition-opacity duration-700"
            style={{ color: `${project.accentColor}12`, opacity: isLoaded ? 0 : 1 }}
          >
            {project.title}
          </span>
        </div>

        {/* Live Website Iframe Scaling */}
        {project.liveUrl && (
          <div 
            ref={containerRef}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none group-hover:pointer-events-auto"
          >
            <div 
              className="w-[1440px] h-[900px] origin-top-left transition-all duration-700 ease-in-out"
              style={{
                transform: `scale(${scale})`, 
                filter: isLoaded ? "none" : "blur(10px) grayscale(100%)",
                opacity: isLoaded ? 1 : 0
              }}
            >
              <iframe
                ref={iframeRef}
                src={project.liveUrl}
                className="w-full h-full border-none pointer-events-none group-hover:pointer-events-auto"
                title={`${project.title} Live Preview`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
              />
            </div>
            {/* Loading Spinner */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-dark-950/20 backdrop-blur-sm">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Giant index watermark (if no liveUrl or loading) */}
        {!project.liveUrl && (
          <div className="absolute right-6 bottom-3 font-black text-8xl select-none leading-none pointer-events-none"
            style={{ color: `${project.accentColor}08`, fontVariantNumeric: "tabular-nums" }}>
            {project.index}
          </div>
        )}

        {/* Top-right status */}
        <div className="absolute top-4 right-4 z-20">
          <StatusBadge status={project.status} label={project.statusLabel} />
        </div>

        {/* External link icon for live indicator */}
        {project.liveUrl && (
          <div
            className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase opacity-60 pointer-events-none"
            style={{ color: project.accentColor }}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Live Site
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-7 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-1 transition-colors duration-300 group-hover:text-white">
          {project.title}
        </h3>
        <p className="text-sm font-medium mb-3" style={{ color: project.accentColor }}>
          {project.subtitle}
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Highlights grid */}
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs text-slate-400">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: project.accentColor }}
              />
              {h}
            </li>
          ))}
        </ul>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2.5 py-1 rounded-full border"
              style={{
                background: `${project.accentColor}0d`,
                color: `${project.accentColor}cc`,
                borderColor: `${project.accentColor}28`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              id={`live-demo-${project.id}`}
              className="
                flex-1 inline-flex items-center justify-center gap-2
                px-5 py-2.5 rounded-xl font-semibold text-sm
                transition-all duration-300 hover:scale-[1.02] active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950
              "
              style={{
                background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}99)`,
                color: "#050508",
                boxShadow: `0 0 24px 0 ${project.accentColor}30`,
              }}
            >
              Live Demo
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          ) : (
            <button
              disabled
              id={`coming-soon-${project.id}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-600 border border-slate-800 cursor-not-allowed"
            >
              Coming Soon
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Projects Section ───────────────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative py-28 bg-dark-950">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -bottom-40 -right-20 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-20 -left-20 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,136,255,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section heading */}
        <div ref={headRef} className="text-center mb-16">
          <span className="inline-block font-mono text-sm text-neon-cyan tracking-widest uppercase mb-3">
            What I've built
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Featured{" "}
            <span className="text-neon-gradient">Projects</span>
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm font-medium mb-4">
            Real work for real clients – not just demo projects.
          </p>
          <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
            Real-world applications built for real clients with real business impact.
          </p>
        </div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
