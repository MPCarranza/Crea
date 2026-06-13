import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
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
      className={`${dmSans.variable} ${sansFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* Eliminamos bg-[#0a0a0a] y text-zinc-100 para que use tus variables globales fluidas */}
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}