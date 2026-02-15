/* ──────────────────────────────────────────────────────────────────────────────
   ADVAYA MOTION SYSTEM v2 — Barrel re-export
   Split into focused modules for better code-splitting and tree-shaking.
   Import from this file for backwards compatibility, or directly from
   sub-modules for smaller bundles.
   ────────────────────────────────────────────────────────────────────────────── */

// Constants (no React/Framer dependency)
export { SPRING, EASE } from "./constants.js";

// Reveal animations
export { YagnaReveal, DivineManifest, WarriorEntry, PageTransition } from "./reveals.jsx";

// Text effects
export {
  staggerContainer,
  staggerItem,
  staggerFast,
  SplitText,
  SacredText,
  TextShimmer,
  HoverText,
  ScrollText,
} from "./textEffects.jsx";

// Decorators
export { GoldenDivider, CountUp } from "./decorators.jsx";
