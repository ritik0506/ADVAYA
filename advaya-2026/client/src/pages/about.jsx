

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  YagnaReveal,
  DivineManifest,
  SplitText,
  GoldenDivider,
  ScrollText,
  SPRING,
} from "../components/animations/MythologyMotion";

/* ---------------- SECTION HEADING ---------------- */
const SectionHeading = ({ children, subtitle, number }) => (
  <div className="mb-12 relative">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: "4rem" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="h-[2px] bg-gradient-to-r from-blue-500 to-amber-500 mb-6 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
    />
    <div className="flex items-center gap-4 mb-4">
      <span className="text-blue-500 font-mono text-xs tracking-tighter">
        {number}
      </span>
      <YagnaReveal delay={0.1} y={15}>
        <span className="text-[10px] uppercase tracking-[0.6em] text-white/50 font-bold">
          {subtitle}
        </span>
      </YagnaReveal>
    </div>
    <DivineManifest delay={0.15}>
      <h2 className="text-5xl md:text-8xl font-serif italic text-white leading-[0.95] tracking-tight">
        {children}
      </h2>
    </DivineManifest>
  </div>
);

/* ---------------- MAIN ---------------- */
export default function About() {
  const { scrollYProgress } = useScroll();
  const xTransform = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="relative min-h-screen bg-[#020308] text-white overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-[-10%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.08)_0%,_transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.05)_0%,_transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
      </div>

      <div className="relative z-10">

       {/* HERO */}
<section className="min-h-screen flex items-center justify-center px-6 md:px-8 relative">
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ ...SPRING.heavy }}
    className="text-center flex flex-col items-center"
  >
    {/* MAIN LOGO */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 1.2 }}
      className="relative group"
    >
      <img
        src="/logomain.png"
        alt="Advaya Logo"
        className="
          h-44
          sm:h-52
          md:h-56
          lg:h-72
          w-auto object-contain
          drop-shadow-[0_0_40px_rgba(59,130,246,0.35)]
          transition-transform duration-700
          group-hover:scale-105
        "
      />

      {/* Soft glow behind logo */}
      <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full -z-10" />
    </motion.div>

    {/* ANIMATED UNDERLINE */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      style={{ transformOrigin: "center" }}
      className="
        h-[2px]
        w-[70%]
        md:w-[60%]
        bg-gradient-to-r 
        from-transparent 
        via-blue-500
        to-transparent
        -mt-14
        md:-mt-19
        mb-5
        shadow-[0_0_25px_rgba(59,130,246,0.9)]
      "
    />

    {/* 2026 LOGO */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 1 }}
      className="flex justify-center"
    >
      <img
        src="./2026logo.png"
        alt="2026 Logo"
        className="
          h-9
          md:h-10
          lg:h-12
          w-auto
          object-contain
          opacity-90
        "
      />
    </motion.div>

    {/* SUBTITLE */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 1 }}
      className="
        mt-4
        text-[9px]
        md:text-[10px]
        uppercase
        tracking-[0.4em]
        text-white/40
        text-center
      "
    >
      Intercollege Level <br /> Technical Symposium
    </motion.p>
  </motion.div>

  {/* Scroll indicator */}
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="absolute bottom-10 w-px h-16 bg-gradient-to-b from-blue-500 to-transparent"
  />
</section>


        {/* SECTION 01 — Identity */}
        <section className="max-w-7xl mx-auto px-8 md:px-24 py-24">
          <SectionHeading number="// 01" subtitle="The Identity">
            The Digital <br /> Crucible
          </SectionHeading>
          <YagnaReveal delay={0.2} y={30}>
            <p className="max-w-3xl text-xl text-gray-400 italic">
              Crafted by the Department of MCA at RVITM, Advaya is where elite minds converge to redefine the digital frontier.
            </p>
          </YagnaReveal>
        </section>

        {/* SECTION 02 — Vision & Purpose */}
        <section className="py-24 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-8 md:px-24">
            <SectionHeading number="// 02" subtitle="Vision & Purpose">
              The Core <br /> Directive
            </SectionHeading>

            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <YagnaReveal delay={0.1}>
                <div className="p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5">
                  <h3 className="text-xs uppercase tracking-[0.5em] text-blue-400 mb-4">
                    Vision
                  </h3>
                  <p className="text-2xl md:text-3xl font-serif italic">
                    To be the quantum leap between academic theory and industry disruption.
                  </p>
                </div>
              </YagnaReveal>

              <YagnaReveal delay={0.3}>
                <div className="p-8 rounded-3xl border border-amber-500/20 bg-amber-500/5">
                  <h3 className="text-xs uppercase tracking-[0.5em] text-amber-400 mb-4">
                    Purpose
                  </h3>
                  <p className="text-2xl md:text-3xl font-serif italic">
                    Igniting leadership through high-stakes technical competition.
                  </p>
                </div>
              </YagnaReveal>
            </div>
          </div>
        </section>

        {/* SECTION 03 — Eligibility */}
        {/* SECTION 03 — Eligibility */}
<section className="py-32 relative overflow-hidden">
  <motion.div
    style={{ x: xTransform }}
    className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[20rem] font-black uppercase italic opacity-[0.03]"
  />
  <div className="max-w-7xl mx-auto px-8 md:px-24 relative z-10 text-center">
    <SectionHeading number="// 03" subtitle="Eligibility">
      The Circle <br /> of Merit
    </SectionHeading>

    <div className="flex justify-center gap-6 md:gap-16 mt-12 flex-wrap">
      {["MCA", "BCA", "BSc"].map((dept) => (
        <div
          key={dept}
          className="w-32 md:w-56 aspect-square rounded-full border border-white/10 flex items-center justify-center transition-all hover:border-blue-500/50 hover:bg-blue-500/5"
        >
          <span className="text-3xl md:text-7xl font-serif italic">
            {dept}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>


      </div>
    </div>
  );
}
