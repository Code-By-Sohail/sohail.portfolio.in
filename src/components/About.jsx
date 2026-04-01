import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = ["React", "Next.js", "Node.js", "Firebase", "Tailwind CSS", "React Native", "MongoDB", "OpenAI API"];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 bg-dark-950 overflow-hidden">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,136,255,0.07) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div>
            <div className="about-reveal">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 glass text-neon-cyan text-[10px] font-bold tracking-wider uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan inline-block" />
                About Me
              </span>
            </div>

            <h2 className="about-reveal text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
              A developer who{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                builds results,
              </span>{" "}
              not just websites.
            </h2>

            <div className="about-reveal space-y-4 text-slate-400 text-base leading-relaxed">
              <p>
                Hi! I'm <span className="text-white font-semibold">Sohail</span>, a self-taught full-stack developer from India. I started coding to solve real problems — and that's still what drives me.
              </p>
              <p>
                I specialize in building <span className="text-white font-medium">fast, modern, and business-focused</span> websites and apps. Every project I take on is treated like it's my own business — with care, speed, and results in mind.
              </p>
              <p>
                I've built gym management systems, e-commerce platforms, and automation tools for real clients. My goal is simple: help businesses grow with the right technology.
              </p>
            </div>

            {/* CTA */}
            <div className="about-reveal mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-dark-950 text-sm font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Work with me
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href="https://github.com/Code-By-Sohail"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 text-white text-sm font-bold uppercase tracking-wider hover:border-white/30 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Right: Skills grid + card */}
          <div className="about-reveal">
            {/* Info card */}
            <div className="glass border border-white/8 rounded-3xl p-8 mb-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Based in</p>
                  <p className="text-white font-semibold">India 🇮🇳</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Experience</p>
                  <p className="text-white font-semibold">2+ Years</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Availability</p>
                  <p className="text-neon-cyan font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse inline-block" />
                    Open to work
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Languages</p>
                  <p className="text-white font-semibold">Hindi, English</p>
                </div>
              </div>
            </div>

            {/* Skills chips */}
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-xs font-mono font-medium text-slate-300 glass border border-white/8 hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
