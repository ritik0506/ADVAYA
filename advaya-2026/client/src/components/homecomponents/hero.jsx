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
    <div className="flex flex-col items-center justify-center mb-32 mt-12 relative min-h-[500px]">
      
      {/* --- INTENSIFIED BACKGROUND GLOW (Behind everything) --- */}
      {/* Layer 1: Central Golden Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-80 bg-[#f3cf7a]/20 blur-[120px] rounded-full animate-pulse z-0" />
      
      {/* Layer 2: Wide Deep Amber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#b08d32]/10 blur-[160px] rounded-full z-0 opacity-60" />

      {/* --- LOGO UNIT --- */}
      <div className="relative group cursor-crosshair z-10 flex items-center justify-center">
        
        {/* THE BORDER SYSTEM (Always Visible + 2 Animated Snakes) */}
        <div className="absolute pointer-events-none" style={{ width: width, height: height }}>
          <svg 
            width="100%" 
            height="100%" 
            viewBox={`0 0 ${width} ${height}`}
            className="overflow-visible"
          >
            {/* 1. THE STATIC BORDER (Always visible) */}
            <rect
              x={strokeWidth / 2}
              y={strokeWidth / 2}
              width={width - strokeWidth}
              height={height - strokeWidth}
              rx={borderRadius}
              ry={borderRadius}
              fill="none"
              stroke="#f3cf7a"
              strokeWidth={1} /* Thinner static border */
              className="opacity-20" /* Faint, elegant visibility */
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
                /* Dash(20%) - Gap(30%) - Dash(20%) - Gap(30%) */
                strokeDasharray: `${perimeter * 0.2} ${perimeter * 0.3} ${perimeter * 0.2} ${perimeter * 0.3}`,
                animation: "snake-travel-stadium 6s linear infinite",
                filter: "drop-shadow(0 0 12px #f3cf7a) drop-shadow(0 0 4px #f3cf7a)"
              }}
            />
          </svg>
        </div>

        {/* Logo Container */}
        <div 
          className="relative bg-[#050505]/80 backdrop-blur-3xl border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all duration-700 group-hover:bg-[#050505]/95"
          style={{ 
            width: width - 20, 
            height: height - 20,
            borderRadius: (height - 20) / 2 
          }} 
        >
          <img 
            src="/collegelogo.png" 
            alt="RVITM Logo" 
            className="relative h-24 md:h-32 w-auto object-contain 
                       drop-shadow-[0_0_20px_rgba(243,207,122,0.4)]
                       transition-all duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      {/* --- TEXT UNIT --- */}
      <div className="mt-20 text-center z-10">
        <h3 className="text-sm md:text-3xl tracking-[1.5em] text-[#f3cf7a] font-serif font-black uppercase drop-shadow-[0_0_15px_rgba(243,207,122,0.5)]">
          RVITM
        </h3>
        <div className="relative h-[1px] w-72 mx-auto mt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f3cf7a] to-transparent shadow-[0_0_10px_#f3cf7a]" />
        </div>
        <p className="text-[10px] md:text-xs tracking-[0.8em] text-white/50 uppercase mt-8 font-bold">
          GO! CHANGE THE WORLD 
        </p>
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