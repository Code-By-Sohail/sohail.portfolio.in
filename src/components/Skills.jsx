import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  {
    tag: "⚛",
    name: "React.js",
    level: 90,
    category: "Frontend",
    accent: "#61DAFB",
    desc: "Hooks, context, performance tuning, component architecture",
  },
  {
    tag: "JS",
    name: "JavaScript",
    level: 92,
    category: "Language",
    accent: "#F7DF1E",
    desc: "ES2023+, async/await, closures, event-driven patterns",
  },
  {
    tag: "TS",
    name: "TypeScript",
    level: 80,
    category: "Language",
    accent: "#3178C6",
    desc: "Generics, type guards, interfaces, strict-mode DX",
  },
  {
    tag: "TW",
    name: "Tailwind CSS",
    level: 88,
    category: "Styling",
    accent: "#06B6D4",
    desc: "Utility-first, custom config, design systems, responsive",
  },
  {
    tag: "▲",
    name: "Node.js",
    level: 82,
    category: "Backend",
    accent: "#68A063",
    desc: "REST APIs, Express, authentication, serverless functions",
  },
  {
    tag: "🐍",
    name: "Python",
    level: 75,
    category: "Language",
    accent: "#4B8BBE",
    desc: "Scripting, automation, ML basics, FastAPI",
  },
  {
    tag: "AI",
    name: "OpenAI API",
    level: 85,
    category: "AI Tools",
    accent: "#00F5FF",
    desc: "GPT-4o, embeddings, function calling, AI-native pipelines",
  },
  {
    tag: "DB",
    name: "MongoDB",
    level: 78,
    category: "Database",
    accent: "#47A248",
    desc: "Schema design, aggregation pipelines, indexes, Atlas",
  },
];

/* ─── Individual Skill Card ─────────────────────────────────────── */
function SkillCard({ skill, index }) {
  const cardRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const bar = barRef.current;

    /* Scroll-triggered card reveal with stagger offset */
    gsap.fromTo(
      card,
      { opacity: 0, y: 55, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
        delay: (index % 4) * 0.1,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );

    /* Animated progress bar fill */
    gsap.fromTo(
      bar,
      { width: "0%" },
      {
        width: `${skill.level}%`,
        duration: 1.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    /* GSAP hover — subtle lift */
    const onEnter = () =>
      gsap.to(card, { y: -7, scale: 1.025, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    const onLeave = () =>
      gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [index, skill.level]);

  return (
    <div
      ref={cardRef}
      className="glass rounded-2xl p-6 cursor-default border border-glass transition-colors duration-500 hover:border-white/10"
    >
      {/* Icon tile */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base mb-4 select-none border border-white/5 bg-white/[0.03]"
        style={{ color: skill.accent }}
      >
        {skill.tag}
      </div>

      {/* Name + category */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className="text-white font-bold text-base leading-snug tracking-tight">{skill.name}</h3>
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 border border-white/5 opacity-40"
          style={{ color: skill.accent }}
        >
          {skill.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-500 text-xs leading-relaxed mb-5">{skill.desc}</p>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div
            ref={barRef}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${skill.accent}88, ${skill.accent})`,
              width: 0,
            }}
          />
        </div>
        <span className="text-xs font-mono text-slate-500 w-8 text-right tabular-nums">
          {skill.level}%
        </span>
      </div>
    </div>
  );
}

/* ─── Skills Section ────────────────────────────────────────────── */
export default function Skills() {
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
    <section id="skills" ref={sectionRef} className="relative py-28 bg-dark-900">
      {/* Edge fades to blend with adjacent sections */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-dark-950 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />

      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,136,255,0.07) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section heading */}
        <div ref={headRef} className="text-center mb-16">
          <span className="inline-block font-mono text-xs text-neon-cyan tracking-widest uppercase mb-4">
            Technical Proficiency
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            My <span className="text-white/40">Toolstack</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
            I specialize in building performant and scalable web applications using modern industry standards.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
