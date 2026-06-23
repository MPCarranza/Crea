'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Laptop, CalendarCheck2, Star, Users, Music, Palette, Briefcase, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import Image from 'next/image';

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
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const row1Ref = React.useRef<HTMLDivElement>(null);
  const row2Ref = React.useRef<HTMLDivElement>(null);

  const [isHoveredRow1, setIsHoveredRow1] = useState(false);
  const [isHoveredRow2, setIsHoveredRow2] = useState(false);
  const [isPausedRow1, setIsPausedRow1] = useState(false);
  const [isPausedRow2, setIsPausedRow2] = useState(false);

  const autoScrollTimer1 = React.useRef<NodeJS.Timeout | null>(null);
  const autoScrollTimer2 = React.useRef<NodeJS.Timeout | null>(null);

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      // Pause autoscroll for 2 seconds to let smooth scroll complete
      if (ref === row1Ref) {
        setIsPausedRow1(true);
        if (autoScrollTimer1.current) clearTimeout(autoScrollTimer1.current);
        autoScrollTimer1.current = setTimeout(() => setIsPausedRow1(false), 2000);
      } else if (ref === row2Ref) {
        setIsPausedRow2(true);
        if (autoScrollTimer2.current) clearTimeout(autoScrollTimer2.current);
        autoScrollTimer2.current = setTimeout(() => setIsPausedRow2(false), 2000);
      }

      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      const cardWidth = typeof window !== 'undefined' && window.innerWidth < 640 ? 340 : 380;
      const gap = 24;
      const step = cardWidth + gap;
      const halfScroll = scrollWidth / 2;

      let currentScrollLeft = scrollLeft;
      let scrollTo = direction === 'left' ? currentScrollLeft - step : currentScrollLeft + step;

      if (direction === 'left') {
        if (scrollTo < 0) {
          // Warp to the second half instantly, then animate scroll left
          currentScrollLeft = scrollLeft + halfScroll;
          ref.current.scrollLeft = currentScrollLeft;
          scrollTo = currentScrollLeft - step;
        }
      } else { // direction === 'right'
        if (scrollTo + clientWidth > scrollWidth) {
          // Warp to the first half instantly, then animate scroll right
          currentScrollLeft = scrollLeft - halfScroll;
          ref.current.scrollLeft = currentScrollLeft;
          scrollTo = currentScrollLeft + step;
        }
      }

      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const isHoveredRow1Ref = React.useRef(false);
  const isHoveredRow2Ref = React.useRef(false);
  const isPausedRow1Ref = React.useRef(false);
  const isPausedRow2Ref = React.useRef(false);

  useEffect(() => { isHoveredRow1Ref.current = isHoveredRow1; }, [isHoveredRow1]);
  useEffect(() => { isHoveredRow2Ref.current = isHoveredRow2; }, [isHoveredRow2]);
  useEffect(() => { isPausedRow1Ref.current = isPausedRow1; }, [isPausedRow1]);
  useEffect(() => { isPausedRow2Ref.current = isPausedRow2; }, [isPausedRow2]);

  // Row 1 Autoscroll (Right-scrolling marquee: scrollLeft decreases)
  useEffect(() => {
    const row = row1Ref.current;
    if (!row) return;

    let animationId: number;
    const speed = 0.4; // smooth slow speed
    let accumulator = row.scrollLeft;

    const step = () => {
      const isHovered = isHoveredRow1Ref.current;
      const isPaused = isPausedRow1Ref.current;

      if (row && !isHovered && !isPaused) {
        const halfScroll = row.scrollWidth / 2;
        if (accumulator <= 1) {
          accumulator = halfScroll;
        }
        accumulator -= speed;
        row.scrollLeft = Math.round(accumulator);
      } else if (row) {
        // Sync accumulator with user's manual scroll position
        accumulator = row.scrollLeft;
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animationId);
      if (autoScrollTimer1.current) clearTimeout(autoScrollTimer1.current);
    };
  }, []);

  // Row 2 Autoscroll (Left-scrolling marquee: scrollLeft increases)
  useEffect(() => {
    const row = row2Ref.current;
    if (!row) return;

    let animationId: number;
    const speed = 0.4; // smooth slow speed
    let accumulator = row.scrollLeft;

    const step = () => {
      const isHovered = isHoveredRow2Ref.current;
      const isPaused = isPausedRow2Ref.current;

      if (row && !isHovered && !isPaused) {
        const halfScroll = row.scrollWidth / 2;
        accumulator += speed;
        if (accumulator >= halfScroll) {
          accumulator = 0;
        }
        row.scrollLeft = Math.round(accumulator);
      } else if (row) {
        // Sync accumulator with user's manual scroll position
        accumulator = row.scrollLeft;
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animationId);
      if (autoScrollTimer2.current) clearTimeout(autoScrollTimer2.current);
    };
  }, []);

  const ROW_1_CASES: ProfessionCase[] = [
    {
      tag: "Producto Semillero - Web Inicial",
      title: "Landing Page + WhatsApp",
      description: "Tu web de marca personal con diseño premium de alta conversión. Incluye un botón flotante de WhatsApp para canalizar consultas y agendar de forma manual y cercana.",
      url: "www.marianails.com",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      themeColor: "rgba(245, 158, 11, 0.12)",
      mockupBg: "bg-[#fdfbf7]",
      mockupHeaderColor: "bg-[#f9f5ed]",
      imagePath: "",
      mockupContent: (
        <div className="w-full h-full flex flex-col justify-between font-sans bg-[#fdfbf9] p-2.5 relative text-neutral-900 selection:bg-neutral-200/50">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-black/[0.05] pb-1.5">
            <span className="text-[9px] font-serif font-bold tracking-wider text-amber-950 uppercase">M. Nails Salon</span>
            <div className="flex gap-2 text-[5.5px] uppercase tracking-widest text-neutral-400 font-medium">
              <span>Servicios</span>
              <span>Galería</span>
              <span>Contacto</span>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="my-auto flex gap-3 items-center">
            {/* Elegant Professional Photo */}
            <div className="w-[40%] h-[90px] relative rounded-lg overflow-hidden border border-amber-900/10 shadow-xs shrink-0 bg-[#fbf5f0]">
              <Image 
                src="/showcase-nails.png" 
                alt="María Nails Professional" 
                fill
                sizes="100px"
                className="object-cover select-none" 
              />
            </div>
            
            <div className="text-left flex-1">
              <span className="text-[5px] font-bold text-amber-800 uppercase tracking-widest bg-amber-50 px-1 py-0.5 rounded border border-amber-200/40">Estética & Nails</span>
              <h4 className="font-serif text-[10px] leading-snug font-medium tracking-tight text-neutral-900 mt-1">
                Cuidado premium y diseños <span className="italic text-neutral-500 font-light">que cuentan tu historia</span>.
              </h4>
              <div className="mt-1 flex flex-col gap-0.5 text-[5px] text-neutral-500 font-light">
                <span>✦ Nail Art Experto</span>
                <span>✦ Esculpidas Modernas</span>
              </div>
            </div>
          </div>
          
          {/* Footer of the mock site */}
          <div className="flex justify-between items-center pt-1.5 border-t border-black/[0.04] mt-auto">
            <span className="text-[5.5px] text-neutral-400">Palermo, Buenos Aires</span>
          </div>

          {/* Floating WhatsApp button mockup */}
          <button
            type="button"
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              setIsWhatsAppOpen(!isWhatsAppOpen); 
            }}
            className="absolute bottom-3 right-3 flex items-center gap-1 bg-[#25D366] text-white rounded-full px-2 py-1 shadow-lg shadow-emerald-500/10 border border-emerald-400/20 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="relative flex h-1 w-1 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1 w-1 bg-white"></span>
            </div>
            <span className="text-[5px] font-bold tracking-wider font-sans uppercase">Escribir</span>
            <svg className="w-2.5 h-2.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.156-1.352a9.943 9.943 0 0 0 4.854 1.258h.004c5.507 0 9.99-4.478 9.99-9.984 0-2.667-1.037-5.176-2.922-7.062C17.198 3.037 14.687 2 12.012 2zm5.792 14.15c-.247.697-1.207 1.272-1.658 1.328-.45.056-.902.083-2.906-.723-2.56-1.029-4.214-3.64-4.341-3.812-.127-.172-1.032-1.372-1.032-2.618 0-1.246.65-1.855.882-2.1.23-.245.506-.308.675-.308.169 0 .338.001.485.008.156.007.366-.06.572.441.21.512.72 1.754.783 1.881.063.127.106.276.02.446-.085.17-.127.276-.254.425-.127.15-.266.333-.38.446-.127.127-.26.265-.113.519.148.254.656 1.082 1.408 1.751.97.863 1.789 1.13 2.043 1.257.254.127.4.106.55-.064.15-.17.639-.744.81-1 .17-.255.339-.213.571-.127.233.085 1.479.697 1.733.824.254.128.423.191.486.3.064.109.064.634-.183 1.332z" />
            </svg>
          </button>

          {/* Simulated WhatsApp Chat Box Popup */}
          {isWhatsAppOpen && (
            <div className="absolute inset-x-2 bottom-2 top-10 bg-[#e5ddd5] rounded-xl overflow-hidden shadow-2xl border border-black/[0.08] flex flex-col z-20 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Chat Header */}
              <div className="bg-[#075e54] text-white px-2 py-1.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 relative rounded-full overflow-hidden border border-white/20 shrink-0">
                    <Image 
                      src="/showcase-nails.png" 
                      alt="María Nails Avatar" 
                      fill
                      sizes="20px"
                      className="object-cover" 
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-[7.5px] font-bold leading-none">María Nails</p>
                    <p className="text-[5px] text-[#25D366] font-medium leading-none mt-0.5">En línea</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsWhatsAppOpen(false);
                  }}
                  className="text-white hover:opacity-80 text-[8px] font-bold p-0.5 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Chat Conversation */}
              <div className="flex-1 p-2 flex flex-col gap-1.5 overflow-y-auto">
                <div className="self-start bg-white text-neutral-800 p-1.5 rounded-lg rounded-tl-none max-w-[85%] text-left shadow-2xs">
                  <p className="text-[6.5px] leading-tight">¡Hola! ¿Tenés turnos libres para esta semana?</p>
                  <span className="text-[4.5px] text-neutral-400 block text-right mt-0.5">14:15</span>
                </div>
                <div className="self-end bg-[#dcf8c6] text-neutral-800 p-1.5 rounded-lg rounded-tr-none max-w-[85%] text-left shadow-2xs">
                  <p className="text-[6.5px] leading-tight">¡Hola! Sí, nos queda un lugar mañana a las 17:30 hs. ¿Te lo reservo?</p>
                  <span className="text-[4.5px] text-neutral-400 block text-right mt-0.5">14:16</span>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="bg-[#f0f0f0] p-1.5 flex gap-1 items-center border-t border-neutral-300/30">
                <div className="flex-1 bg-white rounded-full px-2 py-0.5 text-left text-[6.5px] text-neutral-400">
                  Escribir mensaje...
                </div>
                <div className="w-4 h-4 bg-[#128c7e] rounded-full flex items-center justify-center text-white shrink-0">
                  <svg className="w-1.5 h-1.5 fill-current transform rotate-45" viewBox="0 0 24 24">
                    <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      tag: "Turnos Integrados - Calendly",
      title: "Psicólogas & Terapeutas",
      description: "Gestión de sesiones virtuales o presenciales con turnero Calendly integrado. Recordatorios automáticos por WhatsApp y cobro simplificado de sesiones.",
      url: "www.ramospsicologia.com",
      icon: <CalendarCheck2 className="w-5 h-5 text-emerald-500" />,
      themeColor: "rgba(16, 185, 129, 0.12)",
      mockupBg: "bg-[#fcfdfc]",
      mockupHeaderColor: "bg-[#f5faf6]",
      imagePath: "",
      mockupContent: (
        <div className="w-full h-full flex font-sans bg-[#f5f3ee] p-2.5 gap-2.5 items-stretch selection:bg-emerald-200/50">
          {/* Left Column: Therapist Bio */}
          <div className="w-[45%] flex flex-col justify-between text-left">
            <div>
              <span className="text-[7px] font-bold text-neutral-400 uppercase tracking-widest">Lic. Sofía Ramos</span>
              
              {/* Photo Container */}
              <div className="w-full h-[65px] relative rounded-lg overflow-hidden border border-emerald-200/50 mt-1 mb-1 shrink-0 bg-emerald-50">
                <Image 
                  src="/showcase-therapy.png" 
                  alt="Lic. Sofía Ramos Portrait" 
                  fill
                  sizes="100px"
                  className="object-cover select-none" 
                />
              </div>
              
              <div className="mb-1">
                <h4 className="font-serif text-[9px] font-bold text-neutral-800 leading-tight">Psicoterapia Clínica</h4>
                <p className="text-[5px] text-neutral-400">Mat. 48259</p>
              </div>
              
              <p className="text-[6px] text-neutral-500 font-light leading-relaxed">
                Espacio de escucha activa y contención profesional.
              </p>
            </div>
            
            <div className="border-t border-black/[0.05] pt-1">
              <span className="text-[5px] text-neutral-400 block font-light">Modalidad</span>
              <span className="text-[7px] font-semibold text-neutral-700">Online / Consultorio Palermo</span>
            </div>
          </div>

          {/* Right Column: Calendly Integrated Slot Selector */}
          <div className="flex-1 bg-white rounded-xl border border-black/[0.05] p-2 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex justify-between items-center border-b border-black/[0.04] pb-1.5 mb-1.5">
                <span className="text-[7px] font-bold text-neutral-700">Sesión Diagnóstica</span>
                <span className="text-[5px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded uppercase tracking-wider">Calendly</span>
              </div>
              
              <div className="space-y-1.5">
                {/* Simulated Slots */}
                <div className="p-1.5 rounded-lg border border-black/[0.04] bg-neutral-50 flex justify-between items-center hover:border-emerald-200 hover:bg-emerald-50/20 transition-all cursor-pointer">
                  <span className="text-[6.5px] text-neutral-700 font-medium">Lunes 22, 16:00 hs</span>
                  <span className="text-[5px] text-emerald-600 font-bold">Disponible</span>
                </div>
                <div className="p-1.5 rounded-lg border border-black/[0.04] bg-neutral-50 flex justify-between items-center hover:border-emerald-200 hover:bg-emerald-50/20 transition-all cursor-pointer">
                  <span className="text-[6.5px] text-neutral-700 font-medium">Lunes 22, 17:30 hs</span>
                  <span className="text-[5px] text-emerald-600 font-bold">Disponible</span>
                </div>
              </div>
            </div>

            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full py-1 rounded-lg bg-emerald-800 text-white text-[7px] font-bold tracking-wide uppercase hover:bg-emerald-950 transition-colors mt-1 cursor-pointer"
            >
              Agendar Sesión
            </button>
          </div>
        </div>
      )
    },
    {
      tag: "Turnos Integrados - Calendly",
      title: "Centros & Equipos",
      description: "Múltiples profesionales y agendas enlazadas bajo una misma interfaz de Calendly para equipos. Distribución automática de turnos y control centralizado.",
      url: "www.kinesiologia-integrativa.com",
      icon: <Users className="w-5 h-5 text-indigo-500" />,
      themeColor: "rgba(99, 102, 241, 0.12)",
      mockupBg: "bg-[#fafbff]",
      mockupHeaderColor: "bg-[#f2f2fb]",
      imagePath: "",
      mockupContent: (
        <div className="w-full h-full flex font-sans bg-[#f1f0f6] p-2.5 gap-2.5 items-stretch selection:bg-indigo-200/50">
          {/* Left Column: Team Profiles */}
          <div className="w-[45%] flex flex-col justify-between text-left">
            <div>
              <span className="text-[7px] font-bold text-neutral-400 uppercase tracking-widest">Kinesiología Integral</span>
              
              {/* Team Photo */}
              <div className="w-full h-[55px] relative rounded-lg overflow-hidden border border-indigo-100/30 my-1 shrink-0 bg-neutral-100">
                <Image 
                  src="/showcase-team.png" 
                  alt="Centro Kinesio Team" 
                  fill
                  sizes="100px"
                  className="object-cover select-none" 
                />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-100 flex items-center justify-center text-[4px] font-bold text-indigo-700">PG</div>
                  <span className="text-[6px] text-neutral-700 leading-none">Dr. Pedro Gomez</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-100 flex items-center justify-center text-[4px] font-bold text-emerald-700">LR</div>
                  <span className="text-[6px] text-neutral-700 leading-none">Lic. Laura Rossi</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-black/[0.05] pt-1 mt-1">
              <span className="text-[5px] text-neutral-400 block font-light">Sesiones</span>
              <span className="text-[6px] font-medium text-neutral-700">RPG • Kinesiología • Osteopatía</span>
            </div>
          </div>

          {/* Right Column: Calendly Integrated Slot Selector */}
          <div className="flex-1 bg-white rounded-xl border border-black/[0.05] p-2 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex justify-between items-center border-b border-black/[0.04] pb-1.5 mb-1.5">
                <span className="text-[7px] font-bold text-neutral-700">Elegir Profesional</span>
                <span className="text-[5px] font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded uppercase tracking-wider">Calendly</span>
              </div>
              
              <div className="space-y-1.5">
                {/* Simulated Slots */}
                <div className="p-1.5 rounded-lg border border-indigo-500/25 bg-indigo-500/5 flex justify-between items-center cursor-pointer">
                  <span className="text-[6.5px] text-indigo-950 font-medium">Pedro Gómez (Trauma)</span>
                  <span className="text-[5.5px] text-indigo-700 font-bold">Elegido</span>
                </div>
                <div className="p-1.5 rounded-lg border border-black/[0.04] bg-neutral-50 flex justify-between items-center hover:border-indigo-200 hover:bg-indigo-50/20 transition-all cursor-pointer">
                  <span className="text-[6.5px] text-neutral-700 font-medium">Laura Rossi (Respiratoria)</span>
                  <span className="text-[5.5px] text-neutral-450">Ver Agenda</span>
                </div>
              </div>
            </div>

            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full py-1 rounded-lg bg-indigo-600 text-white text-[7px] font-bold tracking-wide uppercase hover:bg-indigo-700 transition-colors mt-1 cursor-pointer"
            >
              Continuar Reserva
            </button>
          </div>
        </div>
      )
    },
    {
      tag: "Producto Semillero - Web Inicial",
      title: "Creadores & Influencers",
      description: "Tu media kit y portfolio interactivo en un solo lugar. Gráficos de audiencia en tiempo real, links a tus redes y formulario directo para marcas.",
      url: "www.lucasvisuals.com",
      icon: <Star className="w-5 h-5 text-fuchsia-400" />,
      themeColor: "rgba(240, 77, 255, 0.16)",
      mockupBg: "bg-[#0b0813] border-fuchsia-500/20",
      mockupHeaderColor: "bg-[#140f24] border-fuchsia-500/10",
      imagePath: "/showcase-creator.png",
      mockupContent: (
        <div className="w-full h-full flex flex-col justify-between font-sans bg-[#0b0813] p-2.5 relative text-white selection:bg-fuchsia-500/20">
          <div className="flex justify-between items-center border-b border-white/[0.08] pb-1.5">
            <span className="text-[9px] font-bold tracking-wider text-fuchsia-400 uppercase">Lucas.Visuals</span>
            <span className="text-[5px] font-bold text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 px-1 py-0.5 rounded-full uppercase tracking-wider">Media Kit 2026</span>
          </div>
          
          <div className="my-auto flex gap-3 items-center">
            <div className="w-[40%] h-[90px] relative rounded-lg overflow-hidden border border-fuchsia-500/20 shadow-md shrink-0 bg-[#140f24]">
              <Image 
                src="/showcase-creator.png" 
                alt="Lucas Creator" 
                fill
                sizes="100px"
                className="object-cover select-none" 
              />
            </div>
            
            <div className="text-left flex-1 space-y-1">
              <span className="text-[4.5px] font-bold text-fuchsia-300 uppercase tracking-widest bg-fuchsia-500/10 px-1 py-0.5 rounded border border-fuchsia-500/20">Digital Creator</span>
              <h4 className="text-[9.5px] leading-tight font-black tracking-tight text-white mt-0.5">
                Lucas Gómez
              </h4>
              <p className="text-[5.5px] text-fuchsia-300 font-medium">Visuals & Travel Vlogs</p>
              <div className="flex flex-col gap-0.5 mt-1 text-[5px] text-neutral-400">
                <span>✦ 450K total followers</span>
                <span>✦ 4.8% engagement rate</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-1.5 border-t border-white/[0.08] mt-auto">
            <span className="text-[5px] text-neutral-400">Marcas: info@lucasgomez.com</span>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="px-2 py-0.5 rounded-full bg-fuchsia-600 text-white font-bold text-[5px] uppercase tracking-wider hover:bg-fuchsia-700 transition-all cursor-pointer"
            >
              Tarifas 🚀
            </button>
          </div>
        </div>
      )
    },
    {
      tag: "Producto Semillero - Web Inicial",
      title: "Abogados & Consultores",
      description: "Tu presencia jurídica digital con agendamiento de consultoría y pago de seña en un solo flujo. Genera confianza y asegura tu agenda profesional.",
      url: "www.estudioarce.com",
      icon: <Briefcase className="w-5 h-5 text-indigo-400" />,
      themeColor: "rgba(99, 102, 241, 0.16)",
      mockupBg: "bg-[#FAF9F6] border-indigo-950/15",
      mockupHeaderColor: "bg-[#f1f0ec] border-indigo-950/10",
      imagePath: "/showcase-lawyer.png",
      mockupContent: (
        <div className="w-full h-full flex flex-col justify-between font-sans bg-[#FAF9F6] p-2.5 relative text-neutral-900 selection:bg-indigo-100">
          <div className="flex justify-between items-center border-b border-black/[0.05] pb-1.5">
            <span className="text-[8.5px] font-serif font-black tracking-wider text-indigo-950 uppercase">Estudio Arce</span>
            <span className="text-[5px] font-bold text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded uppercase tracking-wider">Asesoría Legal</span>
          </div>
          
          <div className="my-auto flex gap-3 items-center">
            <div className="w-[40%] h-[90px] relative rounded-lg overflow-hidden border border-indigo-950/10 shadow-xs shrink-0 bg-[#fbfbf9]">
              <Image 
                src="/showcase-lawyer.png" 
                alt="Estudio Arce Lawyer" 
                fill
                sizes="100px"
                className="object-cover select-none" 
              />
            </div>
            
            <div className="text-left flex-1 space-y-1">
              <span className="text-[4.5px] font-bold text-indigo-950 uppercase tracking-widest bg-indigo-50 px-1 py-0.5 rounded border border-indigo-200/50">Dr. Valentín Arce</span>
              <h4 className="font-serif text-[9.5px] leading-snug font-medium tracking-tight text-neutral-900 mt-1">
                Consultoría <span className="italic text-neutral-550 font-light">Especializada</span>
              </h4>
              <p className="text-[5px] text-neutral-500">Comercial • Laboral • Civil</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-1.5 border-t border-black/[0.04] mt-auto">
            <span className="text-[5px] text-neutral-400">San Isidro, BA</span>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="px-2 py-0.5 rounded-md bg-indigo-950 text-white font-bold text-[5px] uppercase tracking-wider hover:bg-indigo-900 transition-all cursor-pointer"
            >
              Consulta 📅
            </button>
          </div>
        </div>
      )
    }
  ];

  const ROW_2_CASES: ProfessionCase[] = [
    {
      tag: "Turnos Integrados - Calendly",
      title: "Profesoras de Yoga & Coachs",
      description: "Venta de packs mensuales y reservas fluidas integradas directamente con Calendly. Control de cupos máximos en tiempo real para clases grupales de forma autónoma.",
      url: "www.pranayogaflow.com",
      icon: <Star className="w-5 h-5 text-purple-500" />,
      themeColor: "rgba(168, 85, 247, 0.12)",
      mockupBg: "bg-[#f8f8fb]",
      mockupHeaderColor: "bg-[#f0f0f5]",
      imagePath: "",
      mockupContent: (
        <div className="w-full h-full flex font-sans bg-[#f7f6f2] p-2.5 gap-2.5 items-stretch selection:bg-purple-200/50">
          {/* Left Column: Details */}
          <div className="w-[45%] flex flex-col justify-between text-left">
            <div>
              <span className="text-[7px] font-bold text-neutral-400 uppercase tracking-widest">Estudio Prana</span>
              
              {/* Photo Container */}
              <div className="w-full h-[65px] relative rounded-lg overflow-hidden border border-purple-200/50 mt-1 mb-1 shrink-0 bg-purple-50">
                <Image 
                  src="/showcase-yoga.png" 
                  alt="Yoga Instructor" 
                  fill
                  sizes="100px"
                  className="object-cover select-none" 
                />
              </div>
              
              <div className="mb-1">
                <h4 className="font-serif text-[9px] font-bold text-neutral-800 leading-tight">Clases de Vinyasa</h4>
                <p className="text-[5px] text-neutral-400">Prof. Clara Ramos</p>
              </div>
            </div>
            
            <div className="border-t border-black/[0.05] pt-1">
              <span className="text-[5px] text-neutral-400 block font-light">Duración</span>
              <span className="text-[7px] font-semibold text-neutral-700">60m • Presencial</span>
            </div>
          </div>

          {/* Right Column: Calendly Integrated Slot Selector */}
          <div className="flex-1 bg-white rounded-xl border border-black/[0.05] p-2 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex justify-between items-center border-b border-black/[0.04] pb-1.5 mb-1.5">
                <span className="text-[7px] font-bold text-neutral-700">Reservar</span>
                <span className="text-[5px] font-bold text-purple-700 bg-purple-50 px-1 py-0.5 rounded uppercase tracking-wider">Calendly</span>
              </div>
              
              <div className="space-y-1">
                {/* Simulated Slots */}
                <div className="p-1 rounded-lg border border-purple-500/25 bg-purple-500/5 flex justify-between items-center cursor-pointer">
                  <span className="text-[6.5px] text-purple-950 font-medium">Vie 19, 09:30</span>
                </div>
                <div className="p-1 rounded-lg border border-black/[0.04] bg-neutral-50 flex justify-between items-center hover:border-purple-200 hover:bg-purple-50/20 transition-all cursor-pointer">
                  <span className="text-[6.5px] text-neutral-700 font-medium">Vie 19, 11:30</span>
                </div>
              </div>
            </div>

            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full py-1 rounded-lg bg-purple-600 text-white text-[7px] font-bold tracking-wide uppercase hover:bg-purple-700 transition-colors mt-1 cursor-pointer"
            >
              Confirmar
            </button>
          </div>
        </div>
      )
    },
    {
      tag: "Turnos Integrados - Calendly",
      title: "Médicas & Consultorios",
      description: "Organización de turnos por especialidades utilizando Calendly. Selección de obras sociales y carga optimizada para evitar cancelaciones repetidas.",
      url: "www.drasilviamartinez.com",
      icon: <Laptop className="w-5 h-5 text-cyan-500" />,
      themeColor: "rgba(6, 182, 212, 0.12)",
      mockupBg: "bg-[#fcfeff]",
      mockupHeaderColor: "bg-[#f2fafc]",
      imagePath: "",
      mockupContent: (
        <div className="w-full h-full flex font-sans bg-[#edf3f6] p-2.5 gap-2.5 items-stretch selection:bg-cyan-200/50">
          {/* Left Column: Clinic Details */}
          <div className="w-[45%] flex flex-col justify-between text-left">
            <div>
              <span className="text-[7px] font-bold text-neutral-400 uppercase tracking-widest">Dra. Silvia Martínez</span>
              
              {/* Photo Container */}
              <div className="w-full h-[65px] relative rounded-lg overflow-hidden border border-cyan-200/50 mt-1 mb-1 shrink-0 bg-cyan-50">
                <Image 
                  src="/showcase-doctor.png" 
                  alt="Dra. Silvia Martínez Portrait" 
                  fill
                  sizes="100px"
                  className="object-cover select-none" 
                />
              </div>
              
              <div className="mb-1">
                <h4 className="text-[9px] font-bold text-neutral-800 leading-tight">Pediatría</h4>
                <p className="text-[5px] text-neutral-400">Mat. 98451</p>
              </div>
            </div>
            
            <div className="border-t border-black/[0.05] pt-1">
              <span className="text-[5px] text-neutral-400 block font-light">Coberturas</span>
              <span className="text-[6px] font-medium text-neutral-700">OSDE • Swiss Medical</span>
            </div>
          </div>

          {/* Right Column: Calendly Integrated Slot Selector */}
          <div className="flex-1 bg-white rounded-xl border border-black/[0.05] p-2 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex justify-between items-center border-b border-black/[0.04] pb-1.5 mb-1.5">
                <span className="text-[7px] font-bold text-neutral-700">Turno</span>
                <span className="text-[5px] font-bold text-cyan-700 bg-cyan-50 px-1 py-0.5 rounded uppercase tracking-wider">Calendly</span>
              </div>
              
              <div className="space-y-1">
                {/* Simulated Slots */}
                <div className="p-1 rounded-lg border border-black/[0.04] bg-neutral-50 flex justify-between items-center hover:border-cyan-200 hover:bg-cyan-50/20 transition-all cursor-pointer">
                  <span className="text-[6.5px] text-neutral-700 font-medium">Miér 24, 09:00</span>
                </div>
                <div className="p-1 rounded-lg border border-black/[0.04] bg-neutral-50 flex justify-between items-center hover:border-cyan-200 hover:bg-cyan-50/20 transition-all cursor-pointer">
                  <span className="text-[6.5px] text-neutral-700 font-medium">Miér 24, 10:30</span>
                </div>
              </div>
            </div>

            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full py-1 rounded-lg bg-cyan-700 text-white text-[7px] font-bold tracking-wide uppercase hover:bg-cyan-850 transition-colors mt-1 cursor-pointer"
            >
              Agendar
            </button>
          </div>
        </div>
      )
    },
    {
      tag: "Turnos Integrados - Calendly",
      title: "Clases & Ensayos",
      description: "Reservas de clases particulares, talleres o masterclasses mediante Calendly. Envío dinámico de enlaces de videollamada y material tras agendar.",
      url: "www.estudioclave.com",
      icon: <Music className="w-5 h-5 text-rose-500" />,
      themeColor: "rgba(244, 63, 94, 0.12)",
      mockupBg: "bg-[#121212]",
      mockupHeaderColor: "bg-[#1a1a1a]",
      imagePath: "",
      mockupContent: (
        <div className="w-full h-full flex font-sans bg-[#121214] p-2.5 gap-2.5 items-stretch text-white selection:bg-rose-500/20">
          {/* Left Column: Academy Details */}
          <div className="w-[45%] flex flex-col justify-between text-left">
            <div>
              <span className="text-[7px] font-mono font-bold text-rose-400 uppercase tracking-widest">Estudio Clave</span>
              
              {/* Academy Photo */}
              <div className="w-full h-[55px] relative rounded-lg overflow-hidden border border-white/[0.06] my-1 shrink-0 bg-neutral-900">
                <Image 
                  src="/showcase-music.png" 
                  alt="Guitar Lesson" 
                  fill
                  sizes="100px"
                  className="object-cover select-none" 
                />
              </div>
              
              <h4 className="font-serif text-[9px] font-bold text-neutral-150 leading-tight">Clases de Guitarra</h4>
            </div>
            
            <div className="border-t border-white/[0.06] pt-1 mt-1">
              <span className="text-[7px] font-mono font-bold text-rose-400">$10.000 / clase</span>
            </div>
          </div>

          {/* Right Column: Calendly Integrated Slot Selector */}
          <div className="flex-1 bg-[#1a1a1e] rounded-xl border border-white/[0.06] p-2 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-1.5 mb-1.5">
                <span className="text-[7px] font-bold text-neutral-200">Reserva</span>
                <span className="text-[5px] font-bold text-rose-400 bg-rose-950/30 px-1 py-0.5 rounded uppercase tracking-wider">Calendly</span>
              </div>
              
              <div className="space-y-1">
                {/* Simulated Slots */}
                <div className="p-1 rounded-lg border border-white/[0.05] bg-[#242429] flex justify-between items-center hover:border-rose-400 hover:bg-rose-900/5 transition-all cursor-pointer">
                  <span className="text-[6.5px] text-neutral-300 font-medium">Sáb 20, 10:00</span>
                </div>
                <div className="p-1 rounded-lg border border-white/[0.05] bg-[#242429] flex justify-between items-center hover:border-rose-400 hover:bg-rose-900/5 transition-all cursor-pointer">
                  <span className="text-[6.5px] text-neutral-350 font-medium">Sáb 20, 11:30</span>
                </div>
              </div>
            </div>

            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full py-1 rounded-lg bg-rose-500 text-neutral-950 text-[7px] font-bold tracking-wide uppercase hover:bg-rose-600 transition-colors mt-1 cursor-pointer"
            >
              Agendar
            </button>
          </div>
        </div>
      )
    },
    {
      tag: "Producto Semillero - Web Inicial",
      title: "Diseñadores & Freelancers",
      description: "Muestra tu portfolio de trabajos en alta resolución con filtros interactivos, tarifas y tu disponibilidad actual en tiempo real para nuevos proyectos.",
      url: "www.valentinadesign.com",
      icon: <Palette className="w-5 h-5 text-cyan-400" />,
      themeColor: "rgba(34, 211, 238, 0.16)",
      mockupBg: "bg-[#080d0f] border-cyan-500/20",
      mockupHeaderColor: "bg-[#11191c] border-cyan-500/10",
      imagePath: "/showcase-designer.png",
      mockupContent: (
        <div className="w-full h-full flex flex-col justify-between font-sans bg-[#080d0f] p-2.5 relative text-white selection:bg-cyan-500/20">
          <div className="flex justify-between items-center border-b border-white/[0.08] pb-1.5">
            <span className="text-[9px] font-bold tracking-wider text-cyan-400 uppercase">Valen.Studio</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[5px] font-bold text-emerald-400 uppercase tracking-widest">Disponible</span>
            </div>
          </div>
          
          <div className="my-auto flex gap-3 items-center">
            <div className="w-[40%] h-[90px] relative rounded-lg overflow-hidden border border-cyan-500/20 shadow-md shrink-0 bg-[#11191c]">
              <Image 
                src="/showcase-designer.png" 
                alt="Valentina Design Work" 
                fill
                sizes="100px"
                className="object-cover select-none" 
              />
            </div>
            
            <div className="text-left flex-1 space-y-1">
              <span className="text-[4.5px] font-bold text-cyan-300 uppercase tracking-widest bg-cyan-500/10 px-1 py-0.5 rounded border border-cyan-500/20">Brand Designer</span>
              <h4 className="text-[9.5px] leading-tight font-black tracking-tight text-white mt-0.5">
                Valentina Arce
              </h4>
              <p className="text-[5.5px] text-cyan-300 font-medium">UX/UI & Webflow</p>
              <div className="flex flex-col gap-0.5 mt-1 text-[5px] text-neutral-400">
                <span>✦ +50 marcas creadas</span>
                <span>✦ Freelance Activa</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-1.5 border-t border-white/[0.08] mt-auto">
            <span className="text-[5px] text-neutral-400">Buenos Aires, ARG</span>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="px-2 py-0.5 rounded-full bg-cyan-500 text-neutral-950 font-bold text-[5px] uppercase tracking-wider hover:bg-cyan-400 transition-all cursor-pointer"
            >
              Portfolio ✨
            </button>
          </div>
        </div>
      )
    },
    {
      tag: "Producto Semillero - Web Inicial",
      title: "Estéticas & Spas",
      description: "Tu catálogo digital de tratamientos de alta gama con reserva inmediata de turnos. Mapeo visual de servicios y confirmación automática.",
      url: "www.auraspa.com",
      icon: <Heart className="w-5 h-5 text-rose-400" />,
      themeColor: "rgba(244, 63, 94, 0.16)",
      mockupBg: "bg-[#fffbfb] border-rose-200/50",
      mockupHeaderColor: "bg-[#ffeded] border-rose-200/30",
      imagePath: "/showcase-spa.png",
      mockupContent: (
        <div className="w-full h-full flex flex-col justify-between font-sans bg-[#fffbfb] p-2.5 relative text-neutral-900 selection:bg-rose-100">
          <div className="flex justify-between items-center border-b border-black/[0.05] pb-1.5">
            <span className="text-[9px] font-serif font-bold tracking-wider text-rose-950 uppercase">Aura Spa</span>
            <div className="flex gap-2 text-[5px] uppercase tracking-widest text-neutral-400 font-medium">
              <span>Servicios</span>
              <span>Contacto</span>
            </div>
          </div>
          
          <div className="my-auto flex gap-3 items-center">
            <div className="w-[40%] h-[90px] relative rounded-lg overflow-hidden border border-rose-900/10 shadow-xs shrink-0 bg-[#fff5f5]">
              <Image 
                src="/showcase-spa.png" 
                alt="Aura Spa Treatment" 
                fill
                sizes="100px"
                className="object-cover select-none" 
              />
            </div>
            
            <div className="text-left flex-1 space-y-1">
              <span className="text-[4.5px] font-bold text-rose-800 uppercase tracking-widest bg-rose-50 px-1 py-0.5 rounded border border-rose-200/40">Wellness Center</span>
              <h4 className="font-serif text-[9.5px] leading-snug font-medium tracking-tight text-neutral-950 mt-1">
                Revitalizá <span className="italic text-neutral-550 font-light">cuerpo & mente</span>
              </h4>
              <p className="text-[5px] text-neutral-500">Masajes Holísticos</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-1.5 border-t border-black/[0.04] mt-auto">
            <span className="text-[5px] text-neutral-400">Palermo Soho</span>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[5px] uppercase tracking-wider hover:bg-rose-700 transition-all cursor-pointer"
            >
              Turnos 🌸
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="showcase" className="relative py-24 md:py-32 z-10 bg-white overflow-hidden">
      
      {/* Dynamic Style Block for Marquee animations */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        .pause-hover:hover .animate-marquee-left,
        .pause-hover:hover .animate-marquee-right {
          animation-play-state: paused;
        }
        .mask-gradient-marquee {
          -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
          mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 mb-16">
        {/* Header de la Sección */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>DESCONECTARSE ES UN LUJO</span>
          </motion.div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight">
            Tu esfuerzo es único. <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-indigo-500 px-1 py-0.5 inline-block">Tu web también debería serlo.</span>
          </h2>
          <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
            Diseñamos sitios web 100% personalizados para que amplíes tu alcance, generes confianza y conviertas más visitas en clientes. Porque detrás de cada experiencia hay horas de esfuerzo que merecen ser mostradas de la mejor manera.
          </p>
        </div>
      </div>

      {/* Marquees Container (Edge-to-Edge) */}
      <div className="w-full flex flex-col gap-6 md:gap-8 relative z-20">
        
        {/* Row 1: Scrollable Row with Navigation Buttons */}
        <div className="relative w-full group">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => handleScroll(row1Ref, 'left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-neutral-200/50 backdrop-blur-md shadow-md flex items-center justify-center text-neutral-800 transition-all active:scale-95 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Carousel container */}
          <div className="w-full overflow-hidden mask-gradient-marquee py-4">
            <div 
              ref={row1Ref}
              onMouseEnter={() => setIsHoveredRow1(true)}
              onMouseLeave={() => setIsHoveredRow1(false)}
              onTouchStart={() => setIsHoveredRow1(true)}
              onTouchEnd={() => {
                setTimeout(() => setIsHoveredRow1(false), 1000);
              }}
              className="flex gap-6 overflow-x-auto scrollbar-none px-12 md:px-24"
            >
              {[...ROW_1_CASES, ...ROW_1_CASES].map((item, idx) => (
                <div key={idx} className="w-[340px] sm:w-[380px] shrink-0">
                  <SpotlightCard
                    glowColor={item.themeColor}
                    className="p-6 flex flex-col justify-between min-h-[440px] border border-black/[0.06] hover:border-black/[0.12] transition-all duration-300 bg-white"
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
                          <a
                            href={`https://${item.url}`}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            className="text-neutral-400 hover:text-neutral-600 transition-colors"
                          >
                            <ArrowUpRight className="w-3 h-3 shrink-0" />
                          </a>
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
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => handleScroll(row1Ref, 'right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-neutral-200/50 backdrop-blur-md shadow-md flex items-center justify-center text-neutral-800 transition-all active:scale-95 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Row 2: Scrollable Row with Navigation Buttons */}
        <div className="relative w-full group">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => handleScroll(row2Ref, 'left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-neutral-200/50 backdrop-blur-md shadow-md flex items-center justify-center text-neutral-800 transition-all active:scale-95 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Carousel container */}
          <div className="w-full overflow-hidden mask-gradient-marquee py-4">
            <div 
              ref={row2Ref}
              onMouseEnter={() => setIsHoveredRow2(true)}
              onMouseLeave={() => setIsHoveredRow2(false)}
              onTouchStart={() => setIsHoveredRow2(true)}
              onTouchEnd={() => {
                setTimeout(() => setIsHoveredRow2(false), 1000);
              }}
              className="flex gap-6 overflow-x-auto scrollbar-none px-12 md:px-24"
            >
              {[...ROW_2_CASES, ...ROW_2_CASES].map((item, idx) => (
                <div key={idx} className="w-[340px] sm:w-[380px] shrink-0">
                  <SpotlightCard
                    glowColor={item.themeColor}
                    className="p-6 flex flex-col justify-between min-h-[440px] border border-black/[0.06] hover:border-black/[0.12] transition-all duration-300 bg-white"
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
                          <a
                            href={`https://${item.url}`}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            className="text-neutral-400 hover:text-neutral-600 transition-colors"
                          >
                            <ArrowUpRight className="w-3 h-3 shrink-0" />
                          </a>
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
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => handleScroll(row2Ref, 'right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-neutral-200/50 backdrop-blur-md shadow-md flex items-center justify-center text-neutral-800 transition-all active:scale-95 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
