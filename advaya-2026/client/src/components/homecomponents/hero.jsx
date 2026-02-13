"use client";

import React from "react";

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
      
      {/* --- INTENSIFIED BACKGROUND GLOW --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-80 bg-[#f3cf7a]/20 blur-[120px] rounded-full animate-pulse z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#b08d32]/10 blur-[160px] rounded-full z-0 opacity-60" />

      {/* --- LOGO UNIT --- */}
      <div className="relative group cursor-crosshair z-10 flex items-center justify-center">
        
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

  {/* MAIN LOGO — MUCH BIGGER */}
  <img 
    src="/logomain.png" 
    alt="Main Logo" 
    className="h-[230px] md:h-[220px] w-auto object-contain 
    drop-shadow-[0_0_30px_rgba(243,207,122,0.6)] 
    transition-all duration-700 
    group-hover:scale-110"
    />

  {/* 2026 LOGO — SMALL + NO GAP */}
  <div className="flex justify-center">

  <img 
    src="/2026logo.png" 
    alt="2026 Logo" 
    className="h-5 md:h-6 w-auto object-contain 
    -mt-20 opacity-90 brightness-110  "
    />
    </div>
    </div>
</div>

      </div>

      {/* --- TEXT UNIT --- */}
      <div className="mt-20 text-center z-10 px-6 max-w-4xl">

        {/* The Golden Line with center Diamond */}
        <div className="relative h-[1px] w-108 md:w-96 mx-auto mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f3cf7a] to-transparent shadow-[0_0_10px_#f3cf7a] opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border border-[#f3cf7a] bg-[#050505] shadow-[0_0_10px_#f3cf7a]" />
        </div>

        {/* Description Section */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <p className="text-lg md:text-2xl leading-relaxed text-white font-serif italic tracking-wide">
            "A <span className="text-[#f3cf7a]">flagship technical symposium</span> where ancient myths collide with the digital frontier."
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs md:text-sm leading-relaxed text-white/50 uppercase tracking-[0.15em] font-medium max-w-2xl">
              Advaya 2K26 provides a competitive stage for students across the region to showcase their skills in 
              <span className="text-white/80 italic"> software development</span>, 
              <span className="text-white/80 italic"> problem-solving</span>, and 
              <span className="text-white/80 italic"> surprise events</span>.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-30 animate-pulse">
            <span className="text-[9px] tracking-[0.8em] uppercase text-[#f3cf7a]">Enter the Arena</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#f3cf7a] to-transparent" />
        </div>
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