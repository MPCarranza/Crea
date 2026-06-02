'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import { BENEFITS } from '../utils/constants';

export default function SolutionSection() {
  return (
    <section id="solution" className="relative py-24 md:py-32 z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
            Tu negocio operando en <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-indigo-200 to-indigo-100">piloto automático</span> las 24 horas.
          </h2>
          <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
            Diseñamos e implementamos un sistema digital integrado a tu marca que soluciona de raíz la fricción operativa. Olvídate de agendar a mano y mantén el control total.
          </p>
        </div>

        {/* Benefits Grid in Cursor-Following Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {BENEFITS.map((benefit, idx) => (
            <SpotlightCard
              key={idx}
              glowColor={benefit.glowColor}
              className="p-8 flex flex-col justify-between min-h-[300px]"
            >
              <div>
                {/* Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400">
                    {benefit.tag}
                  </span>
                </div>

                {/* Benefit Content */}
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
              
              {/* Micro-interaction indicator */}
              <div className="mt-8 flex items-center gap-1.5 text-xs text-zinc-500 font-semibold group-hover:text-cyan-400 transition-colors duration-300">
                <span>Tecnología nativa</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* High-end editorial quote */}
        <div className="mt-16 md:mt-24 text-center max-w-2xl mx-auto">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
            <p className="font-serif text-base md:text-lg italic text-cyan-200 leading-relaxed">
              "Un sistema de reservas online no es solo comodidad para tus clientes; es la frontera que separa a los profesionales ocupados de los profesionales rentables y tranquilos."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
