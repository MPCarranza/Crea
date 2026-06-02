'use client';

import { motion } from 'framer-motion';

import Navbar from './componentes/Navbar';
import HeroInmersive from './componentes/HeroInmersive';
import PainSection from './componentes/PainSection';
import SolutionSection from './componentes/SolutionSection';
import PricingSection from './componentes/PricingSection';
import BookingSection from './componentes/BookingSection';
import Footer from './componentes/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      
      {/* 1. ULTRA-PREMIUM GRID & NOISE ANALOG TEXTURE */}
      <div className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden">
        {/* Subtle grid line backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80" />
        
        {/* SVG Noise filter for a graphite, premium textured paper look */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.015]" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* 2. DYNAMIC BACKDROP LIGHTING ORBS (Modular glowing lights) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Cyan orbe on the upper right */}
        <motion.div 
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] mix-blend-screen"
        />

        {/* Purple orbe on the lower left */}
        <motion.div 
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -50, 0],
            scale: [1, 0.95, 1.1, 1]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/3 left-1/4 w-[550px] h-[550px] rounded-full bg-purple-500/5 blur-[140px] mix-blend-screen"
        />
      </div>

      {/* 3. MODULAR COMPONENTS */}
      <Navbar />
      <HeroInmersive />
      <PainSection />
      <SolutionSection />
      <PricingSection />
      <BookingSection />
      <Footer />

    </div>
  );
}
