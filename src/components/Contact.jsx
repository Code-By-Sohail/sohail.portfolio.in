import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cardRef = useRef(null);

  const WHATSAPP_NUMBER = "9712376801";

  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    serviceNeeded: "",
    budget: "",
    goals: "",
  });

  const baseWhatsAppText = useMemo(() => {
    return `Hi Sohail! 👋
Name: ${form.name || "[Your Name]"}
WhatsApp: ${form.whatsapp || "[Your Number]"}
Service needed: ${form.serviceNeeded || "[Service]"}
Budget: ${form.budget || "[Budget range]"}
Goal: ${form.goals || "[Business goal]"}
`;
  }, [form]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slide up
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headRef.current,
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
          duration: 0.45,
          ease: "power3.out",
          delay: 0.1,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(baseWhatsAppText);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
            Available for Freelance Work
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Let's build something <span className="text-white/40">awesome together.</span>
          </h2>
        </div>

        <div className="flex justify-center">

          {/* Contact Form / Lead Capture */}
          <div ref={cardRef} className="w-full max-w-4xl mx-auto relative group">
            {/* Hover glow behind card */}
            <div className="absolute inset-0 bg-neon-blue rounded-3xl opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" />

            <div className="relative glass p-7 rounded-3xl border border-glass shadow-2xl backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-2">Hire me for your next project</h3>
              <p className="text-sm text-slate-400 mb-6">
                Tell me about your idea, and I'll get back to you with a free quote and timeline.
              </p>


              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Row 1: Name + WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp number"
                    value={form.whatsapp}
                    onChange={(e) => setForm((prev) => ({ ...prev, whatsapp: e.target.value }))}
                    className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors"
                    required
                  />
                </div>

                {/* Row 2: Service + Budget dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Service dropdown */}
                  <div className="relative">
                    <select
                      value={form.serviceNeeded}
                      onChange={(e) => setForm((prev) => ({ ...prev, serviceNeeded: e.target.value }))}
                      className={`w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors appearance-none cursor-pointer ${form.serviceNeeded === "" ? "text-slate-600" : "text-white"}`}
                      required
                    >
                      <option value="" disabled className="bg-dark-950 text-slate-400">Service needed</option>
                      <option value="Business Website" className="bg-dark-950 text-white">Business Website</option>
                      <option value="AI Automation" className="bg-dark-950 text-white">AI Automation</option>
                      <option value="Google Business Profile" className="bg-dark-950 text-white">Google Business Profile</option>
                      <option value="SEO & Indexing" className="bg-dark-950 text-white">SEO & Indexing</option>
                      <option value="Other" className="bg-dark-950 text-white">Other / Not sure</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Budget dropdown */}
                  <div className="relative">
                    <select
                      value={form.budget}
                      onChange={(e) => setForm((prev) => ({ ...prev, budget: e.target.value }))}
                      className={`w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors appearance-none cursor-pointer ${form.budget === "" ? "text-slate-600" : "text-white"}`}
                      required
                    >
                      <option value="" disabled className="bg-dark-950 text-slate-400">Rough budget (₹)</option>
                      <option value="Under ₹5,000" className="bg-dark-950 text-white">Under ₹5,000</option>
                      <option value="₹5,000 – ₹10,000" className="bg-dark-950 text-white">₹5,000 – ₹10,000</option>
                      <option value="₹10,000 – ₹25,000" className="bg-dark-950 text-white">₹10,000 – ₹25,000</option>
                      <option value="₹25,000 – ₹50,000" className="bg-dark-950 text-white">₹25,000 – ₹50,000</option>
                      <option value="₹50,000+" className="bg-dark-950 text-white">₹50,000+</option>
                      <option value="Not decided yet" className="bg-dark-950 text-white">Not decided yet</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Row 3: Goal textarea */}
                <textarea
                  placeholder="What's your main goal? (e.g. more calls, leads, online visibility...)"
                  rows="3"
                  value={form.goals}
                  onChange={(e) => setForm((prev) => ({ ...prev, goals: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors resize-none"
                  required
                />

                <div className="pt-2">
                  <MagneticButton className="w-full block">
                    <button
                      type="submit"
                      className="
                       w-full relative inline-flex items-center justify-center gap-2
                       px-8 py-4 rounded-xl
                       font-bold text-base text-dark-950
                       bg-white transition-all duration-300 hover:scale-[1.02] active:scale-95
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950
                     "
                    >
                      Send on WhatsApp
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
