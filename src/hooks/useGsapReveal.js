import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * useGsapReveal — reusable hook for GSAP entrance animations.
 *
 * @param {object} fromVars   — gsap.from() starting state
 * @param {object} toVars     — gsap.to() / timeline vars (duration, ease, delay, stagger…)
 * @param {Array}  deps       — re-run dependencies (default: run once on mount)
 * @returns {React.RefObject} — attach to the element / wrapper you want to animate
 */
export function useGsapReveal(fromVars = {}, toVars = {}, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        ...fromVars,
        ...toVars,
      });
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * useGsapStagger — animate a list of child elements with a stagger.
 *
 * @param {string} selector  — CSS selector for children inside the container ref
 * @param {object} fromVars  — starting state
 * @param {object} toVars    — animation options incl. stagger
 * @param {Array}  deps
 */
export function useGsapStagger(selector, fromVars = {}, toVars = {}, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(selector, {
        ...fromVars,
        ...toVars,
      });
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
