import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cardRef = useRef(null);

  const WHATSAPP_NUMBER = "9712376801"; // +91 included already (wa.me expects number without +)

  const [form, setForm] = useState({
    name: "",
    email: "",
    goals: "",
    businessName: "",
    businessType: "",
    city: "",
    serviceNeeded: "",
    mainGoal: "",
    hasWebsite: "",
    websiteLink: "",
    contactInfo: "",
    budget: "",
  });

  const baseWhatsAppText = useMemo(() => {
    // Simple English template with clear questions for the client.
    return `Hi Sohail! 👋
My name: ${form.name || "[Your Name]"}
Email: ${form.email || "[Your Email]"}
Business goals / short note: ${form.goals || "[Tell me about your business goals]"}

Please find my details below:
- Business name: ${form.businessName || "[Business name]"}
- Business type: ${form.businessType || "[clinic/salon/coaching/shop/other]"}
- City: ${form.city || "[City]"}
- Service needed: ${form.serviceNeeded || "[website / AI automation / Google business / indexing & SEO]"}
- Main goal: ${form.mainGoal || "[calls, leads, visibility, faster replies]"}
- Already have a website?: ${form.hasWebsite || "[yes/no]"}
- Website link: ${form.websiteLink || "[link if yes]"}
- WhatsApp number / preferred contact time: ${form.contactInfo || "[number + time]"}
- Rough budget (₹ range): ${form.budget || "[range]"}
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
          duration: 0.85,
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
                {/* Basic info */}
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
                    type="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors"
                    required
                  />
                </div>

                {/* Business info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Business name"
                    value={form.businessName}
                    onChange={(e) => setForm((prev) => ({ ...prev, businessName: e.target.value }))}
                    className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Business type (clinic/salon/coaching/shop/other)"
                    value={form.businessType}
                    onChange={(e) => setForm((prev) => ({ ...prev, businessType: e.target.value }))}
                    className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your city (optional)"
                    value={form.city}
                    onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                    className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Service needed (website / AI / Google / SEO)"
                    value={form.serviceNeeded}
                    onChange={(e) => setForm((prev) => ({ ...prev, serviceNeeded: e.target.value }))}
                    className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors"
                    required
                  />
                </div>

                {/* Goals & website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Main goal (calls, leads, visibility, speed)"
                    value={form.mainGoal}
                    onChange={(e) => setForm((prev) => ({ ...prev, mainGoal: e.target.value }))}
                    className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors"
                    required
                  />
                  <div className="relative">
                    <select
                      value={form.hasWebsite}
                      onChange={(e) => setForm((prev) => ({ ...prev, hasWebsite: e.target.value }))}
                      className={`w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors appearance-none cursor-pointer ${form.hasWebsite === "" ? "text-slate-600" : "text-white"}`}
                      required
                    >
                      <option value="" disabled className="bg-dark-950 text-slate-400">Do you already have a website?</option>
                      <option value="Yes" className="bg-dark-950 text-white">Yes, I have one</option>
                      <option value="No" className="bg-dark-950 text-white">No, starting from scratch</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Website link (if yes)"
                  value={form.websiteLink}
                  onChange={(e) => setForm((prev) => ({ ...prev, websiteLink: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors"
                />

                {/* Contact & budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="WhatsApp number / best time to contact"
                    value={form.contactInfo}
                    onChange={(e) => setForm((prev) => ({ ...prev, contactInfo: e.target.value }))}
                    className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Rough budget (₹ range)"
                    value={form.budget}
                    onChange={(e) => setForm((prev) => ({ ...prev, budget: e.target.value }))}
                    className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors"
                    required
                  />
                </div>

                {/* Notes */}
                <textarea
                  placeholder="Tell me about your business goals in 2–3 lines..."
                  rows="2"
                  value={form.goals}
                  onChange={(e) => setForm((prev) => ({ ...prev, goals: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors resize-none"
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
