"use client";

import { motion } from "framer-motion";
import SmallScroll from "./smallscroll";
import {
  YagnaReveal,
  WarriorEntry,
  GoldenDivider,
  SplitText,
  staggerContainer,
  staggerItem,
} from "../animations/MythologyMotion";

const GAP_DESKTOP_HORIZONTAL = "4rem";
const GAP_DESKTOP_VERTICAL = "3rem";

/* ================= DESKTOP ================= */

export function DesktopEventSection({
  section,
  sIdx,
  videoRef,
  sectionRef,
  openScrollId,
  toggleScroll,
  setSelectedEvent,
}) {
  return (
    <section
      ref={sectionRef}
      className="min-h-[160vh] px-14 py-20 md:mt-90 md:pt-40"
    >
      <div className="flex gap-12 items-start">
        
        {/* LEFT SIDE — SCROLLS */}
        <div className="w-300">

          <WarriorEntry direction="left" delay={0.1}>
            <h2 className="text-5xl font-serif italic text-white mt-1 uppercase tracking-tighter leading-none">
              <SplitText
                text={section?.title || ""}
                animation="slide"
                staggerDelay={0.04}
              />
            </h2>
          </WarriorEntry>

          <GoldenDivider width="w-132" className="!mx-0 mt-4 mb-2" />

          <motion.div
            className="grid grid-cols-2 pt-10 pb-20"
            style={{
              gap: `${GAP_DESKTOP_VERTICAL} ${GAP_DESKTOP_HORIZONTAL}`,
            }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {section?.events?.map((event, idx) => {
              const id = `${sIdx}-${idx}`;

              return (
                <motion.div
                  key={id}
                  variants={staggerItem}
                  className="transition-transform hover:scale-105 duration-500"
                >
                  <SmallScroll
                    rodText={event?.mythologyName?.toLowerCase() || ""}
                    mythologyName={event?.mythologyName}
                    actualName={event?.actualName}
                    isOpen={openScrollId === id}
                    onToggle={() => toggleScroll(id)}
                    onSeeMore={() => setSelectedEvent(event)}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* RIGHT SIDE — VIDEO */}
        <div className="w-340 sticky top-23 h-[75vh] flex items-center justify-center pointer-events-none">
          <video
            ref={videoRef}
            src={section?.video}
            muted
            playsInline
            preload="auto"
            className={`w-full object-contain mix-blend-screen transition-all duration-700 
              ${sIdx > 0 ? "h-[50vh] scale-90" : "h-full scale-125"}`}
          />
        </div>

      </div>
    </section>
  );
}

/* ================= MOBILE ================= */

export function MobileEventSection({
  section,
  sIdx,
  videoRef,
  openScrollId,
  toggleScroll,
  setSelectedEvent,
}) {
  return (
    <div className="space-y-10 text-center">

      {/* VIDEO */}
      <div className="relative h-[45vh] flex items-center justify-center">
        <video
          ref={videoRef}
          src={section?.video}
          muted
          playsInline
          preload="auto"
          className={`w-full h-full object-contain mix-blend-screen ${
            sIdx > 0 ? "scale-95" : "scale-160"
          }`}
        />
      </div>

      {/* TITLE */}
      <YagnaReveal>
        <h2 className="text-3xl font-serif italic text-white uppercase tracking-tighter">
          <SplitText
            text={section?.title || ""}
            animation="rise"
            staggerDelay={0.03}
          />
        </h2>
      </YagnaReveal>

      <GoldenDivider width="w-84" />

      {/* SCROLL LIST */}
      <motion.div
        className="flex flex-col items-center space-y-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {section?.events?.map((event, idx) => {
          const id = `${sIdx}-${idx}`;

          return (
            <motion.div key={id} variants={staggerItem}>
              <SmallScroll
                rodText={event?.mythologyName?.toLowerCase() || ""}
                mythologyName={event?.mythologyName}
                actualName={event?.actualName}
                isOpen={openScrollId === id}
                onToggle={() => toggleScroll(id)}
                onSeeMore={() => setSelectedEvent(event)}
              />
            </motion.div>
          );
        })}
      </motion.div>

    </div>
  );
}
