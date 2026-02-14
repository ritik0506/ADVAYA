"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GoldenDivider,
  YagnaReveal,
  TextShimmer,
  SPRING,
} from "../animations/MythologyMotion";

export default function Hero() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive border dimensions
  const isMobile = windowWidth < 768; // Tailwind md breakpoint
  const width = isMobile ? 300 : 450;
  const height = isMobile ? 120 : 180;
  const strokeWidth = isMobile ? 1.5 : 2;
  const borderRadius = height / 2;

  const flatWidth = width - height;
  const perimeter = 2 * flatWidth + Math.PI * height;

  /* ================= COUNTDOWN ================= */
  const targetDate = new Date("2026-02-24T00:00:00");

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mb-32 mt-2 relative min-h-[600px]">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-80 bg-[#f3cf7a]/20 blur-[120px] rounded-full animate-pulse z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#b08d32]/10 blur-[160px] rounded-full z-0 opacity-60" />

      {/* ================= LOGO UNIT ================= */}
      <div className="relative group cursor-crosshair z-10 flex items-center justify-center">

        {/* BORDER SYSTEM */}
        <div className="absolute pointer-events-none" style={{ width, height }}>
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
            {/* Static border */}
            <rect
              x={strokeWidth / 2}
              y={strokeWidth / 2}
              width={width - strokeWidth}
              height={height - strokeWidth}
              rx={borderRadius}
              ry={borderRadius}
              fill="none"
              stroke="#f3cf7a"
              strokeWidth={1}
              className="opacity-20"
            />

            {/* Animated snake border */}
            <rect
              x={strokeWidth / 2}
              y={strokeWidth / 2}
              width={width - strokeWidth}
              height={height - strokeWidth}
              rx={borderRadius}
              ry={borderRadius}
              fill="none"
              stroke="#f3cf7a"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              style={{
                strokeDasharray: `${perimeter * 0.2} ${perimeter * 0.3} ${perimeter * 0.2} ${perimeter * 0.3}`,
                animation: "snake-travel-stadium 6s linear infinite",
                filter: "drop-shadow(0 0 12px #f3cf7a)",
              }}
            />
          </svg>
        </div>

        {/* LOGO CONTAINER */}
        <div
          className="relative bg-transparent backdrop-blur-3xl border border-white/5
                     shadow-[0_0_50px_rgba(0,0,0,0.8)]
                     flex flex-col items-center justify-center transition-all duration-700
                     group-hover:bg-transparent"
          style={{
            width: width - 10,
            height: height - 10,
            borderRadius: (height - 20) / 2,
          }}
        >
          <div className="pb-1">
            <img
              src="/logomain.png"
              alt="Main Logo"
              className={`h-[${isMobile ? "140px" : "230px"}] md:h-[220px] object-contain
              drop-shadow-[0_0_30px_rgba(243,207,122,0.6)]
              transition-all duration-700 group-hover:scale-110`}
            />

            <div className="flex justify-center">
              <img
                src="/2026logo.png"
                alt="2026 Logo"
                className="h-5 md:h-6 -mt-20 opacity-90 brightness-110"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= COUNTDOWN ================= */}
      <div className="mt-18 flex justify-center gap-6 md:gap-10 z-10">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="flex flex-col items-center">
            <div
              className="text-3xl md:text-5xl font-serif text-[#f3cf7a]
                         drop-shadow-[0_0_15px_rgba(243,207,122,0.7)]"
            >
              {String(value).padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm uppercase tracking-widest text-white/60">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* ================= TEXT SECTION ================= */}
        <GoldenDivider width="w-64 md:w-96" className="mb-8" />
      <div className="mt-2 text-center z-1 px-6 max-w-4xl">

        <div className="space-y-6 max-w-3xl mx-auto">
          <YagnaReveal delay={0.3}>
            <p className="text-lg md:text-2xl leading-relaxed text-white font-serif italic tracking-wide">
              "A <TextShimmer>flagship technical symposium</TextShimmer> where ancient myths collide with the digital frontier."
            </p>
          </YagnaReveal>

          <YagnaReveal delay={0.5}>
            <p className="text-xs md:text-sm leading-relaxed text-white/50 uppercase tracking-[0.15em] font-medium max-w-2xl mx-auto">
              Advaya 2K26 provides a competitive stage for students across the region to showcase their skills in
              <span className="text-white/80 italic"> software development</span>,
              <span className="text-white/80 italic"> problem-solving</span>, and
              <span className="text-white/80 italic"> surprise events</span>.
            </p>
          </YagnaReveal>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ ...SPRING.gentle, delay: 1.2 }}
        >
          <motion.span
            className="text-[9px] tracking-[0.8em] uppercase text-[#f3cf7a]"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Enter the Arena
          </motion.span>

          <motion.div
            className="w-[1px] h-12 bg-gradient-to-b from-[#f3cf7a] to-transparent"
            animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes snake-travel-stadium {
          from { stroke-dashoffset: ${perimeter}; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
