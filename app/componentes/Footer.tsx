'use client';

import React from 'react';
import { Laptop } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 z-10 border-t border-white/[0.08] bg-neutral-950/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-serif text-2xl font-bold text-white tracking-tight">Estudio Crea</span>
            <span className="text-xs text-zinc-400 font-light">Especialistas en Interfaces Inmersivas y Sistemas Autónomos.</span>
          </div>

          <div className="flex items-center gap-8 text-xs text-zinc-300 font-semibold uppercase tracking-wider">
            <a href="#hero" className="hover:text-white transition-colors duration-200">Inicio</a>
            <a href="#pain" className="hover:text-white transition-colors duration-200">Fricciones</a>
            <a href="#solution" className="hover:text-white transition-colors duration-200">Solución</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-200">Precios</a>
          </div>

        </div>

        <div className="h-px bg-white/[0.08] w-full mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-light">
          <span>© 2026 Estudio Crea. Todos los derechos reservados.</span>
          <div className="flex items-center gap-2">
            <span>Desarrollado con</span>
            <span className="text-cyan-400 font-bold hover:text-white transition-colors flex items-center gap-1">
              <Laptop className="w-3.5 h-3.5" />
              <span>Next.js & Tailwind CSS v4</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
