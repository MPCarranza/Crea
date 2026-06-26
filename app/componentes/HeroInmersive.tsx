'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import Image from 'next/image';

interface Slide {
  id: number;
  tag: string;
  bg: string;
  imgBackground: string;
  imgMidground: string;
  imgForeground: string;
  type: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  mobileObjectPosition?: string;
}

// Datos de las diapositivas con el enfoque estético de tus capturas
const SLIDES: Slide[] = [
  {
    id: 1,
    tag: "Estudio Crea",
    bg: "bg-[#faf9f6]",
    imgBackground: "/bg_slide_1.png",
    imgMidground: "",
    imgForeground: "",
    type: "logo",
    mobileObjectPosition: "85% center"
  },
  {
    id: 2,
    tag: "Dirección",
    bg: "bg-[#f5f3ed]",
    imgBackground: "/bg_slide_2.png",
    imgMidground: "",
    imgForeground: "",
    type: "direction",
    title: "Hay personas que necesitan lo que haces. Ayudémoslas a encontrarte.",
    mobileObjectPosition: "center"
  },
  {
    id: 3,
    tag: "Tu Web",
    bg: "bg-[#faf9f6]",
    imgBackground: "/bg_slide_3.png",
    imgMidground: "",
    imgForeground: "",
    type: "tuweb",
    title: "Creamos páginas webs que reflejan quien sos, cómo trabajas y el valor que aportas.",
    mobileObjectPosition: "85% center"
  }
];

