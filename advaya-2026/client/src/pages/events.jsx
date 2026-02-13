"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  timeout: 10000,
});

export default function EventsPage() {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await api.get("/events/all");
        setAllEvents(response.data);
      } catch (err) {
        const msg = err.response?.data?.message || "The divine gates are closed.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const arenas = useMemo(() => {
    if (!allEvents.length) return [];
    return [
      { title: "Technical PG", events: allEvents.filter(e => e.category === "PG") },
      { title: "Technical UG", events: allEvents.filter(e => e.category === "UG") },
      { title: "Combined & Non-Technical", events: allEvents.filter(e => e.category === "Non-Tech" || e.category === "Combined") }
    ];
  }, [allEvents]);

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#050505]">
      <div className="text-[#f3cf7a] animate-pulse font-serif italic text-2xl tracking-[0.2em]">SUMMONING THE WARRIORS...</div>
    </div>
  );

  return (
    <div className="bg-[#050505] text-white min-h-screen relative overflow-x-hidden selection:bg-[#f3cf7a]/30">
      
      <div className={`transition-all duration-700 ease-in-out ${selectedEvent ? 'blur-xl brightness-50 scale-95' : ''}`}>
        
        {/* HERO SECTION - Moderate Height */}
        <section className="h-[35vh] flex flex-col items-center justify-center text-center px-4 relative pt-28">
          <h1 className="text-7xl lg:text-9xl font-serif italic font-black text-[#f3cf7a] leading-none tracking-tighter drop-shadow-[0_10px_30px_rgba(243,207,122,0.2)]">
            EVENTS
          </h1>
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-[10px] tracking-[0.6em] text-[#f3cf7a] uppercase opacity-50 font-bold italic">Step into the Battleground of the Gods</p>
            <div className="w-px h-12 bg-gradient-to-b from-[#f3cf7a] to-transparent opacity-20"></div>
          </div>
        </section>

        {/* RENDER ARENAS - Balanced spacing */}
        <div className="space-y-16">
          {arenas.map((arena, i) => (
            <EventArena key={i} title={arena.title} events={arena.events} onSelect={setSelectedEvent} />
          ))}
        </div>
        
        <div className="" />
      </div>

      {/* MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 perspective-[1500px]">
          <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md" onClick={() => setSelectedEvent(null)} />
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d0d0d] rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row border border-white/10 shadow-[0_0_80px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95 duration-500">
              <div className="flex-1 p-6 md:p-12 overflow-y-auto custom-scrollbar relative z-10">
                  <div className="sticky top-0 z-[100] flex justify-end mb-2">
                    <button onClick={() => setSelectedEvent(null)} className="w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white/70 hover:text-[#f3cf7a] transition-all">✕</button>
                  </div>
                  <div className="space-y-1 mb-6 mt-2">
                    <span className="text-[#f3cf7a] text-[9px] font-black tracking-[0.5em] uppercase italic">{selectedEvent.actualName}</span>
                    <h2 className="text-4xl md:text-6xl font-serif italic font-black text-white leading-tight">{selectedEvent.mythologyName}</h2>
                  </div>
                  <p className="text-white/60 text-sm italic font-light mb-8 border-l-2 border-[#f3cf7a]/40 pl-5">{selectedEvent.description}</p>
                  <div className="space-y-6 pb-10">
                      <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#f3cf7a]/80 flex items-center gap-4">The Code <span className="flex-1 h-px bg-white/10"></span></h4>
                      <ul className="space-y-4">
                          {selectedEvent.rules?.map((rule, idx) => (
                              <li key={idx} className="flex gap-4 text-[12px] text-white/50"><span className="text-[#f3cf7a] font-black">0{idx + 1}</span><span>{rule}</span></li>
                          ))}
                      </ul>
                  </div>
              </div>
              <div className="w-full lg:w-[320px] bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/10 p-10 flex flex-col justify-between">
                  <div className="space-y-4">
                      <StatBox label="Offerings" value={`₹${selectedEvent.fee}`} />
                      <div className="grid grid-cols-2 gap-2">
                        <StatBox label="Min" value={selectedEvent.teamSize?.min} />
                        <StatBox label="Max" value={selectedEvent.teamSize?.max} />
                      </div>
                  </div>
                  <button onClick={() => { setSelectedEvent(null); navigate(`/register/${selectedEvent.eventId}`); }} className="w-full py-5 bg-[#f3cf7a] text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-xl active:scale-95 transition-transform mt-8">Enlist Now</button>
              </div>
          </div>
        </div>
      )}

      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f3cf7a22; border-radius: 10px; }
      `}</style>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="p-5 bg-white/[0.03] rounded-3xl border border-white/5">
      <p className="text-[8px] uppercase tracking-widest text-white/30 mb-2">{label}</p>
      <p className="text-xl font-serif text-[#f3cf7a]">{value}</p>
    </div>
  );
}

/* ---------------- BALANCED ARENA COMPONENT ---------------- */
function EventArena({ title, events, onSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = events.length;
  if (!total) return null;

  return (
    <section className="relative py-12 border-b border-white/5 overflow-hidden">
      {/* Title - "Little larger" gap below */}
      <h2 className="text-center text-4xl lg:text-6xl font-serif font-black text-[#f3cf7a] mb-14 uppercase italic px-4">
        {title}
      </h2>

      {/* Slider Container - Comfortable height */}
      <div className="relative w-full h-[420px] lg:h-[480px] flex items-center justify-center perspective-[2500px]">
        {events.map((event, index) => {
          let diff = index - activeIndex;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;
          return <EventCard key={event.eventId} event={event} isActive={index === activeIndex} position={diff} onClick={() => onSelect(event)} />;
        })}
      </div>

      {/* Navigation - Balanced gap */}
      <div className="flex flex-col items-center mt-8">
        <div className="flex items-center gap-8">
          <NavBtn dir="prev" onClick={() => setActiveIndex((p) => (p - 1 + total) % total)} />
          <div className="flex gap-2">
            {events.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-700 ${activeIndex === i ? "w-14 bg-[#f3cf7a]" : "w-3 bg-white/10"}`} />
            ))}
          </div>
          <NavBtn dir="next" onClick={() => setActiveIndex((p) => (p + 1) % total)} />
        </div>
      </div>
    </section>
  );
}

function NavBtn({ dir, onClick }) {
  return (
    <button onClick={onClick} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#f3cf7a] hover:bg-[#f3cf7a] hover:text-black transition-all duration-500 shadow-lg bg-black/40">
      {dir === 'prev' ? '←' : '→'}
    </button>
  );
}

function EventCard({ event, isActive, position, onClick }) {
  const isClosed = event.registrationOpen === false;
  
  const styles = {
    transform: `translateX(${position * 120}%) translateZ(${isActive ? "150px" : "-400px"}) rotateY(${position * -35}deg) scale(${isActive ? 1.08 : 0.85})`,
    opacity: Math.abs(position) > 1.5 ? 0 : 1 - Math.abs(position) * 0.45,
    zIndex: 100 - Math.abs(Math.round(position * 10)),
    pointerEvents: isActive ? "auto" : "none",
  };

  return (
    <div style={styles} onClick={onClick} className="absolute cursor-pointer w-[250px] h-[370px] lg:w-[290px] lg:h-[420px] transition-all duration-1000 ease-out">
      
      {/* SOFT RADIANCE (No Rings) */}
      <div 
        className={`absolute inset-0 -m-20 transition-opacity duration-1000 pointer-events-none ${isActive ? 'opacity-40' : 'opacity-0'}`}
        style={{
          background: `radial-gradient(circle at center, rgba(243, 207, 122, 0.15) 0%, rgba(243, 207, 122, 0.05) 45%, transparent 70%)`,
          filter: 'blur(45px)',
        }}
      />
      
      {/* Card Body */}
      <div className={`group relative w-full h-full bg-[#0d0d0d] border rounded-[2.5rem] overflow-hidden transition-all duration-700 isolate ${isActive ? 'border-[#f3cf7a]/40 shadow-2xl' : 'border-white/5 grayscale opacity-60'}`}>
        {isClosed && (
          <div className="absolute top-7 right-[-35px] rotate-45 bg-red-600 text-white text-[7px] font-black py-1 px-10 z-20 shadow-xl uppercase tracking-widest">
            Sealed
          </div>
        )}
        
        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
          <img 
            src={event.image} 
            className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-[2.5s] will-change-transform" 
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
          <div className={`w-full py-4 border rounded-xl text-center text-[8px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${isActive ? "border-[#f3cf7a]/30 group-hover:bg-[#f3cf7a] group-hover:text-black" : "border-white/10 text-white/10"}`}>
            {isClosed ? "Sealed" : "Enter Arena"}
          </div>
        </div>
      </div>
    </div>
  );
}