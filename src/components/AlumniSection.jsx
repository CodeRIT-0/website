'use client';

import React from 'react';
import AlumniCard from '../Card/AlumniCard';

const ChevronLeft = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const ChevronRight = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

const AlumniSection = ({ alumni }) => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative px-4 py-8 bg-gray-900">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        <span className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg shadow-xl">
          Alumni
        </span>
      </h2>

      <button 
        onClick={() => scroll('left')} 
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-yellow-500 p-2 rounded-r-lg shadow-xl hover:bg-yellow-600 transition-colors"
      >
        <ChevronLeft />
      </button>
      
      <button 
        onClick={() => scroll('right')} 
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-yellow-500 p-2 rounded-l-lg shadow-xl hover:bg-yellow-600 transition-colors"
      >
        <ChevronRight />
      </button>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden gap-4 px-8 no-scrollbar scroll-smooth "
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {alumni.map((person, index) => (
          <AlumniCard key={index} person={person} />
        ))}
      </div>
    </div>
  );
};

export default AlumniSection;