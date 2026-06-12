'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sliders, MessageSquare } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export default function PricingSection() {
  // Custom Pricing Calculator State
  const [includePayments, setIncludePayments] = useState(false);
  const [includeChatbot, setIncludeChatbot] = useState(false);
  const [includeMultiProfessional, setIncludeMultiProfessional] = useState(false);

  // Pricing Calculation taking base Desarrollo Semilla
  const baseDevelopmentPrice = 280000;
  const baseMaintenancePrice = 15000;

  const extraDevPrice = 
    (includePayments ? 55000 : 0) + 
    (includeChatbot ? 85000 : 0) + 
    (includeMultiProfessional ? 45000 : 0);

  const extraMaintenancePrice = 
    (includeChatbot ? 8000 : 0) + 
    (includeMultiProfessional ? 5000 : 0);

  const totalDevelopment = baseDevelopmentPrice + extraDevPrice;
  const totalMaintenance = baseMaintenancePrice + extraMaintenancePrice;

  return (
    <section id="pricing" className="relative py-24 md:py-32 z-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
            Inversión <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600">clara y al detalle.</span>
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
                href="https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20quiero%20el%20Plan%20Desarrollo%20Semilla%20para%20mi%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white hover:bg-cyan-600 hover:text-white transition-colors duration-300 shadow-md font-semibold"
              >
                Elegir Plan
              </a>
            </div>
          </SpotlightCard>

          {/* Plan 2: Gestión de Turnos */}
          <SpotlightCard className="p-8 flex flex-col justify-between min-h-[480px] border-cyan-500/30 relative" glowColor="rgba(168, 85, 247, 0.12)">
            {/* Featured Badge */}
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white px-3.5 py-1 rounded-full text-[9px] font-black tracking-wider uppercase shadow-md">
              Recomendado
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700">
                  Automatización
                </span>
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
                href="https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20quiero%20consultar%20por%20el%20Plan%20de%20Gestión%20de%20Turnos"
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
                href="https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20quiero%20sumar%20el%20Soporte%20Mensual%20de%20$15.000"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-black/[0.03] border border-black/[0.08] hover:bg-black/[0.08] text-neutral-800 transition-colors duration-300 font-semibold"
              >
                Adquirir Soporte
              </a>
            </div>
          </SpotlightCard>

        </div>

        {/* Interactive Pricing Estimator (Calculator Tool) */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative backdrop-blur-xl bg-white/60 border border-black/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.04)] rounded-3xl p-8 md:p-12 overflow-hidden">
            
            {/* Highlight badge top-right */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-600 to-indigo-600 text-white px-8 py-2 rounded-bl-3xl text-[9px] font-black tracking-widest uppercase shadow-md">
              Estimador de Proyecto
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Configurator Controls (Left Column) */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 mb-2">Simulador de Adicionales</h3>
                  <p className="text-neutral-600 text-sm font-light leading-relaxed">
                    Partiendo de la base de <strong>Desarrollo Semilla ($280.000)</strong>, simula el costo de agregar flujos automatizados de pago, asistentes de Inteligencia Artificial o turneros compartidos.
                  </p>
                </div>

                <div className="h-px bg-black/[0.08]" />

                {/* Dynamic Add-on Toggles */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Agregados Opcionales (Pago único)</span>
                  </h4>

                  {/* Add-on 1 */}
                  <div 
                    onClick={() => setIncludePayments(!includePayments)}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                      includePayments 
                        ? 'bg-cyan-50/50 border-cyan-200' 
                        : 'bg-black/[0.01] border-black/[0.04] hover:bg-black/[0.02]'
                    }`}
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-neutral-900">Pasarela de Pagos</span>
                        <span className="text-[9px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">+$55.000</span>
                      </div>
                      <p className="text-xs text-neutral-600 font-light mt-1">Mercado Pago / Stripe para señas o cobro total antes del turno.</p>
                    </div>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                      includePayments ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-black/20'
                    }`}>
                      {includePayments && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Add-on 2 */}
                  <div 
                    onClick={() => setIncludeChatbot(!includeChatbot)}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                      includeChatbot 
                        ? 'bg-purple-50/50 border-purple-200' 
                        : 'bg-black/[0.01] border-black/[0.04] hover:bg-black/[0.02]'
                    }`}
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-neutral-900">Asistente WhatsApp IA</span>
                        <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">+$85.000 + $8.000/mes</span>
                      </div>
                      <p className="text-xs text-neutral-600 font-light mt-1">Bot inteligente que responde dudas comunes y envía links de reserva por WhatsApp.</p>
                    </div>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                      includeChatbot ? 'bg-purple-600 border-purple-600 text-white' : 'border-black/20'
                    }`}>
                      {includeChatbot && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Add-on 3 */}
                  <div 
                    onClick={() => setIncludeMultiProfessional(!includeMultiProfessional)}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                      includeMultiProfessional 
                        ? 'bg-emerald-50/50 border-emerald-200' 
                        : 'bg-black/[0.01] border-black/[0.04] hover:bg-black/[0.02]'
                    }`}
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-neutral-900">Turnero Multi-Profesional</span>
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">+$45.000 + $5.000/mes</span>
                      </div>
                      <p className="text-xs text-neutral-600 font-light mt-1">Estructura para hasta 5 agendas o profesionales compartiendo el consultorio.</p>
                    </div>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                      includeMultiProfessional ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-black/20'
                    }`}>
                      {includeMultiProfessional && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Display Summary Card (Right Column) */}
              <div className="lg:col-span-5 w-full bg-black/[0.02] border border-black/[0.06] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-inner gap-4">
                <div className="w-full">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Desarrollo (Pago Único)</span>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="text-neutral-500 text-lg">$</span>
                    <motion.span 
                      key={totalDevelopment}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 tracking-tight"
                    >
                      {totalDevelopment.toLocaleString('es-AR')}
                    </motion.span>
                    <span className="text-neutral-500 text-xs font-light">ARS</span>
                  </div>
                </div>

                <div className="w-full h-px bg-black/[0.06]" />

                <div className="w-full">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Soporte + Mantenimiento</span>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="text-cyan-600 text-sm">$</span>
                    <motion.span 
                      key={totalMaintenance}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-serif font-bold text-cyan-600"
                    >
                      {totalMaintenance.toLocaleString('es-AR')}
                    </motion.span>
                    <span className="text-neutral-500 text-xs font-light">/mes</span>
                  </div>
                  <p className="text-[9px] text-neutral-500 leading-relaxed max-w-[200px] mx-auto mt-2">
                    Incluye hosting premium en Vercel, certificado SSL y actualizaciones técnicas.
                  </p>
                </div>

                <a 
                  href={`https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20quiero%20cotizar%20mi%20proyecto.%20Base:%20Desarrollo%20Semilla%20con%20adicionales%20de:%20${includePayments ? 'Pasarela%20de%20Pagos%20' : ''}${includeChatbot ? 'Asistente%20WhatsApp%20IA%20' : ''}${includeMultiProfessional ? 'Turnero%20Multi-Profesional' : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full py-4 rounded-xl text-center text-xs font-bold uppercase tracking-widest bg-neutral-900 text-white hover:bg-cyan-600 hover:text-white transition-colors duration-300 shadow-md font-semibold"
                >
                  Cotizar Configuración
                </a>
              </div>

            </div>

          </div>
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
              href="https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20busco%20una%20estructura%20a%20medida%20para%20mi%20idea%20de%20proyecto."
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
