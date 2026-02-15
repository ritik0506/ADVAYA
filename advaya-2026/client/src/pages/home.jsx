
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const videoRefs = useRef([]);
  const sectionRefs = useRef([]);

  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [openScrollId, setOpenScrollId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  /* ================= PRIZE POPUP ================= */
  const [showPrizePopup, setShowPrizePopup] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPrizePopup(false);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (!showPrizePopup) return;
    const timer = setTimeout(() => handleClose(), 20000);
    return () => clearTimeout(timer);
  }, [showPrizePopup]);

  /* ================= FETCH EVENTS ================= */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/events/all`
        );
        setAllEvents(res.data || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  /* ================= MAP EVENTS INTO SECTIONS ================= */
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
    let resizeTimer;
    const checkMobile = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 1024);
        ScrollTrigger.refresh();
      }, 200);
    };
    // Initial check without debounce
    setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", checkMobile);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", checkMobile);
    };
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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center ">
        <div className="text-[#f3cf7a] animate-pulse font-serif italic text-2xl tracking-[0.2em]">
          SUMMONING THE ARENAS...
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-transparent text-[#f3cf7a] overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,50,0.05)_0%,_transparent_80%)]" />
      </div>

      <main className="relative z-10 pt-32">
        <Hero />
        <About />

        {/* ================= EVENTS ================= */}
        <div id="events" className="relative">
          {isMobile ? (
            <div className="space-y-32">
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
            <div>
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

        {/* ================= TEAM REGISTRATION ================= */}
        <section className="relative py-34 mt-110 flex flex-col items-center justify-center text-center overflow-hidden bg-transparent">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#f3cf7a]/60 to-transparent mb-16" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,50,0.08)_0%,_transparent_75%)] animate-pulse" />
          </div>
          <div className="relative z-10 max-w-3xl px-6">
            <h2 className="text-3xl md:text-5xl font-serif tracking-[0.25em] mb-6">
              REGISTER YOUR COLLEGE
            </h2>
            <p className="text-[#f3cf7a]/70 text-base md:text-lg leading-relaxed mb-10">
              Unite your warriors. Form your squad. Step into the arena
              and carve your legacy in ADVAYA 2026.
            </p>
            <button
              onClick={() => navigate("/registercollege")}
              className="relative px-10 py-4 border border-[#f3cf7a] text-[#f3cf7a]
                         tracking-[0.2em] transition-all duration-500
                         hover:bg-[#f3cf7a] hover:text-[#050505]
                         hover:shadow-[0_0_25px_rgba(243,207,122,0.6)]
                         rounded-lg"
            >
              REGISTER YOUR TEAM
            </button>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#050505]" />
        </section>
      </main>

      {/* ================= ₹45,000 PRIZE POPUP ================= */}
      {showPrizePopup && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999]">
          <div
            className={`relative bg-[#0b0b0b] border border-[#f3cf7a]/70
              shadow-[0_0_35px_rgba(243,207,122,0.4)]
              px-4 py-3 md:px-6 md:py-5
              w-[200px] md:w-[340px]
              backdrop-blur-md rounded-xl
              transition-all duration-300 ease-out
              ${isClosing ? "scale-75 opacity-0" : "scale-100 opacity-100"}`}
          >
            <button
              onClick={handleClose}
              className="absolute top-1 right-2 text-[#f3cf7a]/70 
                         hover:text-[#f3cf7a] text-sm md:text-lg transition"
            >
              ✕
            </button>
            <div className="text-center">
              <h3 className="text-[10px] md:text-sm tracking-[0.3em] text-[#f3cf7a]/70 mb-2">
                PRIZE POOL
              </h3>
              <div className="text-xl md:text-4xl font-serif tracking-widest">
                ₹ 45,000
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= EVENT MODAL ================= */}
      {selectedEvent && (
        <FullEventScrollModalResponsive
          isOpen
          onClose={() => setSelectedEvent(null)}
          {...selectedEvent}
          eventId={selectedEvent.eventId}
          eventName={selectedEvent.mythologyName}
          category={selectedEvent.category}
          subheading={selectedEvent.actualName}
          description={selectedEvent.description}
          rules={selectedEvent.rules}
          registrationFee={selectedEvent.fee}
          teamSize={selectedEvent.teamSize}
          duration={selectedEvent.duration}
          registrationOpen={selectedEvent.registrationOpen} // <-- all event info dynamically passed from backend
        />
      )}
    </div>
  );
}
