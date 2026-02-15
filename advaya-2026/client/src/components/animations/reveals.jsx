import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

import { SPRING, EASE } from "./constants.js";

/* ============================================================================
   REVEAL ANIMATIONS — Spring-physics smoke, scroll-aware reveals
   ============================================================================ */

/** Fade + rise like smoke from a yagna — now with spring physics */
export function YagnaReveal({
  children,
  delay = 0,
  className = "",
  y = 50,
  once = true,
  blur = 6,
}) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={
        prefersReduced
          ? { opacity: 0 }
          : { opacity: 0, y, filter: `blur(${blur}px)` }
      }
      whileInView={
        prefersReduced
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once, margin: "-60px" }}
      transition={{
        ...SPRING.gentle,
        delay,
        opacity: { duration: 0.6, delay },
        filter: { duration: 0.5, delay },
      }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/** Scale in from center — spring-powered divine manifestation */
export function DivineManifest({
  children,
  delay = 0,
  className = "",
}) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={
        prefersReduced
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.88, filter: "blur(10px)" }
      }
      whileInView={
        prefersReduced
          ? { opacity: 1 }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        ...SPRING.snappy,
        delay,
        opacity: { duration: 0.5, delay },
        filter: { duration: 0.4, delay },
      }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/** Slide in from the side — warrior entering the battlefield */
export function WarriorEntry({
  children,
  direction = "left",
  delay = 0,
  className = "",
}) {
  const prefersReduced = useReducedMotion();
  const x = direction === "left" ? -100 : 100;
  return (
    <motion.div
      initial={
        prefersReduced
          ? { opacity: 0 }
          : { opacity: 0, x, filter: "blur(4px)" }
      }
      whileInView={
        prefersReduced
          ? { opacity: 1 }
          : { opacity: 1, x: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        ...SPRING.gentle,
        delay,
        opacity: { duration: 0.5, delay },
        filter: { duration: 0.4, delay },
      }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/** Page transition — dual-curtain temple door reveal */
export function PageTransition({ children }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <motion.div
        className="fixed inset-0 z-[9998] pointer-events-none origin-top"
        style={{
          background:
            "linear-gradient(to bottom, #f3cf7a, #b08d32 40%, #1a1005 80%, #050505)",
        }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.65, ease: EASE.circ, delay: 0.05 }}
      />
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-[2px] z-[9997] pointer-events-none bg-gradient-to-r from-transparent via-[#f3cf7a] to-transparent"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE.smooth, delay: 0.3 }}
      />
      {children}
    </motion.div>
  );
}
