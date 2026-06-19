'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';
import { SCROLL_SECTIONS } from '../utils/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Smooth section tracking
    const trackActiveSection = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of SCROLL_SECTIONS) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', trackActiveSection);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', trackActiveSection);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'py-4 bg-black/20 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.25)]' 
        : 'py-6 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between md:grid md:grid-cols-3">
        
        {/* Left Column - Logo */}
        <div className="flex justify-start">
          <a href="#hero" className="flex items-center group">
            <img 
              src="/iconoCrea.png" 
              alt="Estudio Crea" 
              className="h-5 md:h-6 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        </div>

        {/* Middle Column - Desktop Navigation Links (Centered) */}
        <div className="hidden md:flex justify-center">
          <nav className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.06] p-1 rounded-full backdrop-blur-md">
            <a 
              href="#showcase" 
              className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === 'showcase' 
                  ? 'bg-white/10 text-white border border-white/10 shadow-lg' 
                  : 'text-zinc-300 hover:text-white border border-transparent'
              }`}
            >
              Ustedes
            </a>
            <a 
              href="#pain" 
              className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === 'pain' 
                  ? 'bg-white/10 text-white border border-white/10 shadow-lg' 
                  : 'text-zinc-300 hover:text-white border border-transparent'
              }`}
            >
              Facilidades
            </a>
            <a 
              href="#solution" 
              className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === 'solution' 
                  ? 'bg-white/10 text-white border border-white/10 shadow-lg' 
                  : 'text-zinc-300 hover:text-white border border-transparent'
              }`}
            >
              Solución
            </a>
            <a 
              href="#pricing" 
              className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === 'pricing' 
                  ? 'bg-white/10 text-white border border-white/10 shadow-lg' 
                  : 'text-zinc-300 hover:text-white border border-transparent'
              }`}
            >
              Precios
            </a>
            <a 
              href="#booking" 
              className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === 'booking' 
                  ? 'bg-white/10 text-white border border-white/10 shadow-lg' 
                  : 'text-zinc-300 hover:text-white border border-transparent'
              }`}
            >
              Turnos
            </a>
          </nav>
        </div>

        {/* Right Column - Actions / Mobile Button */}
        <div className="flex justify-end items-center">
          {/* Header Action Button */}
          <div className="hidden md:block">
            <a 
              href="https://wa.me/5493855824408?text=Hola%20Estudio%20Crea,%20quiero%20consultar%20por%20un%20proyecto%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] hover:border-cyan-500/40 hover:bg-cyan-500/10 text-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:scale-[1.03]"
            >
              Consultar por WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/[0.06] bg-black/60 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <a 
                href="#showcase" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-white py-2 border-b border-white/[0.02]"
              >
                Ustedes
              </a>
              <a 
                href="#pain" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-white py-2 border-b border-white/[0.02]"
              >
                Facilidades
              </a>
              <a 
                href="#solution" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-white py-2 border-b border-white/[0.02]"
              >
                Solución
              </a>
              <a 
                href="#pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-white py-2 border-b border-white/[0.02]"
              >
                Precios
              </a>
              <a 
                href="#booking" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-white py-2"
              >
                Turnos
              </a>
              
              <a 
                href="https://wa.me/5493855824408?text=Hola%20Estudio%20Crea,%20quiero%20consultar%20por%20un%20proyecto%20web"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 w-full py-3.5 rounded-xl text-center text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20"
              >
                Consultar WhatsApp
              </a>

              {/* Mobile Drawer Social Links */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/[0.06]">
                <a 
                  href="https://instagram.com/estudiocrea.oficial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Instagram (@estudiocrea.oficial)"
                >
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@estudiocrea.oficial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="TikTok (@estudiocrea.oficial)"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.99 2 1.68 3.28 2.03.02 1.34 0 2.68.01 4.02-1.28-.08-2.52-.57-3.52-1.39-.77-.6-1.39-1.38-1.82-2.27v7.58c.03 1.83-.54 3.65-1.63 5.09-1.23 1.62-3.13 2.64-5.15 2.76-2.09.13-4.24-.62-5.7-2.12C1.94 18.35 1.05 15.93 1.32 13.5c.21-2.19 1.48-4.21 3.42-5.26 1.47-.79 3.19-.99 4.77-.6v4.06c-.95-.31-1.99-.21-2.85.31-.95.53-1.64 1.53-1.85 2.6-.28 1.33.22 2.75 1.25 3.6 1.05.86 2.53.97 3.69.28.84-.46 1.39-1.35 1.48-2.31.02-2.11.01-4.21.01-6.32V0c.32.02.66-.02.97.02z" />
                  </svg>
                </a>
                <a 
                  href="mailto:estudiocrea2026@gmail.com" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Email (estudiocrea2026@gmail.com)"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
