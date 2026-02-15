
import React, { Suspense } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/headerfootercomponents/navbar";
import Footer from "./components/headerfootercomponents/footer";
import { EASE } from "./components/animations/MythologyMotion";

// Lazy-loaded pages — each becomes a separate chunk
const SecondVideo = React.lazy(() => import("./components/mainpagecomponents/initialpage"));
const Home = React.lazy(() => import("./pages/home"));
const EventsPage = React.lazy(() => import("./pages/events"));
const Rules = React.lazy(() => import("./pages/rules"));
const Support = React.lazy(() => import("./pages/support"));
const About = React.lazy(() => import("./pages/about"));
const Timeline = React.lazy(() => import("./pages/timeline"));
const Register = React.lazy(() => import("./pages/register"));
const TeamRegistrationPage = React.lazy(() => import("./pages/fullteamregister"));

function LoadingFallback() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <div className="text-[#f3cf7a] animate-pulse font-serif italic text-xl tracking-[0.2em]">
        Loading...
      </div>
    </div>
  );
}

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

      <Suspense fallback={<LoadingFallback />}>
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

          {/* 404 Not Found */}
          <Route
            path="*"
            element={
              <PageWrapper>
                <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
                  <h1 className="text-8xl font-serif font-black text-[#f3cf7a] mb-4">404</h1>
                  <p className="text-white/50 text-lg mb-8">This path has not been charted, warrior.</p>
                  <Link
                    to="/home"
                    className="px-8 py-3 border border-[#f3cf7a] text-[#f3cf7a] hover:bg-[#f3cf7a] hover:text-black transition-all uppercase tracking-[0.2em] text-sm font-bold"
                  >
                    Return to the Sanctum
                  </Link>
                </div>
              </PageWrapper>
            }
          />
        </Routes>
        </AnimatePresence>
      </Suspense>

      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
