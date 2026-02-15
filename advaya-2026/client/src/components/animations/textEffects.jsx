import { useMemo } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

import { SPRING, EASE } from "./constants.js";

/* ============================================================================
   STAGGER SYSTEM — Cascading temple bells with spring physics
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
   SPLIT TEXT — Character-level animation (premium text effect)
   ============================================================================ */

/** Splits text into individually animated characters */
export function SplitText({
  text,
  className = "",
  charClassName = "",
  delay = 0,
  staggerDelay = 0.03,
  once = true,
  animation = "rise",
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
        show: { opacity: 1, y: 0, rotateX: 0, transition: SPRING.snappy },
      },
      fade: {
        hidden: { opacity: 0, filter: "blur(8px)" },
        show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE.smooth } },
      },
      slide: {
        hidden: { opacity: 0, x: 30 },
        show: { opacity: 1, x: 0, transition: SPRING.gentle },
      },
      wave: {
        hidden: { opacity: 0, y: 60, scaleY: 0.6 },
        show: { opacity: 1, y: 0, scaleY: 1, transition: SPRING.bouncy },
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
          transition: { staggerChildren: staggerDelay, delayChildren: delay },
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
          style={{ willChange: "transform, opacity", transformOrigin: "center bottom" }}
        >
          {c.char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/** Word-by-word reveal with spring stagger */
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
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: SPRING.gentle },
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

/** Gradient sweep across text on scroll */
export function TextShimmer({ children, className = "" }) {
  return (
    <motion.span
      className={`relative inline-block bg-gradient-to-r from-[#f3cf7a] via-[#fff8e1] to-[#f3cf7a] bg-[length:200%_100%] bg-clip-text text-transparent ${className}`}
      animate={{ backgroundPosition: ["0% center", "200% center"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}

/** Premium interactive text hover */
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

/** Scroll-linked text transforms */
export function ScrollText({
  children,
  className = "",
  effect = "parallax",
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
