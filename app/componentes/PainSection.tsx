'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Send, Check } from 'lucide-react';
import { PAIN_POINTS } from '../utils/constants';

export default function PainSection() {
  const [selectedPain, setSelectedPain] = useState<string>('pain-1');
  const [viewMode, setViewMode] = useState<'problem' | 'solution'>('problem');

  const handlePainSelect = (id: string) => {
    setSelectedPain(id);
    setViewMode('problem');
  };

  return (
    <section id="pain" className="relative py-24 md:py-32 z-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight">
            Hacer que tu negocio sea <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-500 px-1.5 py-0.5 inline-block">más fácil de gestionar.</span>
          </h2>
          <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
            Dale a tu trabajo la autoridad que necesita. Mira cómo impacta la falta de un portafolio web en tu día a día interactuando abajo:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Pain Cards List (Left Side) */}
          <div className="lg:col-span-6 flex flex-col gap-4 justify-center">
            {PAIN_POINTS.map((pain) => {
              const isSelected = selectedPain === pain.id;
              const currentContent = pain[viewMode];
              return (
                <div
                  key={pain.id}
                  onClick={() => handlePainSelect(pain.id)}
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
                      {currentContent.subtitle}
                    </p>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed">
                      {currentContent.description}
                    </p>
                    {isSelected && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                          viewMode === 'solution'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-red-50 border-red-200 text-rose-700'
                        }`}
                      >
                        {viewMode === 'solution' ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5" />
                        )}
                        <span>{currentContent.stat}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pain Chat Interactive Visual Smartphone mockup (Right Side) */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-sm aspect-[9/16] max-h-[620px] relative rounded-[44px] bg-gradient-to-br from-indigo-50/70 via-white to-pink-50/50 border-[10px] border-neutral-900 shadow-[0_24px_80px_rgba(0,0,0,0.15)] p-4 overflow-hidden flex flex-col justify-between">
              
              {/* Smartphone Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-neutral-900 rounded-full z-30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#111] absolute left-6" />
                <div className="w-12 h-1 bg-[#222] rounded-full" />
              </div>

              {/* Smartphone status bar */}
              <div className="flex justify-between items-center text-[10px] text-neutral-650 font-semibold px-4 pt-1 mb-2 relative z-20 select-none">
                <span>23:42</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] tracking-wider">📶 5G</span>
                  {/* Clean, standard CSS battery icon */}
                  <div className="flex items-center gap-[1px]">
                    <div className="w-5 h-2.5 border border-neutral-600 rounded-xs p-[1px] flex items-center">
                      <div className="w-4 h-full bg-neutral-700 rounded-3xs" />
                    </div>
                    <div className="w-[1.5px] h-[3px] bg-neutral-600 rounded-r-3xs shrink-0" />
                  </div>
                </div>
              </div>

              {/* Segmented Control (Problem / Solution Toggle) */}
              <div className="mx-1 mb-3 p-1 bg-black/[0.04] border border-black/[0.06] rounded-xl flex gap-1 relative z-25 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('problem')}
                  className={`flex-1 py-1 rounded-lg text-[8.5px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1 ${
                    viewMode === 'problem'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  <span>⚠️ El Problema</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('solution')}
                  className={`flex-1 py-1 rounded-lg text-[8.5px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1 ${
                    viewMode === 'solution'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  <span>🚀 La Solución</span>
                </button>
              </div>

              {/* Dynamic glass header of the screen */}
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 mb-2 px-2 relative z-20">
                {viewMode === 'solution' ? (
                  selectedPain === 'pain-1' ? (
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-xs text-white">
                        📅
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-800">Sistema de Reservas</p>
                        <p className="text-[8px] text-cyan-600 font-bold uppercase tracking-wider">Turnos por Mail</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                        🌐
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-800">pranayogaflow.com</p>
                        <p className="text-[8px] text-indigo-600 font-bold uppercase tracking-wider">Tu Web Premium</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center font-bold text-xs text-white">
                      PA
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-800">Paciente / Cliente</p>
                      <p className="text-[8px] text-rose-500 font-bold uppercase tracking-wider">Escribiendo...</p>
                    </div>
                  </div>
                )}
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-450" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-450" />
                </div>
              </div>

              {/* Animated viewport with content */}
              <div className={`flex-1 py-4 flex flex-col ${(viewMode === 'solution' && selectedPain === 'pain-1') ? 'justify-start' : 'justify-end'} gap-3 text-xs overflow-y-auto px-1 relative z-20`}>
                <AnimatePresence mode="wait">
                  
                  {/* VIEW MODE: PROBLEM */}
                  {viewMode === 'problem' && (
                    <motion.div
                      key={`${selectedPain}-problem`}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      variants={{
                        show: { transition: { staggerChildren: 0.15 } }
                      }}
                      className="flex flex-col gap-3"
                    >
                      {selectedPain === 'pain-1' ? (
                        <>
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, y: 15 },
                              show: { opacity: 1, y: 0 }
                            }}
                            className="self-start max-w-[85%] p-3 rounded-2xl rounded-tl-none bg-white/80 border border-black/[0.03] text-neutral-800 text-left shadow-2xs"
                          >
                            <p className="font-bold text-[8px] text-cyan-600 uppercase tracking-wider mb-1">DOMINGO 22:15hs</p>
                            <p className="leading-relaxed">Hola! Quería consultar cuáles son los precios de los turnos, en qué horarios atienden esta semana y por dónde queda el consultorio.</p>
                          </motion.div>
                          
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, y: 15 },
                              show: { opacity: 1, y: 0, transition: { delay: 0.6 } }
                            }}
                            className="self-end max-w-[85%] p-3 rounded-2xl rounded-tr-none bg-rose-50 border border-rose-200 text-rose-700 italic text-left shadow-2xs"
                          >
                            <p className="font-bold text-[8px] text-rose-600 uppercase tracking-widest mb-1">Tu presión diaria</p>
                            <p className="leading-relaxed">Pasar horas respondiendo estas mismas dudas de forma manual consume la energía que necesitas para tu trabajo o descanso.</p>
                          </motion.div>
                        </>
                      ) : (
                        <>
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, y: 15 },
                              show: { opacity: 1, y: 0 }
                            }}
                            className="self-start max-w-[85%] p-3 rounded-2xl rounded-tl-none bg-white/80 border border-black/[0.03] text-neutral-800 text-left shadow-2xs"
                          >
                            <p className="font-bold text-[8px] text-purple-600 uppercase tracking-wider mb-1">JUEVES 15:40hs</p>
                            <p className="leading-relaxed">Hola! Te busqué por Google para ver tus servicios pero solo me aparece tu perfil de Instagram. El problema es que no tengo esa red social, ¿tenés una web para ver info?</p>
                          </motion.div>
                          
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, y: 15 },
                              show: { opacity: 1, y: 0, transition: { delay: 0.6 } }
                            }}
                            className="self-end max-w-[85%] p-3 rounded-2xl rounded-tr-none bg-rose-50 border border-rose-200 text-rose-700 italic text-left shadow-2xs"
                          >
                            <p className="font-bold text-[8px] text-rose-600 uppercase tracking-widest mb-1">Riesgo de Algoritmo</p>
                            <p className="leading-relaxed">Depender 100% de redes sociales para que te encuentren te vuelve vulnerable a cambios de algoritmo o cuentas suspendidas.</p>
                          </motion.div>
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* VIEW MODE: SOLUTION - PAIN 1 (Gmail Inbox) */}
                  {viewMode === 'solution' && selectedPain === 'pain-1' && (
                    <motion.div
                      key="pain-1-gmail"
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      variants={{
                        show: { transition: { staggerChildren: 0.1 } }
                      }}
                      className="flex flex-col gap-2.5 h-full text-left w-full"
                    >
                      {/* Gmail Top Search Bar Mock */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: -10 },
                          show: { opacity: 1, y: 0 }
                        }}
                        className="bg-white/95 border border-black/[0.06] shadow-2xs rounded-xl py-2 px-3 flex items-center justify-between gap-2 mb-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-neutral-400">🔍</span>
                          <span className="text-[9.5px] text-neutral-500 font-light">Buscar en el correo</span>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-cyan-600 flex items-center justify-center text-[8px] text-white font-bold shadow-xs">
                          CR
                        </div>
                      </motion.div>

                      {/* Folder Title */}
                      <motion.p
                        variants={{
                          hidden: { opacity: 0 },
                          show: { opacity: 1 }
                        }}
                        className="text-[8px] text-neutral-400 font-bold uppercase tracking-wider px-1"
                      >
                        Bandeja de Entrada • Recibidos
                      </motion.p>

                      {/* Email 1: Calendly booking */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0 }
                        }}
                        className="bg-white border-l-4 border-cyan-500 border border-black/[0.04] rounded-r-xl p-2.5 shadow-3xs flex gap-2.5 items-start hover:bg-neutral-50/50 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center font-bold text-[9px] text-cyan-700 shrink-0 shadow-3xs">
                          C
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h4 className="text-[9.5px] font-bold text-neutral-900 truncate">Calendly</h4>
                            <span className="text-[7.5px] text-cyan-600 font-bold">Nuevo turno</span>
                          </div>
                          <p className="text-[8.5px] font-bold text-neutral-900 truncate mt-0.5">Clase de Yoga Vinyasa - Sofía Ramos</p>
                          <p className="text-[7.5px] text-neutral-500 font-light truncate mt-0.5">Viernes 19 Jun, 10:30 hs. Agendado automáticamente.</p>
                        </div>
                      </motion.div>

                      {/* Email 2: Payment confirmation (Mercado Pago) */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0 }
                        }}
                        className="bg-white border border-black/[0.04] rounded-xl p-2.5 shadow-3xs flex gap-2.5 items-start hover:bg-neutral-50/50 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-[9px] text-emerald-700 shrink-0 shadow-3xs">
                          M
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h4 className="text-[9.5px] font-bold text-neutral-800 truncate">Mercado Pago</h4>
                            <span className="text-[7.5px] text-neutral-450">Hace 3m</span>
                          </div>
                          <p className="text-[8.5px] font-semibold text-neutral-800 truncate mt-0.5">Recibiste un pago de $10.000</p>
                          <p className="text-[7.5px] text-neutral-500 font-light truncate mt-0.5">Sofía Ramos te envió la seña de su consulta...</p>
                        </div>
                      </motion.div>

                      {/* Email 3: Google Calendar */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0 }
                        }}
                        className="bg-white border border-black/[0.04] rounded-xl p-2.5 shadow-3xs flex gap-2.5 items-start hover:bg-neutral-50/50 transition-colors opacity-90"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center font-bold text-[9px] text-blue-700 shrink-0 shadow-3xs">
                          G
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h4 className="text-[9.5px] font-bold text-neutral-800 truncate">Google Calendar</h4>
                            <span className="text-[7.5px] text-neutral-450">Hace 5m</span>
                          </div>
                          <p className="text-[8.5px] font-semibold text-neutral-800 truncate mt-0.5">Nuevo evento: Sofía Ramos</p>
                          <p className="text-[7.5px] text-neutral-500 font-light truncate mt-0.5">Se ha agendado y bloqueado el horario automáticamente...</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* VIEW MODE: SOLUTION - PAIN 2 (Developed Landing Page) */}
                  {viewMode === 'solution' && selectedPain === 'pain-2' && (
                    <motion.div
                      key="pain-2-landing"
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      variants={{
                        show: { transition: { staggerChildren: 0.08 } }
                      }}
                      className="absolute inset-x-0 bottom-0 top-0 bg-[#FAF9F6] p-4 flex flex-col gap-3.5 overflow-y-auto z-10 text-left border-t border-black/[0.04]"
                    >
                      {/* Web Header Mock */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: -10 },
                          show: { opacity: 1, y: 0 }
                        }}
                        className="bg-white border border-black/[0.04] rounded-xl p-2 flex justify-between items-center shadow-3xs shrink-0"
                      >
                        <span className="text-[9px] font-serif font-black text-indigo-950 uppercase tracking-wider">Estudio Prana</span>
                        <div className="flex gap-1.5 text-[5px] uppercase tracking-widest text-neutral-500 font-bold">
                          <span>Clases</span>
                          <span>Reservas</span>
                        </div>
                      </motion.div>

                      {/* Hero Image Block */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, scale: 0.95 },
                          show: { opacity: 1, scale: 1 }
                        }}
                        className="w-full h-[75px] rounded-lg overflow-hidden border border-indigo-100/30 shrink-0 bg-neutral-100 relative"
                      >
                        <img 
                          src="/showcase-yoga.png" 
                          alt="Clases de Yoga Vinyasa" 
                          className="w-full h-full object-cover select-none" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className="absolute bottom-1.5 left-2.5 text-[8px] font-bold text-white tracking-tight">Claras y fluidas clases de Yoga</span>
                      </motion.div>

                      {/* Title & Info */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0 },
                          show: { opacity: 1 }
                        }}
                        className="space-y-1"
                      >
                        <h4 className="text-[10px] font-bold text-neutral-800 leading-tight">Encontrá tu espacio de bienestar</h4>
                        <p className="text-[7.5px] text-neutral-500 leading-relaxed font-light">Diseño personalizado con turnos integrados para que tus clientes te encuentren en Google 24/7 sin intermediarios.</p>
                      </motion.div>

                      {/* Booking CTA Button (mock landing) */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0 }
                        }}
                        className="bg-indigo-600 text-white rounded-lg py-1.5 px-3 text-center text-[8px] font-black uppercase tracking-wider shadow-sm hover:bg-indigo-700 transition-colors cursor-pointer shrink-0"
                      >
                        📅 Reservar Turno Online
                      </motion.div>

                      {/* Services Grid (More content to reach bottom) */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0 }
                        }}
                        className="grid grid-cols-2 gap-2 shrink-0"
                      >
                        <div className="bg-white p-2 rounded-lg border border-black/[0.03] text-center shadow-3xs">
                          <span className="text-[8px] block font-bold text-neutral-800">Clases Grupales</span>
                          <span className="text-[6px] text-neutral-400 block mt-0.5">Cupos limitados</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-black/[0.03] text-center shadow-3xs">
                          <span className="text-[8px] block font-bold text-neutral-800">Sesiones 1-a-1</span>
                          <span className="text-[6px] text-neutral-400 block mt-0.5">A medida</span>
                        </div>
                      </motion.div>

                      {/* Testimonial Section */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0 }
                        }}
                        className="bg-neutral-50 p-2.5 rounded-lg border border-black/[0.03] text-left shrink-0"
                      >
                        <p className="text-[6.5px] italic text-neutral-600">"Las clases con Clara me cambiaron la postura y la respiración. ¡Súper recomendada!"</p>
                        <span className="text-[5.5px] font-bold text-neutral-500 block text-right mt-1">- Marina S.</span>
                      </motion.div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Simulated Chat Input Bar (Only visible on problem mode) */}
              {viewMode === 'problem' && (
                <div className="border-t border-black/[0.06] pt-3 flex items-center gap-2 mt-2 px-2 relative z-20">
                  <div className="flex-1 bg-black/[0.02] border border-black/[0.06] rounded-full py-2 px-4 text-[11px] text-neutral-500 flex items-center justify-between">
                    <span>Escribir mensaje...</span>
                    <Send className="w-3.5 h-3.5 text-neutral-400" />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
