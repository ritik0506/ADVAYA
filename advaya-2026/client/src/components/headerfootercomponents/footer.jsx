"use client";

import React from "react";
import { Instagram, MapPin } from "lucide-react"; 

const Footer = () => {
  return (
    <footer className="relative z-10 w-full bg-[#050505] pt-24 pb-12 px-6 border-t border-[#f3cf7a]/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[#f3cf7a]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start mb-20">
          
          {/* Left: The Identity */}
          <div className="flex flex-col space-y-4">
            <h2 className="font-serif italic text-3xl tracking-[0.2em] text-[#f3cf7a]">
              ADVAYA <span className="text-sm not-italic opacity-50">2K26</span>
            </h2>
            <p className="text-[10px] leading-loose uppercase tracking-[0.3em] text-white/40 max-w-[300px]">
              The supreme convergence of ancient lore and digital mastery. Organized by the Department of MCA, RVITM.
            </p>
          </div>

          {/* Center: Instagram Link */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.5em] text-[#f3cf7a]/80 font-bold">
              Connect With Us
            </h4>
            <a
              href="https://www.instagram.com/mca_rvitm" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-[#f3cf7a] transition-all duration-500"
            >
              <div className="p-3 rounded-full border border-white/10 group-hover:border-[#f3cf7a]/50 group-hover:shadow-[0_0_15px_rgba(243,207,122,0.2)] transition-all">
                <Instagram size={20} className="text-white/40 group-hover:text-[#f3cf7a]" />
              </div>
              <span>Follow the Odyssey</span>
            </a>
          </div>

          {/* Right: Institutional Info with Maps Link */}
          <div className="flex flex-col items-center md:items-end space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.5em] text-[#f3cf7a]/80 font-bold">
              Venue
            </h4>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=RV+INSTITUTE+OF+TECHNOLOGY+AND+MANAGEMENT+Bengaluru&query_place_id=ChIJEYZr_7JqrjsRJE1vGywnF4Q"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-center md:text-right space-y-2 hover:opacity-80 transition-opacity"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-[#f3cf7a] transition-colors">
                RV Institute of Technology and Management
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 flex items-center justify-center md:justify-end gap-2">
                <MapPin size={10} className="text-[#f3cf7a]/40" />
                JP Nagar 9th Phase, Bengaluru
              </p>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Decoration */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-4">
            <div className="h-[1px] w-8 bg-[#f3cf7a]/30" />
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/20">
              © Advaya 2026 • All Rights Reserved
            </p>
            <div className="h-[1px] w-8 bg-[#f3cf7a]/30" />
          </div>

          {/* Department Branding */}
          <div className="flex items-center gap-3">
             <span className="text-[9px] uppercase tracking-[0.6em] text-[#f3cf7a]/40">
                Crafted by Dept. of MCA
             </span>
          </div>
        </div>
      </div>

      {/* Aesthetic Bottom Edge Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#f3cf7a]/20 to-transparent" />
    </footer>
  );
};

export default Footer;