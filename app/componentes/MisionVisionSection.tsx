'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export default function MisionVisionSection() {
  return (
    <section id="mision-vision" className="relative py-20 md:py-28 bg-[#faf9f6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 bg-cyan-500/10 px-3 py-1 rounded-full">
            Propósito
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-4 mb-4">
            Misión & Visión
          </h2>
          <p className="text-neutral-500 font-light text-sm md:text-base leading-relaxed">
            Nuestros objetivos y nuestra proyección hacia un ecosistema tecnológico más humano.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <SpotlightCard
              glowColor="rgba(6, 182, 212, 0.12)" // Cyan
              className="p-8 md:p-10 flex flex-col justify-between h-full min-h-[350px] border-black/[0.04]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-center mb-8">
                  <Target className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-4">
                  Misión
                </h3>
                <p className="text-neutral-600 font-light text-sm md:text-base leading-relaxed mb-4">
                  Transformar el conocimiento, la experiencia y el valor de los profesionales en una presencia digital auténtica, accesible y estratégica, creando sitios web que generen confianza, visibilidad y crecimiento.
                </p>
                <p className="text-neutral-600 font-light text-sm md:text-base leading-relaxed">
                  Buscamos que cada cliente se sientan representado por su espacio digital y que pueda mostrar al mundo lo que realmente es capaz de hacer.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SpotlightCard
              glowColor="rgba(99, 102, 241, 0.12)" // Indigo
              className="p-8 md:p-10 flex flex-col justify-between h-full min-h-[350px] border-black/[0.04]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 flex items-center justify-center mb-8">
                  <Eye className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-4">
                  Visión
                </h3>
                <p className="text-neutral-600 font-light text-sm md:text-base leading-relaxed mb-4">
                  Convertirnos en una referencia en la creación de presencia digital humana y estratégica para profesionales de servicios, construyendo un ecosistema donde la tecnología sea una herramienta de crecimiento accesible y donde más mujeres encuentren oportunidades reales para desarrollarse dentro de la industria tecnológica.
                </p>
                <p className="text-neutral-600 font-light text-sm md:text-base leading-relaxed">
                  Queremos demostrar que la tecnología puede ser cercana, ética y profundamente humana.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
