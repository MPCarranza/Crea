'use client';

import { motion } from 'framer-motion';


export default function HeroInmersive() {
  return (
    <section className="relative w-full min-h-screen bg-[#070708] overflow-hidden flex items-center justify-center px-6 md:px-12">
      
      {/* 🌌 FONDO MOLECULAR BLURY (Luz líquida animada) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Orbe Lavanda / Violeta Haze */}
        <motion.div 
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#7c3aed]/20 via-[#a78bfa]/10 to-transparent blur-[130px]"
        />

        {/* Orbe Coral Pink / Burnt Orange */}
        <motion.div 
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 40, -40, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#f97316]/15 via-[#f43f5e]/10 to-transparent blur-[140px]"
        />
      </div>

      {/* 🏛️ MÁSCARA DE RED (Grid geométrico sutil estilo Apple/Antigravity) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* 📦 CONTENEDOR PRINCIPAL */}
      <div className="relative max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* LADO IZQUIERDO: TEXTO EDITORIAL ALTA GAMA */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <span className="inline-block px-4 py-1.5 rounded-full backdrop-blur-md bg-white/[0.03] border border-white/[0.08] text-xs font-medium tracking-wider text-[#f43f5e] uppercase">
              Estudio de Diseño Boutique
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-[#fcfcfd] tracking-tight leading-[1.05]">
              La evolución <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fcfcfd] via-[#a78bfa] to-[#f97316]">
                digital
              </span> de tu espacio.
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-[#94a3b8] font-sans max-w-xl leading-relaxed"
          >
            Diseñamos interfaces inmersivas de alta gama y automatizamos tu agenda de turnos. Menos tiempo respondiendo mensajes en WhatsApp, más estabilidad para tu negocio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button className="px-8 py-4 rounded-xl bg-[#fcfcfd] text-[#070708] font-sans text-sm font-medium tracking-wide hover:bg-[#fcfcfd]/90 transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)]">
              Explorar Packs
            </button>
            <button className="px-8 py-4 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/[0.08] text-[#fcfcfd] font-sans text-sm font-medium tracking-wide hover:bg-white/[0.08] transition-all duration-300">
              Ver Proyectos
            </button>
          </motion.div>
        </div>

        {/* LADO DERECHO: COMPONENTE INTERACTIVO LIQUID GLASS */}
        <div className="lg:col-span-5 flex justify-center relative w-full h-[450px] lg:h-[550px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Esfera central simulando aberración de luz */}
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#f43f5e]/30 to-[#a78bfa]/20 blur-2xl animate-pulse" />

            {/* CONTENEDOR GLASS CLASS PRINCIPAL (Vidrio Flotante de Contraste) */}
            <div className="absolute w-[85%] h-[65%] backdrop-blur-2xl bg-white/[0.02] border border-white/[0.12] rounded-3xl p-6 flex flex-col justify-between shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transform -rotate-3 hover:rotate-0 transition-all duration-700 ease-[0.16,1,0.3,1] overflow-hidden group">
              {/* Reflejo brillante de cristal superior */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Encabezado simulado del sistema */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#a78bfa]/60" />
                </div>
                <span className="text-[10px] font-sans text-white/30 tracking-widest uppercase">System Active</span>
              </div>

              {/* Centro de la tarjeta (Estructura abstracta) */}
              <div className="space-y-3 my-auto">
                <div className="h-6 w-3/4 rounded bg-gradient-to-r from-white/10 to-transparent" />
                <div className="h-3 w-1/2 rounded bg-gradient-to-r from-white/5 to-transparent" />
                <div className="h-3 w-5/6 rounded bg-gradient-to-r from-white/5 to-transparent" />
              </div>

              {/* Pie de tarjeta con indicador estético */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-xs font-serif text-white/60 tracking-wide">Crea Lab Studio</span>
                <span className="text-xs font-sans text-[#f97316] font-medium tracking-tight">Vercel Deploy</span>
              </div>
            </div>

            {/* Burbuja secundaria interactiva flotante inferior */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-12 right-4 w-44 h-24 backdrop-blur-xl bg-white/[0.04] border border-white/[0.15] rounded-2xl p-4 shadow-2xl flex flex-col justify-between transform rotate-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-6 h-6 rounded-lg bg-[#a78bfa]/20 flex items-center justify-center border border--[#a78bfa]/30">
                <span className="text-[10px] text-[#a78bfa]">✦</span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-sans text-white/40 uppercase tracking-wider">Eficiencia</p>
                <p className="text-sm font-sans text-white/80 font-medium tracking-tight">100% Autónomo</p>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}