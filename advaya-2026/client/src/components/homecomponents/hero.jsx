export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center mb-32 mt-12 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#f3cf7a]/20 blur-[100px] rounded-full animate-pulse" />
      <div className="relative group cursor-crosshair">
        <div className="relative p-4 md:p-6 bg-gradient-to-b from-white/5 to-transparent rounded-full backdrop-blur-sm border border-white/10 shadow-2xl">
          <img 
            src="/collegelogo.png" 
            alt="RVITM Logo" 
            className="relative h-28 md:h-40 w-auto object-contain drop-shadow-[0_0_20px_rgba(243,207,122,0.5)] transition-all duration-700 group-hover:brightness-125 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="mt-8 text-center">
        <h3 className="text-[10px] md:text-xl tracking-[0.6em] text-[#b08d32] font-bold uppercase opacity-80">
          RVITM
        </h3>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#f3cf7a]/40 to-transparent mx-auto mt-4" />
      </div>
    </div>
  );
}