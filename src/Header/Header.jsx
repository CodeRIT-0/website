'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/team', label: 'Team' },
    { path: '/interview-experience', label: 'Interview Experience' },
    // { path: '/registration', label: 'Ice-Breaker 2024', special: true }
    { path: '', label: 'Ice-Breaker 2024', special: true }
  ];

  return (
    <nav 
      className={`
        fixed w-full z-50 transition-all duration-300 
        ${scrolled ? 'shadow-lg' : ''} 
        bg-[#1b2430]
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo/logo.png"
              width={80}
              height={80}
              alt="CodeRIT logo"
              className="transition-transform duration-300 hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  ${pathname === item.path ? 'text-[#17cf97]' : 'text-gray-300 hover:text-[#17cf97]'}
                  ${item.special 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-4 py-2 rounded-full font-medium text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-sm'
                    : 'text-lg tracking-wide font-medium transition-colors duration-200 relative group'
                  }
                `}
              >
                {item.label}
                {!item.special && (
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#17cf97] transition-all duration-200 group-hover:w-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="md:hidden pr-8">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 relative">
                <span 
                  className={`
                    absolute w-full h-0.5 bg-current transform transition-all duration-300 origin-center
                    ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}
                  `} 
                />
                <span 
                  className={`
                    absolute w-full h-0.5 bg-current transition-all duration-300
                    ${isMenuOpen ? 'opacity-0' : 'top-3'}
                  `} 
                />
                <span 
                  className={`
                    absolute w-full h-0.5 bg-current transform transition-all duration-300 origin-center
                    ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}
                  `} 
                />
              </div>
            </button>
          </div>
        </div>

        <div 
          className={`
            md:hidden fixed inset-0 bg-black/50 z-40
            ${isMenuOpen ? 'visible' : 'invisible'}
            transition-all duration-300 ease-in-out
          `}
          onClick={closeMobileMenu}
        >
          <div 
            className={`
              fixed top-20 right-0 w-64 h-auto max-h-[calc(100vh-120px)] bg-[#2a3239] 
              transform transition-transform duration-300 ease-in-out
              ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
              rounded-bl-xl shadow-lg overflow-y-auto
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-2 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${pathname === item.path ? 'text-[#17cf97] bg-[#353e47]' : 'text-gray-300 hover:text-white hover:bg-[#353e47]'}
                    ${item.special 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
                      : ''
                    }
                  `}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}