import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Navbar from './components/Navbar/Navbar';

// Pages
import Events from './pages/Events/Events';

// Category Pages
import PGTechnical from './features/pg-technical';
import UGTechnical from './features/ug-technical';
import NonTechnical from './features/non-technical';

// Event Detail Component (Dynamic)
import EventDetail from './components/EventDetail/EventDetail';

// Registration
import Registration from './features/registration/Registration';

import './App.css';

const Home = () => (
  <div className="home-container">
    <h1 className="home-title">Welcome to ADVAYA 2026</h1>
    <p className="home-subtitle">Where Technology Meets Tradition</p>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/register" element={<Registration />} />
                
                {/* Category Pages */}
                <Route path="/events/pg-technical" element={<PGTechnical />} />
                <Route path="/events/ug-technical" element={<UGTechnical />} />
                <Route path="/events/non-technical" element={<NonTechnical />} />
                
                {/* Dynamic Event Detail Route - Handles all individual events */}
                <Route path="/events/:eventId" element={<EventDetail />} />
              </Routes>
            </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
