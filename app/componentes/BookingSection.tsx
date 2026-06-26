'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ExternalLink, Mail } from 'lucide-react';
import { InlineWidget } from 'react-calendly';

export default function BookingSection() {
  const widgetUrl = 'https://calendly.com/estudiocrea2026/30min';



  return (
    <section id="booking" className="relative py-24 md:py-32 z-10 bg-[#f4f6fa]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Turnos Online</span>
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight">
            Tu agenda en piloto automático. <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 px-1 py-0.5 inline-block">Sencillo y real.</span>
          </h2>
          <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
            No reinventes la rueda con agendas custom propensas a errores. Conectamos tus calendarios para que puedas verlos en Google calendar o en Calendly, con señas y reservas opcionales y te enseñamos a usarlos de manera rápida e intuitiva.
          </p>
        </div>

        {/* Marketing Urgency Notice */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-cyan-50 to-indigo-50 border border-cyan-100 backdrop-blur-md shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-6 shadow-3xs select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              <span>Quedan 2 cupos para este mes</span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 mb-4 leading-tight">
              Solo aceptamos <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 px-1.5 py-0.5 inline-block">3 proyectos al mes.</span>
            </h3>

            {/* Description */}
            <p className="text-neutral-600 font-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Para garantizar la máxima dedicación y acabados de nivel internacional, limitamos nuestro cupo de desarrollo mensual.
            </p>
            <p className="text-neutral-800 font-semibold text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-4">
              👉 Conseguí un cupo en nuestro calendario ya mientras aprendes como funciona el proceso de automatización o comunicate con nosotros a través de nuestras redes sociales.
            </p>

            {/* Social Media Links inside Scarcity Box */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-cyan-100/50">
              <a 
                href="https://instagram.com/estudiocrea.oficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-cyan-100 flex items-center justify-center text-neutral-700 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-sm transition-all duration-300 group/icon cursor-pointer"
                title="Instagram (@estudiocrea.oficial)"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover/icon:scale-110" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@estudiocrea.oficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-cyan-100 flex items-center justify-center text-neutral-700 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-sm transition-all duration-300 group/icon cursor-pointer"
                title="TikTok (@estudiocrea.oficial)"
              >
                <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover/icon:scale-110" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.99 2 1.68 3.28 2.03.02 1.34 0 2.68.01 4.02-1.28-.08-2.52-.57-3.52-1.39-.77-.6-1.39-1.38-1.82-2.27v7.58c.03 1.83-.54 3.65-1.63 5.09-1.23 1.62-3.13 2.64-5.15 2.76-2.09.13-4.24-.62-5.7-2.12C1.94 18.35 1.05 15.93 1.32 13.5c.21-2.19 1.48-4.21 3.42-5.26 1.47-.79 3.19-.99 4.77-.6v4.06c-.95-.31-1.99-.21-2.85.31-.95.53-1.64 1.53-1.85 2.6-.28 1.33.22 2.75 1.25 3.6 1.05.86 2.53.97 3.69.28.84-.46 1.39-1.35 1.48-2.31.02-2.11.01-4.21.01-6.32V0c.32.02.66-.02.97.02z" />
                </svg>
              </a>
              <a 
                href="mailto:estudiocrea2026@gmail.com" 
                className="w-10 h-10 rounded-full bg-white border border-cyan-100 flex items-center justify-center text-neutral-700 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-sm transition-all duration-300 group/icon cursor-pointer"
                title="Email (estudiocrea2026@gmail.com)"
              >
                <Mail className="w-5 h-5 transition-transform duration-300 group-hover/icon:scale-110" />
              </a>
            </div>
          </div>
        </div>

        {/* React Calendly Component Container with Styled Custom Scrollbar */}
        <div className="w-full max-w-4xl mx-auto h-[600px] md:h-[750px] overflow-y-auto overflow-x-hidden rounded-2xl bg-gradient-to-r from-cyan-50 to-indigo-50 border border-cyan-100 shadow-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-cyan-500 [&::-webkit-scrollbar-thumb]:to-indigo-600 [&::-webkit-scrollbar-thumb]:rounded-full">
          <InlineWidget 
            url={widgetUrl} 
            styles={{ height: '1200px', width: '100%' }}
            pageSettings={{
              primaryColor: '0891b2',
              textColor: '111111',
              backgroundColor: 'eef2ff',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              hideGdprBanner: true
            }}
          />
        </div>

      </div>
    </section>
  );
}
