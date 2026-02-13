"use client";

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SPRING, EASE } from "../animations/MythologyMotion";

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

  /* Track scroll for navbar background transition */
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
      {/* NAVBAR — slides down on mount */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-12 py-5 flex justify-between items-center backdrop-blur-xl border-b transition-all duration-500 ${
          scrolled 
            ? "bg-black/70 border-[#f3cf7a]/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
            : "bg-black/40 border-[#f3cf7a]/10"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...SPRING.gentle, delay: 0.1 }}
      >

        {/* LEFT SIDE: LOGO STACK */}
        <div className="flex-1 flex justify-start -ml-3 md:-ml-10">
          <motion.div
            className="relative group cursor-pointer flex flex-col"
            onClick={(e) => handleScroll(e, "#")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/collegelogo.png"
              alt="Advaya Logo"
              className="h-8 md:h-18 w-auto object-contain brightness-110 transition-transform duration-500"
            />
          </motion.div>
        </div>

        {/* CENTER: DESKTOP LINKS — staggered entrance */}
        <div className="hidden md:flex items-center gap-10 flex-[2] justify-center">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className={`relative text-[11px] tracking-[0.3em] font-bold transition-all duration-300 group ${
                location.pathname === link.href 
                  ? "text-[#f3cf7a]" 
                  : "text-[#b08d32] hover:text-[#f3cf7a]"
              }`}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING.snappy, delay: 0.3 + i * 0.06 }}
              whileHover={{ y: -2 }}
            >
              {link.name}
              <motion.span 
                className="absolute -bottom-2 left-0 h-[1px] bg-[#f3cf7a]"
                initial={{ width: location.pathname === link.href ? "100%" : "0%" }}
                animate={{ width: location.pathname === link.href ? "100%" : "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex justify-end items-center gap-3 md:gap-6">
          <motion.a
            href={registerLink.href}
            className="bg-gradient-to-br from-[#f3cf7a] via-[#b08d32] to-[#8a6d29] px-4 md:px-8 py-2 md:py-3 rounded-[2px] text-black text-[10px] md:text-xs font-black tracking-[0.1em] md:tracking-[0.2em] shadow-[0_0_15px_rgba(176,141,50,0.3)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...SPRING.snappy, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(243, 207, 122, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            {registerLink.name}
          </motion.a>

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
      </motion.nav>

      {/* MOBILE SIDEBAR — enhanced with framer-motion */}
      <div className="md:hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[105]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-[#0a0a0a] border-l border-[#f3cf7a]/20 z-[110]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: EASE.smooth }}
            >
              <div className="flex flex-col h-full p-10 pt-20 gap-8">

                {/* Sidebar Logo */}
                <motion.img
                  src="/logomain.png"
                  alt="Logo"
                  className="w-48 self-center opacity-80 brightness-110"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                />

                <div className="flex flex-col gap-8">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="text-2xl tracking-[0.2em] font-serif italic text-white/70 hover:text-[#f3cf7a] transition-colors"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>

                <motion.div 
                  className="mt-auto border-t border-[#f3cf7a]/10 pt-6 opacity-40 text-[9px] tracking-[0.4em] text-[#f3cf7a] uppercase font-bold text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 0.8 }}
                >
                  Advaya 2026 • Sacred Pantheon
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;
