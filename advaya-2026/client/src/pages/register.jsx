"use client";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllEvents } from "../services/getallevents";
import { registerWarrior } from "../services/registerapi";
import { Plus, Trash2, School, Shield, Zap, Swords } from "lucide-react";

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
  const [participants, setParticipants] = useState([{ name: "", email: "", mobile: "" }]);
  const [formData, setFormData] = useState({ teamName: "", collegeName: "" });
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadEvent() {
      const events = await fetchAllEvents();
      const found = events.find((e) => e.eventId === eventId);
      if (!found) return navigate("/home");
      const backendCategory = BACKEND_CATEGORY_MAP[found.category];
      if (!backendCategory) return navigate("/home");

      setEvent({
        eventId: found.eventId,
        name: found.mythologyName,
        displayCategory: found.category,
        backendCategory,
        fee: Number(found.fee),
        minTeamSize: found.teamSize?.min ?? 1,
        maxTeamSize: found.teamSize?.max ?? found.teamSize?.min ?? 1,
      });
    }
    loadEvent();
  }, [eventId, navigate]);

  /* Logic remains same as previous version */
  const handleParticipantChange = (index, field, value) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
    setToast(null);
  };

  const addMember = () => {
    if (participants.length >= event.maxTeamSize) return;
    setParticipants([...participants, { name: "", email: "", mobile: "" }]);
  };

  const removeMember = (index) => {
    if (participants.length <= event.minTeamSize) return;
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    setToast(null);
    if (!formData.teamName.trim()) return setToast({ type: "error", message: "Team Name is required" }), false;
    if (!formData.collegeName.trim()) return setToast({ type: "error", message: "College Name is required" }), false;
    for (let p of participants) {
      if (!p.name || !p.email || !p.mobile) return setToast({ type: "error", message: "Please fill all details" }), false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await registerWarrior({
        eventName: event.name,
        category: event.backendCategory,
        registrationFee: event.fee,
        teamName: formData.teamName.trim(),
        collegeName: formData.collegeName.trim(),
        teamSize: participants.length,
        participants,
      });
      setToast({ type: "success", message: "Warrior Registered Successfully!" });
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      setToast({ type: "error", message: err.message || "Registration failed" });
      setIsSubmitting(false);
    }
  };

  if (!event) return (
    <div className="min-h-screen bg-[#020308] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#f3cf7a]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020308] text-gray-100 px-4 pt-32 pb-20 relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      
      {/* 🌌 BACKGROUND GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[60%] bg-[#f3cf7a]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="max-w-3xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic bg-gradient-to-b from-white via-[#f3cf7a] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(243,207,122,0.3)]">
            {event.name}
          </h1>
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border-2 border-blue-500/40 bg-blue-500/10 backdrop-blur-xl text-blue-400 text-[10px] font-black tracking-[0.4em] uppercase">
            <Zap size={14} className="fill-blue-400" /> {event.displayCategory} • ₹{event.fee}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* PERMANENT BORDERED TEAM SECTION */}
          <div className="relative">
            {/* The Permanent Dual-Tone Border Rim */}
            <div className="absolute -inset-[2px] bg-gradient-to-br from-[#f3cf7a]/60 via-blue-500/20 to-blue-500/60 rounded-3xl opacity-100" />
            
            <div className="relative bg-[#050505] backdrop-blur-3xl p-8 rounded-3xl border border-white/10 shadow-[inset_0_0_20px_rgba(243,207,122,0.05)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input
                  label="Team Name"
                  icon={<Shield size={14} className="text-blue-400" />}
                  placeholder="Enter team alias"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                />
                <Input
                  label="College Name"
                  icon={<School size={14} className="text-[#f3cf7a]" />}
                  placeholder="Institution Name"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* SQUAD ROSTER SECTION */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-[#f3cf7a] uppercase tracking-[0.5em] flex items-center gap-4">
              <span className="h-[2px] w-12 bg-[#f3cf7a]"></span>
              Squad Roster
            </h3>
            
            {participants.map((p, idx) => (
              <div key={idx} className="relative">
                {/* Permanent Rim: Gold for Captain, Blue for Warriors */}
                <div className={`absolute -inset-[1.5px] bg-gradient-to-r ${idx === 0 ? 'from-[#f3cf7a] via-[#f3cf7a]/40' : 'from-blue-500 via-blue-500/40'} to-transparent rounded-2xl opacity-80`} />
                
                <div className="relative bg-[#080808] p-8 rounded-2xl border border-white/5 shadow-2xl">
                  <div className="flex justify-between items-center mb-8">
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${idx === 0 ? 'text-[#f3cf7a]' : 'text-blue-400'}`}>
                      {idx === 0 ? <><Zap size={14} className="fill-[#f3cf7a]"/> Captain</> : `Warrior ${idx + 1}`}
                    </span>
                    
                    {participants.length > event.minTeamSize && idx >= event.minTeamSize && (
                      <button
                        type="button"
                        onClick={() => removeMember(idx)}
                        className="text-gray-500 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-full transition-all border border-transparent hover:border-red-500/30"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input label="Full Name" value={p.name} onChange={(e) => handleParticipantChange(idx, "name", e.target.value)} />
                    <Input label="Email" type="email" value={p.email} onChange={(e) => handleParticipantChange(idx, "email", e.target.value)} />
                    <Input label="Mobile" value={p.mobile} onChange={(e) => handleParticipantChange(idx, "mobile", e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PERMANENTLY BORDERED CONTROLS */}
          <div className="flex flex-col gap-8 items-center pt-8">
            {participants.length < event.maxTeamSize && (
              <button
                type="button"
                onClick={addMember}
                className="group flex items-center gap-3 px-10 py-3 rounded-full border-2 border-blue-500/60 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/20"
              >
                <Plus size={14} /> Add Warrior
              </button>
            )}

            <button
              disabled={isSubmitting}
              className="relative w-full max-w-md group"
            >
              {/* Bottom Depth Shadow */}
              <div className="absolute inset-0 bg-[#b8860b] rounded-xl translate-y-1.5" />
              {/* Main Button with Permanent Border */}
              <div className="relative z-10 py-5 bg-gradient-to-r from-[#f3cf7a] to-[#ffde8a] text-black font-black uppercase tracking-[0.3em] rounded-xl border-2 border-white/40 shadow-2xl flex items-center justify-center gap-3 transition-transform active:translate-y-1">
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-black/30 border-t-black animate-spin rounded-full" />
                ) : (
                  <>CONFIRM ENROLLMENT <Swords size={18}/></>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[10px] font-black text-[#f3cf7a] uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
        {icon} {label}
      </label>
      <div className="relative">
        {/* Permanent Border Container for Input */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-white/10 to-blue-500/20 rounded-xl" />
        <input
          className="relative w-full px-5 py-4 bg-[#0a0a0a] border border-white/10 rounded-xl focus:border-blue-500 transition-all outline-none text-white text-sm placeholder:text-gray-800"
          {...props}
        />
      </div>
    </div>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed top-10 right-10 px-8 py-5 rounded-2xl z-[100] border-2 shadow-2xl animate-in slide-in-from-right duration-500 ${
      type === "success"
        ? "bg-[#050505] border-green-500 text-green-400 shadow-green-500/10"
        : "bg-[#050505] border-red-500 text-red-400 shadow-red-500/10"
    }`}>
      <p className="font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
        {message}
      </p>
    </div>
  );
}