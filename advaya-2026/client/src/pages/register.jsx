
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllEvents } from "../services/getallevents";
import { registerWarrior } from "../services/registerapi";
import { Plus, Trash2, School, Shield, Zap, Swords, Trophy, Crown, Sparkles } from "lucide-react";

const BACKEND_CATEGORY_MAP = {
  PG: "PG",
  UG: "UG",
  Combined: "UG/PG",
  "Non-Tech": "UG/PG",
};

export default function Register() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [nextId, setNextId] = useState(1);
  const [participants, setParticipants] = useState([{ id: 0, name: "", email: "", mobile: "" }]);
  const [formData, setFormData] = useState({ teamName: "", collegeName: "" });
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function loadEvent() {
      try {
        const events = await fetchAllEvents();
        if (!events || !Array.isArray(events)) return navigate("/home");
        const found = events.find((e) => e.eventId === eventId);
        if (!found) return navigate("/home");

        const backendCategory = BACKEND_CATEGORY_MAP[found.category];
        setEvent({
          eventId: found.eventId,
          name: found.mythologyName,
          displayCategory: found.category,
          backendCategory,
          fee: Number(found.fee),
          minTeamSize: found.teamSize?.min ?? 1,
          maxTeamSize: found.teamSize?.max ?? found.teamSize?.min ?? 1,
        });
      } catch (error) {
        navigate("/home");
      }
    }
    loadEvent();
  }, [eventId, navigate]);

  const handleParticipantChange = (index, field, value) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

  const addMember = () => {
    if (participants.length < event.maxTeamSize) {
      setParticipants([...participants, { id: nextId, name: "", email: "", mobile: "" }]);
      setNextId(nextId + 1);
    }
  };

  const removeMember = (index) => {
    if (participants.length > event.minTeamSize) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const isCombined = event?.backendCategory === "UG/PG";
  const finalCategory = isCombined ? selectedCategory : event?.backendCategory;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.teamName || !formData.collegeName) {
      return setToast({ type: "error", message: "Details required for the Royal Decree." });
    }
    if (isCombined && !selectedCategory) {
      return setToast({ type: "error", message: "Select your division — UG or PG." });
    }
    setIsSubmitting(true);
    try {
      await registerWarrior({ ...formData, participants, eventName: event.name, category: finalCategory, registrationFee: event.fee, teamSize: participants.length });
      setToast({ type: "success", message: "Your name is gilded in history!" });
      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      setToast({ type: "error", message: err.message || "The heavens are silent. Try again." });
      setIsSubmitting(false);
    }
  };

  if (!event) return <LoadingScreen />;

  return (
    <div className="min-h-screen relative bg-transparent text-[#fdf4d7] px-5 pt-24 md:pt-32 pb-20 overflow-x-hidden font-serif">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[80%] h-[40%] bg-yellow-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[80%] h-[40%] bg-amber-900/15 blur-[100px] rounded-full" />
      </div>

      <AnimatePresence>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="flex justify-center mb-5">
             <Crown className="text-amber-400/80 animate-pulse w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight uppercase bg-gradient-to-b from-[#fff8e1] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent px-2">
            {event.name}
          </h1>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge text={event.displayCategory} />
            <Badge text={`Dakshina: ₹${event.fee}`} />
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-10 md:space-y-16">
          {/* CLAN SECTION */}
          <SectionTitle title="The Royal Lineage" />
          <GoldenCard>
            <div className={`grid grid-cols-1 ${isCombined ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-8 md:gap-12`}>
              <GoldenInput label="Clan Name" icon={<Shield size={16} />} value={formData.teamName} onChange={(e) => setFormData({ ...formData, teamName: e.target.value })} />
              <GoldenInput label="Gurukul (Institution)" icon={<School size={16} />} value={formData.collegeName} onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })} />
              {isCombined && (
                <div className="flex flex-col gap-2 group">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-amber-500/40 flex items-center gap-2 group-focus-within:text-amber-500/70 transition-colors">
                    Division
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-0 py-1 bg-[#080808] border-b border-white/5 text-[#fdf4d7] focus:outline-none focus:border-amber-500/50 transition-all text-sm font-light appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23d4a84b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 4px center' }}
                  >
                    <option value="" disabled style={{ background: '#0a0a0f', color: '#6b6050' }}>Select UG / PG</option>
                    <option value="UG" style={{ background: '#0a0a0f', color: '#fdf4d7' }}>UG</option>
                    <option value="PG" style={{ background: '#0a0a0f', color: '#fdf4d7' }}>PG</option>
                  </select>
                </div>
              )}
            </div>
          </GoldenCard>

          {/* WARRIORS SECTION */}
          <SectionTitle title="Chosen Warriors" />
          <div className="space-y-6 md:space-y-10">
            {participants.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 30, mass: 1 }}
              >
                <GoldenCard isHighlight={idx === 0}>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/60 flex items-center gap-2">
                      <div className="w-6 h-[1px] bg-amber-500/30" />
                      {idx === 0 ? "The Mahasenapati" : `Warrior ${idx + 1}`}
                    </span>
                    {participants.length > event.minTeamSize && (
                      <button type="button" onClick={() => removeMember(idx)} className="text-red-400/40 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <GoldenInput label="Name" value={p.name} onChange={(e) => handleParticipantChange(idx, "name", e.target.value)} />
                    <GoldenInput label="Email" type="email" value={p.email} onChange={(e) => handleParticipantChange(idx, "email", e.target.value)} />
                    <GoldenInput label="Mobile" value={p.mobile} onChange={(e) => handleParticipantChange(idx, "mobile", e.target.value)} />
                  </div>
                </GoldenCard>
              </motion.div>
            ))}
          </div>

          {/* ACTION SECTION */}
          <div className="flex flex-col items-center gap-8 pt-6">
            {participants.length < event.maxTeamSize && (
              <button
                type="button" onClick={addMember}
                className="text-amber-500/70 hover:text-amber-300 font-bold uppercase tracking-[0.2em] text-[9px] border-b border-amber-500/10 pb-1 transition-all"
              >
                + Summon Warrior
              </button>
            )}

            {/* SMALL REFINED BUTTON FOR BOTH MOBILE & DESKTOP */}
            <div className="w-full flex justify-center mt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit" disabled={isSubmitting}
                className="relative w-auto min-w-[240px] px-8 py-3.5 overflow-hidden rounded-lg bg-gradient-to-b from-[#d4af37] to-[#b8860b] text-[#2a1e00] font-black uppercase tracking-[0.15em] shadow-lg group"
              >
                {/* Subtle Shimmer */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
                
                <span className="relative z-10 text-[10px] md:text-[11px] flex items-center justify-center gap-2">
                  {isSubmitting ? "Enshrining..." : "Enter the Hall of Fame"}
                </span>
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================= REFINED COMPONENTS ================= */

function SectionTitle({ title }) {
  return (
    <div className="relative flex items-center justify-center gap-4 mb-4">
      <div className="h-[0.5px] flex-grow bg-gradient-to-r from-transparent to-amber-500/20 max-w-[50px]" />
      <h2 className="text-lg md:text-xl font-medium tracking-widest text-[#fdf4d7]/90 uppercase">{title}</h2>
      <div className="h-[0.5px] flex-grow bg-gradient-to-l from-transparent to-amber-500/20 max-w-[50px]" />
    </div>
  );
}

function Badge({ text }) {
  return (
    <div className="px-4 py-1.5 rounded-sm border border-amber-500/20 bg-amber-500/5 text-[9px] font-bold uppercase tracking-widest text-amber-400/80">
      {text}
    </div>
  );
}

function GoldenCard({ children, isHighlight = false }) {
  return (
    <div className={`relative bg-[#080808] border ${isHighlight ? 'border-amber-500/30' : 'border-white/5'} rounded-xl p-7 md:p-10 shadow-2xl`}>
      {children}
    </div>
  );
}

function GoldenInput({ label, icon, ...props }) {
  return (
    <div className="flex flex-col gap-2 group">
      <label className="text-[9px] font-bold uppercase tracking-widest text-amber-500/40 flex items-center gap-2 group-focus-within:text-amber-500/70 transition-colors">
        {icon} {label}
      </label>
      <input
        {...props}
        className="px-0 py-1 bg-transparent border-b border-white/5 text-[#fdf4d7] focus:outline-none focus:border-amber-500/50 transition-all text-sm font-light"
      />
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="w-8 h-8 border-t border-amber-500/50 rounded-full animate-spin" />
    </div>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ y: -40, opacity: 0, x: "-50%" }} animate={{ y: 0, opacity: 1, x: "-50%" }}
      className={`fixed top-6 left-1/2 z-[100] px-6 py-3 rounded-md border backdrop-blur-xl ${
        type === "success" ? "bg-amber-500/10 border-amber-500/40 text-amber-100" : "bg-red-900/30 border-red-500/40 text-red-100"
      }`}
    >
      <span className="text-[9px] font-black tracking-[0.2em] uppercase">{message}</span>
    </motion.div>
  );
}