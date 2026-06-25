import type { Metadata } from 'next';
import HistoriaPageClient from './HistoriaPageClient';

export const metadata: Metadata = {
  title: "Nuestra Historia | Estudio Crea",
  description: "Conoce el origen, propuesta de valor, misión, visión y valores de Estudio Crea. Acompañamos a profesionales en su transformación digital de manera humana y estratégica.",
  openGraph: {
    title: "Nuestra Historia | Estudio Crea",
    description: "Conoce el origen, propuesta de valor, misión, visión y valores de Estudio Crea. Acompañamos a profesionales en su transformación digital de manera humana y estratégica.",
    locale: "es_AR",
    type: "website",
  },
};

export default function Page() {
  return <HistoriaPageClient />;
}
