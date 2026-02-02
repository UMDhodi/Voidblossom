
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Progress counter animation
    const counter = { val: 0 };
    gsap.to(counter, {
      val: 100,
      duration: 3.5,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.floor(counter.val))
    });

    // Text Reveal Stagger
    tl.fromTo(".loader-char", 
      { y: 150, skewY: 10, opacity: 0 },
      { 
        y: 0, 
        skewY: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 2.2, 
        ease: "expo.out",
        delay: 0.4
      }
    );

    // Subtle breathing scale to keep the void "alive"
    gsap.to(textRef.current, {
      scale: 1.03,
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    // Exit sequence - High-end clip-path lift
    tl.to(containerRef.current, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 2,
      ease: "expo.inOut",
      onComplete: onComplete
    }, "+=0.6");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-[#0E0E0E] z-[2000] flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      {/* Brand Text Reveal */}
      <div ref={textRef} className="flex overflow-hidden px-8 h-20 md:h-32 items-center mb-12">
        {"VOIDBLOSSOM".split("").map((char, i) => (
          <span 
            key={i} 
            className="loader-char text-3xl md:text-7xl font-serif tracking-[0.2em] inline-block will-change-transform"
          >
            {char}
          </span>
        ))}
      </div>
      
      {/* Minimalist Progress UI */}
      <div className="absolute bottom-24 left-0 w-full flex flex-col items-center gap-6 px-12">
        <div className="w-full max-w-[240px] h-[1px] bg-white/5 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-white/20 transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between w-full max-w-[240px] text-[8px] tracking-[0.8em] uppercase opacity-20 font-sans">
          <span className="animate-pulse">Initializing Void</span>
          <span>{progress.toString().padStart(3, '0')}</span>
        </div>
      </div>

      {/* Static Sub-Brand Mark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[10px] tracking-[1em] opacity-10 uppercase font-sans">
        Essence of Silence
      </div>
    </div>
  );
};

export default Preloader;
