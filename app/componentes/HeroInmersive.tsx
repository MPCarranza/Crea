'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
}

// Datos de las diapositivas con el enfoque estético de tus capturas
const SLIDES: Slide[] = [
  {
    id: 1,
    tag: "Estudio Crea",
    bg: "bg-[#faf9f6]",
    imgBackground: "/fondo.jpg",
    imgMidground: "/medio.png",
    imgForeground: "",
    type: "logo"
  },
  {
    id: 2,
    tag: "Dirección",
    bg: "bg-[#f5f3ed]",
    imgBackground: "/fondoDos.png",
    imgMidground: "/medioDos.png",
    imgForeground: "",
    type: "direction",
    title: "Una dirección clara",
    highlight: "da resultados más altos"
  },
  {
    id: 3,
    tag: "Tu Web",
    bg: "bg-[#faf9f6]",
    imgBackground: "/fondo.jpg",
    imgMidground: "/medio.png",
    imgForeground: "",
    type: "tuweb",
    title: "Desconectarse es un lujo"
  }
];

export default function HeroInmersive() {
  const [current, setCurrent] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
    <section id="hero" className={`relative w-full min-h-screen ${slide.bg} transition-colors duration-1000 overflow-hidden flex items-center justify-center px-6 md:px-12 lg:px-24`}>
      
      {/* Gradiente superior para asegurar contraste con la Navbar */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-20 pointer-events-none" />

      {/* ─── CAPAS DE IMÁGENES SURREALISTAS (PARALLAX ASOCIADO AL RATÓN) ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Capa Fondo - Estático */}
        <div 
          className="absolute inset-0 z-0 opacity-100"
        >
          <AnimatePresence>
            <motion.img 
              key={slide.id}
              src={slide.imgBackground} 
              onError={(e) => {
                e.currentTarget.src = "/fondoDos.png";
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Capa Media - Elementos intermedios flotantes */}
        <motion.div 
          animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
          transition={{ type: "spring", stiffness: 60, damping: 25 }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <AnimatePresence>
            {slide.imgMidground && (
              <motion.img 
                key={slide.id}
                src={slide.imgMidground} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Capa Frente - Movimiento rápido (Efecto "Wow" de Slider Revolution) */}
        <motion.div 
          animate={{ x: mousePos.x * 1.4, y: mousePos.y * 1.4 }}
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
        >
          <AnimatePresence>
            {slide.imgForeground && (
              <motion.img 
                key={slide.id}
                src={slide.imgForeground} 
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 0.5, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] object-contain mix-blend-lighten"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ─── MÁSCARA DE RED ESTILO APPLE / ANTIGRAVITY ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)] z-2 pointer-events-none" />

      {/* ─── CONTENEDOR DE CONTENIDO PRINCIPAL (TEXTO EDITORIAL) ─── */}
      <div className="relative max-w-7xl w-full z-30 flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
        
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
                  <img 
                    src="/logoHero.png" 
                    alt="Estudio Crea" 
                    className="max-w-[90%] md:max-w-2xl h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
                    onError={(e) => {
                      // Fallback en caso de que logoHero.png no exista en public
                      e.currentTarget.style.display = 'none';
                      const fallback = document.getElementById('logo-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
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
                  <h1 className="font-sans font-semibold text-white text-4xl md:text-7xl tracking-tight leading-[1.1] max-w-5xl mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    {slide.title} <br />
                    <span className="text-white">
                      {slide.highlight}
                    </span>
                  </h1>
                </div>
              )}


              {slide.type === "tuweb" && (
                <div className="flex flex-col items-center space-y-6">
                  <h1 className="font-sans font-semibold text-white text-4xl md:text-7xl tracking-tight leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
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
        <button className="px-5 md:px-8 py-3 md:py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-sans text-xs md:text-sm font-bold tracking-wide hover:scale-[1.02] hover:brightness-95 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.55)] border border-transparent whitespace-nowrap cursor-pointer">
          QUIERO MI WEB
        </button>
        <button className="px-5 md:px-8 py-3 md:py-4 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/[0.08] text-[#fcfcfd] font-sans text-xs md:text-sm font-medium tracking-wide hover:bg-white/[0.08] transition-all duration-300 whitespace-nowrap cursor-pointer">
          DUDAS
        </button>
      </div>



    </section>
  );
}