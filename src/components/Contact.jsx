import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cardRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slide up
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Info text fade right
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Contact card scale up
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 bg-dark-950 overflow-hidden">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 right-[-10%] w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,136,255,0.06) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">

        {/* Section Heading */}
        <div ref={headRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 glass text-neon-cyan text-[10px] font-bold tracking-wider uppercase mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-cyan" />
            </span>
            Accepting New Clients
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Ready to scale <span className="text-white/40">your business?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side: Sales Pitch */}
          <div ref={infoRef} className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="text-3xl font-bold text-white mb-6">
              Stop losing customers to slow, outdated websites.
            </h3>

            <ul className="space-y-3 mb-10 w-full max-w-md">
              <li className="flex items-center gap-3 glass p-4 rounded-xl border border-glass">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 text-neon-cyan flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-white font-bold text-sm">Speed is Revenue</span>
                  <span className="block text-slate-500 text-xs uppercase tracking-wide">Delivered in 3-7 days</span>
                </div>
              </li>

              <li className="flex items-center gap-3 glass p-4 rounded-xl border border-glass">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 text-neon-blue flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-white font-bold text-sm">High Conversion</span>
                  <span className="block text-slate-500 text-xs uppercase tracking-wide">Optimized for sales</span>
                </div>
              </li>

              <li className="flex items-center gap-3 glass p-4 rounded-xl border border-glass">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 text-neon-emerald flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-white font-bold text-sm">Risk-Free</span>
                  <span className="block text-slate-500 text-xs uppercase tracking-wide">Free consultation call</span>
                </div>
              </li>
            </ul>

            <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-neon-cyan" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> No upfront costs</span>
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-neon-cyan" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> SEO Optimized</span>
            </div>
          </div>

          {/* Right Side: Contact Form / Lead Capture */}
          <div ref={cardRef} className="order-1 lg:order-2 w-full max-w-md mx-auto relative group">
            {/* Hover glow behind card */}
            <div className="absolute inset-0 bg-neon-blue rounded-3xl opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" />

            <div className="relative glass p-8 rounded-3xl border border-glass shadow-2xl backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-2">Claim your free strategy call</h3>
              <p className="text-sm text-slate-400 mb-6">Skip the guesswork and let's map out exactly what your business needs to grow.</p>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Tell me about your business goals..."
                    rows="3"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors resize-none"
                    required
                  />
                </div>

                <div className="pt-2">
                  <MagneticButton className="w-full block">
                    <button
                      type="submit"
                      className="
                       w-full relative inline-flex items-center justify-center gap-2
                       px-8 py-4 rounded-xl
                       font-bold text-base text-dark-950
                       bg-white transition-all duration-300 hover:scale-[1.02] active:scale-95
                     "
                    >
                      Send Message
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </MagneticButton>
                </div>
              </form>
              <p className="text-center text-xs text-slate-500 mt-4 font-mono">
                Only 2 spots left this week.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
