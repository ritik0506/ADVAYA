/* Shared spring configs for consistent physics across the site */
export const SPRING = {
  gentle: { type: "spring", stiffness: 100, damping: 30, mass: 1 },
  snappy: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 },
  bouncy: { type: "spring", stiffness: 300, damping: 20, mass: 0.5 },
  heavy:  { type: "spring", stiffness: 80,  damping: 40, mass: 1.5 },
};

/* Master easing curves */
export const EASE = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  expo:   [0.16, 1, 0.3, 1],
  circ:   [0.76, 0, 0.24, 1],
  back:   [0.34, 1.56, 0.64, 1],
};
