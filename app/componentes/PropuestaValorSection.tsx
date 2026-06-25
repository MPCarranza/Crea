'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function PropuestaValorSection() {
  return (
    <section id="propuesta-valor" className="relative py-20 md:py-28 bg-[#f4f6fa] overflow-hidden">
      
      {/* Decorative vector background details */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-400/5 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-indigo-400/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Large Typography Statement */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-500/10 px-3 py-1 rounded-full">
                Lo que aportamos
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
                Propuesta de <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600">
                  Valor
                </span>
              </h2>
              <p className="text-neutral-500 text-sm md:text-base font-light leading-relaxed max-w-sm">
                Creando herramientas digitales a medida que impulsan tu negocio y proyectan tu autoridad.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Detailed value cards/text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-6 bg-white/60 border border-black/[0.04] p-8 md:p-10 rounded-3xl backdrop-blur-md shadow-sm"
            >
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-cyan-600 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Presencia Digital Auténtica</h3>
                  <p className="text-neutral-600 font-light leading-relaxed text-sm md:text-base">
                    Ayudamos a profesionales y prestadores de servicios a construir una presencia digital que represente realmente quiénes son, para que puedan transmitir confianza, mostrar su valor y crecer profesionalmente sin depender únicamente de las redes sociales.
                  </p>
                </div>
              </div>

              <div className="h-px bg-neutral-200/50 my-6" />

              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Compromiso con la Identidad</h3>
                  <p className="text-neutral-600 font-light leading-relaxed text-sm md:text-base font-medium">
                    No creemos en soluciones genéricas ni en promesas imposibles.
                  </p>
                  <p className="text-neutral-600 font-light leading-relaxed text-sm md:text-base mt-2">
                    Creemos en escuchar, comprender y crear herramientas digitales que reflejen la identidad de cada persona.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
