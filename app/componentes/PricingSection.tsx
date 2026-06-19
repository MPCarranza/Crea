'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, MessageSquare } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 z-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight">
            Inversión <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 px-1.5 py-0.5 inline-block">clara y al detalle.</span>
          </h2>
          <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
            Ofrecemos planes claros adaptados a la etapa de tu negocio independiente, con soporte continuo y sin sorpresas.
          </p>
        </div>

        {/* Glass Pricing Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 items-stretch">
          
          {/* Plan 1: Desarrollo Semilla */}
          <SpotlightCard className="p-8 flex flex-col justify-between min-h-[480px] border-black/[0.08]" glowColor="rgba(34, 211, 238, 0.12)">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700">
                  Plan Web
                </span>
                <span className="text-neutral-500 text-xs font-medium">Pago único</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-neutral-900 mb-2">Desarrollo Semilla</h3>
              <p className="text-neutral-600 font-light text-sm leading-relaxed mb-6">
                Diseño y maquetación de tu página web (Landing Page) adaptada a tu negocio. Espacio claro para mostrar tus servicios, tu historia, ubicación y enlaces a redes.
              </p>
              <div className="h-px bg-black/[0.06] mb-6" />
              <ul className="flex flex-col gap-3 text-xs text-neutral-700 font-light">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Diseño visual moderno a medida</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Secciones de servicios y trayectoria</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Enlaces a redes y ubicación</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Optimizado para buscadores (SEO)</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8">
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="text-neutral-500 text-sm">$</span>
                <span className="text-3xl font-serif font-bold text-neutral-900 tracking-tight">280.000</span>
                <span className="text-neutral-500 text-xs font-light">ARS</span>
              </div>
              <a 
                href="https://wa.me/5493855824408?text=Hola%20Estudio%20Crea,%20quiero%20el%20Plan%20Desarrollo%20Semilla%20para%20mi%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white hover:bg-cyan-600 hover:text-white transition-colors duration-300 shadow-md font-semibold"
              >
                Pago Único
              </a>
            </div>
          </SpotlightCard>

          {/* Plan 2: Gestión de Turnos */}
          <SpotlightCard className="p-8 flex flex-col justify-between min-h-[480px] border-cyan-500/30 relative" glowColor="rgba(168, 85, 247, 0.12)">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700">
                    Automatización
                  </span>
                  <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white px-2 py-0.5 rounded-full text-[8px] font-black tracking-wider uppercase shadow-xs">
                    Recomendado
                  </span>
                </div>
                <span className="text-neutral-500 text-xs font-medium">A Medida</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-neutral-900 mb-2">Gestión de Turnos</h3>
              <p className="text-neutral-600 font-light text-sm leading-relaxed mb-6">
                Todo lo del Plan Semilla + la integración de sistema de reservas (Calendly/TidyCal) o flujos automatizados básicos para que tus clientes agenden solos sin que tengas que responder manualmente.
              </p>
              <div className="h-px bg-black/[0.06] mb-6" />
              <ul className="flex flex-col gap-3 text-xs text-neutral-700 font-light">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span className="font-semibold text-neutral-900">Todo lo del Plan Semilla</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Integración Calendly o TidyCal</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Flujo de recordatorios automático</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Reducción activa de inasistencias</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8">
              <div className="mb-4">
                <span className="text-2xl font-serif font-bold text-neutral-900 tracking-tight">A Medida</span>
                <span className="text-neutral-500 text-xs font-light block">Configuración y flujos personalizados</span>
              </div>
              <a 
                href="https://wa.me/5493855824408?text=Hola%20Estudio%20Crea,%20quiero%20consultar%20por%20el%20Plan%20de%20Gestión%20de%20Turnos"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-600 to-indigo-600 text-white hover:brightness-95 transition-all duration-300 shadow-md font-semibold"
              >
                Consultar WhatsApp
              </a>
            </div>
          </SpotlightCard>

          {/* Plan 3: Soporte Mantenimiento */}
          <SpotlightCard className="p-8 flex flex-col justify-between min-h-[480px] border-black/[0.08]" glowColor="rgba(16, 185, 129, 0.12)">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                  Suscripción
                </span>
                <span className="text-neutral-500 text-xs font-medium">Continuo</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-neutral-900 mb-2">Soporte Mensual</h3>
              <p className="text-neutral-600 font-light text-sm leading-relaxed mb-6">
                Actualizaciones menores (textos, links, imágenes) y garantía de funcionamiento y hosting. Nos ocupamos del mantenimiento técnico para tu tranquilidad total.
              </p>
              <div className="h-px bg-black/[0.06] mb-6" />
              <ul className="flex flex-col gap-3 text-xs text-neutral-700 font-light">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hosting Premium Vercel incluido</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Certificado SSL y estabilidad activa</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Actualización ágil de textos e imágenes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Garantía de funcionamiento continuo</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8">
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="text-neutral-500 text-sm">$</span>
                <span className="text-3xl font-serif font-bold text-neutral-900 tracking-tight">15.000</span>
                <span className="text-neutral-500 text-xs font-light">/mes</span>
              </div>
              <a 
                href="https://wa.me/5493855824408?text=Hola%20Estudio%20Crea,%20quiero%20sumar%20el%20Soporte%20Mensual%20de%20$15.000"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-black/[0.03] border border-black/[0.08] hover:bg-black/[0.08] text-neutral-800 transition-colors duration-300 font-semibold"
              >
                Adquirir Soporte
              </a>
            </div>
          </SpotlightCard>

        </div>

        {/* Bloque Final: ¿Tu negocio necesita algo diferente? */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-cyan-50 to-indigo-50 border border-cyan-100 backdrop-blur-md shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              ¿Tu negocio necesita algo diferente?
            </h3>
            <p className="text-neutral-600 font-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
              Si buscás una estructura a medida para tu clínica, comercio o marca personal, contanos tu idea.
            </p>
            <a 
              href="https://wa.me/5493855824408?text=Hola%20Estudio%20Crea,%20busco%20una%20estructura%20a%20medida%20para%20mi%20idea%20de%20proyecto."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-neutral-900 text-white hover:bg-cyan-600 hover:text-white transition-all duration-300 shadow-md font-semibold"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>Cotizá tu proyecto por WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
