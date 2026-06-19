'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Clock, Laptop, User, Building, Smartphone, 
  CheckCircle2, Check, Copy, Calendar, Settings, Tv, 
  ChevronLeft, ChevronRight, Plus, Search, Trash2, 
  Volume2, ShieldAlert, Download, RefreshCw, Sparkles,
  CreditCard, ExternalLink, CalendarDays, DollarSign, Bell,
  Star, Users, Music
} from 'lucide-react';

// ==========================================
// TYPES & DATA INTERFACES
// ==========================================

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  specialtyId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM hs
  coverage: string; // Particular / Obra Social
  status: 'pendiente' | 'asistio' | 'ausente' | 'cancelado';
  ticketNumber: string; // e.g. T-02
  calledBox?: string; // e.g. Box 3 / Consultorio 1
  price: number;
}

export interface Specialty {
  id: string;
  name: string;
  professional: string;
  price: number;
  duration: number; // in minutes
  color: string; // hex or tailwind text/bg color
  iconName: 'nails' | 'yoga' | 'therapy' | 'doctor' | 'kinesio' | 'music';
}

export interface TurneroSettings {
  startTime: string; // "09:00"
  endTime: string; // "19:00"
  intervalMinutes: number; // 30 or 60
  depositPercentage: number; // e.g. 20 for 20%
  whatsappTemplate: string;
  boxes: string[];
}

// Hardcoded specialties matching ShowcaseSection
const SPECIALTIES: Specialty[] = [
  { id: 'nails', name: 'Manicuría & Nail Art', professional: 'Mariana Gomez', price: 18500, duration: 60, color: 'from-amber-500 to-orange-600', iconName: 'nails' },
  { id: 'yoga', name: 'Clase de Yoga Grupal', professional: 'Prof. Ana Inés', price: 8500, duration: 90, color: 'from-purple-500 to-indigo-600', iconName: 'yoga' },
  { id: 'therapy', name: 'Sesión Psicoterapia', professional: 'Lic. Sofía Ramos', price: 25000, duration: 50, color: 'from-emerald-500 to-teal-600', iconName: 'therapy' },
  { id: 'doctor', name: 'Consulta Pediátrica', professional: 'Dra. Silvia Martínez', price: 30000, duration: 30, color: 'from-cyan-500 to-blue-600', iconName: 'doctor' },
  { id: 'kinesio', name: 'Rehabilitación Kinésica', professional: 'Lic. Pedro Gómez', price: 20000, duration: 45, color: 'from-indigo-500 to-blue-700', iconName: 'kinesio' },
  { id: 'music', name: 'Clase Particular de Música', professional: 'Prof. Lucas Clave', price: 12000, duration: 60, color: 'from-rose-500 to-pink-600', iconName: 'music' },
];

const DEFAULT_SETTINGS: TurneroSettings = {
  startTime: "09:00",
  endTime: "18:00",
  intervalMinutes: 30,
  depositPercentage: 20,
  whatsappTemplate: "Hola {nombre}, te recordamos tu turno con {profesional} ({especialidad}) programado para el día {fecha} a las {hora}. Utilizá este link para ingresar o cancelar: {link}",
  boxes: ["Box 1", "Box 2", "Consultorio A", "Consultorio B"],
};

// Genera turnos mockeados iniciales dinámicos basados en la fecha actual del usuario
const getInitialAppointments = (): Appointment[] => {
  const appointments: Appointment[] = [];
  const today = new Date();
  
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const todayStr = formatDate(today);
  
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = formatDate(yesterday);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = formatDate(tomorrow);

  // Ayer - Completado
  appointments.push({
    id: 'appt-1',
    clientName: 'Alejandro Romero',
    clientPhone: '+54 9 11 9876-5432',
    specialtyId: 'nails',
    date: yesterdayStr,
    time: '11:00 hs',
    coverage: 'Particular',
    status: 'asistio',
    ticketNumber: 'M-01',
    price: 18500
  });

  // Ayer - Ausente
  appointments.push({
    id: 'appt-2',
    clientName: 'Laura Rossi',
    clientPhone: '+54 9 11 5555-4433',
    specialtyId: 'music',
    date: yesterdayStr,
    time: '15:30 hs',
    coverage: 'Particular',
    status: 'ausente',
    ticketNumber: 'S-01',
    price: 12000
  });

  // Hoy - Pendiente (Llamado temprano, o listo)
  appointments.push({
    id: 'appt-3',
    clientName: 'Matias Gomez',
    clientPhone: '+54 9 3855824408',
    specialtyId: 'doctor',
    date: todayStr,
    time: '09:30 hs',
    coverage: 'OSDE 310',
    status: 'asistio',
    ticketNumber: 'P-01',
    calledBox: 'Consultorio A',
    price: 30000
  });

  appointments.push({
    id: 'appt-4',
    clientName: 'Florencia Diaz',
    clientPhone: '+54 9 11 3210-4321',
    specialtyId: 'nails',
    date: todayStr,
    time: '11:30 hs',
    coverage: 'Particular',
    status: 'pendiente',
    ticketNumber: 'M-02',
    price: 18500
  });

  appointments.push({
    id: 'appt-5',
    clientName: 'Juan Perez',
    clientPhone: '+54 9 11 7777-8888',
    specialtyId: 'therapy',
    date: todayStr,
    time: '14:30 hs',
    coverage: 'Particular',
    status: 'pendiente',
    ticketNumber: 'T-01',
    price: 25000
  });

  appointments.push({
    id: 'appt-6',
    clientName: 'Esteban Quito',
    clientPhone: '+54 9 11 4444-5555',
    specialtyId: 'kinesio',
    date: todayStr,
    time: '16:00 hs',
    coverage: 'Swiss Medical',
    status: 'pendiente',
    ticketNumber: 'K-01',
    price: 20000
  });

  // Mañana - Pendiente
  appointments.push({
    id: 'appt-7',
    clientName: 'Carla Ortiz',
    clientPhone: '+54 9 11 9999-0000',
    specialtyId: 'yoga',
    date: tomorrowStr,
    time: '10:00 hs',
    coverage: 'Particular',
    status: 'pendiente',
    ticketNumber: 'Y-01',
    price: 8500
  });

  return appointments;
};

// ==========================================
// WEB AUDIO API CHIME GENERATOR
// ==========================================
const playClinicChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // Tonos tipo ding-dong de hospital/aeropuerto
    // Nota 1: G5 (783.99 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(783.99, ctx.currentTime);
    gain1.gain.setValueAtTime(0, ctx.currentTime);
    gain1.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.75);

    // Nota 2: E5 (659.25 Hz) con delay de 150ms
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.18);
    gain2.gain.setValueAtTime(0, ctx.currentTime + 0.18);
    gain2.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.23);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.98);
    osc2.start(ctx.currentTime + 0.18);
    osc2.stop(ctx.currentTime + 1.05);
  } catch (e) {
    console.warn("Web Audio API not allowed/supported in this state: ", e);
  }
};

