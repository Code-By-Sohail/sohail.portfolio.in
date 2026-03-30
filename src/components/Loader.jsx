import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const barFillRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    // Lock body scroll while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete?.();
      },
    });

    // 1. Logo appears
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 24, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
    );

    // 2. Progress bar fills + counter runs from 0 → 100
    tl.to(
      barFillRef.current,
      { width: "100%", duration: 1.0, ease: "power1.inOut" },
      "-=0.1"
    );
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 1.0,
        ease: "power1.inOut",
        onUpdate() {
          if (countRef.current) {
            countRef.current.textContent = `${Math.round(this.targets()[0].val)}%`;
          }
        },
      },
      "<"
    );

    // 3. Logo fades up
    tl.to(logoRef.current, { opacity: 0, y: -20, duration: 0.35, ease: "power2.in" }, "+=0.1");

    // 4. Overlay slides up to reveal page
    tl.to(
      overlayRef.current,
      {
        yPercent: -100,
        duration: 0.75,
        ease: "power4.inOut",
      },
      "-=0.15"
    );

    return () => { tl.kill(); document.body.style.overflow = ""; };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-950"
      aria-label="Loading"
      aria-live="polite"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(180,79,255,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <div ref={logoRef} className="relative z-10 text-center mb-10">
        <div className="font-mono text-4xl font-black tracking-tight">
          <span className="text-neon-cyan">&lt;</span>
          <span className="text-white"> dev </span>
          <span className="text-neon-purple">/&gt;</span>
        </div>
        <p className="text-slate-500 text-xs font-mono mt-2 tracking-widest uppercase">
          Portfolio
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-48">
        <div className="h-px bg-white/10 rounded-full overflow-hidden">
          <div
            ref={barFillRef}
            className="h-full rounded-full"
            style={{
              width: "0%",
              background: "linear-gradient(90deg, #00f5ff, #b44fff)",
              boxShadow: "0 0 10px rgba(0,245,255,0.6)",
            }}
          />
        </div>
        <div className="flex justify-end mt-2">
          <span ref={countRef} className="text-xs font-mono text-slate-500 tabular-nums">
            0%
          </span>
        </div>
      </div>
    </div>
  );
}
