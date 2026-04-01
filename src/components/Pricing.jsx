import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const PACKAGES = [
  {
    name: "Basic Website",
    price: "₹8,000",
    description: "Perfect for local businesses needing a fast online presence.",
    features: [
      "Up to 3 Pages",
      "Modern & Mobile Responsive",
      "WhatsApp & Contact Form",
      "Basic SEO Setup",
      "Delivery in 3–5 Days",
    ],
    highlight: false,
    cta: "Start Basic",
  },
  {
    name: "Premium Business",
    price: "₹15,000",
    description: "High-converting website optimized for sales and leads.",
    features: [
      "Up to 8 Pages",
      "Custom Design & Animations",
      "CMS / Admin Panel Setup",
      "Advanced SEO & Speed",
      "Delivery in 1–2 Weeks",
    ],
    highlight: true,
    cta: "Go Premium",
  },
  {
    name: "Custom Web App",
    price: "Custom",
    description: "Complex platforms with databases, users, & payments.",
    features: [
      "Full Stack Development",
      "Payment Gateway Integration",
      "User Authentication",
      "Scalable Architecture",
      "Custom Timeline",
    ],
    highlight: false,
    cta: "Get a Quote",
  },
];

export default function Pricing() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
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
    <section id="pricing" ref={sectionRef} className="relative py-24 bg-dark-950 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 glass text-neon-cyan text-[10px] font-bold tracking-wider uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan inline-block" />
            Transparent Pricing
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Simple pricing, <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              no surprises.
            </span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Choose a package that fits your business needs. Quality work guaranteed at every level.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {PACKAGES.map((pkg, idx) => (
            <div
              key={pkg.name}
              className={`pricing-card relative flex flex-col p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 ${
                pkg.highlight
                  ? "glass border-2 border-neon-cyan/50 shadow-[0_0_30px_rgba(0,245,255,0.1)] transform md:-translate-y-4 hover:shadow-[0_0_40px_rgba(0,245,255,0.2)]"
                  : "glass border border-white/10 hover:border-white/20"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-cyan text-dark-950 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">{pkg.description}</p>
              
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white tracking-tight">{pkg.price}</span>
                {pkg.price !== "Custom" && <span className="text-slate-500 text-sm">/starting</span>}
              </div>

              <div className="w-full h-px bg-white/10 mb-6" />

              <ul className="space-y-4 mb-8 flex-1">
                {pkg.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-neon-cyan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300 text-sm">{feat}</span>
                  </li>
                ))}
              </ul>

              <MagneticButton className="w-full">
                <a
                  href="#contact"
                  className={`w-full flex items-center justify-center py-3.5 rounded-xl font-bold transition-all duration-300 uppercase tracking-wider text-sm ${
                    pkg.highlight
                      ? "bg-neon-cyan text-dark-950 hover:bg-white hover:scale-105 active:scale-95 shadow-lg"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-105 active:scale-95"
                  }`}
                >
                  {pkg.cta}
                </a>
              </MagneticButton>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