export default function InteractiveTurnero() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'client' | 'admin' | 'tv' | 'embed'>('client');

  // Shared state: Loaded from localStorage or defaults
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [settings, setSettings] = useState<TurneroSettings>(DEFAULT_SETTINGS);
  
  // Storage loaded status to prevent SSR mismatches
  const [isLoaded, setIsLoaded] = useState(false);

  // Called ticket state (for real-time synchronization via storage event)
  const [calledTicket, setCalledTicket] = useState<{
    id: string;
    ticketNumber: string;
    clientName: string;
    box: string;
    specialtyName: string;
    timestamp: number;
  } | null>(null);

  // Load state on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAppts = localStorage.getItem('crea_turnero_appts');
      const storedSettings = localStorage.getItem('crea_turnero_settings');
      const storedCalled = localStorage.getItem('crea_turnero_called_ticket');

      if (storedAppts) {
        setAppointments(JSON.parse(storedAppts));
      } else {
        const initial = getInitialAppointments();
        setAppointments(initial);
        localStorage.setItem('crea_turnero_appts', JSON.stringify(initial));
      }

      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      } else {
        localStorage.setItem('crea_turnero_settings', JSON.stringify(DEFAULT_SETTINGS));
      }

      if (storedCalled) {
        setCalledTicket(JSON.parse(storedCalled));
      }
      setIsLoaded(true);
    }
  }, []);

  // Save appointments changes
  const saveAppointments = (newAppts: Appointment[]) => {
    setAppointments(newAppts);
    localStorage.setItem('crea_turnero_appts', JSON.stringify(newAppts));
  };

  // Save settings changes
  const saveSettings = (newSettings: TurneroSettings) => {
    setSettings(newSettings);
    localStorage.setItem('crea_turnero_settings', JSON.stringify(newSettings));
  };

  // Sync called ticket via window storage event listener (cross-tab sync)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'crea_turnero_called_ticket' && e.newValue) {
        const parsed = JSON.parse(e.newValue);
        setCalledTicket(parsed);
        // Play chime in TV mode
        if (activeTab === 'tv') {
          playClinicChime();
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [activeTab]);

  // Handle local calling to trigger local sound and update
  const callTicket = (appt: Appointment, box: string) => {
    const specialty = SPECIALTIES.find(s => s.id === appt.specialtyId);
    const payload = {
      id: appt.id,
      ticketNumber: appt.ticketNumber,
      clientName: appt.clientName,
      box: box,
      specialtyName: specialty ? specialty.name : 'Consulta',
      timestamp: Date.now()
    };
    
    // Update local state & storage (broadcasts to other tabs)
    setCalledTicket(payload);
    localStorage.setItem('crea_turnero_called_ticket', JSON.stringify(payload));
    
    // Play chime sound immediately
    playClinicChime();

    // Update appointment called box and status
    const updated = appointments.map(a => 
      a.id === appt.id ? { ...a, calledBox: box } : a
    );
    saveAppointments(updated);
  };

  if (!isLoaded) {
    return (
      <div className="w-full min-h-[450px] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-cyan-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {/* View Switcher Tabs */}
      <div className="flex bg-neutral-900/5 border border-black/[0.06] rounded-2xl p-1 mb-8 max-w-lg mx-auto w-full gap-1 shadow-inner">
        <button 
          onClick={() => setActiveTab('client')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1 ${
            activeTab === 'client' ? 'bg-white text-neutral-950 shadow-sm border border-black/[0.04]' : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Cliente</span>
        </button>
        <button 
          onClick={() => setActiveTab('admin')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1 ${
            activeTab === 'admin' ? 'bg-white text-neutral-950 shadow-sm border border-black/[0.04]' : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Profesional</span>
        </button>
        <button 
          onClick={() => setActiveTab('tv')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1 ${
            activeTab === 'tv' ? 'bg-white text-neutral-950 shadow-sm border border-black/[0.04]' : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Tv className="w-3.5 h-3.5" />
          <span>Pantalla TV</span>
        </button>
        <button 
          onClick={() => setActiveTab('embed')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1 ${
            activeTab === 'embed' ? 'bg-white text-neutral-950 shadow-sm border border-black/[0.04]' : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Código</span>
        </button>
      </div>

      {/* Screen Views */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 'client' && (
            <motion.div 
              key="client-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ClientBookingPanel 
                specialties={SPECIALTIES} 
                settings={settings}
                appointments={appointments}
                onAddAppointment={(appt) => saveAppointments([...appointments, appt])}
              />
            </motion.div>
          )}

          {activeTab === 'admin' && (
            <motion.div 
              key="admin-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ProfessionalDashboard 
                specialties={SPECIALTIES}
                settings={settings}
                appointments={appointments}
                calledTicket={calledTicket}
                onUpdateAppointments={saveAppointments}
                onUpdateSettings={saveSettings}
                onCallTicket={callTicket}
              />
            </motion.div>
          )}

          {activeTab === 'tv' && (
            <motion.div 
              key="tv-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-950 text-white rounded-3xl p-6 md:p-10 border border-neutral-800 shadow-2xl relative overflow-hidden"
            >
              {/* Star fields/noise behind */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
              <div className="absolute -top-[10%] -left-[10%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-[10%] -right-[10%] w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />
              
              <WaitingRoomTV calledTicket={calledTicket} appointments={appointments} specialties={SPECIALTIES} />
            </motion.div>
          )}

          {activeTab === 'embed' && (
            <motion.div 
              key="embed-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <EmbedCodePanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 1: CLIENT BOOKING FLOW
// ============================================================================

interface ClientBookingProps {
  specialties: Specialty[];
  settings: TurneroSettings;
  appointments: Appointment[];
  onAddAppointment: (appt: Appointment) => void;
}

function ClientBookingPanel({ specialties, settings, appointments, onAddAppointment }: ClientBookingProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  
  // Custom interactive calendar state
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null); // YYYY-MM-DD
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Form details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [coverage, setCoverage] = useState('Particular');
  const [notes, setNotes] = useState('');

  // Payment states
  const [checkoutStep, setCheckoutStep] = useState<'pending' | 'paying' | 'success'>('pending');
  const [paymentMethod, setPaymentMethod] = useState<'mp' | 'card'>('mp');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Auto generated ticket number
  const [assignedTicket, setAssignedTicket] = useState<string>('');

  // Input Sanitizer
  const sanitize = (val: string) => {
    return val.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').trim();
  };

  // Calendar Helpers
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); // 0-11

  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  const firstDayIndex = useMemo(() => {
    const day = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
    // Shift to make Mon=0, Tue=1 ... Sun=6
    return day === 0 ? 6 : day - 1;
  }, [year, month]);

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  // Generate date list for rendering
  const calendarDays = useMemo(() => {
    const list = [];
    // Pad previous month days
    for (let i = 0; i < firstDayIndex; i++) {
      list.push(null);
    }
    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      list.push(date);
    }
    return list;
  }, [year, month, daysInMonth, firstDayIndex]);

  // Available Time Slots Calculator (excluding already booked times)
  const timeSlots = useMemo(() => {
    if (!selectedDateStr || !selectedSpecialty) return [];

    // Parse settings hours
    const [startH, startM] = settings.startTime.split(':').map(Number);
    const [endH, endM] = settings.endTime.split(':').map(Number);
    const interval = settings.intervalMinutes;

    const slots = [];
    let current = new Date();
    current.setHours(startH, startM, 0, 0);

    const end = new Date();
    end.setHours(endH, endM, 0, 0);

    while (current < end) {
      const timeStr = current.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + ' hs';
      
      // Check if this time slot is already booked for the selected date and specialty
      const isBooked = appointments.some(appt => 
        appt.date === selectedDateStr && 
        appt.time === timeStr && 
        appt.specialtyId === selectedSpecialty.id &&
        appt.status !== 'cancelado'
      );

      if (!isBooked) {
        slots.push(timeStr);
      }
      current.setMinutes(current.getMinutes() + interval);
    }
    return slots;
  }, [selectedDateStr, selectedSpecialty, appointments, settings]);

  // Determine ticket letter prefix based on specialty ID
  const getTicketPrefix = (id: string) => {
    switch (id) {
      case 'nails': return 'M';
      case 'yoga': return 'Y';
      case 'therapy': return 'T';
      case 'doctor': return 'P';
      case 'kinesio': return 'K';
      case 'music': return 'S';
      default: return 'A';
    }
  };

  // Auto-generate ticket counter
  const generateTicketNumber = (specId: string) => {
    const prefix = getTicketPrefix(specId);
    const count = appointments.filter(a => a.specialtyId === specId).length + 1;
    return `${prefix}-${count.toString().padStart(2, '0')}`;
  };

  // Main submission handler
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSpecialty || !selectedDateStr || !selectedTime) return;

    const dateStr = selectedDateStr;
    const timeStr = selectedTime;

    setCheckoutStep('paying');
    
    // Simulate API delay
    setTimeout(() => {
      const ticketNum = generateTicketNumber(selectedSpecialty.id);
      setAssignedTicket(ticketNum);

      const newAppt: Appointment = {
        id: 'appt-' + Date.now(),
        clientName: sanitize(name),
        clientPhone: sanitize(phone),
        specialtyId: selectedSpecialty.id,
        date: dateStr,
        time: timeStr,
        coverage: coverage,
        status: 'pendiente',
        ticketNumber: ticketNum,
        price: selectedSpecialty.price
      };

      onAddAppointment(newAppt);
      setCheckoutStep('success');
      setStep(4);
    }, 2000);
  };

  const resetFlow = () => {
    setStep(1);
    setSelectedSpecialty(null);
    setSelectedDateStr(null);
    setSelectedTime(null);
    setName('');
    setPhone('');
    setCoverage('Particular');
    setNotes('');
    setCheckoutStep('pending');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
  };

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDateStr) return '';
    const [y, m, d] = selectedDateStr.split('-');
    return `${d}/${m}/${y}`;
  }, [selectedDateStr]);

  // Verify deposit required
  const depositAmount = selectedSpecialty 
    ? Math.round((selectedSpecialty.price * settings.depositPercentage) / 100)
    : 0;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Step-by-Step form wizard left panel */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Select Professional Specialty */}
            {step === 1 && (
              <motion.div 
                key="step1" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-neutral-900 mb-1">Elegí la Especialidad</h3>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed">
                    Seleccioná el servicio que deseas reservar. Cada profesional cuenta con agenda y configuraciones de cobro personalizadas.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specialties.map((spec) => {
                    const isSelected = selectedSpecialty?.id === spec.id;
                    return (
                      <div 
                        key={spec.id}
                        onClick={() => setSelectedSpecialty(spec)}
                        className={`p-5 rounded-2xl border cursor-pointer text-left transition-all duration-300 relative overflow-hidden group ${
                          isSelected 
                            ? 'bg-gradient-to-br from-white to-cyan-50/20 border-cyan-500 shadow-md ring-1 ring-cyan-500' 
                            : 'bg-white/50 border-black/[0.06] hover:bg-white/80 hover:border-black/[0.12] hover:shadow-xs'
                        }`}
                      >
                        {/* Glow effect on hover */}
                        <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${spec.color} opacity-[0.03] group-hover:opacity-[0.06] blur-xl`} />
                        
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${spec.color} flex items-center justify-center text-white shrink-0`}>
                            {spec.iconName === 'nails' && <Sparkles className="w-5 h-5" />}
                            {spec.iconName === 'yoga' && <Star className="w-5 h-5" />}
                            {spec.iconName === 'therapy' && <CalendarDays className="w-5 h-5" />}
                            {spec.iconName === 'doctor' && <Laptop className="w-5 h-5" />}
                            {spec.iconName === 'kinesio' && <Users className="w-5 h-5" />}
                            {spec.iconName === 'music' && <Music className="w-5 h-5" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-bold text-neutral-900 leading-tight">{spec.name}</h4>
                              <span className="text-[10px] bg-black/5 text-neutral-600 px-1.5 py-0.5 rounded-full font-semibold">
                                {spec.duration}m
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 font-light mt-0.5">{spec.professional}</p>
                            
                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-black/[0.04]">
                              <span className="text-xs font-semibold text-neutral-700">Precio consulta:</span>
                              <span className="text-sm font-bold text-neutral-900 font-serif">${spec.price.toLocaleString('es-AR')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    disabled={!selectedSpecialty}
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-neutral-950 text-white font-bold uppercase tracking-wider rounded-xl hover:bg-cyan-600 transition-colors shadow-md disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed text-xs flex items-center gap-2"
                  >
                    <span>Elegir Fecha y Hora</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Interactive Calendar & Time Slots */}
            {step === 2 && (
              <motion.div 
                key="step2" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <button 
                    onClick={() => { setStep(1); setSelectedTime(null); setSelectedDateStr(null); }}
                    className="text-xs text-cyan-600 hover:underline mb-2 flex items-center gap-1 font-semibold"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Volver a especialidades</span>
                  </button>
                  <h3 className="font-serif text-2xl font-semibold text-neutral-900 mb-1">Elegí la Fecha y Hora</h3>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed">
                    Seleccioná un día del calendario (los marcados con borde celeste). Los fines de semana o días no hábiles están inhabilitados.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  
                  {/* Calendar Widget */}
                  <div className="bg-white/80 border border-black/[0.06] rounded-2xl p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                        {monthNames[month]} {year}
                      </span>
                      <div className="flex gap-1">
                        <button 
                          onClick={handlePrevMonth}
                          className="p-1.5 rounded-lg border border-black/[0.06] hover:bg-black/5 text-neutral-600"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={handleNextMonth}
                          className="p-1.5 rounded-lg border border-black/[0.06] hover:bg-black/5 text-neutral-600"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Weekday labels */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map(d => (
                        <span key={d} className="text-[10px] text-neutral-400 font-bold uppercase">{d}</span>
                      ))}
                    </div>

                    {/* Day grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day, idx) => {
                        if (!day) return <div key={`empty-${idx}`} />;
                        
                        const dayNum = day.getDate();
                        const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                        
                        // Disable past dates
                        const todayReset = new Date();
                        todayReset.setHours(0, 0, 0, 0);
                        const isPast = day < todayReset;

                        const dateStr = day.toISOString().split('T')[0];
                        const isSelected = selectedDateStr === dateStr;

                        const isSelectable = !isWeekend && !isPast;

                        return (
                          <button
                            key={`day-${dateStr}`}
                            disabled={!isSelectable}
                            onClick={() => {
                              setSelectedDateStr(dateStr);
                              setSelectedTime(null); // Reset time on date change
                            }}
                            className={`aspect-square rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                              isSelected 
                                ? 'bg-cyan-600 text-white border-cyan-500 shadow-md scale-105' 
                                : isSelectable 
                                  ? 'bg-cyan-50/50 border border-cyan-200/80 text-cyan-700 hover:bg-cyan-100 hover:border-cyan-300' 
                                  : 'text-neutral-300 border border-transparent opacity-40 cursor-not-allowed'
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots Area */}
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Horarios disponibles</h4>
                    
                    {!selectedDateStr ? (
                      <div className="h-[220px] flex items-center justify-center border border-dashed border-black/[0.08] rounded-2xl bg-black/[0.01] p-4 text-center">
                        <span className="text-xs text-neutral-400 font-light">Selecciona un día celeste en el calendario para ver los horarios disponibles.</span>
                      </div>
                    ) : timeSlots.length === 0 ? (
                      <div className="h-[220px] flex items-center justify-center border border-dashed border-red-200 rounded-2xl bg-red-50/30 p-4 text-center">
                        <span className="text-xs text-red-600 font-medium">No hay horarios libres en este día. Selecciona otra fecha.</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                        {timeSlots.map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`py-3 px-4 rounded-xl border text-xs font-bold text-center transition-all duration-300 ${
                                isSelected
                                  ? 'bg-cyan-600 border-cyan-500 text-white shadow-md'
                                  : 'bg-white/80 border-black/[0.06] hover:bg-black/5 hover:border-black/[0.12] text-neutral-700'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button 
                    onClick={() => { setStep(1); setSelectedTime(null); setSelectedDateStr(null); }}
                    className="px-5 py-3 border border-black/[0.1] text-neutral-700 font-semibold rounded-xl hover:bg-black/5 text-xs transition-colors"
                  >
                    Atrás
                  </button>
                  <button 
                    disabled={!selectedDateStr || !selectedTime}
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-neutral-950 text-white font-bold uppercase tracking-wider rounded-xl hover:bg-cyan-600 transition-colors shadow-md disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed text-xs flex items-center gap-2"
                  >
                    <span>Ingresar Datos</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Complete Details & Payment Gate Checkout */}
            {step === 3 && selectedSpecialty && (
              <motion.div 
                key="step3" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <button 
                    onClick={() => setStep(2)}
                    className="text-xs text-cyan-600 hover:underline mb-2 flex items-center gap-1 font-semibold"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Volver a fecha y hora</span>
                  </button>
                  <h3 className="font-serif text-2xl font-semibold text-neutral-900 mb-1">Tus Datos y Pago</h3>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed">
                    Completá tus datos de contacto. {settings.depositPercentage > 0 ? `Para bloquear la reserva, se requiere una seña del ${settings.depositPercentage}% ($${depositAmount.toLocaleString()})` : 'La reserva se confirmará automáticamente.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Form Info */}
                  <div className="md:col-span-6 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 border-b border-black/[0.04] pb-2">Datos personales</h4>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Nombre Completo</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          required
                          placeholder="Matias Gomez"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white border border-black/[0.12] focus:border-cyan-600 rounded-xl py-3 pl-10 pr-4 text-xs text-neutral-950 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">WhatsApp de contacto</label>
                      <div className="relative">
                        <Smartphone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                          type="tel" 
                          required
                          placeholder="+54 9 3855824408"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-white border border-black/[0.12] focus:border-cyan-600 rounded-xl py-3 pl-10 pr-4 text-xs text-neutral-950 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Cobertura Médica / Pago</label>
                      <select 
                        value={coverage}
                        onChange={(e) => setCoverage(e.target.value)}
                        className="w-full bg-white border border-black/[0.12] focus:border-cyan-600 rounded-xl py-3 px-4 text-xs text-neutral-950 outline-none transition-colors"
                      >
                        <option value="Particular">Particular (Efectivo/Mercado Pago)</option>
                        <option value="OSDE">OSDE 310/410</option>
                        <option value="Swiss Medical">Swiss Medical</option>
                        <option value="Galeno">Galeno Oro</option>
                        <option value="Medicus">Medicus Platinum</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Notas Adicionales (Motivo de consulta)</label>
                      <textarea 
                        rows={2}
                        placeholder="Ej: Dolor de hombro hace 2 semanas, primer control de rutina, etc."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-white border border-black/[0.12] focus:border-cyan-600 rounded-xl py-3 px-4 text-xs text-neutral-950 outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Right Column: Checkout Gateway */}
                  <div className="md:col-span-6">
                    <div className="bg-white/80 border border-black/[0.06] rounded-2xl p-5 shadow-sm space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 border-b border-black/[0.04] pb-2">Resumen de cobro</h4>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Consulta ({selectedSpecialty.name})</span>
                          <span className="font-bold text-neutral-800">${selectedSpecialty.price.toLocaleString('es-AR')}</span>
                        </div>
                        
                        {settings.depositPercentage > 0 && (
                          <>
                            <div className="flex justify-between border-t border-black/[0.04] pt-2">
                              <span className="text-neutral-500">Seña Requerida ({settings.depositPercentage}%)</span>
                              <span className="font-bold text-neutral-800">${depositAmount.toLocaleString('es-AR')}</span>
                            </div>
                            <div className="flex justify-between text-neutral-400 text-[10px]">
                              <span>Saldo a pagar en consultorio</span>
                              <span>${(selectedSpecialty.price - depositAmount).toLocaleString('es-AR')}</span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Payment simulator */}
                      {settings.depositPercentage > 0 ? (
                        <div className="pt-2 border-t border-black/[0.04] space-y-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Elegí Medio de Pago Simulado</span>
                          
                          <div className="flex bg-black/[0.02] border border-black/[0.06] rounded-xl p-1 gap-1">
                            <button 
                              type="button"
                              onClick={() => setPaymentMethod('mp')}
                              className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                                paymentMethod === 'mp' ? 'bg-cyan-600 text-white shadow-sm' : 'text-neutral-500'
                              }`}
                            >
                              <DollarSign className="w-3.5 h-3.5" />
                              <span>Mercado Pago</span>
                            </button>
                            <button 
                              type="button"
                              onClick={() => setPaymentMethod('card')}
                              className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                                paymentMethod === 'card' ? 'bg-cyan-600 text-white shadow-sm' : 'text-neutral-500'
                              }`}
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>Tarjeta</span>
                            </button>
                          </div>

                          <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                            {paymentMethod === 'mp' ? (
                              <div className="p-3 bg-[#e8f4fd]/50 border border-cyan-100 rounded-xl flex items-center gap-3">
                                <div className="w-14 h-14 bg-white border border-black/[0.08] p-1.5 rounded-lg shrink-0 flex items-center justify-center">
                                  {/* Simulated QR Code */}
                                  <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#333,#333_2px,#fff_2px,#fff_4px)] opacity-70" />
                                </div>
                                <div className="text-[10px] text-neutral-600 leading-tight">
                                  <span className="font-bold text-cyan-700 block">QR de Pago Rápido</span>
                                  Escanea o haz clic en confirmar para simular la acreditación instantánea con tu billetera digital.
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <input 
                                  type="text" 
                                  required
                                  maxLength={16}
                                  placeholder="Número de Tarjeta (Ficticio)"
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                                  className="w-full bg-white border border-black/[0.1] rounded-xl py-2 px-3 text-xs outline-none focus:border-cyan-600"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                  <input 
                                    type="text" 
                                    required
                                    placeholder="MM/AA"
                                    maxLength={5}
                                    value={cardExpiry}
                                    onChange={(e) => setCardExpiry(e.target.value)}
                                    className="w-full bg-white border border-black/[0.1] rounded-xl py-2 px-3 text-xs outline-none focus:border-cyan-600"
                                  />
                                  <input 
                                    type="text" 
                                    required
                                    placeholder="CVV"
                                    maxLength={3}
                                    value={cardCvv}
                                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                                    className="w-full bg-white border border-black/[0.1] rounded-xl py-2 px-3 text-xs outline-none focus:border-cyan-600"
                                  />
                                </div>
                              </div>
                            )}

                            <button 
                              type="submit"
                              disabled={!name || !phone || checkoutStep === 'paying'}
                              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:opacity-95 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {checkoutStep === 'paying' ? (
                                <>
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                  <span>Procesando Pago Ficticio...</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>Pagar Seña y Confirmar</span>
                                </>
                              )}
                            </button>
                          </form>
                        </div>
                      ) : (
                        // Booking directly without deposit
                        <div className="pt-2">
                          <button 
                            type="button"
                            onClick={() => {
                              if (!selectedSpecialty || !selectedDateStr || !selectedTime) return;
                              const dateStr = selectedDateStr;
                              const timeStr = selectedTime;
                              
                              // Simulate immediate booking
                              setCheckoutStep('paying');
                              setTimeout(() => {
                                const ticketNum = generateTicketNumber(selectedSpecialty.id);
                                setAssignedTicket(ticketNum);
                                
                                const newAppt: Appointment = {
                                  id: 'appt-' + Date.now(),
                                  clientName: sanitize(name),
                                  clientPhone: sanitize(phone),
                                  specialtyId: selectedSpecialty.id,
                                  date: dateStr,
                                  time: timeStr,
                                  coverage: coverage,
                                  status: 'pendiente',
                                  ticketNumber: ticketNum,
                                  price: selectedSpecialty.price
                                };

                                onAddAppointment(newAppt);
                                setCheckoutStep('success');
                                setStep(4);
                              }, 1500);
                            }}
                            disabled={!name || !phone || checkoutStep === 'paying'}
                            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:opacity-95 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {checkoutStep === 'paying' ? (
                              <>
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                  <span>Agendando...</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Confirmar Reserva Directa</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button 
                    disabled={checkoutStep === 'paying'}
                    onClick={() => setStep(2)}
                    className="px-5 py-3 border border-black/[0.1] text-neutral-700 font-semibold rounded-xl hover:bg-black/5 text-xs transition-colors"
                  >
                    Atrás
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Success Booking Screen */}
            {step === 4 && selectedSpecialty && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center py-6"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mb-6 shadow-sm">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <h3 className="font-serif text-2xl font-semibold text-neutral-900 mb-2">¡Turno Agendado con Éxito!</h3>
                <p className="text-neutral-500 text-xs font-light leading-relaxed max-w-md mb-8">
                  Felicitaciones <strong>{name}</strong>. Tu consulta ha quedado registrada. Se te asignó el identificador de fila <strong>{assignedTicket}</strong>.
                </p>

                {/* Grid details */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm bg-white border border-black/[0.06] rounded-2xl p-4 text-left shadow-xs mb-8 text-xs text-neutral-600">
                  <div>
                    <span className="font-semibold text-neutral-400 block uppercase text-[9px]">Especialidad</span>
                    <span className="text-neutral-800 font-bold">{selectedSpecialty.name}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-400 block uppercase text-[9px]">Profesional</span>
                    <span className="text-neutral-800 font-bold">{selectedSpecialty.professional}</span>
                  </div>
                  <div className="border-t border-black/[0.04] pt-2 mt-1">
                    <span className="font-semibold text-neutral-400 block uppercase text-[9px]">Día y Hora</span>
                    <span className="text-neutral-800 font-bold">{formattedSelectedDate} a las {selectedTime}</span>
                  </div>
                  <div className="border-t border-black/[0.04] pt-2 mt-1">
                    <span className="font-semibold text-neutral-400 block uppercase text-[9px]">Tu Ticket</span>
                    <span className="text-cyan-600 font-bold font-mono">{assignedTicket}</span>
                  </div>
                </div>

                {/* Simulated WhatsApp Notification Box */}
                <div className="w-full max-w-md rounded-2xl bg-emerald-50/20 border border-emerald-600/10 p-4 text-left shadow-inner">
                  <div className="flex items-center justify-between border-b border-emerald-900/10 pb-2 mb-2.5">
                    <span className="text-[9px] text-emerald-700 font-bold uppercase tracking-widest flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      WhatsApp Autómata Demo
                    </span>
                    <span className="text-[9px] text-neutral-400">Recién enviado</span>
                  </div>
                  <div className="p-3 bg-[#e7f6e7] rounded-xl rounded-tl-none border border-emerald-200/50 text-xs text-neutral-800 leading-relaxed">
                    <span className="font-bold text-emerald-700 block mb-1">NOTIFICACIÓN DE AGENDA</span>
                    {settings.whatsappTemplate
                      .replace('{nombre}', name)
                      .replace('{profesional}', selectedSpecialty.professional)
                      .replace('{especialidad}', selectedSpecialty.name)
                      .replace('{fecha}', formattedSelectedDate)
                      .replace('{hora}', selectedTime || '')
                      .replace('{link}', `crea.com/cancelar?id=${assignedTicket}`)}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button 
                    onClick={resetFlow}
                    className="px-5 py-2.5 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Agendar otro turno
                  </button>
                  <button 
                    onClick={() => {
                      // Automatically route to Admin dashboard to let the user see how it appears!
                      window.location.hash = '#booking';
                      const activeTabBtn = document.querySelectorAll('button');
                      activeTabBtn.forEach((b: any) => {
                        if (b.innerText.includes('Profesional')) {
                          b.click();
                        }
                      });
                    }}
                    className="px-5 py-2.5 border border-black/[0.1] text-neutral-700 hover:bg-black/5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Ir al panel Profesional &rarr;
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Dynamic Sidebar - Show Summary Info of the chosen state */}
        <div className="lg:col-span-4">
          <div className="bg-white/60 border border-black/[0.08] rounded-3xl p-5 shadow-xs flex flex-col gap-6 sticky top-24">
            
            <div className="border-b border-black/[0.06] pb-3">
              <span className="text-[9px] text-cyan-600 font-bold uppercase tracking-wider font-mono">Detalle del Servicio</span>
            </div>

            {selectedSpecialty ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selectedSpecialty.color} flex items-center justify-center text-white shrink-0`}>
                    {selectedSpecialty.iconName === 'nails' && <Sparkles className="w-4 h-4" />}
                    {selectedSpecialty.iconName === 'yoga' && <Star className="w-4 h-4" />}
                    {selectedSpecialty.iconName === 'therapy' && <CalendarDays className="w-4 h-4" />}
                    {selectedSpecialty.iconName === 'doctor' && <Laptop className="w-4 h-4" />}
                    {selectedSpecialty.iconName === 'kinesio' && <Users className="w-4 h-4" />}
                    {selectedSpecialty.iconName === 'music' && <Music className="w-4 h-4" />}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-800 leading-tight">{selectedSpecialty.name}</h5>
                    <span className="text-[10px] text-neutral-500">{selectedSpecialty.professional}</span>
                  </div>
                </div>

                <div className="space-y-2 border-t border-black/[0.04] pt-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Duración:</span>
                    <span className="font-bold text-neutral-800">{selectedSpecialty.duration} Minutos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Formato:</span>
                    <span className="font-bold text-neutral-800">Presencial o Meet</span>
                  </div>

                  {selectedDateStr && (
                    <div className="flex justify-between border-t border-black/[0.04] pt-2">
                      <span className="text-neutral-500">Fecha elegida:</span>
                      <span className="font-bold text-neutral-800">{formattedSelectedDate}</span>
                    </div>
                  )}

                  {selectedTime && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Horario:</span>
                      <span className="font-bold text-cyan-600">{selectedTime}</span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 bg-black/[0.02] border border-black/[0.05] rounded-xl text-[10px] text-neutral-500 leading-relaxed flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                  <span>Tu reserva se integrará bidireccionalmente con la agenda. Se enviará un recordatorio automático 24hs antes.</span>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-neutral-400 text-xs font-light">
                Ningún servicio seleccionado actualmente.
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// VIEW 2: PROFESSIONAL DASHBOARD (ADMIN PANEL)
// ============================================================================

interface AdminProps {
  specialties: Specialty[];
  settings: TurneroSettings;
  appointments: Appointment[];
  calledTicket: any;
  onUpdateAppointments: (appts: Appointment[]) => void;
  onUpdateSettings: (settings: TurneroSettings) => void;
  onCallTicket: (appt: Appointment, box: string) => void;
}

function ProfessionalDashboard({ 
  specialties, settings, appointments, calledTicket, 
  onUpdateAppointments, onUpdateSettings, onCallTicket 
}: AdminProps) {
  
  const [adminTab, setAdminTab] = useState<'agenda' | 'settings'>('agenda');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Settings Form States
  const [startTime, setStartTime] = useState(settings.startTime);
  const [endTime, setEndTime] = useState(settings.endTime);
  const [interval, setInterval] = useState(settings.intervalMinutes);
  const [deposit, setDeposit] = useState(settings.depositPercentage);
  const [whatsapp, setWhatsapp] = useState(settings.whatsappTemplate);
  const [boxName, setBoxName] = useState('');
  const [boxes, setBoxes] = useState<string[]>(settings.boxes);

  // Manual booking states
  const [isManualBookingOpen, setIsManualBookingOpen] = useState(false);
  const [mName, setMName] = useState('');
  const [mPhone, setMPhone] = useState('');
  const [mSpecialty, setMSpecialty] = useState(specialties[0].id);
  const [mDate, setMDate] = useState(new Date().toISOString().split('T')[0]);
  const [mTime, setMTime] = useState('09:00 hs');
  const [mCoverage, setMCoverage] = useState('Particular');

  // Trigger Box selection modal when calling a ticket
  const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);
  const [selectedApptForCall, setSelectedApptForCall] = useState<Appointment | null>(null);

  // Stats calculation
  const todayStr = new Date().toISOString().split('T')[0];

  const stats = useMemo(() => {
    const todayAppts = appointments.filter(a => a.date === todayStr && a.status !== 'cancelado');
    const completed = appointments.filter(a => a.status === 'asistio');
    const absent = appointments.filter(a => a.status === 'ausente');
    const activeAppts = appointments.filter(a => a.status !== 'cancelado');
    
    const totalRevenue = appointments
      .filter(a => a.status !== 'cancelado' && a.status !== 'ausente')
      .reduce((sum, item) => sum + item.price, 0);

    const totalExpectedToday = todayAppts.reduce((sum, item) => sum + item.price, 0);

    const assistanceRate = completed.length + absent.length > 0
      ? Math.round((completed.length / (completed.length + absent.length)) * 100)
      : 100;

    const waitingCount = todayAppts.filter(a => a.status === 'pendiente').length;

    return {
      todayCount: todayAppts.length,
      waitingCount,
      revenue: totalRevenue,
      todayRevenue: totalExpectedToday,
      rate: assistanceRate
    };
  }, [appointments, todayStr]);

  // Filtered Appointments list
  const filteredAppointments = useMemo(() => {
    return appointments.filter(a => {
      const matchesSearch = a.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            a.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = filterSpecialty === 'all' || a.specialtyId === filterSpecialty;
      const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
      return matchesSearch && matchesSpecialty && matchesStatus;
    }).sort((a, b) => {
      // Sort chronologically: Date first, then time
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.time.localeCompare(b.time);
    });
  }, [appointments, searchTerm, filterSpecialty, filterStatus]);

  // Handle status update
  const updateStatus = (id: string, newStatus: 'pendiente' | 'asistio' | 'ausente' | 'cancelado') => {
    const updated = appointments.map(a => 
      a.id === id ? { ...a, status: newStatus } : a
    );
    onUpdateAppointments(updated);
  };

  // Handle manual booking submit
  const handleManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const spec = specialties.find(s => s.id === mSpecialty);
    if (!spec) return;

    // Get prefix
    const prefix = spec.id.substring(0, 1).toUpperCase();
    const count = appointments.filter(a => a.specialtyId === spec.id).length + 1;
    const ticketNum = `${prefix}-${count.toString().padStart(2, '0')}`;

    const newAppt: Appointment = {
      id: 'appt-' + Date.now(),
      clientName: mName,
      clientPhone: mPhone,
      specialtyId: mSpecialty,
      date: mDate,
      time: mTime,
      coverage: mCoverage,
      status: 'pendiente',
      ticketNumber: ticketNum,
      price: spec.price
    };

    onUpdateAppointments([...appointments, newAppt]);
    setIsManualBookingOpen(false);
    // Reset inputs
    setMName('');
    setMPhone('');
  };

  // Delete appointment
  const deleteAppt = (id: string) => {
    if (confirm("¿Seguro que deseas eliminar permanentemente este turno de la base de datos?")) {
      const updated = appointments.filter(a => a.id !== id);
      onUpdateAppointments(updated);
    }
  };

  // Save Config Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      startTime,
      endTime,
      intervalMinutes: Number(interval),
      depositPercentage: Number(deposit),
      whatsappTemplate: whatsapp,
      boxes
    });
    alert("¡Configuración guardada exitosamente!");
  };

  // Box modifications
  const addBox = () => {
    if (boxName.trim() && !boxes.includes(boxName.trim())) {
      const updated = [...boxes, boxName.trim()];
      setBoxes(updated);
      setBoxName('');
    }
  };

  const removeBox = (bName: string) => {
    const updated = boxes.filter(b => b !== bName);
    setBoxes(updated);
  };

  // Export Agenda Simulation
  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appointments, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `agenda_crea_${todayStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full text-left space-y-8 font-sans">
      
      {/* Admin Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.06] pb-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-neutral-900">Panel de Control de Agenda</h3>
          <p className="text-neutral-500 text-xs font-light">Gestión de turnos agendados por clientes y configuración operativa del turnero.</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setAdminTab('agenda')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              adminTab === 'agenda' ? 'bg-neutral-950 text-white shadow-sm' : 'bg-black/5 text-neutral-600 hover:bg-black/10'
            }`}
          >
            Agenda Completa
          </button>
          <button 
            onClick={() => setAdminTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              adminTab === 'settings' ? 'bg-neutral-950 text-white shadow-sm' : 'bg-black/5 text-neutral-600 hover:bg-black/10'
            }`}
          >
            Configuración Turnero
          </button>
        </div>
      </div>

      {adminTab === 'agenda' ? (
        <>
          {/* Dashboard KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 bg-white border border-black/[0.06] rounded-2xl shadow-xs">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Turnos de Hoy</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-neutral-950">{stats.todayCount}</span>
                <span className="text-[10px] text-neutral-400 font-medium">reserva(s)</span>
              </div>
            </div>

            <div className="p-4 bg-white border border-black/[0.06] rounded-2xl shadow-xs">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">En Espera (Hoy)</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-cyan-600">{stats.waitingCount}</span>
                <span className="text-[10px] text-neutral-400 font-medium">paciente(s)</span>
              </div>
            </div>

            <div className="p-4 bg-white border border-black/[0.06] rounded-2xl shadow-xs">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Facturación Acumulada</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[10px] text-neutral-400">$</span>
                <span className="text-2xl font-bold text-emerald-600">{stats.revenue.toLocaleString('es-AR')}</span>
              </div>
            </div>

            <div className="p-4 bg-white border border-black/[0.06] rounded-2xl shadow-xs">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Tasa de Asistencia</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-purple-600">{stats.rate}%</span>
                <span className="text-[10px] text-neutral-400 font-medium">asistencia</span>
              </div>
            </div>

          </div>

          {/* Filters, Actions and List */}
          <div className="bg-white border border-black/[0.06] rounded-3xl p-6 shadow-sm space-y-4">
            
            {/* Filter controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex flex-1 flex-wrap items-center gap-3">
                
                {/* Search Bar */}
                <div className="relative min-w-[200px] flex-1 md:flex-none">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text"
                    placeholder="Buscar por nombre o ticket..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/[0.02] border border-black/[0.08] focus:border-cyan-600 rounded-xl py-2 pl-9 pr-4 text-xs outline-none transition-colors"
                  />
                </div>

                {/* Specialty filter */}
                <select
                  value={filterSpecialty}
                  onChange={(e) => setFilterSpecialty(e.target.value)}
                  className="bg-black/[0.02] border border-black/[0.08] rounded-xl py-2 px-3 text-xs outline-none focus:border-cyan-600"
                >
                  <option value="all">Todas las Especialidades</option>
                  {specialties.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>

                {/* Status filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-black/[0.02] border border-black/[0.08] rounded-xl py-2 px-3 text-xs outline-none focus:border-cyan-600"
                >
                  <option value="all">Todos los Estados</option>
                  <option value="pendiente">Pendientes</option>
                  <option value="asistio">Asistieron</option>
                  <option value="ausente">Ausentes</option>
                  <option value="cancelado">Cancelados</option>
                </select>
              </div>

              {/* Action triggers */}
              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={exportData}
                  className="p-2 border border-black/[0.08] hover:bg-black/5 rounded-xl text-neutral-600 text-xs flex items-center gap-1.5 font-bold transition-all"
                  title="Exportar base en JSON"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Exportar</span>
                </button>
                <button 
                  onClick={() => setIsManualBookingOpen(true)}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold hover:bg-cyan-700 transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Cargar Turno</span>
                </button>
              </div>

            </div>

            {/* Called ticket feedback indicator (realtime sync warning) */}
            {calledTicket && (
              <div className="bg-cyan-50/50 border border-cyan-200/50 rounded-xl p-3 text-xs text-cyan-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cyan-600 animate-bounce" />
                  <span>Último turno llamado en Sala de Espera: <strong>{calledTicket.ticketNumber} ({calledTicket.clientName})</strong> en el <strong>{calledTicket.box}</strong>.</span>
                </div>
                <span className="text-[10px] text-cyan-600 font-mono">Hace {Math.max(0, Math.round((Date.now() - calledTicket.timestamp) / 1000))}s</span>
              </div>
            )}

            {/* List Table */}
            <div className="border border-black/[0.06] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-black/[0.02] border-b border-black/[0.06] text-neutral-400 font-bold uppercase text-[9px]">
                      <th className="p-3">Ticket</th>
                      <th className="p-3">Paciente / WhatsApp</th>
                      <th className="p-3">Especialidad</th>
                      <th className="p-3">Fecha y Hora</th>
                      <th className="p-3">Cobertura</th>
                      <th className="p-3">Estado</th>
                      <th className="p-3 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-neutral-400 font-light">
                          No se encontraron turnos con los filtros actuales.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((appt) => {
                        const spec = specialties.find(s => s.id === appt.specialtyId);
                        
                        // Formatear fecha a legible dd/mm/yyyy
                        const [y, m, d] = appt.date.split('-');
                        const dateFormatted = `${d}/${m}/${y}`;
                        
                        // Check if today
                        const isToday = appt.date === todayStr;

                        return (
                          <tr 
                            key={appt.id} 
                            className={`border-b border-black/[0.04] hover:bg-black/[0.01] transition-colors ${
                              isToday ? 'bg-cyan-50/10' : ''
                            }`}
                          >
                            <td className="p-3 font-mono font-bold text-cyan-600">
                              {appt.ticketNumber}
                            </td>
                            <td className="p-3">
                              <span className="font-bold text-neutral-800 block">{appt.clientName}</span>
                              <span className="text-neutral-400 text-[10px]">{appt.clientPhone}</span>
                            </td>
                            <td className="p-3 font-medium text-neutral-700">
                              {spec ? spec.name : 'Consulta'}
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className={`px-1.5 py-0.5 rounded font-bold text-[9px] mr-1.5 ${
                                isToday ? 'bg-cyan-100 text-cyan-800' : 'bg-neutral-100 text-neutral-600'
                              }`}>
                                {isToday ? 'Hoy' : dateFormatted}
                              </span>
                              <span className="font-bold text-neutral-800">{appt.time}</span>
                            </td>
                            <td className="p-3 text-neutral-600">
                              {appt.coverage}
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                                appt.status === 'pendiente' ? 'bg-yellow-50 border border-yellow-200 text-yellow-700' :
                                appt.status === 'asistio' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' :
                                appt.status === 'ausente' ? 'bg-red-50 border border-red-200 text-red-700' :
                                'bg-neutral-50 border border-neutral-200 text-neutral-400'
                              }`}>
                                {appt.status}
                              </span>
                              {appt.calledBox && (
                                <span className="text-[9.5px] text-cyan-600 font-bold block mt-1">Llamado: {appt.calledBox}</span>
                              )}
                            </td>
                            <td className="p-3 flex items-center justify-center gap-1.5 h-full">
                              
                              {/* Call Ticket to Screen (Only if today & pending/asistio) */}
                              {isToday && appt.status !== 'cancelado' && (
                                <button
                                  onClick={() => {
                                    setSelectedApptForCall(appt);
                                    setIsBoxModalOpen(true);
                                  }}
                                  className="p-1 px-2.5 bg-cyan-600/10 text-cyan-700 border border-cyan-300/30 hover:bg-cyan-600 hover:text-white rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-1"
                                  title="Llamar a Pantalla de Espera"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                  <span>Llamar</span>
                                </button>
                              )}

                              {/* Status update drop trigger */}
                              <select
                                value={appt.status}
                                onChange={(e) => updateStatus(appt.id, e.target.value as any)}
                                className="bg-black/[0.02] border border-black/[0.08] rounded-lg py-1 px-1.5 text-[10px] outline-none"
                              >
                                <option value="pendiente">Pendiente</option>
                                <option value="asistio">Asistió</option>
                                <option value="ausente">Ausente</option>
                                <option value="cancelado">Cancelado</option>
                              </select>

                              {/* Delete */}
                              <button 
                                onClick={() => deleteAppt(appt.id)}
                                className="p-1 text-red-500 hover:bg-red-50 hover:text-red-700 border border-transparent hover:border-red-200 rounded-lg transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>

                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </>
      ) : (
        /* ==================== CONFIGURATION TAB ==================== */
        <form onSubmit={handleSaveSettings} className="bg-white border border-black/[0.06] rounded-3xl p-6 shadow-sm space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Hours settings */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 border-b border-black/[0.04] pb-2">Límites de Jornada</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-400">Hora Apertura</label>
                  <input 
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-black/[0.02] border border-black/[0.08] focus:border-cyan-600 rounded-xl py-2 px-3 text-xs outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-400">Hora Cierre</label>
                  <input 
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-black/[0.02] border border-black/[0.08] focus:border-cyan-600 rounded-xl py-2 px-3 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-400">Intervalo de turnos</label>
                  <select
                    value={interval}
                    onChange={(e) => setInterval(Number(e.target.value))}
                    className="w-full bg-black/[0.02] border border-black/[0.08] focus:border-cyan-600 rounded-xl py-2 px-3 text-xs outline-none"
                  >
                    <option value="15">Cada 15 minutos</option>
                    <option value="30">Cada 30 minutos</option>
                    <option value="45">Cada 45 minutos</option>
                    <option value="60">Cada 60 minutos</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-400">Porcentaje de Seña / Pago</label>
                  <select
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    className="w-full bg-black/[0.02] border border-black/[0.08] focus:border-cyan-600 rounded-xl py-2 px-3 text-xs outline-none"
                  >
                    <option value="0">Sin seña (Gratuito/Directo)</option>
                    <option value="20">20% de seña obligatoria</option>
                    <option value="50">50% de seña obligatoria</option>
                    <option value="100">100% cobro total adelantado</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Boxes & waiting room settings */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 border-b border-black/[0.04] pb-2">Consultorios / Boxes Habilitados</h4>
              
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Ej: Consultorio C"
                  value={boxName}
                  onChange={(e) => setBoxName(e.target.value)}
                  className="flex-1 bg-black/[0.02] border border-black/[0.08] focus:border-cyan-600 rounded-xl py-2 px-3 text-xs outline-none"
                />
                <button 
                  type="button"
                  onClick={addBox}
                  className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-cyan-600 transition-colors"
                >
                  Agregar
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {boxes.map(b => (
                  <span 
                    key={b} 
                    className="inline-flex items-center gap-1.5 py-1 px-3 bg-black/5 border border-black/[0.06] rounded-full text-xs font-semibold text-neutral-700"
                  >
                    <span>{b}</span>
                    <button 
                      type="button" 
                      onClick={() => removeBox(b)}
                      className="text-red-500 hover:text-red-700 font-bold ml-1"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* WhatsApp SMS template settings */}
          <div className="space-y-2 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 border-b border-black/[0.04] pb-2">Plantilla Notificación WhatsApp (Simulador)</h4>
            <textarea 
              rows={3}
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full bg-black/[0.02] border border-black/[0.08] focus:border-cyan-600 rounded-xl py-3 px-4 text-xs text-neutral-950 outline-none resize-none font-sans"
            />
            <div className="text-[10px] text-neutral-400 font-light leading-relaxed">
              Puedes utilizar etiquetas dinámicas que se reemplazarán automáticamente: <code>{`{nombre}`}</code>, <code>{`{profesional}`}</code>, <code>{`{especialidad}`}</code>, <code>{`{fecha}`}</code>, <code>{`{hora}`}</code>, <code>{`{link}`}</code>.
            </div>
          </div>

          <button 
            type="submit"
            className="px-6 py-3 bg-cyan-600 text-white font-bold uppercase tracking-wider rounded-xl hover:bg-cyan-700 transition-colors shadow-sm text-xs"
          >
            Guardar Configuración General
          </button>
        </form>
      )}

      {/* MODAL 1: Select Box for Calling Ticket */}
      {isBoxModalOpen && selectedApptForCall && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm bg-white rounded-3xl border border-black/[0.08] p-6 shadow-2xl relative"
          >
            <h4 className="font-serif text-lg font-bold text-neutral-900 mb-2">Llamar Paciente</h4>
            <p className="text-neutral-500 text-xs font-light mb-4">
              Selecciona a qué Box o Consultorio deseas citar al paciente <strong>{selectedApptForCall.clientName}</strong> (Turno {selectedApptForCall.ticketNumber}).
            </p>

            <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
              {boxes.map((box) => (
                <button
                  key={box}
                  onClick={() => {
                    onCallTicket(selectedApptForCall, box);
                    setIsBoxModalOpen(false);
                  }}
                  className="w-full py-3 px-4 bg-black/[0.02] hover:bg-cyan-600 hover:text-white border border-black/[0.06] rounded-xl text-xs font-bold text-neutral-700 text-center transition-all"
                >
                  {box}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsBoxModalOpen(false)}
              className="w-full mt-4 py-2 border border-black/[0.1] hover:bg-black/5 text-neutral-500 font-semibold rounded-xl text-xs transition-colors"
            >
              Cancelar
            </button>
          </motion.div>
        </div>
      )}

      {/* MODAL 2: Add Manual Walk-in/Phone Appointment */}
      {isManualBookingOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-3xl border border-black/[0.08] p-6 shadow-2xl relative"
          >
            <h4 className="font-serif text-lg font-bold text-neutral-900 mb-4">Cargar Turno Manualmente</h4>
            
            <form onSubmit={handleManualBooking} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-neutral-400">Nombre Paciente</label>
                <input 
                  type="text" 
                  required
                  placeholder="Juan Gomez"
                  value={mName}
                  onChange={(e) => setMName(e.target.value)}
                  className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl py-2 px-3 text-xs outline-none focus:border-cyan-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-400">WhatsApp</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+54 9..."
                    value={mPhone}
                    onChange={(e) => setMPhone(e.target.value)}
                    className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl py-2 px-3 text-xs outline-none focus:border-cyan-600"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-400">Cobertura</label>
                  <input 
                    type="text" 
                    placeholder="OSDE, Particular..."
                    value={mCoverage}
                    onChange={(e) => setMCoverage(e.target.value)}
                    className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl py-2 px-3 text-xs outline-none focus:border-cyan-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-neutral-400">Especialidad / Profesional</label>
                <select
                  value={mSpecialty}
                  onChange={(e) => setMSpecialty(e.target.value)}
                  className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-600"
                >
                  {specialties.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.professional})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-400">Fecha</label>
                  <input 
                    type="date" 
                    required
                    value={mDate}
                    onChange={(e) => setMDate(e.target.value)}
                    className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl py-2 px-3 text-xs outline-none focus:border-cyan-600"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-400">Horario</label>
                  <select
                    value={mTime}
                    onChange={(e) => setMTime(e.target.value)}
                    className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-600"
                  >
                    {["09:00 hs", "09:30 hs", "10:00 hs", "10:30 hs", "11:00 hs", "11:30 hs", "12:00 hs", "12:30 hs", "14:00 hs", "14:30 hs", "15:00 hs", "15:30 hs", "16:00 hs", "16:30 hs", "17:00 hs", "17:30 hs"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsManualBookingOpen(false)}
                  className="flex-1 py-3 border border-black/[0.1] hover:bg-black/5 text-neutral-500 font-semibold rounded-xl text-xs transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-cyan-600 text-white font-bold uppercase tracking-wider rounded-xl text-xs hover:bg-cyan-700 transition-colors shadow-sm"
                >
                  Guardar Turno
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}

// ============================================================================
// VIEW 3: WAITING ROOM TV QUEUE SCREEN
// ============================================================================

interface TVProps {
  calledTicket: any;
  appointments: Appointment[];
  specialties: Specialty[];
}

function WaitingRoomTV({ calledTicket, appointments, specialties }: TVProps) {
  const [tickerTime, setTickerTime] = useState('');

  // Clock
  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      setTickerTime(d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // History list (called tickets, sorted by timestamp descending, except the active one)
  const callHistory = useMemo(() => {
    // Generate history from appointments that have a calledBox assigned
    const todayStr = new Date().toISOString().split('T')[0];
    return appointments
      .filter(a => a.date === todayStr && a.calledBox && a.id !== calledTicket?.id)
      .map(a => {
        const spec = specialties.find(s => s.id === a.specialtyId);
        return {
          id: a.id,
          ticketNumber: a.ticketNumber,
          clientName: a.clientName,
          box: a.calledBox,
          specialtyName: spec ? spec.name : 'Consulta'
        };
      })
      .reverse() // latest first
      .slice(0, 3);
  }, [appointments, calledTicket]);

  return (
    <div className="w-full flex flex-col font-sans text-left min-h-[500px] select-none">
      
      {/* TV Header Banner */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-6 mb-8 z-10">
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          <span className="font-mono text-sm tracking-widest text-neutral-300 uppercase font-bold">Estudio Crea - Sala de Espera</span>
        </div>

        {/* Ticker Date & Time */}
        <div className="flex items-center gap-4 text-xs font-mono font-bold text-neutral-400">
          <span>{new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
          <span className="text-cyan-400 text-sm tracking-wider">{tickerTime || '--:--:--'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch z-10 flex-1">
        
        {/* Main Display: Active Called Ticket */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-8 bg-neutral-900/40 border border-neutral-800 rounded-2xl shadow-inner text-center relative overflow-hidden min-h-[320px]">
          
          {/* Animated Background Pulse Ripple */}
          <AnimatePresence mode="wait">
            {calledTicket && (
              <motion.div 
                key={`ripple-${calledTicket.timestamp}`}
                initial={{ scale: 0.8, opacity: 0.4 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: 2, ease: "easeOut" }}
                className="absolute w-[200px] h-[200px] rounded-full border border-cyan-500/20 pointer-events-none"
              />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {calledTicket ? (
              <motion.div
                key={calledTicket.timestamp}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="space-y-6 flex flex-col items-center w-full"
              >
                <div>
                  <span className="px-4 py-1.5 rounded-full bg-cyan-950 border border-cyan-800/50 text-[10px] font-bold text-cyan-400 uppercase tracking-widest block w-max mx-auto shadow-[0_0_12px_rgba(6,182,212,0.15)] mb-4 animate-pulse">
                    Llamando a sala
                  </span>
                  <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">{calledTicket.specialtyName}</h4>
                </div>

                <div className="space-y-1">
                  {/* Huge ticket number */}
                  <span className="font-mono text-7xl md:text-8xl font-black text-white tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] block">
                    {calledTicket.ticketNumber}
                  </span>
                  
                  {/* Client name hidden for privacy or stylized */}
                  <span className="text-xl font-medium text-neutral-300 block italic">
                    {calledTicket.clientName}
                  </span>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 w-full max-w-xs">
                  <span className="text-neutral-500 text-xs font-bold uppercase tracking-wider block">Dirigirse a</span>
                  <span className="text-3xl font-black text-cyan-400 font-mono tracking-wide mt-1 block uppercase">
                    {calledTicket.box}
                  </span>
                </div>
              </motion.div>
            ) : (
              <div className="text-neutral-500 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-neutral-600" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-bold text-neutral-400">Sin Llamadas Activas</span>
                  <p className="text-[11px] font-light text-neutral-500 leading-relaxed max-w-xs">
                    Cuando el profesional haga clic en "Llamar" desde el Dashboard, el ticket aparecerá aquí con sonido y animación.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar: Historical Called Queue */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="bg-neutral-900/20 border border-neutral-800 rounded-2xl p-5 shadow-inner h-full flex flex-col">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest border-b border-neutral-800 pb-3 block mb-4">
              Llamados Recientes
            </span>

            <div className="flex-1 flex flex-col gap-3 justify-start">
              {callHistory.length === 0 ? (
                <div className="py-12 text-center text-neutral-600 text-xs font-light">
                  Aún no se llamaron turnos hoy.
                </div>
              ) : (
                callHistory.map((hist, idx) => (
                  <div 
                    key={`${hist.id}-${idx}`}
                    className="p-3 bg-neutral-900/50 border border-neutral-800/60 rounded-xl flex items-center justify-between shadow-2xs hover:border-neutral-800 transition-all duration-300"
                  >
                    <div>
                      <span className="font-mono text-lg font-black text-neutral-300">{hist.ticketNumber}</span>
                      <span className="text-[10px] text-neutral-500 block truncate max-w-[120px]">{hist.clientName}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-cyan-400/80 block uppercase leading-none">{hist.box}</span>
                      <span className="text-[8.5px] text-neutral-500 block mt-1 leading-none truncate max-w-[100px]">{hist.specialtyName}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3.5 bg-neutral-900/80 border border-neutral-800 rounded-xl text-[10px] text-neutral-500 leading-relaxed flex items-start gap-2.5 mt-4">
              <Volume2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
              <span>Esta vista simula un monitor en sala de espera. Puedes abrir el panel del Profesional en otra ventana para probar el llamado instantáneo.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// VIEW 4: EMBED CODE PANEL
// ============================================================================
function EmbedCodePanel() {
  const [copiedCode, setCopiedCode] = useState(false);

  const copyEmbedCode = () => {
    const code = `<!-- Estudio Crea Turnero Widget Integration -->
<div class="estudio-crea-widget" style="width:100%;height:650px;border-radius:24px;overflow:hidden;background:#050505;">
  <iframe 
    src="https://calendly.com/estudiocrea2026/30min?month=2026-06" 
    width="100%" 
    height="100%" 
  ></iframe>
</div>`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between text-left bg-white/60 border border-black/[0.08] rounded-3xl p-6 md:p-8 shadow-xs">
      <div>
        <h4 className="font-serif text-xl font-medium text-neutral-900 mb-2">Incrustar Turnero Real</h4>
        <p className="text-neutral-600 text-xs font-light leading-relaxed mb-6 font-sans">
          Este componente digital está diseñado de forma modular. Para integrar tu agenda nativa de <strong>Calendly</strong> o <strong>TidyCal</strong>, copia el código de abajo y pégalo directamente en la sección del widget de tu página.
        </p>
      </div>

<div className="bg-neutral-900 p-4 rounded-xl border border-black/[0.15] text-left relative group">
        <pre className="text-[11px] font-mono text-neutral-200 overflow-x-auto whitespace-pre leading-relaxed select-all max-h-[160px] pb-2">
          {`<!-- Estudio Crea Turnero Widget Integration -->
<div class="estudio-crea-widget" style="width:100%;height:650px;border-radius:24px;overflow:hidden;background:#050505;">
  <iframe 
    src="https://calendly.com/tu-30min/reunion-diagnostica" 
    width="100%" 
    height="100%" 
    frameborder="0"
    style="border:none;"
  ></iframe>
</div>`}
        </pre>
        
        <button 
          onClick={copyEmbedCode}
          className="absolute top-3 right-3 bg-white/10 border border-white/20 hover:bg-cyan-500 hover:text-neutral-900 text-white hover:border-cyan-400 p-2 rounded-lg transition-all duration-300 cursor-pointer"
          title="Copy Code"
        >
          {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="text-[11px] text-neutral-500 font-light mt-4 flex items-center gap-2 font-sans">
        <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
        <span>El contenedor tiene soporte responsive pre-optimizado y control de scroll nativo desactivado para evitar interrupciones de navegación.</span>
      </div>
    </div>
  );
}
