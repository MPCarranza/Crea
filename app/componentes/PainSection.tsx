'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Send } from 'lucide-react';
import { PAIN_POINTS } from '../utils/constants';

export default function PainSection() {
  const [selectedPain, setSelectedPain] = useState<string>('pain-1');

  return (
    <section id="pain" className="relative py-24 md:py-32 z-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
            Hacer que tu negocio sea <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-500">más fácil de gestionar.</span>
          </h2>
          <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
            El intercambio interminable de mensajes manuales desgasta tu autoridad profesional y vacía tu agenda. Mira cómo impacta la falta de un sistema en tu día a día interactuando abajo:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Pain Cards List (Left Side) */}
          <div className="lg:col-span-6 flex flex-col gap-4 justify-center">
            {PAIN_POINTS.map((pain) => {
              const isSelected = selectedPain === pain.id;
              return (
                <div
                  key={pain.id}
                  onClick={() => setSelectedPain(pain.id)}
                  className={`cursor-pointer text-left p-6 rounded-2xl transition-all duration-300 border flex gap-4 ${
                    isSelected 
                      ? 'backdrop-blur-xl bg-white/70 border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.04)]'
                      : 'bg-black/[0.01] border-black/[0.03] opacity-60 hover:opacity-100 hover:bg-black/[0.02]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-black/[0.04] border border-black/5 shadow-xs' : 'bg-black/[0.03]'
                  }`}>
                    {pain.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1 flex items-center gap-2">
                      {pain.title}
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />}
                    </h3>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-2">
                      {pain.subtitle}
                    </p>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed">
                      {pain.description}
                    </p>
                    {isSelected && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-rose-700 text-xs font-semibold"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{pain.stat}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pain Chat Interactive Visual Smartphone mockup (Right Side) */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-sm aspect-[9/16] max-h-[620px] relative rounded-[42px] backdrop-blur-xl bg-white/80 border-4 border-black/[0.12] shadow-[0_24px_80px_rgba(0,0,0,0.06)] p-4 overflow-hidden flex flex-col justify-between">
              
              {/* Smartphone Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-neutral-900 rounded-full z-30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#111] absolute left-6" />
                <div className="w-12 h-1 bg-[#222] rounded-full" />
              </div>

              {/* Smartphone status bar */}
              <div className="flex justify-between items-center text-[10px] text-neutral-500 font-semibold px-4 pt-1 mb-2 relative z-20">
                <span>23:42</span>
                <div className="flex items-center gap-1.5">
                  <span>5G</span>
                  <div className="w-4 h-2 border border-neutral-400 rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-neutral-500 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Visual Glass Header of the chat */}
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 mb-2 px-2 relative z-20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center font-bold text-xs text-white">
                    PA
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-800">Paciente / Cliente</p>
                    <p className="text-[8px] text-neutral-500 font-bold uppercase tracking-wider">Escribiendo...</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                </div>
              </div>

              {/* Animated chat window with typed messages */}
              <div className="flex-1 py-4 flex flex-col justify-end gap-3 text-xs overflow-y-auto px-1">
                <AnimatePresence mode="wait">
                  {selectedPain === 'pain-1' && (
                    <motion.div
                      key="pain-1-chat"
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      variants={{
                        show: { transition: { staggerChildren: 0.15 } }
                      }}
                      className="flex flex-col gap-3"
                    >
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          show: { opacity: 1, y: 0 }
                        }}
                        className="self-start max-w-[85%] p-3 rounded-2xl rounded-tl-none bg-neutral-100 border border-black/[0.03] text-neutral-800"
                      >
                        <p className="font-bold text-[8px] text-cyan-600 uppercase tracking-wider mb-1">DOMINGO 22:15hs</p>
                        <p className="leading-relaxed">Hola! Quería consultar cuáles son los precios de los turnos, en qué horarios atienden esta semana y por dónde queda el consultorio.</p>
                      </motion.div>
                      
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          show: { opacity: 1, y: 0, transition: { delay: 0.6 } }
                        }}
                        className="self-end max-w-[85%] p-3 rounded-2xl rounded-tr-none bg-rose-50 border border-rose-200 text-rose-700 italic"
                      >
                        <p className="font-bold text-[8px] text-rose-600 uppercase tracking-widest mb-1">Tu fricción diaria</p>
                        <p className="leading-relaxed">Pasar horas respondiendo estas mismas dudas de forma manual consume la energía que necesitas para tu trabajo o descanso.</p>
                      </motion.div>
                    </motion.div>
                  )}

                  {selectedPain === 'pain-2' && (
                    <motion.div
                      key="pain-2-chat"
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      variants={{
                        show: { transition: { staggerChildren: 0.15 } }
                      }}
                      className="flex flex-col gap-3"
                    >
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          show: { opacity: 1, y: 0 }
                        }}
                        className="self-start max-w-[85%] p-3 rounded-2xl rounded-tl-none bg-neutral-100 border border-black/[0.03] text-neutral-800"
                      >
                        <p className="font-bold text-[8px] text-purple-600 uppercase tracking-wider mb-1">JUEVES 15:40hs</p>
                        <p className="leading-relaxed">Hola! Te busqué por Google para ver tus servicios pero solo me aparece tu perfil de Instagram. El problema es que no tengo esa red social, ¿tenés una web para ver info?</p>
                      </motion.div>
                      
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          show: { opacity: 1, y: 0, transition: { delay: 0.6 } }
                        }}
                        className="self-end max-w-[85%] p-3 rounded-2xl rounded-tr-none bg-rose-50 border border-rose-200 text-rose-700 italic"
                      >
                        <p className="font-bold text-[8px] text-rose-600 uppercase tracking-widest mb-1">Riesgo de Algoritmo</p>
                        <p className="leading-relaxed">Depender 100% de redes sociales para que te encuentren te vuelve vulnerable a cambios de algoritmo o cuentas suspendidas.</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Simulated Chat Input Bar */}
              <div className="border-t border-black/[0.06] pt-3 flex items-center gap-2 mt-2 px-2 relative z-20">
                <div className="flex-1 bg-black/[0.02] border border-black/[0.06] rounded-full py-2 px-4 text-[11px] text-neutral-500 flex items-center justify-between">
                  <span>Escribir mensaje...</span>
                  <Send className="w-3.5 h-3.5 text-neutral-400" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
