"use client";

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "HOME", href: "/home" },
    { name: "ABOUT", href: "/about" },
    { name: "SUPPORT", href: "/support" },
    { name: "RULES", href: "/rules" },
    { name: "TIMELINE", href: "/timeline" },
  ];

  const registerLink = { name: "REGISTER", href: "/events" };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const handleScroll = (e, href) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-12 py-2 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-[#f3cf7a]/10">

        {/* LEFT SIDE: LOGO STACK */}
        <div className="flex-1 flex justify-start">
          <div
            className="relative group cursor-pointer flex flex-col"
            onClick={(e) => handleScroll(e, "#")}
          >
            {/* MAIN LOGO */}
            <img
              src="/logomain.png"
              alt="Advaya Logo"
              className="h-14 md:h-20 w-auto object-contain brightness-110 transition-transform duration-500 group-hover:scale-105"
            />

            {/* 2026 LOGO — RIGHT ALIGNED BELOW */}
           {/* 2026 LOGO — SMALLER & SLIGHTLY UP */}
<div className="w-full flex justify-end -mt-3">
  <img
    src="/2026logo.png"
    alt="2026 Logo"
    className="h-3 -mt-2  md:h-3 w-auto object-contain opacity-90 
"
  />
</div>

          </div>
        </div>

        {/* CENTER: DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-10 flex-[2] justify-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="relative text-[11px] tracking-[0.3em] font-bold text-[#b08d32] hover:text-[#f3cf7a] transition-all duration-300 group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-[#f3cf7a] transition-all duration-500 group-hover:w-full group-hover:left-0" />
            </a>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex justify-end items-center gap-3 md:gap-6">
          <a
            href={registerLink.href}
            className="bg-gradient-to-br from-[#f3cf7a] via-[#b08d32] to-[#8a6d29] px-4 md:px-8 py-2 md:py-3 rounded-[2px] text-black text-[10px] md:text-xs font-black tracking-[0.1em] md:tracking-[0.2em] shadow-[0_0_15px_rgba(176,141,50,0.3)] active:scale-95 transition-transform"
          >
            {registerLink.name}
          </a>

          {/* HAMBURGER */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 z-[120] p-1"
            aria-label="Toggle Menu"
          >
            <div className={`w-6 h-0.5 bg-[#f3cf7a] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-6 h-0.5 bg-[#f3cf7a] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-0.5 bg-[#f3cf7a] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div className="md:hidden">
        <div
          className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[105] transition-opacity duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-[#0a0a0a] border-l border-[#f3cf7a]/20 z-[110] transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col h-full p-10 pt-20 gap-8">

            {/* Sidebar Logo */}
            <img
              src="/logomain.png"
              alt="Logo"
              className="w-48 self-center opacity-80 brightness-110"
            />

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-2xl tracking-[0.2em] font-serif italic text-white/70 hover:text-[#f3cf7a] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-auto border-t border-[#f3cf7a]/10 pt-6 opacity-40 text-[9px] tracking-[0.4em] text-[#f3cf7a] uppercase font-bold text-center">
              Advaya 2026 • Sacred Pantheon
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
