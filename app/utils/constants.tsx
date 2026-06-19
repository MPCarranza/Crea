import React from 'react';
import { MessageSquare, Laptop, Zap, CalendarCheck2, Coins, ShieldCheck } from 'lucide-react';

/**
 * Interface representing a core scheduling friction/pain point
 */
export interface PainPoint {
  id: string;
  icon: React.ReactNode;
  title: string;
  problem: {
    subtitle: string;
    description: string;
    stat: string;
  };
  solution: {
    subtitle: string;
    description: string;
    stat: string;
  };
}

/**
 * Interface representing a technical service/benefit card
 */
export interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  glowColor: string;
}

/**
 * Static commercial content: Core pain points for independent professionals
 */
export const PAIN_POINTS: PainPoint[] = [
  {
    id: 'pain-1',
    icon: <CalendarCheck2 className="w-6 h-6 text-cyan-400" />,
    title: 'Disponibilidad',
    problem: {
      subtitle: 'Coordinación manual agotadora',
      description: 'Responder consultas sobre precios y horarios los fines de semana o por las noches consume tu energía y tiempo libre.',
      stat: 'Gestión de turnos manual y lenta'
    },
    solution: {
      subtitle: 'Sistema de Turnos Automatizado',
      description: 'Tus clientes reservan de forma autónoma mediante tu turnero de Calendly integrado. La confirmación e instrucciones se envían solas por email.',
      stat: 'Confirmaciones automáticas por email'
    }
  },
  {
    id: 'pain-2',
    icon: <Laptop className="w-6 h-6 text-purple-400" />,
    title: 'Visibilidad',
    problem: {
      subtitle: 'La trampa de las redes sociales',
      description: 'No tener un espacio propio en internet hace que dependas al 100% de los cambios de algoritmo de las redes sociales para que la gente te encuentre.',
      stat: 'Dependencia inestable de plataformas externas'
    },
    solution: {
      subtitle: 'Tu Propia Landing Page Profesional',
      description: 'Un sitio web a medida de alta gama optimizado para Google que te da autoridad y donde tus clientes te encuentran directamente y sin intermediarios.',
      stat: 'Landing page desarrollada a medida'
    }
  }
];

/**
 * Static commercial content: Digital benefits and system features
 */
export const BENEFITS: Benefit[] = [
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
    description: 'Envío automático de notificaciones por email de hasta 24 horas antes del turno. Los pacientes confirman o cancelan con un clic, liberando la agenda a tiempo.',
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

/**
 * Scheduling configurations for the mock simulator
 */
export const AVAILABLE_DATES: number[] = [4, 5, 11, 12, 18, 19, 25, 26];

export const AVAILABLE_TIMES: string[] = ['09:30 hs', '11:00 hs', '14:30 hs', '16:00 hs', '17:30 hs'];

/**
 * Anchor routes for smooth scroll tracking
 */
export const SCROLL_SECTIONS: string[] = ['hero', 'showcase', 'pain', 'solution', 'pricing', 'booking'];
