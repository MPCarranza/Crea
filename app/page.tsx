'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Coins, 
  Menu, 
  X, 
  CalendarCheck2, 
  Smartphone,
  ChevronRight,
  User,
  Building,
  Check,
  Send,
  Sliders,
  Copy,
  Laptop
} from 'lucide-react';

// Reusable Spotlight Glass Card component to create the high-end Vercel/Linear cursor-following glow
interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ 
  children, 
  className = "", 
  glowColor = "rgba(34, 211, 238, 0.12)", // Elegant cyan glow
  ...props 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] transition-all duration-500 hover:border-white/[0.15] ${className}`}
      {...props}
    >
      <div 
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${glowColor}, transparent 80%)`
        }}
      />
      <div 
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.12)',
          maskImage: `radial-gradient(130px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)`
        }}
      />
      {children}
    </div>
  );
};

// Data Interfaces
interface PainPoint {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  stat: string;
}

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  glowColor: string;
}

export default function Home() {
  // State variables for interactive sections
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPain, setSelectedPain] = useState<string>('pain-1');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Custom Pricing Calculator State
  const [includePayments, setIncludePayments] = useState(false);
  const [includeChatbot, setIncludeChatbot] = useState(false);
  const [includeMultiProfessional, setIncludeMultiProfessional] = useState(false);

  // Custom Booking Flow Demo State
  const [bookingTab, setBookingTab] = useState<'demo' | 'embed'>('demo');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);
  const [copiedCode, setCopiedCode] = useState(false);

  // Booking Form Fields
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    phone: '',
  });

  // Track scroll position for navbar shrinking and active links highlight
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'pain', 'solution', 'pricing', 'booking'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Pain points updated with the new commercial strategy diagnostics
  const painPoints: PainPoint[] = [
    {
      id: 'pain-1',
      icon: <MessageSquare className="w-6 h-6 text-cyan-400" />,
      title: 'Disponibilidad Asincrónica',
      subtitle: 'El drenaje silencioso de tu tiempo',
      description: 'Pasar horas respondiendo precios, ubicaciones u horarios por mensajería quita energía que podrías usar en tu trabajo real o en tu descanso.',
      stat: 'Docenas de mensajes repetitivos diarios'
    },
    {
      id: 'pain-2',
      icon: <Laptop className="w-6 h-6 text-purple-400" />,
      title: 'Visibilidad Propia',
      subtitle: 'La trampa de las redes sociales',
      description: 'No tener un espacio propio en internet hace que dependas al 100% de los cambios de algoritmo de las redes sociales para que la gente te encuentre.',
      stat: 'Dependencia inestable de plataformas externas'
    }
  ];

  // Benefits data
  const benefits: Benefit[] = [
    {
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: 'Sincronización en Tiempo Real',
      description: 'Conexión bidireccional directa con Google Calendar o Outlook. Tus pacientes solo ven los baches disponibles reales, evitando superposiciones accidentales.',
      tag: 'Cero fricciones',
      glowColor: 'rgba(34, 211, 238, 0.12)'
    },
    {
      icon: <CalendarCheck2 className="w-6 h-6 text-purple-400" />,
      title: 'Confirmaciones Automáticas',
      description: 'Envío automático de notificaciones por WhatsApp o email 24 horas antes del turno. Los pacientes confirman o cancelan con un clic, liberando la agenda a tiempo.',
      tag: '99% de asistencia',
      glowColor: 'rgba(168, 85, 247, 0.12)'
    },
    {
      icon: <Coins className="w-6 h-6 text-emerald-400" />,
      title: 'Seña Previa Opcional',
      description: 'Permite cobrar el total o una seña de la consulta a través de Mercado Pago o Stripe antes de confirmar la reserva. Asegura el compromiso financiero desde el primer minuto.',
      tag: 'Seguridad de cobro',
      glowColor: 'rgba(16, 185, 129, 0.12)'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
      title: 'Diseño e Identidad Premium',
      description: 'No es una plataforma genérica. Tu marca, tus colores y tu estética reflejados en una web fluida de nivel internacional que eleva tu posicionamiento como profesional.',
      tag: 'Alta gama',
      glowColor: 'rgba(99, 102, 241, 0.12)'
    }
  ];

  // Mock Calendar Available Dates (Indices of the 28-day grid)
  const availableDates = [4, 5, 11, 12, 18, 19, 25, 26];
  const availableTimes = ['09:30 hs', '11:00 hs', '14:30 hs', '16:00 hs', '17:30 hs'];

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

  // Form Submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.specialty && formData.phone) {
      setBookingStep(4);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070707] text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      
      {/* 1. ULTRA-PREMIUM GRID & NOISE ANALOG TEXTURE */}
      <div className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden">
        {/* Subtle grid line backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80" />
        
        {/* SVG Noise filter for a graphite, premium textured paper look */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.015]" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* BACKGROUND GLOWING ORBS (FLUID MOTION ABSTRACTIONS) */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden z-0">
        {/* Cyan electric orb */}
        <motion.div 
          animate={{
            x: [0, 80, -50, 0],
            y: [0, -100, 60, 0],
            scale: [1, 1.2, 0.85, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-cyan-500/10 blur-[130px] mix-blend-screen"
        />
        
        {/* Indigo dynamic orb */}
        <motion.div 
          animate={{
            x: [0, -90, 70, 0],
            y: [0, 110, -80, 0],
            scale: [1, 0.85, 1.15, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -right-40 w-[700px] h-[700px] rounded-full bg-indigo-500/10 blur-[150px] mix-blend-screen"
        />

        {/* Gentle magenta center accent */}
        <motion.div 
          animate={{
            scale: [0.85, 1.1, 0.85],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/3 left-1/4 w-[550px] h-[550px] rounded-full bg-purple-500/5 blur-[140px] mix-blend-screen"
        />
      </div>

      {/* FIXED NAVIGATION BAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-4 bg-[#070707]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.6)]' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo with elegant editorial typeface */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <span className="font-serif text-2xl font-semibold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
              Estudio Crea
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse mt-2" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/[0.02] border border-white/[0.05] p-1 rounded-full backdrop-blur-md">
            <a 
              href="#pain" 
              className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === 'pain' 
                  ? 'bg-white/10 text-white border border-white/10 shadow-lg' 
                  : 'text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              Fricciones
            </a>
            <a 
              href="#solution" 
              className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === 'solution' 
                  ? 'bg-white/10 text-white border border-white/10 shadow-lg' 
                  : 'text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              Solución
            </a>
            <a 
              href="#pricing" 
              className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === 'pricing' 
                  ? 'bg-white/10 text-white border border-white/10 shadow-lg' 
                  : 'text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              Precios
            </a>
            <a 
              href="#booking" 
              className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === 'booking' 
                  ? 'bg-white/10 text-white border border-white/10 shadow-lg' 
                  : 'text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              Turnero
            </a>
          </nav>

          {/* Header Action Button */}
          <div className="hidden md:block">
            <a 
              href="https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20quiero%20consultar%20por%20un%20proyecto%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] hover:border-cyan-500/40 hover:bg-cyan-500/10 text-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:scale-[1.03]"
            >
              Consultar por WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/[0.06] bg-[#070707]/95 backdrop-blur-2xl overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                <a 
                  href="#pain" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-white py-2 border-b border-white/[0.02]"
                >
                  Fricciones
                </a>
                <a 
                  href="#solution" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-white py-2 border-b border-white/[0.02]"
                >
                  Solución
                </a>
                <a 
                  href="#pricing" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-white py-2 border-b border-white/[0.02]"
                >
                  Precios
                </a>
                <a 
                  href="#booking" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-white py-2"
                >
                  Turnero
                </a>
                
                <a 
                  href="https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20quiero%20consultar%20por%20un%20proyecto%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 w-full py-3.5 rounded-xl text-center text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20"
                >
                  Consultar WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION INMERSIVO */}
      <section id="hero" className="relative pt-36 pb-24 md:pt-48 md:pb-36 flex items-center min-h-[90vh] z-10">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Indicator */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.2)] mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-200">
                Interfaces claras para tu negocio
              </span>
            </motion.div>

            {/* Title - Serif with tight tracking */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-[1.08] mb-6"
            >
              Interfaces claras para <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-indigo-300 to-cyan-100">impulsar tu trabajo independiente.</span>
            </motion.h1>

            {/* Subtitle - Sans-serif geometric */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mb-10"
            >
              Diseñamos páginas web modernas y funcionales que te ayudan a mostrar lo que hacés, conectar con tus clientes y organizar tu día a día. Una estructura digital transparente, pensada para acompañar el crecimiento de tu proyecto en la región.
            </motion.p>

            {/* Interactive CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <a 
                href="#pricing"
                className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold bg-white text-zinc-950 overflow-hidden shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                <span className="group-hover:text-white transition-colors duration-300">Ver Opciones de Páginas</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
              </a>
              
              <a 
                href="https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20quiero%20consultar%20por%20un%20proyecto%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-cyan-500/30 text-zinc-300 hover:text-white transition-all duration-300"
              >
                <span>Consultar por WhatsApp</span>
              </a>
            </motion.div>

            {/* Trust badge */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="mt-12 flex items-center gap-8 border-t border-white/[0.06] pt-8 w-full max-w-lg"
            >
              <div>
                <p className="text-2xl font-serif font-semibold text-white tracking-tight">3</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Cupos mensuales</p>
              </div>
              <div className="h-8 w-px bg-white/[0.08]" />
              <div>
                <p className="text-2xl font-serif font-semibold text-white tracking-tight">100%</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Diseño a Medida</p>
              </div>
              <div className="h-8 w-px bg-white/[0.08]" />
              <div>
                <p className="text-2xl font-serif font-semibold text-white tracking-tight">24/7</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Operación Activa</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Visual - Interactive Tilt Mockup */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full max-w-md relative aspect-[4/5] rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] shadow-[0_24px_80px_rgba(0,0,0,0.6)] p-6 flex flex-col justify-between overflow-hidden group"
            >
              {/* Glass Reflection Accent */}
              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-white/[0.01] via-white/[0.04] to-transparent rotate-45 pointer-events-none group-hover:translate-x-10 group-hover:translate-y-10 transition-transform duration-1000" />
              
              {/* Top Bar Widget Mockup */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  <span className="text-[9px] text-cyan-300 font-bold tracking-widest uppercase">Live System</span>
                </div>
              </div>

              {/* Center Interactive Representation */}
              <div className="flex-1 py-8 flex flex-col justify-center gap-4">
                <motion.div 
                  whileHover={{ x: 6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-4 shadow-inner cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Nueva reserva</p>
                      <p className="text-sm font-semibold text-white">Dr. Alejandro Carranza</p>
                    </div>
                  </div>
                  <span className="text-xs text-cyan-400 font-semibold bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-800/40">10:30hs</span>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="p-4 rounded-2xl bg-white/[0.01] border border-white/[0.04] opacity-75 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-500/10 flex items-center justify-center text-zinc-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Recordatorio enviado</p>
                      <p className="text-sm font-semibold text-zinc-300">Paciente: Sofía Rossi</p>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 font-medium bg-zinc-900/60 px-2.5 py-1 rounded-full border border-zinc-800/40">WhatsApp</span>
                </motion.div>

                {/* Performance Visual Chart */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col gap-2 shadow-lg">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-medium">Asistencia Mensual</span>
                    <span className="text-emerald-400 font-semibold">+98.2%</span>
                  </div>
                  <div className="w-full bg-zinc-950/60 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '98.2%' }}
                      transition={{ duration: 1.8, delay: 0.8 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Mockup Footer */}
              <div className="border-t border-white/[0.06] pt-4 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-mono">estudiocrea.com/tu-consultorio</span>
                <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase tracking-wider">Optimizada</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECCIÓN EL DOLOR */}
      <section id="pain" className="relative py-24 md:py-32 z-10 border-t border-white/[0.02] bg-[#090909]/40">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
              Hacer que tu negocio sea <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-orange-200">más fácil de gestionar.</span>
            </h2>
            <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
              El intercambio interminable de mensajes manuales desgasta tu autoridad profesional y vacía tu agenda. Mira cómo impacta la falta de un sistema en tu día a día interactuando abajo:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Pain Cards List (Left Side) */}
            <div className="lg:col-span-6 flex flex-col gap-4 justify-center">
              {painPoints.map((pain) => {
                const isSelected = selectedPain === pain.id;
                return (
                  <div
                    key={pain.id}
                    onClick={() => setSelectedPain(pain.id)}
                    className={`cursor-pointer text-left p-6 rounded-2xl transition-all duration-300 border flex gap-4 ${
                      isSelected 
                        ? 'backdrop-blur-xl bg-white/[0.05] border-white/[0.15] shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
                        : 'bg-white/[0.01] border-white/[0.04] opacity-50 hover:opacity-90 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white/[0.08] shadow-md border border-white/10' : 'bg-zinc-950/60'
                    }`}>
                      {pain.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                        {pain.title}
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                      </h3>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">
                        {pain.subtitle}
                      </p>
                      <p className="text-sm text-zinc-400 font-light leading-relaxed">
                        {pain.description}
                      </p>
                      {isSelected && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-900/40 text-rose-300 text-xs font-semibold"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{pain.stat}</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pain Chat Interactive Visual Smartphone mockup (Right Side) */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="w-full max-w-sm aspect-[9/16] max-h-[620px] relative rounded-[42px] backdrop-blur-xl bg-white/[0.02] border-4 border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.7)] p-4 overflow-hidden flex flex-col justify-between">
                
                {/* Smartphone Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#111] absolute left-6" />
                  <div className="w-12 h-1 bg-[#222] rounded-full" />
                </div>

                {/* Smartphone status bar */}
                <div className="flex justify-between items-center text-[10px] text-zinc-400 font-semibold px-4 pt-1 mb-2 relative z-20">
                  <span>23:42</span>
                  <div className="flex items-center gap-1.5">
                    <span>5G</span>
                    <div className="w-4 h-2 border border-zinc-500 rounded-sm p-0.5 flex items-center">
                      <div className="w-full h-full bg-zinc-400 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Visual Glass Header of the chat */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-2 px-2 relative z-20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center font-bold text-xs text-white">
                      PA
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Paciente / Cliente</p>
                      <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Escribiendo...</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  </div>
                </div>

                {/* Animated chat window with typed messages */}
                <div className="flex-1 py-4 flex flex-col justify-end gap-3 text-xs overflow-y-auto px-1">
                  <AnimatePresence mode="wait">
                    {selectedPain === 'pain-1' && (
                      <motion.div
                        key="pain-1-chat"
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        variants={{
                          show: { transition: { staggerChildren: 0.15 } }
                        }}
                        className="flex flex-col gap-3"
                      >
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 15 },
                            show: { opacity: 1, y: 0 }
                          }}
                          className="self-start max-w-[85%] p-3 rounded-2xl rounded-tl-none bg-zinc-900 border border-white/[0.04] text-zinc-200"
                        >
                          <p className="font-bold text-[8px] text-cyan-400 uppercase tracking-wider mb-1">DOMINGO 22:15hs</p>
                          <p className="leading-relaxed">Hola! Quería consultar cuáles son los precios de los turnos, en qué horarios atienden esta semana y por dónde queda el consultorio.</p>
                        </motion.div>
                        
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 15 },
                            show: { opacity: 1, y: 0, transition: { delay: 0.6 } }
                          }}
                          className="self-end max-w-[85%] p-3 rounded-2xl rounded-tr-none bg-rose-950/20 border border-rose-900/40 text-rose-300 italic"
                        >
                          <p className="font-bold text-[8px] text-rose-400 uppercase tracking-widest mb-1">Tu fricción diaria</p>
                          <p className="leading-relaxed">Pasar horas respondiendo estas mismas dudas de forma manual consume la energía que necesitas para tu trabajo o descanso.</p>
                        </motion.div>
                      </motion.div>
                    )}

                    {selectedPain === 'pain-2' && (
                      <motion.div
                        key="pain-2-chat"
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        variants={{
                          show: { transition: { staggerChildren: 0.15 } }
                        }}
                        className="flex flex-col gap-3"
                      >
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 15 },
                            show: { opacity: 1, y: 0 }
                          }}
                          className="self-start max-w-[85%] p-3 rounded-2xl rounded-tl-none bg-zinc-900 border border-white/[0.04] text-zinc-200"
                        >
                          <p className="font-bold text-[8px] text-purple-400 uppercase tracking-wider mb-1">JUEVES 15:40hs</p>
                          <p className="leading-relaxed">Hola! Te busqué por Google para ver tus servicios pero solo me aparece tu perfil de Instagram. El problema es que no tengo esa red social, ¿tenés una web para ver info?</p>
                        </motion.div>
                        
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 15 },
                            show: { opacity: 1, y: 0, transition: { delay: 0.6 } }
                          }}
                          className="self-end max-w-[85%] p-3 rounded-2xl rounded-tr-none bg-rose-950/20 border border-rose-900/40 text-rose-300 italic"
                        >
                          <p className="font-bold text-[8px] text-rose-400 uppercase tracking-widest mb-1">Riesgo de Algoritmo</p>
                          <p className="leading-relaxed">Depender 100% de redes sociales para que te encuentren te vuelve vulnerable a cambios de algoritmo o cuentas suspendidas.</p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Simulated Chat Input Bar */}
                <div className="border-t border-white/[0.06] pt-3 flex items-center gap-2 mt-2 px-2 relative z-20">
                  <div className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-full py-2 px-4 text-[11px] text-zinc-500 flex items-center justify-between">
                    <span>Escribir mensaje...</span>
                    <Send className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN LA SOLUCIÓN */}
      <section id="solution" className="relative py-24 md:py-32 z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
              Tu negocio operando en <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-indigo-200 to-indigo-100">piloto automático</span> las 24 horas.
            </h2>
            <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
              Diseñamos e implementamos un sistema digital integrado a tu marca que soluciona de raíz la fricción operativa. Olvídate de agendar a mano y mantén el control total.
            </p>
          </div>

          {/* Benefits Grid in Cursor-Following Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, idx) => (
              <SpotlightCard
                key={idx}
                glowColor={benefit.glowColor}
                className="p-8 flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  {/* Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                      {benefit.icon}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400">
                      {benefit.tag}
                    </span>
                  </div>

                  {/* Benefit Content */}
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-400 font-light text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                
                {/* Micro-interaction indicator */}
                <div className="mt-8 flex items-center gap-1.5 text-xs text-zinc-500 font-semibold group-hover:text-cyan-400 transition-colors duration-300">
                  <span>Tecnología nativa</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* High-end editorial quote */}
          <div className="mt-16 md:mt-24 text-center max-w-2xl mx-auto">
            <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
              <p className="font-serif text-base md:text-lg italic text-cyan-200 leading-relaxed">
                "Un sistema de reservas online no es solo comodidad para tus clientes; es la frontera que separa a los profesionales ocupados de los profesionales rentables y tranquilos."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRECIOS TRANSPARENTES */}
      <section id="pricing" className="relative py-24 md:py-32 z-10 border-t border-white/[0.02] bg-[#090909]/40">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
              Inversión <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-indigo-200">clara y al detalle.</span>
            </h2>
            <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
              Ofrecemos planes claros adaptados a la etapa de tu negocio independiente, con soporte continuo y sin sorpresas.
            </p>
          </div>

          {/* Glass Pricing Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 items-stretch">
            
            {/* Plan 1: Desarrollo Semilla */}
            <SpotlightCard className="p-8 flex flex-col justify-between min-h-[480px] border-white/[0.08]" glowColor="rgba(34, 211, 238, 0.12)">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-900/40 text-cyan-300">
                    Plan Web
                  </span>
                  <span className="text-zinc-500 text-xs font-medium">Pago único</span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-2">Desarrollo Semilla</h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed mb-6">
                  Diseño y maquetación de tu página web (Landing Page) adaptada a tu negocio. Espacio claro para mostrar tus servicios, tu historia, ubicación y enlaces a redes.
                </p>
                <div className="h-px bg-white/[0.06] mb-6" />
                <ul className="flex flex-col gap-3 text-xs text-zinc-300 font-light">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Diseño visual moderno a medida</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Secciones de servicios y trayectoria</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Enlaces a redes y ubicación</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Optimizado para buscadores (SEO)</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8">
                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="text-zinc-500 text-sm">$</span>
                  <span className="text-3xl font-serif font-bold text-white tracking-tight">280.000</span>
                  <span className="text-zinc-400 text-xs font-light">ARS</span>
                </div>
                <a 
                  href="https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20quiero%20el%20Plan%20Desarrollo%20Semilla%20para%20mi%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-white text-zinc-950 hover:bg-cyan-400 hover:text-zinc-950 transition-colors duration-300 shadow-md font-semibold"
                >
                  Elegir Plan
                </a>
              </div>
            </SpotlightCard>

            {/* Plan 2: Gestión de Turnos */}
            <SpotlightCard className="p-8 flex flex-col justify-between min-h-[480px] border-cyan-500/30 relative" glowColor="rgba(168, 85, 247, 0.12)">
              {/* Featured Badge */}
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-zinc-950 px-3.5 py-1 rounded-full text-[9px] font-black tracking-wider uppercase shadow-md">
                Recomendado
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-purple-950/40 border border-purple-900/40 text-purple-300">
                    Automatización
                  </span>
                  <span className="text-zinc-500 text-xs font-medium">A Medida</span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-2">Gestión de Turnos</h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed mb-6">
                  Todo lo del Plan Semilla + la integración de sistema de reservas (Calendly/TidyCal) o flujos automatizados básicos para que tus clientes agenden solos sin que tengas que responder manualmente.
                </p>
                <div className="h-px bg-white/[0.06] mb-6" />
                <ul className="flex flex-col gap-3 text-xs text-zinc-300 font-light">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-semibold text-white">Todo lo del Plan Semilla</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-400" />
                    <span>Integración Calendly o TidyCal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-400" />
                    <span>Flujo de recordatorios automático</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-400" />
                    <span>Reducción activa de inasistencias</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8">
                <div className="mb-4">
                  <span className="text-2xl font-serif font-bold text-white tracking-tight">A Medida</span>
                  <span className="text-zinc-500 text-xs font-light block">Configuración y flujos personalizados</span>
                </div>
                <a 
                  href="https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20quiero%20consultar%20por%20el%20Plan%20de%20Gestión%20de%20Turnos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:opacity-90 transition-opacity duration-300 shadow-md font-semibold"
                >
                  Consultar WhatsApp
                </a>
              </div>
            </SpotlightCard>

            {/* Plan 3: Soporte Mensual */}
            <SpotlightCard className="p-8 flex flex-col justify-between min-h-[480px] border-white/[0.08]" glowColor="rgba(16, 185, 129, 0.12)">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-900/40 text-emerald-300">
                    Suscripción
                  </span>
                  <span className="text-zinc-500 text-xs font-medium">Continuo</span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-2">Soporte Mensual</h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed mb-6">
                  Actualizaciones menores (textos, links, imágenes) y garantía de funcionamiento y hosting. Nos ocupamos del mantenimiento técnico para tu tranquilidad total.
                </p>
                <div className="h-px bg-white/[0.06] mb-6" />
                <ul className="flex flex-col gap-3 text-xs text-zinc-300 font-light">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Hosting Premium Vercel incluido</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Certificado SSL y estabilidad activa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Actualización ágil de textos e imágenes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Garantía de funcionamiento continuo</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8">
                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="text-zinc-500 text-sm">$</span>
                  <span className="text-3xl font-serif font-bold text-white tracking-tight">15.000</span>
                  <span className="text-zinc-400 text-xs font-light">/mes</span>
                </div>
                <a 
                  href="https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20quiero%20sumar%20el%20Soporte%20Mensual%20de%20$15.000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-white transition-colors duration-300 font-semibold"
                >
                  Adquirir Soporte
                </a>
              </div>
            </SpotlightCard>

          </div>

          {/* Interactive Pricing Estimator (Calculator Tool) */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="relative backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.6)] rounded-3xl p-8 md:p-12 overflow-hidden">
              
              {/* Highlight badge top-right */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500 to-indigo-500 text-zinc-950 px-8 py-2 rounded-bl-3xl text-[9px] font-black tracking-widest uppercase shadow-md">
                Estimador de Proyecto
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Configurator Controls (Left Column) */}
                <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-white mb-2">Simulador de Adicionales</h3>
                    <p className="text-zinc-400 text-sm font-light leading-relaxed">
                      Partiendo de la base de <strong>Desarrollo Semilla ($280.000)</strong>, simula el costo de agregar flujos automatizados de pago, asistentes de Inteligencia Artificial o turneros compartidos.
                    </p>
                  </div>

                  <div className="h-px bg-white/[0.08]" />

                  {/* Dynamic Add-on Toggles */}
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Agregados Opcionales (Pago único)</span>
                    </h4>

                    {/* Add-on 1 */}
                    <div 
                      onClick={() => setIncludePayments(!includePayments)}
                      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                        includePayments 
                          ? 'bg-cyan-500/5 border-cyan-500/30' 
                          : 'bg-white/[0.01] border-white/[0.05] hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">Pasarela de Pagos</span>
                          <span className="text-[9px] font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-900/40">+$55.000</span>
                        </div>
                        <p className="text-xs text-zinc-400 font-light mt-1">Mercado Pago / Stripe para señas o cobro total antes del turno.</p>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                        includePayments ? 'bg-cyan-500 border-cyan-500 text-zinc-950' : 'border-white/20'
                      }`}>
                        {includePayments && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    {/* Add-on 2 */}
                    <div 
                      onClick={() => setIncludeChatbot(!includeChatbot)}
                      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                        includeChatbot 
                          ? 'bg-purple-500/5 border-purple-500/30' 
                          : 'bg-white/[0.01] border-white/[0.05] hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">Asistente WhatsApp IA</span>
                          <span className="text-[9px] font-bold text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-900/40">+$85.000 + $8.000/mes</span>
                        </div>
                        <p className="text-xs text-zinc-400 font-light mt-1">Bot inteligente que responde dudas comunes y envía links de reserva por WhatsApp.</p>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                        includeChatbot ? 'bg-purple-500 border-purple-500 text-white' : 'border-white/20'
                      }`}>
                        {includeChatbot && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    {/* Add-on 3 */}
                    <div 
                      onClick={() => setIncludeMultiProfessional(!includeMultiProfessional)}
                      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                        includeMultiProfessional 
                          ? 'bg-emerald-500/5 border-emerald-500/30' 
                          : 'bg-white/[0.01] border-white/[0.05] hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">Turnero Multi-Profesional</span>
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40">+$45.000 + $5.000/mes</span>
                        </div>
                        <p className="text-xs text-zinc-400 font-light mt-1">Estructura para hasta 5 agendas o profesionales compartiendo el consultorio.</p>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                        includeMultiProfessional ? 'bg-emerald-500 border-emerald-500 text-zinc-950' : 'border-white/20'
                      }`}>
                        {includeMultiProfessional && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Display Summary Card (Right Column) */}
                <div className="lg:col-span-5 w-full bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-inner gap-4">
                  <div className="w-full">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Desarrollo (Pago Único)</span>
                    <div className="flex items-baseline justify-center gap-1 mt-1">
                      <span className="text-zinc-500 text-lg">$</span>
                      <motion.span 
                        key={totalDevelopment}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight"
                      >
                        {totalDevelopment.toLocaleString('es-AR')}
                      </motion.span>
                      <span className="text-zinc-400 text-xs font-light">ARS</span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/[0.06]" />

                  <div className="w-full">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Soporte + Mantenimiento</span>
                    <div className="flex items-baseline justify-center gap-1 mt-1">
                      <span className="text-cyan-500 text-sm">$</span>
                      <motion.span 
                        key={totalMaintenance}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-2xl font-serif font-bold text-cyan-400"
                      >
                        {totalMaintenance.toLocaleString('es-AR')}
                      </motion.span>
                      <span className="text-zinc-400 text-xs font-light">/mes</span>
                    </div>
                    <p className="text-[9px] text-zinc-500 leading-relaxed max-w-[200px] mx-auto mt-2">
                      Incluye hosting premium en Vercel, certificado SSL y actualizaciones técnicas.
                    </p>
                  </div>

                  <a 
                    href={`https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20quiero%20cotizar%20mi%20proyecto.%20Base:%20Desarrollo%20Semilla%20con%20adicionales%20de:%20${includePayments ? 'Pasarela%20de%20Pagos%20' : ''}${includeChatbot ? 'Asistente%20WhatsApp%20IA%20' : ''}${includeMultiProfessional ? 'Turnero%20Multi-Profesional' : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full py-4 rounded-xl text-center text-xs font-bold uppercase tracking-widest bg-white text-zinc-950 hover:bg-cyan-400 hover:text-zinc-950 transition-colors duration-300 shadow-xl"
                  >
                    Cotizar Configuración
                  </a>
                </div>

              </div>

            </div>
          </div>

          {/* Bloque Final: ¿Tu negocio necesita algo diferente? */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
              <h3 className="font-serif text-2xl md:text-3xl font-light text-white mb-3">
                ¿Tu negocio necesita algo diferente?
              </h3>
              <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
                Si buscás una estructura a medida para tu clínica, comercio o marca personal, contanos tu idea.
              </p>
              <a 
                href="https://wa.me/5491112345678?text=Hola%20Estudio%20Crea,%20busco%20una%20estructura%20a%20medida%20para%20mi%20idea%20de%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-white text-zinc-950 hover:bg-cyan-400 hover:text-zinc-950 transition-all duration-300 shadow-xl font-semibold"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Cotizá tu proyecto por WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* CTA & INTEGRATED MOCK CALENDAR WIDGET */}
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
                                const isAvailable = availableDates.includes(i);
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
                              {availableTimes.map((time) => {
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
                          <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-md mb-8">
                            Felicitaciones **{formData.name}**. Tu espacio quedó bloqueado con éxito para el día **{selectedDate !== null ? selectedDate + 1 : ''} de Junio a las {selectedTime}**.
                          </p>

                          {/* Preview of automated notification they'll buy */}
                          <div className="w-full max-w-sm rounded-2xl bg-white/[0.02] border border-white/[0.08] p-4 text-left shadow-inner">
                            <div className="flex items-center justify-between border-b border-white/[0.04] pb-2.5 mb-3">
                              <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest">WhatsApp Autómata Demo</span>
                              <span className="text-[9px] text-zinc-500">Recién enviado</span>
                            </div>
                            <div className="p-3 bg-zinc-900 rounded-xl rounded-tl-none border border-white/[0.04] text-xs text-zinc-300 leading-relaxed">
                              <span className="font-bold text-cyan-400 block mb-1">RECORDATORIO OFICIAL</span>
                              Hola {formData.name}, te recordamos tu llamada diagnóstica de agenda con **Estudio Crea** programada para mañana a las {selectedTime}.<br /><br />
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
                        Este componente digital está diseñado de forma modular. Para integrar tu agenda nativa de **Calendly** o **TidyCal**, copia el código de abajo y pégalo directamente en la sección del widget de `app/page.tsx`.
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

      {/* FOOTER */}
      <footer className="relative py-16 z-10 border-t border-white/[0.04] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="font-serif text-2xl font-semibold text-white tracking-tight">Estudio Crea</span>
              <span className="text-xs text-zinc-500 font-light">Especialistas en Interfaces Inmersivas y Sistemas Autónomos.</span>
            </div>

            <div className="flex items-center gap-8 text-xs text-zinc-400 font-semibold uppercase tracking-wider">
              <a href="#hero" className="hover:text-white transition-colors duration-200">Inicio</a>
              <a href="#pain" className="hover:text-white transition-colors duration-200">Fricciones</a>
              <a href="#solution" className="hover:text-white transition-colors duration-200">Solución</a>
              <a href="#pricing" className="hover:text-white transition-colors duration-200">Precios</a>
            </div>

          </div>

          <div className="h-px bg-white/[0.04] w-full mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600 font-light">
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

    </div>
  );
}
