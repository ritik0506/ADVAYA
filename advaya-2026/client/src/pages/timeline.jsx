import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  DivineManifest,
  SplitText,
  GoldenDivider,
  SPRING,
} from "../components/animations/MythologyMotion";

const TIME_SLOTS = ["11-12 PM", "12-1 PM", "1-2 PM", "2-3 PM", "3-4 PM", "4-5 PM"];

const COLOR_MAP = {
  gold:   { bg: "bg-[#f3cf7a]/15", border: "border-[#f3cf7a]/50",  text: "text-[#f3cf7a]", glow: "shadow-[0_0_10px_rgba(243,207,122,0.35)]" },
  amber:  { bg: "bg-amber-600/15", border: "border-amber-500/50",  text: "text-amber-300",  glow: "shadow-[0_0_10px_rgba(217,119,6,0.35)]"  },
  bronze: { bg: "bg-[#b08d32]/15", border: "border-[#b08d32]/50",  text: "text-[#d4aa4e]", glow: "shadow-[0_0_10px_rgba(176,141,50,0.35)]" },
  copper: { bg: "bg-orange-700/15",border: "border-orange-500/40", text: "text-orange-300", glow: "shadow-[0_0_10px_rgba(194,65,12,0.3)]"   },
  ivory:  { bg: "bg-stone-400/10", border: "border-stone-400/30",  text: "text-stone-300",  glow: "shadow-[0_0_8px_rgba(168,162,158,0.25)]" },
  saffron:{ bg: "bg-yellow-600/15",border: "border-yellow-500/40", text: "text-yellow-300", glow: "shadow-[0_0_10px_rgba(202,138,4,0.35)]"  },
  flame:  { bg: "bg-orange-500/15",border: "border-orange-400/40", text: "text-orange-200", glow: "shadow-[0_0_10px_rgba(249,115,22,0.3)]"  },
};

const EVENTS = [
  { name: "Code Kurukshetra", subtitle: "Coding & Debugging",   venue: "MCA Lab 1 & 2",            color: "gold",
    day1: { 0:"R1", 1:"R1" },          day2: { 4:"R2", 5:"R2" } },
  { name: "Web Astra",        subtitle: "Web Development",      venue: "Lab L712",                  color: "amber",
    day1: { 1:"R1", 2:"R1", 3:"R1" },  day2: { 1:"R2", 2:"R2", 3:"R2" } },
  { name: "Brahma Bits",      subtitle: "IT Quiz",              venue: "6th Floor UG Seminar Hall", color: "bronze",
    day1: { 0:"R1", 1:"R1" },          day2: { 3:"R2", 4:"R2" } },
  { name: "Data Vishleshana", subtitle: "Data Sprint",          venue: "Lab L601",                  color: "copper",
    day1: { 2:"R1", 3:"R1" },          day2: { 2:"R2", 3:"R2" } },
  { name: "Gandhari Mode",    subtitle: "Blind Coding",         venue: "MCA Lab 3 & 4",             color: "gold",
    day1: { 0:"R1", 1:"R1" },          day2: { 4:"R2", 5:"R2" } },
  { name: "Web Shilpa Chakra",subtitle: "Web Design",           venue: "Lab L714",                  color: "saffron",
    day1: { 3:"R1", 4:"R1" },          day2: { 3:"R2", 4:"R2" } },
  { name: "Bits Vedha",       subtitle: "IT Quiz",              venue: "Class Room L713",           color: "bronze",
    day1: { 0:"R1", 1:"R1" },          day2: { 4:"R2", 5:"R2" } },
  { name: "Maya Loop",        subtitle: "Tech Illusion",        venue: "Class Room L522",           color: "flame",
    day1: { 0:"R1", 1:"R1" },          day2: { 4:"R2", 5:"R2" } },
  { name: "Shastrarthavada",  subtitle: "IT Debate",            venue: "1st Floor Seminar Hall",    color: "ivory",
    day1: { 2:"R1", 3:"R1" },          day2: { 2:"R2", 3:"R2" } },
  { name: "Ranabhoomi Arena", subtitle: "Mobile Gaming (BGMI)", venue: "MCA Seminar Hall",          color: "copper",
    day1: { 0:"R1", 1:"R1" },          day2: { 4:"R2", 5:"R2" } },
  { name: "Bids Sabha",       subtitle: "IPL Auction",          venue: "Auditorium",                color: "saffron",
    day1: { 0:"R1", 1:"R1" },          day2: { 4:"R2", 5:"R2" } },
  { name: "Drishti POV",      subtitle: "Photography",          venue: "Class Room L311",           color: "amber",
    day1: { 0:"R1", 1:"R1" },          day2: { 4:"R2", 5:"R2" } },
  { name: "Nidhi 404",        subtitle: "Treasure Hunt",        venue: "Campus-wide",               color: "gold",
    day1: "notstarted",                 day2: { 0:"infinite", 1:"infinite", 2:"infinite" } },
  { name: "Rahasya Mintz",    subtitle: "Surprise Event",       venue: "TBA",                       color: "flame",
    day1: "notstarted",                 day2: { 0:"infinite", 1:"infinite", 2:"infinite" } },
];

