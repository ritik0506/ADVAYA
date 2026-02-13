"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/* DATA */
import { SECTIONS } from "../components/homecomponents/constant1";

/* COMPONENTS */
import { motion } from "framer-motion";
import Hero from "../components/homecomponents/hero";
import About from "../components/homecomponents/about";
import {
  DesktopEventSection,
  MobileEventSection,
} from "../components/homecomponents/EventSections";
import FullEventScrollModalResponsive from "../components/homecomponents/ScrollFullscreen";
import {
  YagnaReveal,
  DivineManifest,
  GoldenDivider,
  SplitText,
  ScrollText,
  TextShimmer,
} from "../components/animations/MythologyMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const videoRefs = useRef([]);
  const sectionRefs = useRef([]);

  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [openScrollId, setOpenScrollId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  /* ================= FETCH EVENTS ================= */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/events/all`
        );
        setAllEvents(res.data || []);
      } catch (err) {
        console.error("Home events fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  /* ================= MAP EVENTS ================= */
  const enrichedSections = useMemo(() => {
    if (!allEvents.length) return [];
    return SECTIONS.map((section) => ({
      ...section,
      events: allEvents.filter((event) =>
        section.categoryFilter.includes(event.category)
      ),
    }));
  }, [allEvents]);

  /* ================= MOBILE CHECK ================= */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      setTimeout(() => ScrollTrigger.refresh(), 300);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ================= GSAP SCROLL ================= */
  useEffect(() => {
    if (loading || !enrichedSections.length) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      enrichedSections.forEach((_, i) => {
        const video = videoRefs.current[i];
        const section = sectionRefs.current[i];
        if (!video) return;

        const setup = () => {
          video.pause();
          video.currentTime = 0;

          if (!isMobile && section) {
            ScrollTrigger.create({
              trigger: section,
              start: "top top",
              end: "+=100%",
              pin: true,
              pinSpacing: false,
              anticipatePin: 1,
            });
          }

          const proxy = { time: 0 };

          ScrollTrigger.create({
            trigger: isMobile ? video : section,
            start: isMobile ? "top 80%" : "top top",
            end: isMobile ? "bottom 20%" : "bottom bottom",
            scrub: isMobile ? 1.2 : 0.5,
            onUpdate: (self) => {
              const target = self.progress * video.duration;
              gsap.to(proxy, {
                time: target,
                duration: isMobile ? 0.35 : 0.15,
                overwrite: true,
                ease: "power2.out",
                onUpdate: () => {
                  if (Math.abs(video.currentTime - proxy.time) > 0.05) {
                    video.currentTime = proxy.time;
                  }
                },
              });
            },
          });
        };

        if (video.readyState >= 1) setup();
        else video.onloadedmetadata = setup;
      });
    });

    return () => ctx.revert();
  }, [loading, enrichedSections, isMobile]);

  const toggleScroll = (id) => {
    setOpenScrollId((prev) => (prev === id ? null : id));
  };

  /* ================= LOADING SCREEN ================= */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-[#f3cf7a] animate-pulse font-serif italic text-2xl tracking-[0.2em]">
          SUMMONING THE ARENAS...
        </div>
      </div>
    );
  }

  /* ================= MAIN RENDER ================= */
  return (
    <div className="relative bg-[#050505] text-[#f3cf7a] h-auto overflow-x-hidden">
      
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,50,0.05)_0%,_transparent_80%)]" />
      </div>

      <main className="relative z-10 pt-32">
        <Hero />
        <About />

        <div id="events" className="relative">
          {isMobile ? (
            <div className="pb-0 space-y-32">
              {enrichedSections.map((section, i) => (
                <MobileEventSection
                  key={i}
                  section={section}
                  sIdx={i}
                  videoRef={(el) => (videoRefs.current[i] = el)}
                  openScrollId={openScrollId}
                  toggleScroll={toggleScroll}
                  setSelectedEvent={setSelectedEvent}
                />
              ))}
            </div>
          ) : (
            <div className="pb-0 mb-0">
              {enrichedSections.map((section, i) => (
                <DesktopEventSection
                  key={i}
                  section={section}
                  sIdx={i}
                  sectionRef={(el) => (sectionRefs.current[i] = el)}
                  videoRef={(el) => (videoRefs.current[i] = el)}
                  openScrollId={openScrollId}
                  toggleScroll={toggleScroll}
                  setSelectedEvent={setSelectedEvent}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ================= BEAUTIFUL TRANSITION SECTION ================= */}
      <section className="relative py-32 flex flex-col items-center justify-center text-center overflow-hidden md:pt-120">

        <GoldenDivider width="w-full" className="mb-16" />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" />
        </div>

        <div className="relative z-10 max-w-3xl px-6">
          <DivineManifest>
            <h2 className="text-3xl md:text-5xl font-serif tracking-widest mb-6">
              <SplitText text="THE JOURNEY CONTINUES" animation="wave" staggerDelay={0.04} />
            </h2>
          </DivineManifest>

          <YagnaReveal delay={0.3}>
            <p className="text-[#f3cf7a]/70 text-lg leading-relaxed">
              Beyond every battlefield lies a new challenge. 
              Stay prepared, stay relentless, and let your brilliance echo 
              through the arenas of <TextShimmer>ADVAYA</TextShimmer>.
            </p>
          </YagnaReveal>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#050505]" />
      </section>

      {/* ================= EVENT MODAL ================= */}
      {selectedEvent && (
        <FullEventScrollModalResponsive
          isOpen
          onClose={() => setSelectedEvent(null)}
          eventId={selectedEvent.eventId}
          eventName={selectedEvent.mythologyName}
          category={selectedEvent.category}
          subheading={selectedEvent.actualName}
          description={selectedEvent.description}
          rules={selectedEvent.rules}
          registrationFee={selectedEvent.fee}
          teamSize={selectedEvent.teamSize}
          duration={selectedEvent.duration}
          registrationOpen={selectedEvent.registrationOpen}
        />
      )}
    </div>
  );
}
