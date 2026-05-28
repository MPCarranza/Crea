import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Estudio Crea | Diseño Web y Automatización Premium",
  description: "Diseñamos interfaces inmersivas de alta gama y automatizamos la gestión de turnos para consultorios independientes y profesionales de salud.",
  metadataBase: new URL("https://estudiocrea.com"),
  openGraph: {
    title: "Estudio Crea | Diseño Web y Automatización Premium",
    description: "Diseñamos interfaces inmersivas de alta gama y automatizamos la gestión de turnos para consultorios independientes y profesionales de salud.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${serifFont.variable} ${sansFont.variable} h-full antialiased`}
    >
      {/* Eliminamos bg-[#0a0a0a] y text-zinc-100 para que use tus variables globales fluidas */}
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}