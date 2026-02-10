"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ruleData = [
  { title: "Identification", text: "All participants must carry their college identification cards at all times." },
  { title: "Code of Conduct", text: "Participants are expected to adhere to the professional code of conduct throughout the event." },
  { title: "Scheduling", text: "Participants may register for multiple events; however, they are responsible for managing their schedules." },
  { title: "Reporting Time", text: "Arrival at venue by 8:30 AM. On-the-spot registrations strictly close at 10:00 AM." },
  { title: "Team Limits", text: "A maximum of two teams per event is permitted from each participating college." },
  { title: "Event Viability", text: "Minimum four teams required per event. The committee reserves the right to modify or cancel." },
  { title: "Refund Policy", text: "Registration fees are non-refundable. Post-registration changes will not be entertained." },
  { title: "Fair Play", text: "The decision of the judges shall be final and binding in all circumstances." },
  { title: "Championship", text: "To qualify for the Overall Trophy, a college must enter all technical events and one non-technical event." },
  { title: "Eligibility", text: "Participation is limited to students currently pursuing MCA, BCA, or BSc programs." },
  { title: "Punctuality", text: "Participants must arrive at their specific event venue at least 20 minutes prior to start." },
  { title: "Property", text: "The organizing committee is not responsible for any loss or damage to personal belongings." }
];

const TimelineItem = ({ index, title, text }) => (
  <motion.div
    className="relative flex gap-8 md:gap-12 pb-20"
    initial="initial"
    whileInView="active"
    viewport={{ once: false, amount: 0.7, margin: "-10% 0px -10% 0px" }}
  >
    {/* Node Container */}
    <div className="relative z-10 flex flex-col items-center">
      <div className="relative flex items-center justify-center w-5 h-5 mt-1">
        
        {/* GOLDEN GLOW: Breathing Aura */}
        <motion.div 
          variants={{
            initial: { scale: 0.5, opacity: 0 },
            active: { scale: 3, opacity: 0.25 }
          }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
          className="absolute w-full h-full rounded-full bg-amber-400 blur-lg"
        />

        {/* GOLDEN CIRCLE: The Core */}
        <motion.div
          variants={{
            initial: { backgroundColor: "#0f172a", borderColor: "rgba(255,255,255,0.1)", scale: 1 },
            active: { 
              backgroundColor: "#fbbf24", 
              borderColor: "#fff", 
              scale: 1.3,
              boxShadow: "0px 0px 20px rgba(251, 191, 36, 0.8)" 
            }
          }}
          className="relative z-10 w-full h-full rounded-full border-2 transition-shadow duration-500"
        />
      </div>
    </div>

    {/* Content Card */}
    <motion.div 
      variants={{
        initial: { opacity: 0, x: 25, filter: "blur(10px)" },
        active: { opacity: 1, x: 0, filter: "blur(0px)" }
      }}
      transition={{ duration: 0.7 }}
      className="flex-1 group"
    >
      <div className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-500 group-hover:border-blue-500/30 group-hover:bg-white/[0.05]">
        <div className="flex items-baseline gap-4 mb-2">
          <span className="text-sm font-mono font-bold text-blue-400/60">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-blue-100 transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-gray-400 leading-relaxed text-sm md:text-base group-hover:text-gray-300">
          {text}
        </p>
      </div>
    </motion.div>
  </motion.div>
);

export default function Rules() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative min-h-screen bg-[#020308] text-white selection:bg-blue-500/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-900/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-amber-900/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 px-6 py-24 md:py-40">

        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-32">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}>
            <h2 className="text-xs tracking-[1em] uppercase text-blue-400 font-bold mb-4">
              Official Guidelines
            </h2>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
              The Rules
            </h1>
            <div className="h-[2px] w-32 bg-blue-500 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
          </motion.div>
        </header>

        {/* Timeline Section */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          
          {/* Static Track Line */}
          <div className="absolute left-[9px] top-4 w-[2px] h-[calc(100%-80px)] bg-white/[0.05]" />

          {/* BLUE PROGRESS LINE */}
          <motion.div
            className="absolute left-[9px] top-4 w-[2px] bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.6)] origin-top z-0"
            style={{ height: lineHeight }}
          />

          {/* Rules List */}
          <div className="space-y-4">
            {ruleData.map((rule, index) => (
              <TimelineItem key={index} index={index} title={rule.title} text={rule.text} />
            ))}
          </div>
        </div>

      

      </div>
    </div>
  );
}