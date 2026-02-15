

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "HOME", href: "/home" },
    { name: "ABOUT", href: "/about" },
    { name: "EVENTS", href: "/events" },
    { name: "SUPPORT", href: "/support" },
    { name: "RULES", href: "/rules" },
    { name: "TIMELINE", href: "/timeline" },
  ];

  const registerLink = { name: "REGISTER", href: "/events" };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Track scroll for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-12 py-5 flex justify-between items-center backdrop-blur-xl border-b transition-all duration-500 ${
          scrolled
            ? "bg-black/70 border-[#f3cf7a]/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-black/40 border-[#f3cf7a]/10"
        }`}
      >
        {/* LEFT: LOGO */}
        <div className="flex-1 flex justify-start -ml-3 md:-ml-10">
          <div
            className="relative cursor-pointer flex flex-col"
            onClick={(e) => handleScroll(e, "#")}
          >
            <img
              src="/collegelogo.png"
              alt="Advaya Logo"
              className="h-8 md:h-18 w-auto object-contain brightness-110 transition-transform duration-500"
            />
          </div>
        </div>

        {/* CENTER: DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-10 flex-[2] justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`relative text-[11px] tracking-[0.3em] font-bold transition-all duration-300 ${
                location.pathname === link.href
                  ? "text-[#f3cf7a]"
                  : "text-[#b08d32] hover:text-[#f3cf7a]"
              }`}
            >
              {link.name}
              <span
                className="absolute -bottom-2 left-0 h-[1px] bg-[#f3cf7a]"
                style={{
                  width: location.pathname === link.href ? "100%" : "0%",
                  transition: "width 0.3s",
                }}
              />
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex justify-end items-center gap-3 md:gap-6">
          <Link
            to={registerLink.href}
            className="bg-gradient-to-br from-[#f3cf7a] via-[#b08d32] to-[#8a6d29] px-4 md:px-8 py-2 md:py-3 rounded-[2px] text-black text-[10px] md:text-xs font-black tracking-[0.1em] md:tracking-[0.2em] shadow-[0_0_15px_rgba(176,141,50,0.3)] hover:scale-105 transition-transform duration-300"
          >
            {registerLink.name}
          </Link>

          {/* HAMBURGER */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 z-[120] p-1"
            aria-label="Toggle Menu"
          >
            <div
              className={`w-6 h-0.5 bg-[#f3cf7a] transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-[#f3cf7a] transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-[#f3cf7a] transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[105] flex">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative ml-auto w-[80%] max-w-[300px] bg-[#0a0a0a] border-l border-[#f3cf7a]/20 h-full flex flex-col p-10 pt-20 gap-8">
            <img
              src="/logomain.png"
              alt="Logo"
              className="w-48 self-center opacity-80 brightness-110"
            />

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl tracking-[0.2em] font-serif italic text-white/70 hover:text-[#f3cf7a] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto border-t border-[#f3cf7a]/10 pt-6 opacity-40 text-[9px] tracking-[0.4em] text-[#f3cf7a] uppercase font-bold text-center">
              Advaya 2026 • Sacred Pantheon
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
