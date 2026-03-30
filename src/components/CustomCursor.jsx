import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Check if device has a touch screen vs mouse
    const matchMedia = window.matchMedia("(pointer: fine)");
    setIsDesktop(matchMedia.matches);

    if (!matchMedia.matches) return; // Don't run cursor logic on mobile

    // Hide default cursor globally
    document.body.style.cursor = "none";

    // Setup GSAP QuickSetters for performance
    const cursorX = gsap.quickSetter(cursorRef.current, "x", "px");
    const cursorY = gsap.quickSetter(cursorRef.current, "y", "px");
    const followerX = gsap.quickSetter(followerRef.current, "x", "px");
    const followerY = gsap.quickSetter(followerRef.current, "y", "px");

    let mouse = { x: 0, y: 0 };
    let follower = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // Instant update for the dot
      cursorX(mouse.x);
      cursorY(mouse.y);
    };

    // Ticker for smooth follower interpolation
    gsap.ticker.add(() => {
      // LERP formula: current = current + (target - current) * ease
      follower.x += (mouse.x - follower.x) * 0.15;
      follower.y += (mouse.y - follower.y) * 0.15;
      followerX(follower.x);
      followerY(follower.y);
    });

    window.addEventListener("mousemove", onMouseMove);

    // Hover state detection for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive");

      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      {/* Main dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-neon-cyan rounded-full pointer-events-none z-[10000] mix-blend-screen"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Trailing follower */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-neon-cyan pointer-events-none z-[9999] transition-all duration-300 ${isHovering ? "scale-150 bg-neon-cyan/20 border-transparent blur-[2px]" : "scale-100"
          }`}
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
