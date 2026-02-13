"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GoldenDivider,
  YagnaReveal,
  SplitText,
  TextShimmer,
  SPRING,
} from "../animations/MythologyMotion";

export default function Hero() {
  // Stadium dimensions
  const width = 450;  
  const height = 180; 
  const strokeWidth = 2;
  
  // Perfect circular sides (Stadium/Capsule Shape)
  const borderRadius = height / 2; 
  
  // Precise perimeter calculation
  const flatWidth = width - height;
  const perimeter = (2 * flatWidth) + (Math.PI * height);

  return (
    <div className="flex flex-col items-center justify-center mb-32 mt-12 relative min-h-[600px]">
      
      {/* --- BACKGROUND GLOW --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#b08d32]/10 blur-[160px] rounded-full z-0 opacity-60" />

      {/* --- LOGO UNIT --- */}
      <div className="z-10">
        <div className="relative group cursor-crosshair flex items-center justify-center">
        
          {/* THE BORDER SYSTEM */}
          <div className="absolute pointer-events-none" style={{ width: width, height: height }}>
            <svg 
              width="100%" 
              height="100%" 
              viewBox={`0 0 ${width} ${height}`}
              className="overflow-visible"
            >
              {/* 1. THE STATIC BORDER */}
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

              {/* 2. THE DUAL ANIMATED SNAKES */}
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
                  filter: "drop-shadow(0 0 12px #f3cf7a) drop-shadow(0 0 4px #f3cf7a)"
                }}
              />
            </svg>
          </div>

          {/* Logo Container */}
          <div 
            className="relative bg-[#050505]/90 backdrop-blur-3xl 
                       border border-white/5 
                       shadow-[0_0_50px_rgba(0,0,0,0.8)] 
                       flex flex-col items-center justify-center 
                       transition-all duration-700 
                       group-hover:bg-[#050505]/95"
            style={{ 
              width: width - 10, 
              height: height - 10,
              borderRadius: (height - 20) / 2 
            }} 
          >
            <div className="pb-1">
              {/* MAIN LOGO */}
              <img 
                src="/logomain.png" 
                alt="Main Logo" 
                className="h-[230px] md:h-[220px] w-auto object-contain 
                drop-shadow-[0_0_30px_rgba(243,207,122,0.6)] 
                transition-all duration-700 
                group-hover:scale-110"
              />

              {/* 2026 LOGO */}
              <div className="flex justify-center">
                <img 
                  src="/2026logo.png" 
                  alt="2026 Logo" 
                  className="h-5 md:h-6 w-auto object-contain 
                  -mt-20 opacity-90 brightness-110"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- TEXT UNIT with staggered reveal --- */}
      <div className="mt-20 text-center z-10 px-6 max-w-4xl">

        {/* Animated Golden Divider */}
        <GoldenDivider width="w-64 md:w-96" className="mb-12" />

        {/* Description Section with split-text character animation */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <YagnaReveal delay={0.3}>
            <p className="text-lg md:text-2xl leading-relaxed text-white font-serif italic tracking-wide">
              "A <TextShimmer>flagship technical symposium</TextShimmer> where ancient myths collide with the digital frontier."
            </p>
          </YagnaReveal>
          
          <YagnaReveal delay={0.5}>
            <div className="flex flex-col items-center gap-4">
              <p className="text-xs md:text-sm leading-relaxed text-white/50 uppercase tracking-[0.15em] font-medium max-w-2xl">
                Advaya 2K26 provides a competitive stage for students across the region to showcase their skills in 
                <span className="text-white/80 italic"> software development</span>, 
                <span className="text-white/80 italic"> problem-solving</span>, and 
                <span className="text-white/80 italic"> surprise events</span>.
              </p>
            </div>
          </YagnaReveal>
        </div>

        {/* Animated Scroll Indicator — smooth spring pulse */}
        <motion.div 
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ ...SPRING.gentle, delay: 1.2 }}
        >
          <motion.span 
            className="text-[9px] tracking-[0.8em] uppercase text-[#f3cf7a]"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Enter the Arena
          </motion.span>
          <motion.div 
            className="w-[1px] h-12 bg-gradient-to-b from-[#f3cf7a] to-transparent"
            animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes snake-travel-stadium {
          from {
            stroke-dashoffset: ${perimeter};
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}