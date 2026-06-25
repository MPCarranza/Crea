'use client';

import React from 'react';
import { motion } from 'framer-motion';

import Navbar from '../componentes/Navbar';
import HistoriaSection from '../componentes/HistoriaSection';
import PropuestaValorSection from '../componentes/PropuestaValorSection';
import MisionVisionSection from '../componentes/MisionVisionSection';
import ValoresSection from '../componentes/ValoresSection';
import Footer from '../componentes/Footer';

export default function HistoriaPageClient() {
  return (
    <div className="relative min-h-screen bg-[#faf9f6] text-[#111111] selection:bg-cyan-500/20 selection:text-cyan-900 overflow-x-hidden font-sans">
      
      {/* 1. ULTRA-PREMIUM GRID & NOISE ANALOG TEXTURE */}
      <div className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden">
        {/* Subtle grid line backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80" />
        
        {/* SVG Noise filter for a graphite, premium textured paper look */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* 2. DYNAMIC BACKDROP LIGHTING ORBS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Cyan orb on the upper right */}
        <motion.div 
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -30, 15, 0],
            scale: [1, 1.05, 0.98, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px] mix-blend-multiply"
        />

        {/* Purple orb on the lower left */}
        <motion.div 
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -40, 0],
            scale: [1, 0.98, 1.05, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 left-1/10 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] mix-blend-multiply"
        />
      </div>

      {/* 3. NAVIGATION NAVBAR */}
      <Navbar />

      {/* 4. HERO HEADER AREA */}
      <section className="relative pt-36 md:pt-44 pb-12 md:pb-20 z-10 bg-[#f4f6fa]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
              Conoce el estudio
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-tight">
              Creer en las personas. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-indigo-500">
                Crear su espacio digital.
              </span>
            </h1>
            <p className="text-neutral-600 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Acompañamos a profesionales independientes y prestadores de servicios a proyectar su valor a través de una presencia web auténtica, robusta y humana.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. SECTIONS */}
      <div className="relative z-10">
        <HistoriaSection />
        <PropuestaValorSection />
        <MisionVisionSection />
        <ValoresSection />
      </div>

      {/* 6. FOOTER */}
      <Footer />

    </div>
  );
}
