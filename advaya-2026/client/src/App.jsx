import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/headerfootercomponents/navbar"; 
import SecondVideo from "./components/mainpagecomponents/initialpage"; 
import EventsPage from "./pages/events"; 
import Rules from "./pages/rules";
import Support from "./pages/support";
import About from "./pages/about";
import Home from "./pages/home";
import Timeline from "./pages/timeline";
import Register from "./pages/register";

function App() {
  const location = useLocation();

  // Show navbar everywhere EXCEPT the landing video page ("/")
  const showNavbar = location.pathname !== "/";

  return (
    <div className="bg-black min-h-screen selection:bg-amber-500/30">
      {/* Conditionally render the Navbar */}
      {showNavbar && <Navbar />}

      <Routes>
        {/* The Landing/Initial Video Page */}
        <Route path="/" element={<SecondVideo />} />

        {/* Main Application Pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route path="/timeline" element={<Timeline />} />

        {/* The Specific Registration Route 
           URL Example: /register/code-kurukshetra 
        */}
        <Route path="/register/:eventId" element={<Register />} />

        {/* Fallback - Redirects unknown URLs back to landing or home */}
        <Route path="*" element={<SecondVideo />} />
      </Routes>
    </div>
  );
}

export default App;