function RoundBadge({ label, colorKey }) {
  const c = COLOR_MAP[colorKey];
  const display = label === "infinite" ? "∞" : label;
  const isInfinite = label === "infinite";
  return (
    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-lg font-black uppercase tracking-widest border ${isInfinite ? "text-lg" : "text-xs"} ${c.bg} ${c.border} ${c.text} ${c.glow}`}>
      {display}
    </span>
  );
}

export default function Timeline() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 40, damping: 15 });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#020308] text-white selection:bg-[#f3cf7a]/20 overflow-hidden"
    >
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-[#b08d32]/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[5%] right-[-5%] w-[35%] h-[35%] bg-[#f3cf7a]/5 blur-[120px] rounded-full" />
      </div>

      <div className="absolute left-4 top-0 bottom-0 w-[1px] z-20 hidden md:block">
        <div className="absolute inset-0 bg-[#f3cf7a]/[0.04]" />
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#f3cf7a] via-[#b08d32] to-[#f3cf7a]/20 shadow-[0_0_12px_rgba(243,207,122,0.4)] origin-top"
          style={{ scaleY }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-10 py-16">

        <header className="text-center mb-16">
          <DivineManifest>
            <h2 className="text-[10px] tracking-[0.8em] uppercase text-[#f3cf7a]/60 font-bold mb-3">
              Sacred Schedule
            </h2>
            <SplitText
              text="Timeline"
              as="h1"
              animation="wave"
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-b from-[#f3cf7a] via-white to-white/30"
            />
            <GoldenDivider width="w-24" className="mx-auto mt-4 mb-5" />
            <p className="text-[#f3cf7a]/70 font-bold tracking-[0.3em] text-sm uppercase">
              24th &amp; 25th February 2026
            </p>
          </DivineManifest>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING.gentle, delay: 0.2 }}
          className="w-full overflow-x-auto"
        >
          <div className="min-w-[1380px]">

            {/* Day group headers */}
            <div className="grid grid-cols-[minmax(220px,1fr)_repeat(6,minmax(115px,1fr))_repeat(6,minmax(115px,1fr))] gap-px mb-px">
              <div className="bg-[#f3cf7a]/[0.02] border border-[#f3cf7a]/[0.07] rounded-tl-xl" />
              <div className="col-span-6 bg-[#f3cf7a]/[0.06] border border-[#f3cf7a]/20 flex items-center justify-center gap-4 py-4 px-4">
                <div className="w-8 h-8 rounded-full border border-[#f3cf7a]/50 bg-[#f3cf7a]/10 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(243,207,122,0.2)]">
                  <span className="text-xs font-black text-[#f3cf7a]">I</span>
                </div>
                <div className="text-center leading-none">
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f3cf7a]/50 mb-1">Day One</p>
                  <p className="text-base font-black uppercase tracking-wider text-[#f3cf7a]">24th Feb 2026</p>
                </div>
                <div className="hidden lg:block h-6 w-px bg-[#f3cf7a]/15 mx-2" />
                <span className="hidden lg:block text-[10px] uppercase tracking-widest text-[#f3cf7a]/35 font-bold">Round 1 · All Events Begin</span>
              </div>
              <div className="col-span-6 bg-[#b08d32]/[0.06] border border-[#b08d32]/20 rounded-tr-xl flex items-center justify-center gap-4 py-4 px-4">
                <div className="w-8 h-8 rounded-full border border-[#b08d32]/50 bg-[#b08d32]/10 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(176,141,50,0.2)]">
                  <span className="text-xs font-black text-[#d4aa4e]">II</span>
                </div>
                <div className="text-center leading-none">
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#b08d32]/60 mb-1">Day Two</p>
                  <p className="text-base font-black uppercase tracking-wider text-[#d4aa4e]">25th Feb 2026</p>
                </div>
                <div className="hidden lg:block h-6 w-px bg-[#b08d32]/15 mx-2" />
                <span className="hidden lg:block text-[10px] uppercase tracking-widest text-[#b08d32]/40 font-bold">Round 2 · Finals &amp; Special Events</span>
              </div>
            </div>

            {/* Time-slot sub-headers */}
            <div className="grid grid-cols-[minmax(220px,1fr)_repeat(6,minmax(115px,1fr))_repeat(6,minmax(115px,1fr))] gap-px mb-px">
              <div className="bg-[#f3cf7a]/[0.025] border border-[#f3cf7a]/[0.07] px-4 py-3 flex items-center">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-[#f3cf7a]/30">Events</span>
              </div>
              {TIME_SLOTS.map((slot) => (
                <div key={"h1-" + slot} className="bg-[#f3cf7a]/[0.025] border border-[#f3cf7a]/[0.07] px-2 py-3 text-center">
                  <span className="text-[11px] font-black uppercase tracking-wide text-[#f3cf7a]/55 whitespace-nowrap">{slot}</span>
                </div>
              ))}
              {TIME_SLOTS.map((slot) => (
                <div key={"h2-" + slot} className="bg-[#b08d32]/[0.025] border border-[#b08d32]/[0.07] px-2 py-3 text-center">
                  <span className="text-[11px] font-black uppercase tracking-wide text-[#b08d32]/65 whitespace-nowrap">{slot}</span>
                </div>
              ))}
            </div>

            {/* Event rows */}
            {EVENTS.map((event, rowIdx) => {
              const c = COLOR_MAP[event.color];
              const isLast = rowIdx === EVENTS.length - 1;
              const notStarted = event.day1 === "notstarted";

              return (
                <motion.div
                  key={event.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...SPRING.gentle, delay: 0.28 + rowIdx * 0.03 }}
                  className="grid grid-cols-[minmax(220px,1fr)_repeat(6,minmax(115px,1fr))_repeat(6,minmax(115px,1fr))] gap-px mb-px"
                >
                  <div className={`border border-[#f3cf7a]/[0.08] bg-[#f3cf7a]/[0.012] px-4 py-4 flex flex-col justify-center gap-1 ${isLast ? "rounded-bl-xl" : ""}`}>
                    <span className={`text-sm font-black uppercase tracking-wide leading-tight ${c.text}`}>{event.name}</span>
                    <span className="text-[11px] text-white/35 font-medium italic">{event.subtitle}</span>
                    <span className="text-[10px] text-[#f3cf7a]/30 font-mono">{event.venue}</span>
                  </div>

                  {TIME_SLOTS.map((_, colIdx) => (
                    <div key={"d1c" + colIdx} className="border border-[#f3cf7a]/[0.06] bg-[#f3cf7a]/[0.006] flex items-center justify-center py-4 px-2">
                      {notStarted ? (
                        <span className="text-[#f3cf7a]/30 text-base font-bold select-none leading-none">&#8212;</span>
                      ) : event.day1[colIdx] ? (
                        <RoundBadge label={event.day1[colIdx]} colorKey={event.color} />
                      ) : (
                        <span className="w-1 h-1 rounded-full bg-[#f3cf7a]/[0.08] block" />
                      )}
                    </div>
                  ))}

                  {TIME_SLOTS.map((_, colIdx) => {
                    const isLastCol = colIdx === TIME_SLOTS.length - 1;
                    return (
                      <div key={"d2c" + colIdx} className={`border border-[#b08d32]/[0.07] bg-[#b08d32]/[0.006] flex items-center justify-center py-4 px-2 ${isLast && isLastCol ? "rounded-br-xl" : ""}`}>
                        {event.day2[colIdx] ? (
                          <RoundBadge label={event.day2[colIdx]} colorKey={event.color} />
                        ) : (
                          <span className="w-1 h-1 rounded-full bg-[#b08d32]/[0.09] block" />
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              );
            })}

          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          {[
            { label: "R1", bg: "bg-[#f3cf7a]/15", border: "border-[#f3cf7a]/40", text: "text-[#f3cf7a]",  desc: "Round 1 — Day 1" },
            { label: "R2", bg: "bg-[#b08d32]/15", border: "border-[#b08d32]/50", text: "text-[#d4aa4e]",  desc: "Round 2 / Finals — Day 2" },
            { label: "∞",  bg: "bg-orange-700/15",border: "border-orange-500/40",text: "text-orange-300", desc: "Ongoing Event" },
            { label: "—",  bg: "bg-transparent",  border: "border-white/10",     text: "text-white/30",   desc: "Not Started Yet" },
          ].map(({ label, bg, border, text, desc }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className={`px-3 py-1 rounded-lg ${bg} border ${border} ${text} text-xs font-black min-w-[32px] text-center`}>{label}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-white/30">{desc}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

