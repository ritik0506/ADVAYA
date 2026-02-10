"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/* DATA */
import { SECTIONS } from "../components/homecomponents/constant1";

/* COMPONENTS */
import Hero from "../components/homecomponents/hero";
import About from "../components/homecomponents/about";
import {
  DesktopEventSection,
  MobileEventSection,
} from "../components/homecomponents/EventSections";
import FullEventScrollModalResponsive from "../components/homecomponents/ScrollFullscreen";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const videoRefs = useRef([]);
  const sectionRefs = useRef([]);

  const [allEvents, setAllEvents] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [openScrollId, setOpenScrollId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  /* ================= FETCH LIVE DATA ================= */
  useEffect(() => {
    const fetchHomeEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events/all");
        setAllEvents(response.data);
      } catch (err) {
        console.error("Error fetching events for Home:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeEvents();
  }, []);

  /* ================= DATA ENRICHMENT ================= */
  const enrichedSections = useMemo(() => {
    if (allEvents.length === 0) return [];

    return SECTIONS.map((section, index) => {
      let filteredEvents = [];
      
      if (index === 0) {
        filteredEvents = allEvents.filter(e => e.category === "PG");
      } else if (index === 1) {
        filteredEvents = allEvents.filter(e => e.category === "UG");
      } else if (index === 2) {
        filteredEvents = allEvents.filter(e => 
          e.category === "Non-Tech" || e.category === "Combined"
        );
      }

      return {
        ...section,
        events: filteredEvents
      };
    });
  }, [allEvents]);

  /* ================= MOBILE CHECK ================= */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      setTimeout(() => ScrollTrigger.refresh(true), 300);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ================= GSAP VIDEO SCROLL ================= */
  useEffect(() => {
    if (loading || enrichedSections.length === 0) return;

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
              end: "bottom bottom",
              pin: true,
              pinSpacing: false,
            });
          }

          const proxy = { time: 0 };
          ScrollTrigger.create({
            trigger: isMobile ? video : section,
            start: isMobile ? "top 80%" : "top top",
            end: isMobile ? "bottom 20%" : "bottom bottom",
            scrub: isMobile ? 1.2 : 0.5,
            onUpdate: (self) => {
              const targetTime = self.progress * video.duration;
              gsap.to(proxy, {
                time: targetTime,
                duration: isMobile ? 0.35 : 0.15,
                ease: "power2.out",
                overwrite: true,
                onUpdate: () => {
                  if (video && Math.abs(video.currentTime - proxy.time) > 0.05) {
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
  }, [isMobile, enrichedSections, loading]);

  const toggleScroll = (id) => {
    setOpenScrollId(openScrollId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#050505]">
        <div className="text-[#f3cf7a] animate-pulse font-serif italic text-2xl tracking-[0.2em]">
          SUMMONING THE ARENAS...
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#050505] text-[#f3cf7a] min-h-screen overflow-x-hidden selection:bg-[#f3cf7a]/20">
      
      <div className="fixed inset-0 z-0 bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(176,141,50,0.05)_0%,_transparent_80%)]" />
      </div>

      <main className="relative z-10 pt-32 px-6">
        <Hero />
        <About />

        <div id="events">
          {isMobile ? (
            <div className="pb-20 space-y-40">
              {enrichedSections.map((section, sIdx) => (
                <MobileEventSection
                  key={`mobile-${sIdx}`}
                  section={section}
                  sIdx={sIdx}
                  videoRef={(el) => (videoRefs.current[sIdx] = el)}
                  openScrollId={openScrollId}
                  toggleScroll={toggleScroll}
                  setSelectedEvent={setSelectedEvent}
                />
              ))}
            </div>
          ) : (
            <div className="pb-40 my-20">
              {enrichedSections.map((section, sIdx) => (
                <DesktopEventSection
                  key={`desktop-${sIdx}`}
                  section={section}
                  sIdx={sIdx}
                  sectionRef={(el) => (sectionRefs.current[sIdx] = el)}
                  videoRef={(el) => (videoRefs.current[sIdx] = el)}
                  openScrollId={openScrollId}
                  toggleScroll={toggleScroll}
                  setSelectedEvent={setSelectedEvent}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 py-16 my-28 bg-[#050505] text-center border-t border-[#f3cf7a]/10">
        <div className="mb-4 font-serif italic text-2xl tracking-widest uppercase text-[#f3cf7a]">
          ADVAYA 2K26
        </div>
        <p className="text-[10px] uppercase tracking-[0.6em] opacity-30 px-6">
          RV Institute of Technology and Management • Department of MCA
        </p>
      </footer>

      {/* ================= MODAL INTEGRATION ================= */}
      {selectedEvent && (
        <FullEventScrollModalResponsive
          isOpen={!!selectedEvent}
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
          // PASSING THE NEW PROP HERE
          registrationOpen={selectedEvent.registrationOpen} 
        />
      )}
    </div>
  );
}