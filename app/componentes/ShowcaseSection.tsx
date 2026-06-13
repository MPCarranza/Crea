'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Laptop, CalendarCheck2, Star, Users, Music } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

interface ProfessionCase {
  tag: string;
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  themeColor: string; // Tailwind glow color
  mockupBg: string; // Tailwind class
  mockupHeaderColor: string; // Tailwind class
  imagePath: string; // Path to generated image
  mockupContent: React.ReactNode;
}

export default function ShowcaseSection() {
  const CASES: ProfessionCase[] = [
    {
      tag: "Estética & Uñas",
      title: "Manicuristas & Salones",
      description: "Muestra tu catálogo de Nail Art y servicios con fotos reales. Seña previa integrada para evitar ausencias de última hora.",
      url: "www.marianails.com",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      themeColor: "rgba(245, 158, 11, 0.12)",
      mockupBg: "bg-[#fdf8f6]",
      mockupHeaderColor: "bg-[#f9f5ed]",
      imagePath: "/showcase-nails.png",
      mockupContent: (
        <div className="w-full h-full flex font-serif bg-[#fdf8f6] p-2.5 gap-2 items-center justify-between">
          {/* Left Asymmetric elegant crop */}
          <div className="w-[45%] h-[95%] rounded-tl-full rounded-br-full overflow-hidden border border-amber-900/15 shadow-xs shrink-0 bg-[#fbf5f0]">
            <img 
              src="/showcase-nails.png" 
              alt="María Nails" 
              className="w-full h-full object-cover select-none" 
            />
          </div>
          
          {/* Right Boutique Details */}
          <div className="flex-1 h-[95%] flex flex-col justify-between p-0.5">
            <div>
              <div className="flex justify-between items-center mb-1 border-b border-amber-900/10 pb-1">
                <span className="text-[9px] font-bold text-amber-900 italic">M. Nails</span>
                <span className="text-[5.5px] bg-[#2b1810] text-[#fdfbf7] px-1 py-0.5 rounded-xs tracking-wider uppercase font-semibold">Spa</span>
              </div>
              <h4 className="text-[8.5px] font-bold text-neutral-800 leading-tight">Premium Care</h4>
              <p className="text-[6.5px] text-neutral-500 italic mt-0.5">Elegí tu diseño y reservá.</p>
              
              <div className="mt-1.5 space-y-0.5">
                <p className="text-[6px] text-neutral-700 leading-none">Nail Art • $18.500</p>
                <p className="text-[6px] text-neutral-600 leading-none">Semi-Perm • $12.000</p>
              </div>
            </div>
            
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full py-1 border border-amber-950 bg-transparent text-amber-950 text-[7px] font-bold uppercase tracking-widest hover:bg-amber-950 hover:text-white transition-all rounded-xs"
            >
              Reservar Cita
            </button>
          </div>
        </div>
      )
    },
    {
      tag: "Bienestar & Clases",
      title: "Profesoras de Yoga & Coachs",
      description: "Venta de packs mensuales y reservas fluidas para clases grupales. Control de cupos máximos en tiempo real de forma autónoma.",
      url: "www.pranayogaflow.com",
      icon: <Star className="w-5 h-5 text-purple-500" />,
      themeColor: "rgba(168, 85, 247, 0.12)",
      mockupBg: "bg-[#fafaff]",
      mockupHeaderColor: "bg-[#f5f5ff]",
      imagePath: "/showcase-yoga.png",
      mockupContent: (
        <div className="w-full h-full relative overflow-hidden font-sans">
          {/* Full Cover Image Background */}
          <img 
            src="/showcase-yoga.png" 
            alt="Prana Yoga Flow" 
            className="w-full h-full object-cover absolute inset-0 select-none" 
          />
          {/* Subtle Dark/Indigo overlay */}
          <div className="absolute inset-0 bg-indigo-950/20" />
          
          {/* Glassmorphic floating card on the RIGHT side to avoid covering the meditating girl */}
          <div className="absolute top-2 bottom-2 right-2 w-[48%] bg-white/80 backdrop-blur-xs border border-white/45 p-1.5 rounded-lg shadow-md flex flex-col justify-between z-10">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[8.5px] font-bold text-purple-950 tracking-wide uppercase">PRANA</span>
                <span className="text-[6px] bg-purple-200/80 text-purple-900 px-1.5 py-0.5 rounded-full font-bold leading-none">3 libres</span>
              </div>
              <p className="text-[7.5px] font-medium text-neutral-800 leading-tight">Vinyasa Flow</p>
              <p className="text-[5.5px] text-neutral-600 mt-1 leading-tight">Clases grupales y retiros.</p>
            </div>
            
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[7px] font-semibold tracking-wide hover:opacity-95 transition-all mt-1 shadow-sm text-center"
            >
              Reservar Clases
            </button>
          </div>
        </div>
      )
    },
    {
      tag: "Salud Mental",
      title: "Psicólogas & Terapeutas",
      description: "Gestión de sesiones virtuales o presenciales. Recordatorios automáticos por WhatsApp y cobro simplificado de sesiones.",
      url: "www.ramospsicologia.com",
      icon: <CalendarCheck2 className="w-5 h-5 text-emerald-500" />,
      themeColor: "rgba(16, 185, 129, 0.12)",
      mockupBg: "bg-[#fcfdfc]",
      mockupHeaderColor: "bg-[#f5faf6]",
      imagePath: "/showcase-therapy.png",
      mockupContent: (
        <div className="w-full h-full relative p-2 flex gap-2 items-center bg-[#f6f4ee]">
          {/* Polaroid image mockup on the left */}
          <div className="w-[38%] h-[95%] bg-white p-1 shadow-md border border-neutral-300/30 rotate-[-3deg] shrink-0 overflow-hidden flex flex-col justify-between">
            <img 
              src="/showcase-therapy.png" 
              alt="Lic. Sofía Ramos" 
              className="w-full h-[75%] object-cover select-none" 
            />
            <div className="text-[5.5px] text-neutral-500 text-center font-serif leading-none py-0.5 italic">
              Sofía Ramos R.
            </div>
          </div>
          
          {/* Structured cream sheet on the right */}
          <div className="flex-1 h-[95%] bg-white border border-emerald-900/10 p-2 rounded shadow-2xs flex flex-col justify-between relative rotate-[1deg]">
            <div>
              <div className="flex justify-between items-center mb-1 border-b border-emerald-50 pb-0.5">
                <span className="text-[8.5px] font-bold text-emerald-950 leading-none">Lic. Ramos</span>
                <span className="text-[5.5px] bg-emerald-50 text-emerald-700 px-1 py-0.5 rounded-sm font-semibold">Online</span>
              </div>
              <h4 className="text-[8.5px] font-bold text-neutral-800 leading-tight">Psicoterapia</h4>
              <p className="text-[6px] text-neutral-500 font-light mt-0.5">Consultorio Palermo o Zoom.</p>
              
              <div className="mt-1 space-y-0.5">
                <p className="text-[5.5px] text-neutral-600 font-medium leading-none">Videollamada • 50m</p>
                <p className="text-[5.5px] text-neutral-600 font-medium leading-none mt-0.5 font-sans">Particular / MPago</p>
              </div>
            </div>
            
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full py-0.5 rounded bg-emerald-800 text-white text-[7.5px] font-semibold hover:bg-emerald-950 transition-colors mt-1.5"
            >
              Agendar
            </button>
          </div>
        </div>
      )
    },
    {
      tag: "Medicina & Turnos",
      title: "Médicas & Consultorios",
      description: "Organización de turnos por especialidades. Selección de obras sociales y carga optimizada para evitar cancelaciones repetidas.",
      url: "www.drasilviamartinez.com",
      icon: <Laptop className="w-5 h-5 text-cyan-500" />,
      themeColor: "rgba(6, 182, 212, 0.12)",
      mockupBg: "bg-[#fcfeff]",
      mockupHeaderColor: "bg-[#f2fafc]",
      imagePath: "/showcase-doctor.png",
      mockupContent: (
        <div className="w-full h-full flex font-sans bg-[#f1f5f9]">
          {/* Fake Sidebar */}
          <div className="w-[12%] bg-cyan-950 flex flex-col items-center py-2 gap-2 text-cyan-400 shrink-0 h-full">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 mb-2" />
            <span className="w-3.5 h-2 bg-cyan-800 rounded-xs" />
            <span className="w-3.5 h-2 bg-cyan-800 rounded-xs opacity-50" />
            <span className="w-3.5 h-2 bg-cyan-800 rounded-xs opacity-30" />
          </div>
          
          {/* Dashboard Main Area */}
          <div className="flex-1 flex flex-col justify-between p-2.5 bg-white">
            <div>
              <div className="flex justify-between items-start mb-1.5">
                <div>
                  <h4 className="text-[9px] font-bold text-neutral-900 leading-none">Dra. Silvia Martínez</h4>
                  <span className="text-[6px] text-cyan-600 font-medium leading-none">Pediatría & Clínicas</span>
                </div>
                <span className="text-[5.5px] border border-cyan-300 text-cyan-700 px-1 py-0.5 rounded-xs font-semibold uppercase tracking-wider shrink-0 bg-cyan-50/50">Mat. 98451</span>
              </div>
              <div className="border-t border-neutral-100 my-1" />
              
              <div className="flex items-center gap-2 mt-1.5">
                <img 
                  src="/showcase-doctor.png" 
                  alt="Dra. Silvia Martínez" 
                  className="w-7 h-7 rounded-full object-cover border border-neutral-100 shrink-0" 
                />
                <div className="flex-1">
                  <p className="text-[6px] text-neutral-700 leading-tight">Coberturas médicas:</p>
                  <p className="text-[5.5px] text-neutral-500 font-medium mt-0.5 leading-none">OSDE • Swiss • Particular</p>
                </div>
              </div>
            </div>
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full py-1 bg-cyan-800 hover:bg-cyan-950 text-white text-[7.5px] font-bold uppercase tracking-wider transition-colors mt-1 rounded-none text-center bg-cyan-800"
            >
              Solicitar Turno
            </button>
          </div>
        </div>
      )
    },
    {
      tag: "Sincronización Múltiple",
      title: "Centros & Equipos",
      description: "Múltiples profesionales y agendas enlazadas bajo una misma interfaz. Distribución automática de turnos y control centralizado.",
      url: "www.kinesiologia-integrativa.com",
      icon: <Users className="w-5 h-5 text-indigo-500" />,
      themeColor: "rgba(99, 102, 241, 0.12)",
      mockupBg: "bg-[#fafbff]",
      mockupHeaderColor: "bg-[#f2f2fb]",
      imagePath: "/showcase-team.png",
      mockupContent: (
        <div className="w-full h-full flex font-sans bg-[#fafbff] p-2 gap-2 items-center justify-between">
          {/* Left arched photo mask */}
          <div className="w-[35%] h-[95%] rounded-t-full overflow-hidden border border-black/[0.04] shrink-0 bg-neutral-100">
            <img 
              src="/showcase-team.png" 
              alt="Centro Kinesio" 
              className="w-full h-full object-cover select-none" 
            />
          </div>
          
          {/* Right Cards Deck */}
          <div className="flex-1 h-full flex flex-col justify-between p-0.5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[8.5px] font-bold text-indigo-950 leading-none">Centro Kinesio</span>
                <span className="text-[5px] bg-indigo-50 text-indigo-700 px-1 py-0.5 rounded font-bold border border-indigo-100/50">4 Kines</span>
              </div>
              
              <div className="mt-1 space-y-1">
                <div className="flex items-center gap-1.5 p-1 rounded-md bg-white border border-indigo-100/30 shadow-3xs">
                  <div className="w-3.5 h-3.5 rounded-full bg-indigo-100 flex items-center justify-center text-[5px] font-bold text-indigo-700">PG</div>
                  <div className="flex-1 text-[6px]">
                    <p className="font-semibold text-neutral-800 leading-none">Pedro Gómez</p>
                    <p className="text-[5px] text-neutral-500 leading-none mt-0.5">Traumatología</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 p-1 rounded-md bg-white border border-neutral-100 shadow-3xs">
                  <div className="w-3.5 h-3.5 rounded-full bg-neutral-200 flex items-center justify-center text-[5px] font-bold text-neutral-600">LR</div>
                  <div className="flex-1 text-[6px]">
                    <p className="font-semibold text-neutral-700 leading-none">Laura Rossi</p>
                    <p className="text-[5px] text-neutral-500 leading-none mt-0.5">Respiratoria</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-[7.5px] font-medium tracking-wide transition-colors mt-1 flex items-center justify-center"
            >
              Elegir Profesional
            </button>
          </div>
        </div>
      )
    },
    {
      tag: "Música & Talleres",
      title: "Clases & Ensayos",
      description: "Reservas de horarios específicos de clases de música, ensayos o masterclasses. Envío dinámico de apuntes y enlaces tras agendar.",
      url: "www.estudioclave.com",
      icon: <Music className="w-5 h-5 text-rose-500" />,
      themeColor: "rgba(244, 63, 94, 0.12)",
      mockupBg: "bg-[#121212]",
      mockupHeaderColor: "bg-[#1a1a1a]",
      imagePath: "/showcase-music.png",
      mockupContent: (
        <div className="w-full h-full flex font-sans bg-[#121212] p-2 gap-2.5 items-center justify-between">
          {/* Left sleek dark cover */}
          <div className="w-[42%] h-[95%] rounded border border-neutral-800 overflow-hidden shrink-0 bg-neutral-900 shadow-sm">
            <img 
              src="/showcase-music.png" 
              alt="Estudio Clave" 
              className="w-full h-full object-cover select-none" 
            />
          </div>
          
          {/* Right sleek dark panel */}
          <div className="flex-1 h-[95%] bg-[#1a1a1a] border border-neutral-800 p-2 rounded flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-1 pb-0.5 border-b border-neutral-800">
                <span className="text-[8.5px] font-mono font-bold text-rose-400 tracking-wider">ESTUDIO CLAVE</span>
                <span className="text-[5.5px] text-neutral-400 uppercase font-sans tracking-[1px] font-medium">Online</span>
              </div>
              <h4 className="text-[8.5px] font-bold text-white leading-tight mt-1">Clases de Guitarra</h4>
              <p className="text-[6px] text-neutral-400 font-light mt-0.5 leading-tight">Clases particulares 1-a-1.</p>
              
              <div className="mt-1.5 space-y-0.5 font-mono">
                <div className="flex items-center justify-between p-0.5 border-b border-dashed border-neutral-800/80">
                  <span className="text-[5.5px] text-neutral-350">Guitarra (60m)</span>
                  <span className="text-[6.5px] font-bold text-rose-400">$10K</span>
                </div>
                <div className="flex items-center justify-between p-0.5 border-b border-dashed border-neutral-800/80">
                  <span className="text-[5.5px] text-neutral-400">Canto Grupal</span>
                  <span className="text-[6.5px] font-bold text-rose-450 text-rose-400">Sáb</span>
                </div>
              </div>
            </div>
            
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full py-1 rounded bg-rose-500 text-neutral-950 hover:bg-rose-600 text-[7.5px] font-bold uppercase tracking-wider transition-colors mt-1"
            >
              Reservar Clase
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="showcase" className="relative py-24 md:py-32 z-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>DESCONECTARSE ES UN LUJO</span>
          </motion.div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
            Tu esfuerzo es único. <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-indigo-500">Tu web también debería serlo.</span>
          </h2>
          <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
            Diseñamos sitios web 100% personalizados para que amplíes tu alcance, generes confianza y conviertas más visitas en clientes. Porque detrás de cada experiencia hay horas de esfuerzo que merecen ser mostradas de la mejor manera.
          </p>
        </div>

        {/* Grid de Modelos / Casos de Uso */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {CASES.map((item, idx) => (
            <SpotlightCard
              key={idx}
              glowColor={item.themeColor}
              className="p-6 flex flex-col justify-between min-h-[440px] border border-black/[0.06] hover:border-black/[0.12] transition-all duration-300"
            >
              <div>
                
                {/* Cabecera del Navegador Mockup */}
                <div className="w-full rounded-xl border border-black/[0.08] shadow-xs overflow-hidden mb-6 flex flex-col h-[180px]">
                  {/* Top Bar del Mockup */}
                  <div className={`flex items-center justify-between px-3 py-2 ${item.mockupHeaderColor} border-b border-black/[0.06]`}>
                    <div className="flex gap-1 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-neutral-300" />
                      <span className="w-2 h-2 rounded-full bg-neutral-300" />
                      <span className="w-2 h-2 rounded-full bg-neutral-300" />
                    </div>
                    {/* Fake URL Bar */}
                    <div className="bg-white/80 border border-black/[0.04] text-[8px] text-neutral-400 py-0.5 px-3 rounded-md w-[60%] text-center overflow-hidden text-ellipsis whitespace-nowrap select-none font-medium">
                      {item.url}
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400 shrink-0" />
                  </div>
                  {/* Contenido del Mockup */}
                  <div className={`flex-1 ${item.mockupBg} overflow-hidden relative`}>
                    {item.mockupContent}
                  </div>
                </div>

                {/* Info Text */}
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 font-light text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
