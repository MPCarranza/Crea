'use client';

import React from 'react';
import { Laptop, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  return (
    <footer className="relative py-16 z-10 border-t border-white/[0.08] bg-neutral-950/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-serif text-2xl font-bold text-white tracking-tight">Estudio Crea</span>
            <span className="text-xs text-zinc-400 font-light">Especialistas en Interfaces Inmersivas y Sistemas Autónomos.</span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-8 text-xs text-zinc-300 font-semibold uppercase tracking-wider flex-wrap justify-center md:justify-end">
              <a href={isHome ? '#hero' : '/'} className="hover:text-white transition-colors duration-200">Inicio</a>
              <a href={isHome ? '#pain' : '/#pain'} className="hover:text-white transition-colors duration-200">Facilidades</a>
              <a href={isHome ? '#solution' : '/#solution'} className="hover:text-white transition-colors duration-200">Solución</a>
              <a href={isHome ? '#pricing' : '/#pricing'} className="hover:text-white transition-colors duration-200">Precios</a>
              <a href="/nuestra-historia" className={`hover:text-white transition-colors duration-200 ${pathname === '/nuestra-historia' ? 'text-cyan-400 font-bold' : ''}`}>Nuestra Historia</a>
            </div>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-6 mt-2">
              <a 
                href="https://instagram.com/estudiocrea.oficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
                title="Instagram (@estudiocrea.oficial)"
              >
                <svg className="w-4.5 h-4.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@estudiocrea.oficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
                title="TikTok (@estudiocrea.oficial)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.99 2 1.68 3.28 2.03.02 1.34 0 2.68.01 4.02-1.28-.08-2.52-.57-3.52-1.39-.77-.6-1.39-1.38-1.82-2.27v7.58c.03 1.83-.54 3.65-1.63 5.09-1.23 1.62-3.13 2.64-5.15 2.76-2.09.13-4.24-.62-5.7-2.12C1.94 18.35 1.05 15.93 1.32 13.5c.21-2.19 1.48-4.21 3.42-5.26 1.47-.79 3.19-.99 4.77-.6v4.06c-.95-.31-1.99-.21-2.85.31-.95.53-1.64 1.53-1.85 2.6-.28 1.33.22 2.75 1.25 3.6 1.05.86 2.53.97 3.69.28.84-.46 1.39-1.35 1.48-2.31.02-2.11.01-4.21.01-6.32V0c.32.02.66-.02.97.02z" />
                </svg>
              </a>
              <a 
                href="mailto:estudiocrea2026@gmail.com" 
                className="text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
                title="Email (estudiocrea2026@gmail.com)"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

        </div>

        <div className="h-px bg-white/[0.08] w-full mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-light">
          <span>© 2026 Estudio Crea. Todos los derechos reservados.</span>
          <div className="flex items-center gap-2">
            <span>Desarrollado con</span>
            <span className="text-cyan-400 font-bold hover:text-white transition-colors flex items-center gap-1">
              <Laptop className="w-3.5 h-3.5" />
              <span>Estudio Crea.</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
