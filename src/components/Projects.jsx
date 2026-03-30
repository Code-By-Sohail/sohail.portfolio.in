import { useEffect, useRef } from "react";
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
      "A full-stack gym management system built for a real client. Handles member registration, invoice PDF generation, an online supplement store, and an admin dashboard with live revenue and membership analytics.",
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
      "A feature-rich electronics e-commerce platform with product listings, advanced filtering, cart management, AI-powered recommendations, and a seamless checkout experience. Currently under active development.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS", "OpenAI API"],
    status: "progress",
    statusLabel: "In Progress",
    liveUrl: null,
    accentColor: "#b44fff",
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
  if (status === "live") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
        style={{
          background: "rgba(0,245,255,0.12)",
          color: "#00f5ff",
          border: "1px solid rgba(0,245,255,0.3)",
        }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-cyan" />
        </span>
        {label}
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{
        background: "rgba(180,79,255,0.12)",
        color: "#b44fff",
        border: "1px solid rgba(180,79,255,0.3)",
      }}
    >
      <svg className="w-2.5 h-2.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      {label}
    </span>
  );
}

/* ─── Project Card ───────────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

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
        duration: 0.9,
        ease: "power3.out",
        delay: index * 0.18,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    /* GSAP hover — float up + glow intensify */
    const onEnter = () => {
      gsap.to(card, { y: -12, scale: 1.018, duration: 0.38, ease: "power2.out", overwrite: "auto" });
      gsap.to(glow, { opacity: 1, scale: 1.2, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    };
    const onLeave = () => {
      gsap.to(card, { y: 0, scale: 1, duration: 0.38, ease: "power2.out", overwrite: "auto" });
      gsap.to(glow, { opacity: 0, scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative glass rounded-3xl overflow-hidden border flex flex-col"
      style={{ borderColor: `${project.accentColor}20` }}
    >
      {/* Hover glow layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0"
        style={{
          boxShadow: `0 0 60px 0 ${project.accentColor}30`,
          border: `1px solid ${project.accentColor}40`,
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
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(${project.accentColor} 1px, transparent 1px),
                              linear-gradient(90deg, ${project.accentColor} 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />

        {/* Giant index watermark */}
        <div className="absolute right-6 bottom-3 font-black text-8xl select-none leading-none"
          style={{ color: `${project.accentColor}08`, fontVariantNumeric: "tabular-nums" }}>
          {project.index}
        </div>

        {/* Centre orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full"
          style={{
            background: `radial-gradient(circle, ${project.accentColor}22 0%, transparent 70%)`,
            filter: "blur(18px)",
          }}
        />

        {/* Project name */}
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <span
            className="font-black text-4xl text-center leading-tight select-none"
            style={{ color: `${project.accentColor}22` }}
          >
            {project.title}
          </span>
        </div>

        {/* Top-right status */}
        <div className="absolute top-4 right-4">
          <StatusBadge status={project.status} label={project.statusLabel} />
        </div>

        {/* External link icon for live */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-mono opacity-40 hover:opacity-100 transition-opacity duration-200"
            style={{ color: project.accentColor }}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            {new URL(project.liveUrl).hostname}
          </a>
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
                transition-all duration-300 hover:scale-105 active:scale-95
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
          duration: 0.85,
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
              "radial-gradient(circle, rgba(180,79,255,0.05) 0%, transparent 70%)",
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
          <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
            Real-world applications built for real clients with real business
            impact.
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
