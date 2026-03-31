import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "9712376801"; // +91 is already included in the stored number

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function makeWhatsAppUrl(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function ServiceCard({
  index,
  tag,
  title,
  subtitle,
  bullets,
  timeline,
  accentColor,
  ctaText,
  ctaMessage,
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (prefersReducedMotion()) {
      gsap.set(card, { opacity: 1, y: 0, scale: 1, clearProps: "transform,opacity" });
      return;
    }

    const canHover =
      typeof window !== "undefined" && window.matchMedia?.("(hover: hover)").matches;

    gsap.fromTo(
      card,
      { opacity: 0, y: 45, scale: 0.985 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: "power3.out",
        delay: index * 0.05,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );

    if (canHover) {
      const onEnter = () => gsap.to(card, { y: -7, scale: 1.01, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      const onLeave = () => gsap.to(card, { y: 0, scale: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      };
    }
  }, [index]);

  const waUrl = useMemo(() => makeWhatsAppUrl(ctaMessage), [ctaMessage]);

  return (
    <div
      ref={cardRef}
      className="glass rounded-3xl p-7 border border-glass transition-colors duration-500 hover:border-white/10 min-h-[320px]"
      style={{ boxShadow: "0 4px 28px rgba(0,0,0,0.35)" }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          aria-hidden
          className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 bg-white/[0.03]"
          style={{ color: accentColor }}
        >
          <span className="font-bold text-xs tracking-wider uppercase">{tag}</span>
        </div>
        <div className="min-w-0">
          <h3 className="text-2xl font-bold text-white leading-snug">{title}</h3>
          <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
        </div>
      </div>

      <ul className="space-y-2 text-sm text-slate-400">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span
              aria-hidden
              className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: accentColor }}
            />
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 glass border border-white/5 rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Timeline</span>
          <span className="text-sm font-medium" style={{ color: accentColor }}>
            {timeline}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <MagneticButton className="w-full block">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full relative inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-dark-950 bg-white transition-all duration-300 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900"
            style={{
              boxShadow: `0 0 24px 0 ${accentColor}25`,
            }}
            aria-label={ctaText}
          >
            {ctaText}
          </a>
        </MagneticButton>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          clearProps: "transform,opacity",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const websiteMessage = `Hi Sohail! 👋
I need a website for my local business.
My business type: (clinic/salon/coaching/shop/service)
Pages: (1 page / 3-5 pages / more)
Goal: more calls and leads
Budget: ₹5000+ (approx)
Please share timeline and total price.`;

  const automationMessage = `Hi Sohail! 👋
I need AI automation for my business.
Use case: (lead follow-up / support FAQ / content drafts)
My problem now: (write 1-2 lines)
Goal: faster replies + less manual work
Budget: ₹5000+ (approx)
Please suggest the best solution and timeline.`;

  const googleMessage = `Hi Sohail! 👋
I need Google Business Profile help.
Business type: (clinic/salon/coaching/shop/service)
City: (your city)
Goal: more visibility on Google Maps / local search
Budget: ₹5000+ (approx)
Please share what you will do and timeline.`;

  const seoMessage = `Hi Sohail! 👋
I need indexing + SEO setup for my website.
My website link: (paste link)
I have Google Search Console: (yes/no)
Goal: better indexing on Google
Budget: ₹5000+ (approx)
Please share timeline and what you will do.`;

  return (
    <section id="services" ref={sectionRef} className="relative py-28 bg-dark-900 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-dark-950 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div ref={headRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Websites <span className="text-white/40">•</span> AI Automation{" "}
            <span className="text-white/40">•</span> Google Business{" "}
            <span className="text-white/40">•</span> Indexing / SEO
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm font-medium mb-4">
            Pick what your business actually needs right now.
          </p>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            I help local businesses get more calls and customers with a fast, clean website and smart automation.
          </p>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm mt-4">
            Prices start from ₹5,000+. Final price depends on your project size and needs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-stretch">
          <ServiceCard
            index={0}
            tag="WS"
            title="Business Website"
            subtitle="For leads and more calls"
            accentColor="#00f5ff"
            bullets={[
              "Get a clean, modern website that loads fast and works on mobile and desktop.",
              "Pages like Home / Services / About / Contact (as per your project)",
              "Contact form + WhatsApp / call button setup",
              "Basic SEO setup (title, description, clean structure)",
              "Fast loading and modern design",
            ]}
            timeline="3–7 days (small) / 7–14 days (multi-page)"
            ctaText="WhatsApp me to get a website"
            ctaMessage={websiteMessage}
          />
          <ServiceCard
            index={1}
            tag="AI"
            title="AI Automation"
            subtitle="Daily work, less manual effort"
            accentColor="#0088ff"
            bullets={[
              "Save time with AI replies, so you can respond to leads faster.",
              "FAQ / support answers flow (common questions answered faster)",
              "Lead follow-up help (faster response after inquiry)",
              "Content help (drafts for posts, website text, proposals, messages)",
              "Automation ideas to reduce daily work",
            ]}
            timeline="1–4 days (depends on the use-case)"
            ctaText="WhatsApp me my automation problem"
            ctaMessage={automationMessage}
          />
          <ServiceCard
            index={2}
            tag="GBP"
            title="Google Business"
            subtitle="For Google Maps and local search"
            accentColor="#00ffa3"
            bullets={[
              "Help people find you on Google Maps and local search.",
              "Correct categories and services (basic optimization)",
              "Photo and content guidance",
              "Posting plan suggestions",
              "Review and visibility improvement process",
            ]}
            timeline="2–5 days"
            ctaText="WhatsApp me to improve my Google presence"
            ctaMessage={googleMessage}
          />
          <ServiceCard
            index={3}
            tag="SEO"
            title="Indexing + SEO"
            subtitle="So Google can find you"
            accentColor="#39ff14"
            bullets={[
              "Set up indexing and basic SEO so Google can read your pages.",
              "Sitemap submission",
              "Basic on-page SEO fixes (titles, structure, search-friendly setup)",
              "Indexing checks and initial improvements",
              "Note: Google indexing takes time. Correct setup is done.",
            ]}
            timeline="1–3 days (setup) + optional ongoing"
            ctaText="WhatsApp me for indexing / SEO setup"
            ctaMessage={seoMessage}
          />
        </div>

        {/* How it works */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="glass border border-glass rounded-3xl p-7">
            <h3 className="text-2xl font-bold text-white mb-3">How it works (Simple)</h3>
            <ol className="space-y-3 text-sm text-slate-300 list-decimal pl-5">
              <li>You tell me your business + goal (calls, leads, visibility, automation).</li>
              <li>I confirm scope and timeline (what you need, what you will get).</li>
              <li>I build / set up (website, automation, Google profile, or SEO setup).</li>
              <li>You review and we finalize. I guide you on next steps.</li>
            </ol>
          </div>

          {/* FAQ */}
          <div className="glass border border-glass rounded-3xl p-7">
            <h3 className="text-2xl font-bold text-white mb-3">FAQ (Simple)</h3>
            <div className="space-y-4">
              <div>
                <p className="text-white font-bold text-sm">Do you work for all cities?</p>
                <p className="text-slate-400 text-sm mt-1">Yes, I can work with clients from any city (online).</p>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Do you provide hosting/domain?</p>
                <p className="text-slate-400 text-sm mt-1">I can help, but depends on your project.</p>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Is there a guarantee for ranking on Google?</p>
                <p className="text-slate-400 text-sm mt-1">No. But I do correct setup for indexing and basic SEO.</p>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Do you write content too?</p>
                <p className="text-slate-400 text-sm mt-1">I can help with drafts and structure. You share your business details.</p>
              </div>
              <div>
                <p className="text-white font-bold text-sm">How many revisions?</p>
                <p className="text-slate-400 text-sm mt-1">Usually 2 rounds (depends on project scope).</p>
              </div>
              <div>
                <p className="text-white font-bold text-sm">How do we start?</p>
                <p className="text-slate-400 text-sm mt-1">You send details on WhatsApp. I confirm scope, timeline, and the next steps.</p>
              </div>
              <div>
                <p className="text-white font-bold text-sm">What do you need from me?</p>
                <p className="text-slate-400 text-sm mt-1">
                  For websites: business info, logo/photos, and what pages you want. For SEO/indexing: your site link and access to Search Console (if you have it).
                </p>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Can you work with an existing website?</p>
                <p className="text-slate-400 text-sm mt-1">Yes. I can update/design improvements, and I can also do indexing/SEO setup for your existing site.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

