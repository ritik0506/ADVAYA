"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  DivineManifest,
  GoldenDivider,
  SplitText,
  SPRING,
} from "../components/animations/MythologyMotion";

gsap.registerPlugin(ScrollTrigger);

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  timeout: 10000,
});

export default function EventsPage() {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await api.get("/events/all");
        setAllEvents(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const arenas = useMemo(() => {
    if (!allEvents.length) return [];
    return [
      { title: "Technical PG", events: allEvents.filter((e) => e.category === "PG") },
      { title: "Technical UG", events: allEvents.filter((e) => e.category === "UG") },
      {
        title: "Combined UG & PG",
        events: allEvents.filter(
          (e) => e.category === "Non-Tech" || e.category === "Combined"
        ),
      },
    ];
  }, [allEvents]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-transparent">
        <div className="text-[#f3cf7a] animate-pulse font-serif italic text-2xl tracking-[0.2em]">
          SUMMONING THE WARRIORS...
        </div>
      </div>
    );

  return (
    <div className="bg-transparent text-white min-h-screen relative overflow-x-hidden">
      <div
        className={`transition-all duration-700 ${
          selectedEvent ? "blur-xl brightness-50 scale-95" : ""
        }`}
      >
        {/* HERO */}
        <section className="h-[32vh] flex flex-col items-center justify-center text-center pt-48">
          <h1 className="text-7xl lg:text-9xl font-serif italic font-black text-[#f3cf7a]">
            EVENTS
          </h1>
          <p className="text-[10px] tracking-[0.6em] text-[#f3cf7a] uppercase opacity-50 font-bold italic mt-4 mb-10">
            Step into the Battleground of the Gods
          </p>
        </section>

        {/* ARENAS */}
        <div className="space-y-2">
          {arenas.map((arena, i) => (
            <EventArena
              key={i}
              title={arena.title}
              events={arena.events}
              onSelect={setSelectedEvent}
            />
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10">
          <div
            className="absolute inset-0 bg-transparent backdrop-blur-md"
            onClick={() => setSelectedEvent(null)}
          />

<div className="relative w-full max-w-md lg:max-w-4xl max-h-[90vh] bg-[#0d0d0d] rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row border border-white/10 shadow-2xl">

            {/* LEFT SIDE */}
<div className="flex-1 p-6 md:p-12 overflow-y-auto custom-scrollbar flex flex-col
                pb-32 lg:pb-0"> {/* added pb-32 for mobile spacing */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-10 h-10 rounded-full bg-black/40 border border-white/20 text-white hover:text-[#f3cf7a]"
                >
                  ✕
                </button>
              </div>

              <h2 className="text-4xl md:text-6xl font-serif italic font-black text-white">
                {selectedEvent.mythologyName}
              </h2>
              <p className="text-[#f3cf7a] text-[10px] uppercase tracking-[0.4em] mt-2">
                {selectedEvent.actualName}
              </p>

              <p className="text-white/60 mt-6 border-l-2 border-[#f3cf7a]/40 pl-5">
                {selectedEvent.description}
              </p>

              {/* RULES */}
              <div className="mt-10">
                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#f3cf7a]/80 mb-4">
                  The Code
                </h4>
                <ul className="space-y-3">
                  {selectedEvent.rules?.map((rule, i) => (
                    <li key={i} className="text-sm text-white/50 flex gap-3">
                      <span className="text-[#f3cf7a] font-bold">0{i + 1}</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              {/* MOBILE ONLY: Stats + Prizes + Event Heads BELOW rules */}
              <div className="flex flex-col gap-4 lg:hidden mt-6">
                {/* STATS: Offerings, Min, Max */}
                <div className="grid grid-cols-3 gap-2">
                  <StatBox label="Offerings" value={`₹${selectedEvent.fee}`} />
                  <StatBox label="Min Team" value={selectedEvent.teamSize?.min} />
                  <StatBox label="Max Team" value={selectedEvent.teamSize?.max} />
                </div>

                {/* PRIZES */}
                {selectedEvent.prizes && (
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#f3cf7a]/80 mb-2">
                      Divine Rewards
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedEvent.prizes.first > 0 && (
                        <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/5 text-center">
                          <p className="text-xs text-white/40">First Prize</p>
                          <p className="text-xl font-serif text-[#f3cf7a]">
                            ₹{selectedEvent.prizes.first}
                          </p>
                        </div>
                      )}
                      {selectedEvent.prizes.second > 0 && (
                        <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/5 text-center">
                          <p className="text-xs text-white/40">Second Prize</p>
                          <p className="text-xl font-serif text-[#f3cf7a]">
                            ₹{selectedEvent.prizes.second}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* EVENT HEADS */}
                {selectedEvent.eventHeads?.length > 0 && (
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#f3cf7a]/80 mb-2">
                      Event Heads
                    </h4>
                    <div className="space-y-2">
                      {selectedEvent.eventHeads.map((head, i) => (
                        <div
                          key={i}
                          className="flex justify-between p-2 bg-white/[0.02] border border-white/5 rounded-2xl text-sm"
                        >
                          <div>
                            <p className="text-white font-semibold">{head.name}</p>
                            <p className="text-xs text-white/40">Event Coordinator</p>
                          </div>
                          <a
                            href={`tel:${head.phone}`}
                            className="text-[#f3cf7a] font-semibold"
                          >
                            {head.phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE - Desktop only */}
            <div className="hidden lg:flex w-[320px] bg-white/[0.02] border-l border-white/10 p-10 flex-col justify-start gap-6">
              <StatBox label="Offerings" value={`₹${selectedEvent.fee}`} />
              <div className="grid grid-cols-2 gap-2">
                <StatBox label="Min Team" value={selectedEvent.teamSize?.min} />
                <StatBox label="Max Team" value={selectedEvent.teamSize?.max} />
              </div>

              {/* Prizes */}
              {selectedEvent.prizes && (
                <div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#f3cf7a]/80 mb-2">
                    Divine Rewards
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedEvent.prizes.first > 0 && (
                      <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/5 text-center">
                        <p className="text-xs text-white/40">First Prize</p>
                        <p className="text-xl font-serif text-[#f3cf7a]">
                          ₹{selectedEvent.prizes.first}
                        </p>
                      </div>
                    )}
                    {selectedEvent.prizes.second > 0 && (
                      <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/5 text-center">
                        <p className="text-xs text-white/40">Second Prize</p>
                        <p className="text-xl font-serif text-[#f3cf7a]">
                          ₹{selectedEvent.prizes.second}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Event Heads */}
              {selectedEvent.eventHeads?.length > 0 && (
                <div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#f3cf7a]/80 mb-2">
                    Event Heads
                  </h4>
                  <div className="space-y-2">
                    {selectedEvent.eventHeads.map((head, i) => (
                      <div
                        key={i}
                        className="flex justify-between p-2 bg-white/[0.02] border border-white/5 rounded-2xl text-sm"
                      >
                        <div>
                          <p className="text-white font-semibold">{head.name}</p>
                          <p className="text-xs text-white/40">Event Coordinator</p>
                        </div>
                        <a
                          href={`tel:${head.phone}`}
                          className="text-[#f3cf7a] font-semibold"
                        >
                          {head.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Desktop Enlist Button */}
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  navigate(`/register/${selectedEvent.eventId}`);
                }}
                className="w-full py-4 mt-4 bg-[#f3cf7a] text-black font-black uppercase tracking-[0.2em] rounded-2xl"
              >
                Enlist Now
              </button>
            </div>

            {/* ================= MOBILE FIXED BUTTON ================= */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full p-4 bg-[#0d0d0d]/90 backdrop-blur-sm border-t border-white/10 z-50">
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  navigate(`/register/${selectedEvent.eventId}`);
                }}
                className="w-full py-4 bg-[#f3cf7a] text-black font-black uppercase tracking-[0.2em] rounded-2xl"
              >
                Enlist Now
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

/* ================== COMPONENTS ================== */

function StatBox({ label, value }) {
  return (
    <div className="p-5 bg-white/[0.03] rounded-3xl border border-white/5 text-center">
      <p className="text-xs text-white/40">{label}</p>
      <p className="text-xl font-serif text-[#f3cf7a]">{value}</p>
    </div>
  );
}

function EventArena({ title, events, onSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = events.length;
  if (!total) return null;

  // Auto infinite rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((p) => (p + 1) % total);
    }, 4000);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <section className="relative py-12 border-b border-white/5 overflow-hidden">
      <DivineManifest>
        <h2 className="text-center text-3xl lg:text-6xl font-serif font-black text-[#f3cf7a] mb-4 uppercase italic">
          <SplitText text={title} animation="rise" staggerDelay={0.04} />
        </h2>
      </DivineManifest>

      <GoldenDivider width="w-112" className="mb-10" />

      <motion.div className="relative w-full h-[420px] lg:h-[420px] flex items-center justify-center perspective-[2500px]">
        {events.map((event, index) => {
          let diff = index - activeIndex;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          return (
            <EventCard
              key={event.eventId}
              event={event}
              isActive={index === activeIndex}
              position={diff}
              onClick={() => onSelect(event)}
            />
          );
        })}
      </motion.div>

      {/* Manual navigation */}
      <div className="flex flex-col items-center mt-8">
        <div className="flex items-center gap-8">
          <NavBtn
            dir="prev"
            onClick={() => setActiveIndex((p) => (p - 1 + total) % total)}
          />
          <div className="flex gap-2">
            {events.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1 rounded-full transition-all duration-700 ${
                  activeIndex === i ? "w-14 bg-[#f3cf7a]" : "w-3 bg-white/10"
                }`}
                layout
              />
            ))}
          </div>
          <NavBtn
            dir="next"
            onClick={() => setActiveIndex((p) => (p + 1) % total)}
          />
        </div>
      </div>
    </section>
  );
}

function NavBtn({ dir, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#f3cf7a] hover:bg-[#f3cf7a] hover:text-black transition-all duration-500 shadow-lg bg-black/40"
    >
      {dir === "prev" ? "←" : "→"}
    </button>
  );
}

function EventCard({ event, isActive, position, onClick }) {
  const isClosed = event.registrationOpen === false;

  const styles = {
    transform: `translateX(${position * 120}%) translateZ(${
      isActive ? "160px" : "-400px"
    }) rotateY(${position * -35}deg) scale(${isActive ? 1.08 : 0.85})`,
    opacity: Math.abs(position) > 1.5 ? 0 : 1 - Math.abs(position) * 0.45,
    zIndex: 100 - Math.abs(Math.round(position * 10)),
    pointerEvents: isActive ? "auto" : "none",
  };

  return (
    <div
      style={styles}
      onClick={onClick}
      className="absolute cursor-pointer w-[250px] h-[390px] lg:w-[290px] lg:h-[390px] transition-all duration-1000 ease-out "
    >
      <div
        className={`group relative w-full h-full bg-[#0d0d0d] border rounded-[2.5rem] overflow-hidden transition-all duration-700 isolate ${
          isActive ? "border-[#f3cf7a]/40 shadow-2xl" : "border-white/5 grayscale opacity-60"
        }`}
      >
        {isClosed && (
          <div className="absolute top-7 right-[-35px] rotate-45 bg-red-600 text-white text-[7px] font-black py-1 px-10 z-20 shadow-xl uppercase tracking-widest">
            Sealed
          </div>
        )}

        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
          <img
            src={event.image}
            className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-[2.5s]"
            alt={event.mythologyName}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full p-7 flex flex-col justify-end">
          <h3 className="text-2xl lg:text-3xl font-serif font-black mb-1 text-white tracking-tight">
            {event.mythologyName}
          </h3>
          <p className="text-[#f3cf7a] text-[9px] font-black uppercase tracking-[0.3em] mb-5 opacity-70 italic">
            {event.actualName}
          </p>
          <div
            className={`w-full py-4 border rounded-xl text-center text-[8px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
              isActive
                ? "border-[#f3cf7a]/30 group-hover:bg-[#f3cf7a] group-hover:text-black"
                : "border-white/10 text-white/10"
            }`}
          >
            {isClosed ? "Sealed" : "Enter Arena"}
          </div>
        </div>
      </div>
    </div>
  );
}
