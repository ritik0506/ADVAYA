"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ALL_EVENTS } from "../components/homecomponents/constant1";
import { registerWarrior } from "../services/registerapi";

export default function Register() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const dropRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    collegeName: "",
    category: "",
    phoneNumber: "",
    teamName: "",
  });

  const categories = ["UG", "PG", "UG/PG"];

  useEffect(() => {
    const foundEvent = ALL_EVENTS.find((e) => e.id === eventId);
    if (foundEvent) setEvent(foundEvent);

    window.scrollTo(0, 0);

    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setIsDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [eventId]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const selectCategory = (cat) => {
    setFormData({ ...formData, category: cat });
    setIsDropOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      setToast({ message: "Please choose a category", type: "error" });
      return;
    }

    setIsSubmitting(true);

    const rawFee = event?.fees || "0";
    const numericFee = Number(String(rawFee).replace(/[^0-9.]/g, "")) || 0;

    const payload = {
      eventName: event?.name || "Unknown Event",
      category: formData.category,
      registrationFee: numericFee,
      collegeName: formData.collegeName.trim(),
      teamName: formData.teamName.trim(),
      teamSize: 1,
      participants: [
        {
          name: formData.fullName.trim(),
          mobile: formData.phoneNumber.trim(),
          email: formData.email.trim().toLowerCase(),
        },
      ],
    };

    try {
      const result = await registerWarrior(payload);

      setToast({
        message: result.message || "Thy name has been etched in the scrolls",
        type: "success",
      });

      setTimeout(() => navigate("/home"), 1200);
    } catch (error) {
      setToast({
        message: error.message || "The ritual has failed",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!event) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 py-12 pt-32 px-4 relative overflow-hidden font-sans">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#f3cf7a]/5 blur-[120px] rounded-full opacity-40 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-[#f3cf7a]/60 hover:text-[#f3cf7a] transition-all mb-10 uppercase text-[10px] font-black tracking-[0.3em]"
        >
          <span className="text-xl group-hover:-translate-x-2 transition-transform">
            ←
          </span>
          Return to the Pantheon
        </button>

        <div className="bg-[#0c0c0c] border border-[#f3cf7a]/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)]">
          <div className="p-10 text-center border-b border-[#f3cf7a]/5 bg-gradient-to-b from-[#f3cf7a]/5 to-transparent">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl border border-[#f3cf7a]/20 flex items-center justify-center bg-[#050505] text-4xl">
                {event.icon}
              </div>
            </div>
            <h1 className="text-5xl font-serif italic font-black">
              {event.name}
            </h1>
            <p className="text-[#f3cf7a]/40 text-[11px] mt-3 uppercase tracking-[0.3em] italic">
              Contribution: {event.fees}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-14 space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
              {[
                ["Team Name", "teamName"],
                ["Captain Name", "fullName"],
                ["Email Address", "email"],
                ["Phone Number", "phoneNumber"],
                ["College / Institution", "collegeName"],
              ].map(([label, name], i) => (
                <div key={i} className="space-y-3 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f3cf7a]/60">
                    {label}
                  </label>
                  <input
                    required
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full bg-white/[0.02] border border-[#f3cf7a]/10 rounded-xl px-5 py-4 text-white"
                  />
                </div>
              ))}

              <div className="space-y-3 md:col-span-2 relative" ref={dropRef}>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f3cf7a]/60">
                  Division
                </label>
                <div
                  onClick={() => setIsDropOpen(!isDropOpen)}
                  className="w-full bg-white/[0.02] border border-[#f3cf7a]/10 rounded-xl px-5 py-4 cursor-pointer flex justify-between"
                >
                  <span>
                    {formData.category || "Select UG or PG"}
                  </span>
                  <span>▾</span>
                </div>

                {isDropOpen && (
                  <div className="absolute w-full mt-2 bg-[#0c0c0c] border border-[#f3cf7a]/20 rounded-xl overflow-hidden">
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        onClick={() => selectCategory(cat)}
                        className="px-5 py-4 hover:bg-[#f3cf7a] hover:text-black cursor-pointer"
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              disabled={isSubmitting}
              className={`w-full py-6 bg-[#f3cf7a] text-black font-black uppercase tracking-[0.4em] rounded-2xl ${
                isSubmitting ? "opacity-50" : "hover:scale-[1.02]"
              }`}
            >
              {isSubmitting ? "ETCHING THE SCROLL..." : "CONFIRM ENROLLMENT"}
            </button>
          </form>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes toast-in {
          from {
            opacity: 0;
            transform: translate(-40px, -20px);
          }
          to {
            opacity: 1;
            transform: translate(0, 0);
          }
        }
        .toast-anim {
          animation: toast-in 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}

/* ---------- TOAST COMPONENT ---------- */

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 left-6 z-[10000] px-6 py-4 rounded-2xl border shadow-2xl toast-anim ${
        type === "success"
          ? "bg-[#0c0c0c] border-[#f3cf7a]/40 text-[#f3cf7a]"
          : "bg-[#140808] border-red-800/40 text-red-400"
      }`}
    >
      <p className="text-xs font-black uppercase tracking-[0.3em]">
        {message}
      </p>
    </div>
  );
}
