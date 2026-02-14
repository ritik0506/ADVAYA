"use client";

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/headerfootercomponents/navbar";
import SecondVideo from "./components/mainpagecomponents/initialpage";
import EventsPage from "./pages/events";
import Rules from "./pages/rules";
import Support from "./pages/support";
import About from "./pages/about";
import Home from "./pages/home";
import Timeline from "./pages/timeline";
import Register from "./pages/register";
import TeamRegistrationPage from "./pages/fullteamregister";
import Footer from "./components/headerfootercomponents/footer";

import { EASE } from "./components/animations/MythologyMotion";

/* ═══════════════════════════════════════════════════════════════
   Page Transition Wrapper — Dual-Curtain Temple Door Reveal
   ═══════════════════════════════════════════════════════════════ */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {/* Top Golden Curtain */}
      <motion.div
        className="fixed inset-0 z-[9998] pointer-events-none origin-top"
        style={{
          background:
            "linear-gradient(to bottom, #f3cf7a, #b08d32 40%, #1a1005 80%, #050505)",
        }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.65, ease: EASE.circ, delay: 0.05 }}
      />

      {/* Bottom Golden Sweep Line */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-[2px] z-[9997] pointer-events-none bg-gradient-to-r from-transparent via-[#f3cf7a] to-transparent"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE.smooth, delay: 0.3 }}
      />

      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  // Show navbar, footer, and background on all pages except landing video page
  const showHeaderFooter = location.pathname !== "/";
  const showBackground = location.pathname !== "/";

  return (
    <div className="bg-black min-h-screen selection:bg-amber-500/30 relative">
      
      {/* Full-page blurred background except for landing page */}
      {/* {showBackground && <ImageBackground  />} */}

      {showHeaderFooter && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* Landing Page */}
          <Route path="/" element={<SecondVideo />} />

          {/* Main Application Pages (Animated) */}
          <Route
            path="/home"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />

          <Route
            path="/events"
            element={
              <PageWrapper>
                <EventsPage />
              </PageWrapper>
            }
          />

          <Route
            path="/registercollege"
            element={
              <PageWrapper>
                <TeamRegistrationPage />
              </PageWrapper>
            }
          />

          <Route
            path="/rules"
            element={
              <PageWrapper>
                <Rules />
              </PageWrapper>
            }
          />

          <Route
            path="/support"
            element={
              <PageWrapper>
                <Support />
              </PageWrapper>
            }
          />

          <Route
            path="/about"
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />

          <Route
            path="/timeline"
            element={
              <PageWrapper>
                <Timeline />
              </PageWrapper>
            }
          />

          {/* Event Registration */}
          <Route
            path="/register/:eventId"
            element={
              <PageWrapper>
                <Register />
              </PageWrapper>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>

      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
