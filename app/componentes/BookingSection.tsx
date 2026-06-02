'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Clock, Laptop, User, Building, Smartphone, 
  CheckCircle2, Check, Copy 
} from 'lucide-react';
import { AVAILABLE_DATES, AVAILABLE_TIMES } from '../utils/constants';

export default function BookingSection() {
  const [bookingTab, setBookingTab] = useState<'demo' | 'embed'>('demo');
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    phone: ''
  });

  const [copiedCode, setCopiedCode] = useState(false);

  // Enterprise-Grade client-side Input Sanitizer to neutralize HTML/XSS script payloads
  const sanitizeInput = (text: string): string => {
    if (!text) return '';
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;")
      .replace(/javascript:/gi, "") // Neutralize active URI schemes
      .replace(/onerror/gi, "")
      .replace(/onload/gi, "")
      .trim();
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedSpecialty = sanitizeInput(formData.specialty);
    const sanitizedPhone = sanitizeInput(formData.phone);

    if (sanitizedName && sanitizedSpecialty && sanitizedPhone) {
      setFormData({
        name: sanitizedName,
        specialty: sanitizedSpecialty,
        phone: sanitizedPhone
      });
      setBookingStep(4);
    }
  };

  const copyEmbedCode = () => {
    const code = `<!-- Estudio Crea Turnero Widget Integration -->
<div class="estudio-crea-widget" style="width:100%;height:650px;border-radius:24px;overflow:hidden;background:#050505;">
  <iframe 
    src="https://calendly.com/tu-usuario/reunion-diagnostica" 
    width="100%" 
    height="100%" 
    frameborder="0"
    style="border:none;"
  ></iframe>
</div>`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="booking" className="relative py-24 md:py-32 z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Sólo 3 cupos de diseño al mes</span>
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
            Lanzamiento exclusivo: Reservá uno de nuestros <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-indigo-200">3 cupos mensuales.</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
            Asegura tu desarrollo este mes. Selecciona una hora en nuestra demo interactiva o mirá cómo integrar tu widget real de Calendly/TidyCal con carga suavizada.
          </p>
        </div>

        {/* Turnero Widget Container */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="relative w-full rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.6)] p-6 md:p-8 flex flex-col overflow-hidden">
            
            {/* Glass Header & Tabs */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/[0.06] pb-4 mb-6 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Reunión Diagnóstica - 15 min</span>
              </div>

              {/* Tab Switcher */}
              <div className="flex bg-white/[0.02] border border-white/[0.08] rounded-full p-1">
                <button 
                  onClick={() => setBookingTab('demo')}
                  className={`text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition-all duration-300 ${
                    bookingTab === 'demo' ? 'bg-white/10 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Demo Interactiva
                </button>
                <button 
                  onClick={() => setBookingTab('embed')}
                  className={`text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition-all duration-300 ${
                    bookingTab === 'embed' ? 'bg-white/10 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Código de Integración
                </button>
              </div>
            </div>

            {/* Dynamic Content Panel */}
            <div className="min-h-[420px] relative rounded-2xl bg-zinc-950/45 border border-white/[0.04] p-6 flex flex-col justify-between overflow-hidden shadow-inner">
              
              {/* MOCK DEMO FLOW */}
              {bookingTab === 'demo' && (
                <div className="flex-1 flex flex-col justify-between h-full">
                  <AnimatePresence mode="wait">
                    
                    {/* Step 1: Select Date */}
                    {bookingStep === 1 && (
                      <motion.div 
                        key="step-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                      >
                        <div className="md:col-span-5 flex flex-col justify-between gap-4">
                          <div>
                            <h4 className="font-serif text-xl font-medium text-white mb-2">Elegí la fecha</h4>
                            <p className="text-zinc-400 text-xs font-light leading-relaxed">
                              Selecciona un día habilitado en nuestro consultorio para tener tu videollamada diagnóstica gratuita de 15 minutos por Google Meet.
                            </p>
                          </div>
                          <div className="flex flex-col gap-2.5 text-xs text-zinc-400 font-light">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-cyan-400" />
                              <span>15 minutos de videollamada</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Laptop className="w-4 h-4 text-cyan-400" />
                              <span>Diagnóstico 100% Gratuito</span>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-7 flex flex-col pl-0 md:pl-6 border-l border-white/[0.04] gap-4">
                          <div className="flex justify-between items-center text-xs font-semibold text-zinc-300">
                            <span>Junio 2026</span>
                            <span className="text-[10px] text-cyan-400 uppercase tracking-widest">Estudio Crea</span>
                          </div>
                          
                          {/* Visual Grid */}
                          <div className="grid grid-cols-7 gap-2">
                            {Array.from({ length: 28 }).map((_, i) => {
                              const isAvailable = AVAILABLE_DATES.includes(i);
                              const isSelected = selectedDate === i;
                              return (
                                <div 
                                  key={i} 
                                  onClick={() => isAvailable && setSelectedDate(i)}
                                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                    isAvailable 
                                      ? isSelected 
                                        ? 'bg-cyan-500 text-zinc-950 border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] cursor-pointer'
                                        : 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 cursor-pointer hover:bg-cyan-500/20' 
                                      : 'bg-white/[0.01] text-zinc-700 border border-white/[0.01]'
                                  }`}
                                >
                                  {i + 1}
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex justify-between items-center text-[10px] text-zinc-500 pt-2">
                            <span>Zona: America/Argentina/Buenos_Aires</span>
                            {selectedDate !== null ? (
                              <button 
                                onClick={() => setBookingStep(2)}
                                className="px-4 py-2 bg-white text-zinc-950 font-bold uppercase tracking-wider rounded-lg hover:bg-cyan-400 transition-colors"
                              >
                                Siguiente
                              </button>
                            ) : (
                              <span className="text-cyan-400/80 animate-pulse font-semibold">Seleccioná un día (celestes)</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Select Time */}
                    {bookingStep === 2 && (
                      <motion.div 
                        key="step-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                      >
                        <div className="md:col-span-5 flex flex-col justify-between gap-4">
                          <div>
                            <button 
                              onClick={() => setBookingStep(1)}
                              className="text-xs text-cyan-400 hover:underline mb-2 block"
                            >
                              &larr; Volver a fechas
                            </button>
                            <h4 className="font-serif text-xl font-medium text-white mb-2">Elegí la hora</h4>
                            <p className="text-zinc-400 text-xs font-light leading-relaxed">
                              Seleccioná uno de los horarios disponibles en tiempo real para el día **{selectedDate !== null ? selectedDate + 1 : ''} de Junio**.
                            </p>
                          </div>
                          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-xs text-zinc-400">
                            <span className="font-semibold text-white block mb-1">Día seleccionado:</span>
                            <span>{selectedDate !== null ? selectedDate + 1 : ''} de Junio, 2026</span>
                          </div>
                        </div>

                        <div className="md:col-span-7 flex flex-col pl-0 md:pl-6 border-l border-white/[0.04] gap-4">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Horarios Disponibles</h5>
                          
                          <div className="flex flex-col gap-2">
                            {AVAILABLE_TIMES.map((time) => {
                              const isSelected = selectedTime === time;
                              return (
                                <div 
                                  key={time}
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-3 px-6 rounded-xl border text-center text-sm font-semibold transition-all duration-300 cursor-pointer ${
                                    isSelected 
                                      ? 'bg-cyan-500 border-cyan-400 text-zinc-950 shadow-[0_4px_15px_rgba(34,211,238,0.3)]' 
                                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] text-zinc-300'
                                  }`}
                                >
                                  {time}
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex justify-end pt-2">
                            {selectedTime ? (
                              <button 
                                onClick={() => setBookingStep(3)}
                                className="px-6 py-2.5 bg-white text-zinc-950 font-bold uppercase tracking-wider rounded-lg hover:bg-cyan-400 transition-colors shadow-lg"
                              >
                                Siguiente paso &rarr;
                              </button>
                            ) : (
                              <span className="text-cyan-400/80 animate-pulse text-[10px] uppercase tracking-widest font-semibold">Seleccioná un horario</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Enter Form Data */}
                    {bookingStep === 3 && (
                      <motion.div 
                        key="step-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                      >
                        <div className="md:col-span-5 flex flex-col justify-between gap-4">
                          <div>
                            <button 
                              onClick={() => setBookingStep(2)}
                              className="text-xs text-cyan-400 hover:underline mb-2 block"
                            >
                              &larr; Volver a horarios
                            </button>
                            <h4 className="font-serif text-xl font-medium text-white mb-2">Tus Datos</h4>
                            <p className="text-zinc-400 text-xs font-light leading-relaxed">
                              Danos tu nombre y especialidad profesional para que podamos preparar la llamada diagnóstica.
                            </p>
                          </div>
                          
                          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-xs text-zinc-400 flex flex-col gap-2">
                            <div>
                              <span className="font-semibold text-white block">Día y Hora:</span>
                              <span>{selectedDate !== null ? selectedDate + 1 : ''} de Junio, {selectedTime}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-white block">Canal:</span>
                              <span>Google Meet (Videollamada)</span>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-7 pr-0 md:pl-6 border-l border-white/[0.04]">
                          <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1 text-left">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Nombre Completo</label>
                              <div className="relative">
                                <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                  type="text" 
                                  required
                                  placeholder="Matias Gomez"
                                  value={formData.name}
                                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white outline-none transition-colors"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col gap-1 text-left">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Especialidad / Rubro</label>
                              <div className="relative">
                                <Building className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                  type="text" 
                                  required
                                  placeholder="Odontología / Psicología / Consultor"
                                  value={formData.specialty}
                                  onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white outline-none transition-colors"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col gap-1 text-left">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Número de WhatsApp</label>
                              <div className="relative">
                                <Smartphone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                  type="tel" 
                                  required
                                  placeholder="+54 9 11 1234-5678"
                                  value={formData.phone}
                                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white outline-none transition-colors"
                                />
                              </div>
                            </div>

                            <button 
                              type="submit"
                              className="w-full mt-2 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold uppercase tracking-wider rounded-xl transition-transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Confirmar Reserva de Diagnóstico</span>
                            </button>
                          </form>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Success Screen */}
                    {bookingStep === 4 && (
                      <motion.div 
                        key="step-4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center justify-center text-center py-6"
                      >
                        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                          <Check className="w-8 h-8 stroke-[3]" />
                        </div>

                        <h3 className="font-serif text-2xl font-semibold text-white mb-2">¡Reserva Diagnóstica Confirmada!</h3>
                        <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-md mb-8 font-sans">
                          Felicitaciones <strong>{formData.name}</strong>. Tu espacio quedó bloqueado con éxito para el día <strong>{selectedDate !== null ? selectedDate + 1 : ''} de Junio a las {selectedTime}</strong>.
                        </p>

                        {/* Preview of automated notification they'll buy */}
                        <div className="w-full max-w-sm rounded-2xl bg-white/[0.02] border border-white/[0.08] p-4 text-left shadow-inner">
                          <div className="flex items-center justify-between border-b border-white/[0.04] pb-2.5 mb-3">
                            <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest font-mono">WhatsApp Autómata Demo</span>
                            <span className="text-[9px] text-zinc-500">Recién enviado</span>
                          </div>
                          <div className="p-3 bg-zinc-900 rounded-xl rounded-tl-none border border-white/[0.04] text-xs text-zinc-300 leading-relaxed font-sans">
                            <span className="font-bold text-cyan-400 block mb-1">RECORDATORIO OFICIAL</span>
                            Hola {formData.name}, te recordamos tu llamada diagnóstica de agenda con <strong>Estudio Crea</strong> programada para mañana a las {selectedTime}.<br /><br />
                            Para ingresar, utilizá este link de Meet:<br />
                            <span className="text-cyan-300 font-mono underline cursor-pointer">meet.google.com/crea-diagnostico</span>
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            setBookingStep(1);
                            setSelectedDate(null);
                            setSelectedTime(null);
                          }}
                          className="mt-8 text-xs text-zinc-500 hover:text-white transition-colors underline"
                        >
                          Volver a simular otra reserva
                        </button>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              )}

              {/* REAL CODE INTEGRATION VIEW */}
              {bookingTab === 'embed' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-serif text-xl font-medium text-white mb-2">Incrustar Turnero Real</h4>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed mb-6">
                      Este componente digital está diseñado de forma modular. Para integrar tu agenda nativa de <strong>Calendly</strong> o <strong>TidyCal</strong>, copia el código de abajo y pégalo directamente en la sección del widget de <code>app/page.tsx</code>.
                    </p>
                  </div>

                  <div className="bg-[#0b0b0b] p-4 rounded-xl border border-white/[0.06] text-left relative group">
                    <pre className="text-[11px] font-mono text-zinc-300 overflow-x-auto whitespace-pre leading-relaxed select-all max-h-[160px] pb-2">
                      {`<!-- Estudio Crea Turnero Widget Integration -->
<div class="estudio-crea-widget" style="width:100%;height:650px;border-radius:24px;overflow:hidden;background:#050505;">
  <iframe 
    src="https://calendly.com/tu-usuario/reunion-diagnostica" 
    width="100%" 
    height="100%" 
    frameborder="0"
    style="border:none;"
  ></iframe>
</div>`}
                    </pre>
                    
                    <button 
                      onClick={copyEmbedCode}
                      className="absolute top-3 right-3 bg-white/[0.04] border border-white/[0.08] hover:bg-cyan-500 hover:text-zinc-950 text-zinc-400 hover:border-cyan-400 p-2 rounded-lg transition-all duration-300"
                      title="Copy Code"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="text-[11px] text-zinc-500 font-light mt-4 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>El contenedor tiene soporte responsive pre-optimizado y control de scroll nativo desactivado para evitar interrupciones de navegación.</span>
                  </div>
                </motion.div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
