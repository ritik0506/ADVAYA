

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Crown,
  School,
  Mail,
  Phone,
  Users,
  Trophy,
  Layers,
  Info,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  timeout: 10000,
});

export default function TeamRegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    collegeName: "",
    category: "UG",
    coordinatorName: "",
    coordinatorEmail: "",
    coordinatorPhone: "",
    totalParticipants: 10,
    totalEvents: 8,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.totalParticipants < 10 || formData.totalParticipants > 14) {
      return showToast("Team size must be between 10 and 14 members.");
    }
    if (formData.totalEvents < 8) {
      return showToast("Minimum 8 events participation required for this offer.");
    }

    try {
      setLoading(true);
      await api.post("/team-registration", formData);
      showToast("Royal Registration Successful!", "success");
      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      showToast(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[#fdf4d7] flex items-center justify-center px-5 py-20 md:py-40 relative overflow-hidden font-serif ">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[80%] h-[40%] bg-yellow-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[80%] h-[40%] bg-amber-900/10 blur-[120px] rounded-full" />
      </div>

      {/* TOAST */}
      {toast.show && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-8 py-3 rounded-full border backdrop-blur-xl shadow-2xl transition-all ${
          toast.type === "success" ? "bg-amber-500/10 border-amber-500/40 text-amber-200" : "bg-red-900/30 border-red-500/40 text-red-200"
        }`}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">{toast.message}</p>
        </div>
      )}

      <div className="w-full max-w-5xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: GUIDELINES */}
        <div className="lg:col-span-5 space-y-6 flex flex-col">
          <div className="bg-[#0a0a0a] border border-amber-500/20 p-8 rounded-3xl flex-grow shadow-xl">
            <div className="flex items-center gap-3 mb-6 text-amber-400">
              <Info size={20} />
              <h2 className="text-xl font-bold uppercase tracking-widest">Guidelines</h2>
            </div>
            
            <ul className="space-y-5 text-sm">
              <GuidelineItem text="Team Size: Min 10 to Max 14 participants." />
              <GuidelineItem text="Team Offer: Special registration fee of ₹2499." />
              <GuidelineItem text="Participation: Collective participation in at least 8 events." />
              <GuidelineItem text="Individual Entry: Mandatory if under 10 members." />
              <GuidelineItem text="Separation: Separate teams for UG and PG categories." />
            </ul>

            <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-[10px] text-amber-500/40 uppercase tracking-widest leading-relaxed italic">
                  *Non-compliance may result in disqualification from the offer.
                </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REGISTRATION FORM */}
        <div className="lg:col-span-7">
          <div className="bg-[#0a0a0a] p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
            <div className="text-center mb-8">
              <Crown className="text-amber-500/80 w-10 h-10 mx-auto mb-4" />
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase bg-gradient-to-b from-[#fff8e1] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent">
                COLLEGE REGISTRATION
              </h1>
              <p className="text-amber-500/60 text-[10px] md:text-xs uppercase tracking-[0.3em] mt-2 font-bold">
                REGISTRATION FEE — ₹2499
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div className="md:col-span-2">
                   <InputField label="Gurukul (College)" name="collegeName" icon={<School size={16}/>} value={formData.collegeName} onChange={handleChange} />
                </div>
                
                {/* CUSTOM ROYAL DROPDOWN */}
                <div className="relative">
                  <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-amber-500/40 mb-2">
                    <Layers size={14}/> Category
                  </label>
                  <div 
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className="w-full bg-black/40 border-b border-white/10 px-4 py-3 text-sm flex justify-between items-center cursor-pointer hover:border-amber-500/50 transition-all text-[#fdf4d7]"
                  >
                    <span>{formData.category === "UG" ? "Undergraduate (UG)" : "Postgraduate (PG)"}</span>
                    <ChevronDown size={14} className={`text-amber-500 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {isSelectOpen && (
                    <div className="absolute z-[110] w-full mt-1 bg-[#121212] border border-amber-500/20 rounded-b-xl overflow-hidden shadow-2xl">
                      {["UG", "PG"].map((cat) => (
                        <div 
                          key={cat}
                          className="px-4 py-3 text-sm hover:bg-amber-500/10 cursor-pointer transition-colors"
                          onClick={() => {
                            setFormData({...formData, category: cat});
                            setIsSelectOpen(false);
                          }}
                        >
                          {cat === "UG" ? "Undergraduate (UG)" : "Postgraduate (PG)"}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <InputField label="Coordinator" name="coordinatorName" icon={<Users size={16}/>} value={formData.coordinatorName} onChange={handleChange} />
                <InputField label="Varta (Email)" name="coordinatorEmail" type="email" icon={<Mail size={16}/>} value={formData.coordinatorEmail} onChange={handleChange} />
                <InputField label="Sampark (Phone)" name="coordinatorPhone" icon={<Phone size={16}/>} value={formData.coordinatorPhone} onChange={handleChange} />
                <InputField label="Members (10-14)" name="totalParticipants" type="number" icon={<Users size={16}/>} value={formData.totalParticipants} onChange={handleChange} />
                <InputField label="Events (Min 8)" name="totalEvents" type="number" icon={<Trophy size={16}/>} value={formData.totalEvents} onChange={handleChange} />
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full md:w-auto md:min-w-[280px] px-8 py-4 overflow-hidden rounded-lg 
                             bg-gradient-to-b from-[#d4af37] to-[#b8860b] text-[#2a1e00] 
                             font-black uppercase tracking-[0.15em] text-[11px] shadow-lg transition-all 
                             active:scale-95 border border-amber-400/50"
                >
                  <span className="relative z-10">{loading ? "Processing..." : "Complete Registration"}</span>
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-[150%] transition-all duration-700" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuidelineItem({ text }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 size={16} className="text-amber-500 mt-1 flex-shrink-0" />
      <span className="text-[#fdf4d7]/70 leading-relaxed tracking-wide">{text}</span>
    </li>
  );
}

function InputField({ label, icon, ...props }) {
  return (
    <div className="group">
      <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-amber-500/40 mb-2">
        {icon} {label}
      </label>
      <input
        {...props}
        required
        className="w-full bg-black/40 border-b border-white/10 rounded-t-lg px-4 py-3 text-[#fdf4d7] focus:outline-none focus:border-amber-500/50 transition-all text-sm font-light"
      />
    </div>
  );
}