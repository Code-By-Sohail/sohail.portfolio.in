import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({ children, className = "", ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const handleMouseMove = (e) => {
    if (!ref.current || !isDesktop) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    // Calculate center of button
    const middleX = left + width / 2;
    const middleY = top + height / 2;

    // Calculate offset based on mouse position from center
    const x = (clientX - middleX) * 0.2; // Adjust multiplier for stronger/weaker effect
    const y = (clientY - middleY) * 0.2;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={isDesktop ? { x: position.x, y: position.y } : { x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
