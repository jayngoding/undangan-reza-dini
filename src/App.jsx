import React, { useState, useEffect } from 'react';
import IslamicBackground from './components/IslamicBackground';
import OpeningOverlay from './components/OpeningOverlay';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import MusicPlayer from './components/MusicPlayer';
import './index.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    // Get guest name from URL if present (?to=Nama+Tamu)
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      setGuestName(to.replace(/\+/g, ' '));
    }
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
    // Add scroll lock if needed when closed, but here we just transition
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-primary/20 overflow-x-hidden">
      {/* Lightweight Islamic Background */}
      <IslamicBackground isOpen={isOpen} />

      {/* Opening Overlay (Initially full screen, then disappears) */}
      <OpeningOverlay 
        isOpen={isOpen} 
        onOpen={handleOpen} 
        guestName={guestName} 
      />
      
      {/* Main Content (Appears after opening) */}
      {isOpen && (
        <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
          <Sidebar />
          <MainContent />
          <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </div>
      )}
      
      {/* Mobile-only background overlay to make text readable if needed */}
      {isOpen && (
        <div className="fixed inset-0 z-[-1] bg-bg-cream/40 backdrop-blur-[1px] lg:hidden" />
      )}
    </div>
  );
}

export default App;
