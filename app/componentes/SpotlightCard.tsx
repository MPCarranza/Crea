'use client';

import React, { useRef } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function SpotlightCard({ 
  children, 
  className = "", 
  glowColor = "rgba(34, 211, 238, 0.12)", // Elegant cyan glow
  ...props 
}: SpotlightCardProps) {
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
      className={`relative overflow-hidden group rounded-3xl backdrop-blur-xl bg-white/40 border border-black/[0.06] transition-all duration-500 hover:border-black/[0.15] shadow-xs ${className}`}
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
          border: '1px solid rgba(0, 0, 0, 0.08)',
          maskImage: `radial-gradient(130px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)`
        }}
      />
      {children}
    </div>
  );
}
