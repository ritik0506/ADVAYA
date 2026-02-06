import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Navbar from './components/Navbar/Navbar';

// Pages
import Events from './pages/Events/Events';

// PG Technical Events
import VyasaData from './features/pg-technical/VyasaData/VyasaData';
import WebAstra from './features/pg-technical/WebAstra/WebAstra';
import BrahmaBits from './features/pg-technical/BrahmaBits/BrahmaBits';

// UG Technical Events
import WebShilpaChakra from './features/ug-technical/WebShilpaChakra/WebShilpaChakra';
import BitsVedha from './features/ug-technical/BitsVedha/BitsVedha';
import MayaLoop from './features/ug-technical/MayaLoop/MayaLoop';
import ShabdaVedha from './features/ug-technical/ShabdaVedha/ShabdaVedha';

// Non-Technical Events
import DrishtiPOV from './features/non-technical/DrishtiPOV/DrishtiPOV';
import BidsSabha from './features/non-technical/BidsSabha/BidsSabha';
import GuptaLeela from './features/non-technical/GuptaLeela/GuptaLeela';
import Nidhi404 from './features/non-technical/Nidhi404/Nidhi404';
import RanabhoomiBArena from './features/non-technical/RanabhoomiBArena/RanabhoomiBArena';

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
                <Route path="/register" element={
                  <Registration 
                    eventName="ADVAYA 2026"
                    category="UG/PG"
                    registrationFee={500}
                    minTeamSize={1}
                    maxTeamSize={4}
                  />
                } />
                
                {/* PG Technical Events */}
                <Route path="/events/vyasa-data" element={<VyasaData />} />
                <Route path="/events/webastra" element={<WebAstra />} />
                <Route path="/events/brahma-bits" element={<BrahmaBits />} />
                
                {/* UG Technical Events */}
                <Route path="/events/web-shilpa-chakra" element={<WebShilpaChakra />} />
                <Route path="/events/bits-vedha" element={<BitsVedha />} />
                <Route path="/events/maya-loop" element={<MayaLoop />} />
                <Route path="/events/shabdavedha" element={<ShabdaVedha />} />
                
                {/* Non-Technical Events */}
                <Route path="/events/drishti-pov" element={<DrishtiPOV />} />
                <Route path="/events/bids-sabha" element={<BidsSabha />} />
                <Route path="/events/gupta-leela" element={<GuptaLeela />} />
                <Route path="/events/nidhi-404" element={<Nidhi404 />} />
                <Route path="/events/ranabhoomi-arena" element={<RanabhoomiBArena />} />
              </Routes>
            </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
