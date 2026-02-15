import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { SPRING, EASE } from "./constants.js";

/* ============================================================================
   GOLDEN DIVIDER — Self-drawing sacred geometry with spring ornaments
   ============================================================================ */

export function GoldenDivider({ width = "w-64", className = "" }) {
  return (
    <motion.div
      className={`relative h-[1px] ${width} mx-auto my-8 ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE.circ }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f3cf7a] to-transparent" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border border-[#f3cf7a] bg-transparent"
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true }}
        transition={{ ...SPRING.bouncy, delay: 0.6 }}
      />
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#f3cf7a]/60"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ ...SPRING.bouncy, delay: 1 }}
      />
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#f3cf7a]/60"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ ...SPRING.bouncy, delay: 1 }}
      />
    </motion.div>
  );
}

/* ============================================================================
   COUNTER — Animated number count-up
   ============================================================================ */

export function CountUp({
  target,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 60, damping: 25 });
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (isInView) {
      count.set(target);
    }
  }, [isInView, target, count]);

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}
