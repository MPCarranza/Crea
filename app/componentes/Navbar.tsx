'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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
              href="#pain" 
              className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === 'pain' 
                  ? 'bg-white/10 text-white border border-white/10 shadow-lg' 
                  : 'text-zinc-300 hover:text-white border border-transparent'
              }`}
            >
              Fricciones
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
              Turnero
            </a>
          </nav>
        </div>

        {/* Right Column - Actions / Mobile Button */}
        <div className="flex justify-end items-center">
          {/* Header Action Button */}
          <div className="hidden md:block">
            <a 
              href="https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20quiero%20consultar%20por%20un%20proyecto%20web"
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
                href="#pain" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-white py-2 border-b border-white/[0.02]"
              >
                Fricciones
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
                Turnero
              </a>
              
              <a 
                href="https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20quiero%20consultar%20por%20un%20proyecto%20web"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 w-full py-3.5 rounded-xl text-center text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20"
              >
                Consultar WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
