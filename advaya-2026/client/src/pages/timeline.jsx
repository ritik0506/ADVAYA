

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  DivineManifest,
  SplitText,
  GoldenDivider,
  SPRING,
  EASE,
} from "../components/animations/MythologyMotion";

export default function Timeline() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
  });

  return (
    <div ref={containerRef} className="relative min-h-[80vh] bg-[#020308] text-white selection:bg-blue-500/30 overflow-hidden flex items-center justify-center">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] bg-amber-900/10 blur-[120px] rounded-full" />
      </div>

      {/* THE CONTINUOUS SPINE (More Subtle) */}
      <div className="absolute left-8 md:left-20 top-0 bottom-0 w-[1px] z-20 hidden md:block">
        <div className="absolute inset-0 bg-white/[0.03]" />
        <motion.div 
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-400 via-blue-600 to-amber-500 shadow-[0_0_15px_rgba(59,130,246,0.4)] origin-top"
          style={{ scaleY }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 py-12">
        
        {/* Compact Header */}
        <header className="text-center mb-12">
          <DivineManifest>
            <h2 className="text-[10px] tracking-[0.8em] uppercase text-blue-400 font-bold mb-3">
              Event Protocol
            </h2>
            <SplitText
              text="Timeline"
              as="h1"
              animation="wave"
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40"
            />
            <GoldenDivider width="w-20" className="mx-auto mt-4" />
          </DivineManifest>
        </header>

        {/* Scaled-Down Placeholder Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING.gentle, delay: 0.3 }}
          className="relative max-w-2xl mx-auto group"
        >
          <div className="absolute inset-0 bg-blue-500/5 blur-[60px] rounded-full group-hover:bg-blue-500/10 transition-all duration-700" />
          
          <div className="relative border border-white/10 bg-white/[0.01] backdrop-blur-md p-8 md:p-12 rounded-[2rem] text-center">
            {/* Minimalist Accents */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-blue-500/40" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-amber-500/40" />

            <motion.h3 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: EASE.smooth }}
              className="text-lg md:text-xl font-black uppercase tracking-[0.4em] mb-2 text-white/90"
            >
              Transmission Pending
            </motion.h3>

            <p className="text-[10px] font-mono text-blue-400/50 uppercase tracking-widest mb-6">
              Ref: Advaya_2K26_Schedule
            </p>

            <div className="h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-white/5 to-transparent mb-6" />

            <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed max-w-sm mx-auto italic">
              "The temporal sequence is being finalized. 
              Synchronizing events for peak innovation."
            </p>

            <motion.div 
               className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest text-blue-400/80"
               whileHover={{ scale: 1.05, transition: SPRING.snappy }}
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Yet to be announced
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}