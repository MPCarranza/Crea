'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Eye, 
  ShieldCheck, 
  Award, 
  Palette, 
  Handshake, 
  Scale 
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';

interface Valor {
  titulo: string;
  descripcion: string;
  icon: React.ReactNode;
  glowColor: string;
}

const VALORES: Valor[] = [
  {
    titulo: "Cercanía",
    descripcion: "Escuchamos antes de construir.",
    icon: <Heart className="w-5 h-5 text-rose-500" />,
    glowColor: "rgba(244, 63, 94, 0.12)"
  },
  {
    titulo: "Transparencia",
    descripcion: "Decimos lo que podemos hacer y también lo que no.",
    icon: <Eye className="w-5 h-5 text-amber-500" />,
    glowColor: "rgba(245, 158, 11, 0.12)"
  },
  {
    titulo: "Responsabilidad",
    descripcion: "Cada proyecto representa el trabajo y la reputación de una persona.",
    icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    glowColor: "rgba(16, 185, 129, 0.12)"
  },
  {
    titulo: "Calidad",
    descripcion: "Buscamos soluciones funcionales, profesionales y duraderas.",
    icon: <Award className="w-5 h-5 text-blue-500" />,
    glowColor: "rgba(59, 130, 246, 0.12)"
  },
  {
    titulo: "Creatividad",
    descripcion: "Diseñamos experiencias que reflejan identidades únicas.",
    icon: <Palette className="w-5 h-5 text-purple-500" />,
    glowColor: "rgba(168, 85, 247, 0.12)"
  },
  {
    titulo: "Compromiso",
    descripcion: "Nos involucramos en cada proyecto como si fuera propio.",
    icon: <Handshake className="w-5 h-5 text-indigo-500" />,
    glowColor: "rgba(99, 102, 241, 0.12)"
  },
  {
    titulo: "Ética",
    descripcion: "No prometemos resultados imposibles ni vendemos expectativas irreales.",
    icon: <Scale className="w-5 h-5 text-cyan-500" />,
    glowColor: "rgba(6, 182, 212, 0.12)"
  }
];

export default function ValoresSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section id="valores" className="relative py-20 md:py-28 bg-[#f4f6fa] overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-400/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/10 w-96 h-96 rounded-full bg-purple-400/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-500/10 px-3 py-1 rounded-full">
            Filosofía
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-4 mb-4">
            Nuestros Valores
          </h2>
          <p className="text-neutral-500 font-light text-sm md:text-base leading-relaxed">
            Los pilares éticos y profesionales que guían cada decisión y desarrollo en Estudio Crea.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {VALORES.map((valor, idx) => {
            // Apply special layout spans to keep grid balanced
            const isLast = idx === VALORES.length - 1;
            const gridClass = isLast 
              ? "md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none lg:mx-0 w-full"
              : "";

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className={gridClass}
              >
                <SpotlightCard
                  glowColor={valor.glowColor}
                  className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[200px] border-black/[0.04]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-black/[0.02] border border-black/[0.06] flex items-center justify-center">
                        {valor.icon}
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-neutral-900 tracking-tight">
                        {valor.titulo}
                      </h3>
                    </div>
                    <p className="text-neutral-600 font-light text-sm leading-relaxed">
                      {valor.descripcion}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
