"use client";

import { useRef, useEffect, useMemo, useCallback } from "react";
import {
  motion,
  useInView,
  useAnimation,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────────────
   ADVAYA MOTION SYSTEM v2 — Next-Level Text Motion Engine
   GPU-optimized · Spring physics · Character-level fx · Scroll-aware
   ────────────────────────────────────────────────────────────────────────────── */

/* Shared spring configs for consistent physics across the site */
const SPRING = {
  gentle: { type: "spring", stiffness: 100, damping: 30, mass: 1 },
  snappy: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 },
  bouncy: { type: "spring", stiffness: 300, damping: 20, mass: 0.5 },
  heavy:  { type: "spring", stiffness: 80,  damping: 40, mass: 1.5 },
};

/* Master easing curves */
const EASE = {
  smooth: [0.25, 0.46, 0.45, 0.94],   // Buttery scroll reveal
  expo:   [0.16, 1, 0.3, 1],           // Power entrance
  circ:   [0.76, 0, 0.24, 1],          // Curtain sweep
  back:   [0.34, 1.56, 0.64, 1],       // Overshoot snap
};

/* ============================================================================
   1. REVEAL ANIMATIONS — Spring-physics smoke, scroll-aware reveals
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

/* ============================================================================
   2. STAGGER SYSTEM — Cascading temple bells with spring physics
   ============================================================================ */

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ...SPRING.gentle,
      opacity: { duration: 0.5 },
      filter: { duration: 0.4 },
    },
  },
};

/** Fast stagger for dense lists */
export const staggerFast = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: SPRING.snappy,
    },
  },
};

/* ============================================================================
   3. SPLIT TEXT — Character-level animation (premium text effect)
   ============================================================================ */

/** Splits text into individually animated characters — the crown jewel */
export function SplitText({
  text,
  className = "",
  charClassName = "",
  delay = 0,
  staggerDelay = 0.03,
  once = true,
  animation = "rise", // "rise" | "fade" | "slide" | "wave"
}) {
  const prefersReduced = useReducedMotion();

  const chars = useMemo(() => {
    const result = [];
    let charIndex = 0;
    text.split(" ").forEach((word, wIdx) => {
      word.split("").forEach((char) => {
        result.push({ char, key: charIndex++, wordIdx: wIdx });
      });
      result.push({ char: "\u00A0", key: charIndex++, wordIdx: wIdx, isSpace: true });
    });
    return result;
  }, [text]);

  const variants = useMemo(() => {
    if (prefersReduced) {
      return {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.3 } },
      };
    }

    const map = {
      rise: {
        hidden: { opacity: 0, y: 40, rotateX: 40 },
        show: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: SPRING.snappy,
        },
      },
      fade: {
        hidden: { opacity: 0, filter: "blur(8px)" },
        show: {
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 0.5, ease: EASE.smooth },
        },
      },
      slide: {
        hidden: { opacity: 0, x: 30 },
        show: {
          opacity: 1,
          x: 0,
          transition: SPRING.gentle,
        },
      },
      wave: {
        hidden: { opacity: 0, y: 60, scaleY: 0.6 },
        show: {
          opacity: 1,
          y: 0,
          scaleY: 1,
          transition: SPRING.bouncy,
        },
      },
    };
    return map[animation] || map.rise;
  }, [animation, prefersReduced]);

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-40px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      style={{ perspective: 600 }}
      aria-label={text}
    >
      {chars.map((c) => (
        <motion.span
          key={c.key}
          variants={variants}
          className={`inline-block ${c.isSpace ? "" : charClassName}`}
          style={{
            willChange: "transform, opacity",
            transformOrigin: "center bottom",
          }}
        >
          {c.char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ============================================================================
   4. GOLDEN DIVIDER — Self-drawing sacred geometry with spring ornaments
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border border-[#f3cf7a] bg-[#050505]"
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
   5. SACRED TEXT — Word-by-word reveal with spring stagger
   ============================================================================ */

export function SacredText({ text, className = "", delay = 0 }) {
  const words = text.split(" ");
  return (
    <motion.div
      className={`flex flex-wrap gap-x-2 ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.04, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: SPRING.gentle,
            },
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ============================================================================
   6. SCROLL-LINKED TEXT — Text transforms driven by scroll position
   ============================================================================ */

export function ScrollText({
  children,
  className = "",
  effect = "parallax", // "parallax" | "reveal" | "scale"
  speed = 0.3,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], [80 * speed, -80 * speed]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.95]);

  const style = useMemo(() => {
    if (effect === "parallax") return { y, opacity };
    if (effect === "scale") return { scale, opacity };
    return { opacity };
  }, [effect, y, opacity, scale]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================================
   7. TEXT SHIMMER — Gradient sweep across text on scroll
   ============================================================================ */

export function TextShimmer({ children, className = "" }) {
  return (
    <motion.span
      className={`relative inline-block bg-gradient-to-r from-[#f3cf7a] via-[#fff8e1] to-[#f3cf7a] bg-[length:200%_100%] bg-clip-text text-transparent ${className}`}
      animate={{ backgroundPosition: ["0% center", "200% center"] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

/* ============================================================================
   8. COUNTER — Animated number count-up
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

/* ============================================================================
   9. HOVER TEXT — Premium interactive text hover effect
   ============================================================================ */

export function HoverText({
  children,
  className = "",
  glowColor = "rgba(243, 207, 122, 0.4)",
}) {
  return (
    <motion.span
      className={`inline-block cursor-default ${className}`}
      whileHover={{
        textShadow: `0 0 30px ${glowColor}, 0 0 60px ${glowColor}`,
        scale: 1.02,
      }}
      transition={SPRING.snappy}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.span>
  );
}

/* ============================================================================
   10. PAGE TRANSITION — Dual-curtain temple door reveal
   ============================================================================ */

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
      {/* Top curtain sweeps up */}
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
      {/* Bottom accent line sweeps in */}
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

/* ============================================================================
   EXPORTS: Spring configs & easing for external use
   ============================================================================ */

export { SPRING, EASE };
