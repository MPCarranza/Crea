'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HistoriaSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="historia" className="relative py-20 md:py-28 overflow-hidden bg-[#faf9f6]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 bg-cyan-500/10 px-3 py-1 rounded-full">
            El Origen
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-4 mb-6">
            Nuestra Historia
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto" />
        </motion.div>

        {/* Narrative Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8 text-neutral-700 font-light text-base md:text-lg leading-relaxed text-pretty"
        >
          <motion.p variants={itemVariants}>
            Estudio Crea nació de una pregunta que escuchamos muchas veces.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="my-14 pl-8 relative py-3"
          >
            {/* Barra de borde vertical con degradado premium */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-indigo-500 rounded-full" />
            
            {/* Comilla gigante con degradado sutil */}
            <span className="absolute -top-7 left-4 text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-indigo-400 opacity-25 select-none pointer-events-none">
              “
            </span>
            <p className="font-serif italic text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-indigo-500 tracking-tight leading-snug relative z-10">
              ¿Cómo hago para mostrar lo que hago?
            </p>
          </motion.div>

          <motion.p variants={itemVariants}>
            La escuchamos en profesionales independientes, prestadores de servicios, emprendedores y personas con proyectos valiosos que sabían perfectamente a qué se dedicaban, pero encontraban dificultades cuando llegaba el momento de mostrarlo al mundo.
          </motion.p>

          <motion.p variants={itemVariants}>
            Muchos dependían únicamente de redes sociales que cambian constantemente. Otros sentían que tener una página web era algo costoso, complejo o fuera de su alcance. Y la gran mayoría terminaban explicando una y otra vez quiénes eran, qué hacían y por qué alguien debería confiar en ellos.
          </motion.p>

          <motion.p variants={itemVariants}>
            Detrás de cada caso aparecía la misma necesidad: contar con un espacio propio que representara su trabajo, su experiencia y el valor que aportan.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="my-12 p-8 rounded-3xl bg-[#f4f6fa] border border-black/[0.04] relative overflow-hidden"
          >
            <p className="relative z-10 text-neutral-800 font-normal">
              Estudio Crea surge de la unión entre la tecnología, la comunicación y el acompañamiento profesional. Fundado por María Pilar Carranza —Licenciada en Psicología y desarrolladora Front-End—, el estudio nace con una convicción simple: la tecnología debe ayudar a las personas a expresarse, no convertirse en una barrera más.
            </p>
          </motion.div>

          <motion.p variants={itemVariants}>
            Por eso acompañamos a profesionales, freelancers y prestadores de servicios en la construcción de una presencia digital auténtica, accesible y alineada con quienes son.
          </motion.p>

          <motion.p variants={itemVariants} className="font-medium text-neutral-900">
            No creemos en las soluciones genéricas ni en las promesas imposibles.
          </motion.p>

          <motion.p variants={itemVariants}>
            Creemos en escuchar primero, comprender cada proyecto y construir herramientas digitales que reflejen la identidad de quienes están detrás de ellas.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="pt-6 border-t border-black/[0.06] mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-900 mb-2">Crear</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Creemos en crear oportunidades, proyectos y presencia digital que abran nuevas puertas para tu desarrollo profesional.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-900 mb-2">Creer</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Creemos en el valor de las personas, en sus ideas y en todo aquello que todavía está esperando el momento ideal para ser visible.
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
