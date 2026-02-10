"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Configure your API base URL here
const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  timeout: 10000,
});

export default function EventsPage() {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  /* ================= FETCH DATA (AXIOS) ================= */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await api.get("/events/all");
        setAllEvents(response.data);
      } catch (err) {
        const msg = err.response?.data?.message || "The divine gates are closed. Try again later.";
        setError(msg);
        console.error("Axios Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  /* ================= ARENA FILTERING ================= */
  const arenas = useMemo(() => {
    if (!allEvents.length) return [];
    
    return [
      {
        title: "Technical PG",
        events: allEvents.filter(e => e.category === "PG")
      },
      {
        title: "Technical UG",
        events: allEvents.filter(e => e.category === "UG")
      },
      {
        title: "Combined & Non-Technical",
        events: allEvents.filter(e => 
          e.category === "Non-Tech" || e.category === "Combined"
        )
      }
    ];
  }, [allEvents]);

  // Loading Screen
  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#050505]">
      <div className="text-[#f3cf7a] animate-pulse font-serif italic text-2xl tracking-[0.2em]">
        SUMMONING THE WARRIORS...
      </div>
    </div>
  );

  // Error Screen
  if (error) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#050505] p-6 text-center">
      <div className="text-red-500/80 font-serif italic text-xl mb-6">"{error}"</div>
      <button 
        onClick={() => window.location.reload()} 
        className="px-8 py-3 border border-[#f3cf7a]/30 text-[#f3cf7a] uppercase text-[10px] tracking-widest hover:bg-[#f3cf7a] hover:text-black transition-all"
      >
        Retry Ritual
      </button>
    </div>
  );

  return (
    <div className="bg-[#050505] text-white min-h-screen relative overflow-x-hidden selection:bg-[#f3cf7a]/30">
      
      {/* MAIN CONTENT AREA */}
      <div className={`transition-all duration-700 ease-in-out ${selectedEvent ? 'blur-xl brightness-50 scale-95' : ''}`}>
        
        {/* HERO */}
        <section className="h-[45vh] mt-8 flex flex-col items-center justify-center text-center px-4 relative pt-20">
          <h1 className="text-7xl lg:text-9xl font-serif italic font-black text-[#f3cf7a] leading-none tracking-tighter drop-shadow-[0_10px_30px_rgba(243,207,122,0.2)]">
            ARENAS
          </h1>
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-[10px] tracking-[0.6em] text-[#f3cf7a] uppercase opacity-50 font-bold italic">
              Step into the Battleground of the Gods
            </p>
            <div className="w-px h-16 bg-gradient-to-b from-[#f3cf7a] to-transparent opacity-20"></div>
          </div>
        </section>

        {/* RENDER ARENAS */}
        <div className="space-y-4">
          {arenas.map((arena, i) => (
            <EventArena 
              key={i} 
              title={arena.title} 
              events={arena.events} 
              onSelect={setSelectedEvent} 
            />
          ))}
        </div>
        
        <div className="pb-32" />
      </div>

      {/* EVENT MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 lg:p-10">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedEvent(null)} />
            
            <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#0a0a0a] border border-[#f3cf7a]/10 rounded-[3rem] overflow-y-auto shadow-[0_0_100px_rgba(0,0,0,1)] custom-scrollbar">
                
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="sticky top-8 float-right mr-8 z-[100] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:bg-[#f3cf7a] hover:text-black transition-all duration-500"
                >✕</button>

                <div className="p-8 lg:p-20">
                    <div className="flex flex-col lg:flex-row gap-16">
                        
                        {/* LEFT: DETAILS */}
                        <div className="lg:w-1/2">
                            <div className="flex items-center gap-4 mb-6">
                              <span className="w-12 h-px bg-[#f3cf7a]/40"></span>
                              <span className="text-[#f3cf7a] text-[11px] font-black tracking-[0.5em] uppercase italic">
                                {selectedEvent.actualName}
                              </span>
                            </div>
                            <h2 className="text-5xl lg:text-7xl font-serif italic font-black text-white leading-tight mb-10">
                                {selectedEvent.mythologyName}
                            </h2>
                            <p className="text-gray-400 text-base leading-relaxed mb-12 border-l-2 border-[#f3cf7a]/20 pl-8 italic font-light">
                                {selectedEvent.description}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <StatBox label="Offerings" value={`₹${selectedEvent.fee}`} />
                                <StatBox label="Ritual Time" value={selectedEvent.duration} />
                                <StatBox label="Min Warriors" value={`${selectedEvent.teamSize?.min}`} />
                                <StatBox label="Max Warriors" value={`${selectedEvent.teamSize?.max}`} />
                            </div>
                        </div>

                        {/* RIGHT: RULES & CTA */}
                        <div className="lg:w-1/2 flex flex-col justify-between">
                            <div>
                              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-10 flex items-center gap-6">
                                The Code of Conduct <span className="flex-1 h-px bg-white/5"></span>
                              </h4>
                              <ul className="space-y-6">
                                  {selectedEvent.rules?.map((rule, idx) => (
                                      <li key={idx} className="flex gap-6 text-[13px] text-gray-400 leading-relaxed group">
                                          <span className="text-[#f3cf7a]/40 font-black italic group-hover:text-[#f3cf7a] transition-colors">0{idx + 1}</span>
                                          {rule}
                                      </li>
                                  ))}
                              </ul>
                            </div>
                            
                            <div className="mt-16 pt-10 border-t border-white/5">
                              {selectedEvent.registrationOpen ? (
                                <button 
                                  onClick={() => {
                                    setSelectedEvent(null);
                                    navigate(`/register/${selectedEvent.eventId}`);
                                  }}
                                  className="group relative w-full py-7 bg-[#f3cf7a] text-black font-black uppercase tracking-[0.3em] text-xs rounded-2xl overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all duration-500"
                                >
                                  <span className="relative z-10">Enlist in the Battle</span>
                                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                </button>
                              ) : (
                                <div className="w-full py-7 bg-white/5 text-red-500/50 text-center font-black uppercase tracking-[0.3em] text-xs rounded-2xl border border-red-900/20 italic">
                                  Battleground Sealed
                                </div>
                              )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f3cf7a22; border-radius: 10px; }
      `}</style>
    </div>
  );
}

/* ---------------- HELPER COMPONENTS ---------------- */

function StatBox({ label, value }) {
  return (
    <div className="p-5 bg-white/[0.02] rounded-3xl border border-white/5 group hover:border-[#f3cf7a]/30 transition-colors">
      <p className="text-[8px] uppercase tracking-widest text-white/30 mb-2 group-hover:text-[#f3cf7a]/50 transition-colors">{label}</p>
      <p className="text-xl font-serif text-[#f3cf7a]">{value}</p>
    </div>
  );
}

function EventArena({ title, events, onSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = events.length;

  if (!total) return null;

  return (
    <section className="relative py-14 lg:py-1 border-b border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.02] text-[18vw] font-black italic pointer-events-none text-[#f3cf7a] uppercase select-none">
        {title.split(' ')[1] || title}
      </div>

      <h2 className="text-center text-4xl lg:text-6xl font-serif font-black text-[#f3cf7a] mb-20 uppercase italic px-4">
        {title} <span className="text-white/10 font-sans not-italic mx-4 text-2xl">/</span> Arena
      </h2>

      <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center perspective-[2500px]">
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
      </div>

      <div className="flex flex-col items-center  gap-1">
        <div className="flex items-center gap-4">
          <NavBtn dir="prev" onClick={() => setActiveIndex((p) => (p - 1 + total) % total)} />
          <div className="flex gap-4">
            {events.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-700 ${activeIndex === i ? "w-20 bg-[#f3cf7a]" : "w-4 bg-white/10"}`} />
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
    <button 
      onClick={onClick} 
      className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-xl text-[#f3cf7a] hover:bg-[#f3cf7a] hover:text-black hover:scale-110 transition-all duration-500"
    >
      {dir === 'prev' ? '←' : '→'}
    </button>
  );
}

