import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote:
      "Sohail ne hamare gym ka poora system banaya — members, invoices, shop sab. Kaam bahut professional tha aur time pe deliver kiya. Highly recommended!",
    name: "Sonu Fitness",
    role: "Gym Owner, Surat",
    initial: "SF",
    gradient: "from-cyan-400 to-blue-500",
    stars: 5,
  },
  {
    quote:
      "Website bahut fast aur clean bani. Customers ne bhi compliment kiye. Sohail ne exactly wahi banaya jo main chahta tha, bina bakwaas ke.",
    name: "Local Business Client",
    role: "E-commerce Store Owner",
    initial: "LB",
    gradient: "from-emerald-400 to-cyan-500",
    stars: 5,
  },
  {
    quote:
      "SEO aur Google Business setup bahut helpful raha. Ab hamari shop Google pe dikh rahi hai. Simple process, great results.",
    name: "Service Business",
    role: "Salon Owner, Gujarat",
    initial: "SB",
    gradient: "from-violet-400 to-blue-500",
    stars: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
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
    <section id="testimonials" ref={sectionRef} className="relative py-24 bg-dark-950 overflow-hidden">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 glass text-neon-cyan text-[10px] font-bold tracking-wider uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan inline-block" />
            Client Reviews
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            What clients{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              say about me
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-base max-w-xl mx-auto">
            Real feedback from real businesses I've worked with.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ quote, name, role, initial, gradient, stars }) => (
            <div
              key={name}
              className="testimonial-card group relative flex flex-col glass border border-white/8 rounded-3xl p-7 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: stars }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="relative text-slate-300 text-sm leading-relaxed flex-1 mb-6">
                <span className="absolute -top-2 -left-1 text-4xl text-white/10 font-serif leading-none select-none">"</span>
                <span className="relative">{quote}</span>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                  {initial}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{name}</p>
                  <p className="text-slate-500 text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust line */}
        <p className="text-center text-slate-600 text-xs font-mono mt-10">
          ✓ All reviews are from real clients I've worked with personally.
        </p>
      </div>
    </section>
  );
}
