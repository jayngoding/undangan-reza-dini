import React from 'react';
import VerseSection from './Sections/VerseSection';
import CoupleSection from './Sections/CoupleSection';
import LoveStorySection from './Sections/LoveStorySection';
import CountdownSection from './Sections/CountdownSection';
import EventSection from './Sections/EventSection';
import GallerySection from './Sections/GallerySection';
import GiftSection from './Sections/GiftSection';
import RSVPSection from './Sections/RSVPSection';
import PrayerSection from './Sections/PrayerSection';
import Footer from './Sections/Footer';

const MainContent = ({ guestName = '' }) => {
  return (
    <div className="w-full lg:w-[60%] lg:ml-[40%] bg-white/10 backdrop-blur-[2px] flex flex-col min-h-screen relative shadow-2xl overflow-y-auto overflow-x-hidden border-x-[1px] border-white/20">
      <VerseSection />
      <CoupleSection />
      <LoveStorySection />
      <CountdownSection />
      <EventSection />
      <GallerySection />
      <GiftSection />
      <RSVPSection guestName={guestName} />
      <PrayerSection />
      <Footer />
    </div>
  );
};

export default MainContent;