function EventCard({ event, isActive, position, onClick }) {
  const isClosed = event.registrationOpen === false;

  const styles = {
    // Spacing adjusted for smaller cards (120% instead of 110%)
    transform: `translateX(${position * 120}%) translateZ(${isActive ? "150px" : "-400px"}) rotateY(${position * -35}deg) scale(${isActive ? 1.1 : 0.85})`,
    opacity: Math.abs(position) > 1.5 ? 0 : 1 - Math.abs(position) * 0.45,
    zIndex: 100 - Math.abs(Math.round(position * 10)),
    pointerEvents: isActive ? "auto" : "none",
    filter: isActive 
        ? (isClosed ? "grayscale(0.7) brightness(0.6)" : "none") 
        : "blur(8px) grayscale(1) brightness(0.4)",
  };

  return (
    <div 
      style={styles} 
      onClick={onClick} 
      // MODIFIED: Smaller dimensions for desktop
      className="absolute cursor-pointer w-[260px] h-[380px] lg:w-[300px] lg:h-[420px] transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
    >
      <div className={`group relative w-full h-full bg-[#0d0d0d] border ${isClosed ? 'border-red-900/30' : 'border-white/5'} rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)]`}>
        
        {/* SEALED RIBBON */}
        {isClosed && (
          <div className="absolute top-8 right-[-35px] rotate-45 bg-red-600 text-white text-[7px] font-black py-1 px-10 z-20 shadow-xl uppercase tracking-widest">
            Sealed
          </div>
        )}

        <div className="absolute inset-0">
          <img src={event.image} className="w-full h-full object-cover opacity-30 group-hover:scale-110 group-hover:opacity-50 transition-all duration-1000" alt={event.mythologyName} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        {/* MODIFIED: Reduced padding for smaller card */}
        <div className="relative z-10 h-full p-8 flex flex-col justify-end">
          <h3 className="text-2xl lg:text-3xl font-serif font-black text-white mb-2 tracking-tight">
            {event.mythologyName}
          </h3>
          <p className="text-[#f3cf7a] text-[9px] font-black uppercase tracking-[0.3em] mb-6 opacity-60 italic">
            {event.actualName}
          </p>
          
          <div className={`w-full py-4 border rounded-xl text-center text-[8px] font-black uppercase tracking-[0.3em] transition-all duration-500 
            ${isClosed 
              ? "border-red-900/20 text-red-500/40 cursor-not-allowed" 
              : "border-[#f3cf7a]/20 group-hover:bg-[#f3cf7a] group-hover:text-black"}`}
          >
            {isClosed ? "Sealed" : "Enter Arena"}
          </div>
        </div>
      </div>
    </div>
  );
}