"use client";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllEvents } from "../services/getallevents";
import { registerWarrior } from "../services/registerapi";

/* 🔁 CATEGORY NORMALIZATION BASED ON eventsData */
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

  // start with ONE participant
  const [participants, setParticipants] = useState([
    { name: "", email: "", mobile: "" },
  ]);

  const [formData, setFormData] = useState({
    teamName: "",
    collegeName: "",
  });

  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------------- FETCH EVENT ---------------- */
  useEffect(() => {
    async function loadEvent() {
      const events = await fetchAllEvents();
      const found = events.find((e) => e.eventId === eventId);
      if (!found) return navigate("/home");

      const backendCategory = BACKEND_CATEGORY_MAP[found.category];

      if (!backendCategory) {
        console.error("Invalid category:", found.category);
        return navigate("/home");
      }

      setEvent({
        eventId: found.eventId,
        name: found.mythologyName,
        displayCategory: found.category,   // UI only
        backendCategory,                   // API only
        fee: Number(found.fee),
        minTeamSize: found.teamSize?.min ?? 1,
        maxTeamSize: found.teamSize?.max ?? found.teamSize?.min ?? 1,
      });
    }

    loadEvent();
  }, [eventId, navigate]);

  /* ---------------- PARTICIPANTS ---------------- */
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

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    setToast(null);

    if (!formData.teamName.trim())
      return setToast({ type: "error", message: "Add team name" }), false;

    if (!formData.collegeName.trim())
      return setToast({ type: "error", message: "Add college name" }), false;

    if (participants.length < event.minTeamSize)
      return (
        setToast({
          type: "error",
          message: `Add at least ${event.minTeamSize} members`,
        }),
        false
      );

    for (let i = 0; i < participants.length; i++) {
      const p = participants[i];
      if (!p.name || !p.email || !p.mobile)
        return (
          setToast({
            type: "error",
            message: `Fill all fields for member ${i + 1}`,
          }),
          false
        );
    }

    return true;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await registerWarrior({
        eventName: event.name,
        category: event.backendCategory, // ✅ ENUM SAFE
        registrationFee: event.fee,
        teamName: formData.teamName.trim(),
        collegeName: formData.collegeName.trim(),
        teamSize: participants.length,
        participants,
      });

      setToast({ type: "success", message: "Registration successful" });
      setTimeout(() => navigate("/home"), 1200);
    } catch (err) {
      setToast({
        type: "error",
        message: err.message || "Registration failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!event) return null;

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-[#050505] text-white px-4 pt-32">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-center">{event.name}</h1>
        <p className="text-center text-[#f3cf7a]">
          {event.displayCategory}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <Input
            label="Team Name"
            value={formData.teamName}
            onChange={(e) =>
              setFormData({ ...formData, teamName: e.target.value })
            }
          />

          <Input
            label="College Name"
            value={formData.collegeName}
            onChange={(e) =>
              setFormData({ ...formData, collegeName: e.target.value })
            }
          />

          {participants.map((p, idx) => (
            <div key={idx} className="relative border p-4 rounded-xl space-y-3">
              <p className="font-bold">
                {idx === 0 ? "Captain" : `Member ${idx + 1}`}
              </p>

              {participants.length > event.minTeamSize &&
                idx >= event.minTeamSize && (
                  <button
                    type="button"
                    onClick={() => removeMember(idx)}
                    className="absolute top-3 right-3 text-red-400"
                  >
                    ✕
                  </button>
                )}

              <Input
                label="Name"
                value={p.name}
                onChange={(e) =>
                  handleParticipantChange(idx, "name", e.target.value)
                }
              />
              <Input
                label="Email"
                value={p.email}
                onChange={(e) =>
                  handleParticipantChange(idx, "email", e.target.value)
                }
              />
              <Input
                label="Mobile"
                value={p.mobile}
                onChange={(e) =>
                  handleParticipantChange(idx, "mobile", e.target.value)
                }
              />
            </div>
          ))}

          {participants.length < event.maxTeamSize && (
            <button
              type="button"
              onClick={addMember}
              className="w-full border py-3 rounded-xl"
            >
              Add Member
            </button>
          )}

          <button
            disabled={isSubmitting}
            className="w-full py-5 bg-[#f3cf7a] text-black font-black rounded-2xl"
          >
            {isSubmitting ? "Registering..." : "Confirm Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------- REUSABLE ---------------- */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-xs text-[#f3cf7a]/60">{label}</label>
      <input
        className="w-full p-4 bg-black border border-[#f3cf7a]/20 rounded-xl"
        {...props}
      />
    </div>
  );
}

function Toast({ message, type, onClose }) {
  React.useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed top-34 right-6 px-6 py-4 rounded-xl z-50 ${
        type === "success"
          ? "bg-green-900 text-green-300"
          : "bg-red-900 text-red-300"
      }`}
    >
      {message}
    </div>
  );
}