export default function HeroInmersive() {
  const [current, setCurrent] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activePopover, setActivePopover] = useState<'quiero' | 'dudas' | null>(null);

  // Close popover when clicking outside
  useEffect(() => {
    if (!activePopover) return;
    const handleOutsideClick = () => {
      setActivePopover(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [activePopover]);

  const handleButtonClick = (e: React.MouseEvent, type: 'quiero' | 'dudas') => {
    e.stopPropagation();
    setActivePopover(prev => prev === type ? null : type);
  };

  // Captura el movimiento del ratón para el efecto Parallax Artístico
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Rotación automática cada 8 segundos (estilo slider)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section id="hero" className={`relative w-full min-h-dvh ${slide.bg} transition-colors duration-1000 overflow-hidden flex items-center justify-center`}>
      
      {/* Gradiente superior para asegurar contraste con la Navbar */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-20 pointer-events-none" />
      
      {/* Capa de filtro oscuro para asegurar legibilidad en fondos claros */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* ─── CAPAS DE IMÁGENES SURREALISTAS (PARALLAX ASOCIADO AL RATÓN) ─── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
        {/* Capa Fondo - Estático */}
        <div 
          className="absolute inset-0 w-full h-full z-0 opacity-100"
        >
          <AnimatePresence>
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={slide.imgBackground} 
                alt={slide.tag}
                fill
                priority={slide.id === 1}
                quality={75}
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: slide.mobileObjectPosition || 'center'
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Capa Media - Elementos intermedios flotantes */}
        <motion.div 
          animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
          transition={{ type: "spring", stiffness: 60, damping: 25 }}
          className="absolute inset-0 w-full h-full z-10"
        >
          <AnimatePresence>
            {slide.imgMidground && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image 
                  src={slide.imgMidground} 
                  alt={slide.tag + " midground"}
                  fill
                  priority={slide.id === 1}
                  quality={85}
                  sizes="100vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: slide.mobileObjectPosition || 'center'
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Capa Frente - Movimiento rápido (Efecto "Wow" de Slider Revolution) */}
        <motion.div 
          animate={{ x: mousePos.x * 1.4, y: mousePos.y * 1.4 }}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none flex items-center justify-center"
        >
          <AnimatePresence>
            {slide.imgForeground && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 0.5, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px]"
              >
                <Image 
                  src={slide.imgForeground} 
                  alt={slide.tag + " foreground"}
                  fill
                  sizes="(max-width: 768px) 250px, 350px"
                  style={{
                    objectFit: 'contain'
                  }}
                  className="mix-blend-lighten"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ─── MÁSCARA DE RED ESTILO APPLE / ANTIGRAVITY ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)] z-2 pointer-events-none" />

      {/* ─── CONTENEDOR DE CONTENIDO PRINCIPAL (TEXTO EDITORIAL) ─── */}
      <div className="relative max-w-7xl w-full z-30 flex flex-col items-center justify-center min-h-[50vh] text-center px-6 md:px-12 lg:px-24">
        
        {/* Área Central de Contenido */}
        <div className="w-full flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center space-y-6"
            >

              {/* Renderizado de contenidos específicos según tipo */}
              {slide.type === "logo" && (
                <motion.div 
                  animate={{ x: mousePos.x * 0.7, y: mousePos.y * 0.7 }}
                  transition={{ type: "spring", stiffness: 60, damping: 25 }}
                  className="relative flex flex-col items-center justify-center pt-8 pb-4"
                >
                  <Image 
                    src="/logoHeroV2.png" 
                    alt="Estudio Crea" 
                    width={672}
                    height={200}
                    style={{ height: 'auto', objectFit: 'contain' }}
                    priority
                    className="max-w-[90%] md:max-w-2xl h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
                  />
                  <div id="logo-fallback" className="hidden relative flex flex-col items-center select-none pt-4">
                    {/* "Estudio" en cursiva arriba, superpuesto */}
                    <span className="font-serif italic text-white text-5xl md:text-7xl absolute top-[-2rem] md:top-[-3.5rem] left-1/2 -translate-x-1/2 z-10 opacity-90 tracking-wide font-normal text-center">
                      Estudio
                    </span>
                    {/* "Crea" gigante y grueso en sans-serif */}
                    <span className="font-sans font-bold text-white text-7xl md:text-[11rem] tracking-tight leading-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
                      Crea
                    </span>
                  </div>
                </motion.div>
              )}

              {slide.type === "direction" && (
                <div className="relative w-full flex flex-col items-center">
                  <h1 className="font-sans font-semibold text-white text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] max-w-5xl mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    {slide.title} <br />
                    <span className="text-white">
                      {slide.highlight}
                    </span>
                  </h1>
                </div>
              )}


              {slide.type === "tuweb" && (
                <div className="flex flex-col items-center space-y-6">
                  <h1 className="font-sans font-semibold text-white text-3xl md:text-5xl lg:text-6xl tracking-tight leading-none max-w-5xl text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <p className="font-sans text-xs md:text-sm tracking-[0.25em] text-white/60 uppercase mt-4 select-none">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>

        {/* Controles del Slider Vertical Lateral derecho - Panel de Cristal Premium */}
        <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1 bg-white/[0.04] border border-white/[0.08] px-1 py-3.5 rounded-full backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.15)] pointer-events-auto">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrent(idx)}
              className="h-8 w-4 flex items-center justify-center group transition-all"
            >
              <div className={`w-1 rounded-full transition-all duration-500 ${current === idx ? 'h-5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'h-1 bg-white/20 group-hover:bg-white/50 group-hover:scale-125'}`} />
            </button>
          ))}
        </div>

      </div>

      {/* Botones de acción estables fijos en la parte inferior */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 flex flex-row gap-3 md:gap-4 items-center justify-center w-auto px-6">
        
        {/* QUIERO MI PROYECTO Wrapper for Popover */}
        <div className="relative">
          <button 
            onClick={(e) => handleButtonClick(e, 'quiero')}
            className="px-5 md:px-8 py-3 md:py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-sans text-xs md:text-sm font-bold tracking-wide hover:scale-[1.02] hover:brightness-95 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.55)] border border-transparent whitespace-nowrap cursor-pointer"
          >
            QUIERO EMPEZAR MI PROYECTO
          </button>
          
          <AnimatePresence>
            {activePopover === 'quiero' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#121212]/95 border border-white/[0.12] rounded-2xl p-2 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-1 min-w-[180px] z-50"
              >
                <a
                  href="https://wa.me/5493855824408?text=Hola%20Estudio%20Crea,%20quiero%20iniciar%20mi%20proyecto%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setActivePopover(null)}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-white/[0.06] text-xs font-semibold text-white tracking-wide transition-colors cursor-pointer text-left"
                >
                  <span className="w-5 h-5 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.156-1.352a9.943 9.943 0 0 0 4.854 1.258h.004c5.507 0 9.99-4.478 9.99-9.984 0-2.667-1.037-5.176-2.922-7.062C17.198 3.037 14.687 2 12.012 2zm5.792 14.15c-.247.697-1.207 1.272-1.658 1.328-.45.056-.902.083-2.906-.723-2.56-1.029-4.214-3.64-4.341-3.812-.127-.172-1.032-1.372-1.032-2.618 0-1.246.65-1.855.882-2.1.23-.245.506-.308.675-.308.169 0 .338.001.485.008.156.007.366-.06.572.441.21.512.72 1.754.783 1.881.063.127.106.276.02.446-.085.17-.127.276-.254.425-.127.15-.266.333-.38.446-.127.127-.26.265-.113.519.148.254.656 1.082 1.408 1.751.97.863 1.789 1.13 2.043 1.257.254.127.4.106.55-.064.15-.17.639-.744.81-1 .17-.255.339-.213.571-.127.233.085 1.479.697 1.733.824.254.128.423.191.486.3.064.109.064.634-.183 1.332z" />
                    </svg>
                  </span>
                  <span>Vía WhatsApp</span>
                </a>
                <a
                  href="mailto:estudiocrea2026@gmail.com?subject=Quiero%20mi%20Web%20-%20Estudio%20Crea&body=Hola%20Estudio%20Crea,%20me%20gustaría%20iniciar%20mi%20proyecto%20web..."
                  onClick={() => setActivePopover(null)}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-white/[0.06] text-xs font-semibold text-white tracking-wide transition-colors cursor-pointer text-left"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <span>Vía Email</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DUDAS Wrapper for Popover */}
        <div className="relative">
          <button 
            onClick={(e) => handleButtonClick(e, 'dudas')}
            className="px-5 md:px-8 py-3 md:py-4 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/[0.08] text-[#fcfcfd] font-sans text-xs md:text-sm font-medium tracking-wide hover:bg-white/[0.08] transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            ¿ES PARA MÍ?
          </button>
          
          <AnimatePresence>
            {activePopover === 'dudas' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#121212]/95 border border-white/[0.12] rounded-2xl p-2 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-1 min-w-[180px] z-50"
              >
                <a
                  href="https://wa.me/5493855824408?text=Hola%20Estudio%20Crea,%20tengo%20algunas%20dudas%20sobre%20los%20servicios"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setActivePopover(null)}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-white/[0.06] text-xs font-semibold text-white tracking-wide transition-colors cursor-pointer text-left"
                >
                  <span className="w-5 h-5 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.156-1.352a9.943 9.943 0 0 0 4.854 1.258h.004c5.507 0 9.99-4.478 9.99-9.984 0-2.667-1.037-5.176-2.922-7.062C17.198 3.037 14.687 2 12.012 2zm5.792 14.15c-.247.697-1.207 1.272-1.658 1.328-.45.056-.902.083-2.906-.723-2.56-1.029-4.214-3.64-4.341-3.812-.127-.172-1.032-1.372-1.032-2.618 0-1.246.65-1.855.882-2.1.23-.245.506-.308.675-.308.169 0 .338.001.485.008.156.007.366-.06.572.441.21.512.72 1.754.783 1.881.063.127.106.276.02.446-.085.17-.127.276-.254.425-.127.15-.266.333-.38.446-.127.127-.26.265-.113.519.148.254.656 1.082 1.408 1.751.97.863 1.789 1.13 2.043 1.257.254.127.4.106.55-.064.15-.17.639-.744.81-1 .17-.255.339-.213.571-.127.233.085 1.479.697 1.733.824.254.128.423.191.486.3.064.109.064.634-.183 1.332z" />
                    </svg>
                  </span>
                  <span>Conversemos por WhatsApp</span>
                </a>
                <a
                  href="mailto:estudiocrea2026@gmail.com?subject=Consulta%20-%20Estudio%20Crea&body=Hola%20Estudio%20Crea,%20tengo%20algunas%20dudas..."
                  onClick={() => setActivePopover(null)}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-white/[0.06] text-xs font-semibold text-white tracking-wide transition-colors cursor-pointer text-left"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <span>Conversemos por Email</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>



    </section>
  );
}