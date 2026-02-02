
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Title Animation
      gsap.from(".about-title", {
        y: 60,
        opacity: 0,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 90%",
        }
      });

      // Narrative Content Animation
      gsap.from(".about-narrative p", {
        y: 30,
        opacity: 0,
        stagger: 0.3,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-narrative",
          start: "top 85%",
        }
      });

      // Image Animation
      gsap.from(".about-image-wrapper", {
        scale: 1.05,
        y: 40,
        opacity: 0,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".about-image-wrapper",
          start: "top 80%",
        }
      });

      // Metadata Stats Animation
      gsap.from(".about-stat", {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-stats-container",
          start: "top 90%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-48 pb-64 px-8 md:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="about-title text-6xl md:text-8xl font-serif mb-24">
          Makers of <br />The Invisible.
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="about-narrative space-y-12">
            <p className="text-xl font-light leading-relaxed opacity-80">
              Founded in 2024 by a collective of chemists, poets, and architects, Voidblossom exists at the intersection of molecular science and spiritual austerity. 
            </p>
            <p className="text-xl font-light leading-relaxed opacity-80">
              Our studio is located in the high desert, where silence is the primary ingredient. We work in small, intentional batches, respecting the lunar cycles and the natural rhythms of our botanical sources.
            </p>
          </div>
          <div className="about-image-wrapper aspect-[3/4] bg-[#1A1A1A] overflow-hidden border border-white/5">
             <img 
               src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
               alt="Studio Interior" 
               className="w-full h-full object-cover grayscale opacity-50 transition-transform duration-[3s] hover:scale-110"
             />
          </div>
        </div>

        <div className="about-stats-container mt-32 pt-32 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="about-stat">
              <h3 className="text-xs uppercase tracking-[0.3em] opacity-40 mb-8">Headquarters</h3>
              <p className="font-serif text-lg">High Desert Studio <br />Sante Fe, NM</p>
            </div>
            <div className="about-stat">
              <h3 className="text-xs uppercase tracking-[0.3em] opacity-40 mb-8">Philosophy</h3>
              <p className="font-serif text-lg">Radical Restraint <br />Intentional Sourcing</p>
            </div>
            <div className="about-stat">
              <h3 className="text-xs uppercase tracking-[0.3em] opacity-40 mb-8">Batches</h3>
              <p className="font-serif text-lg">Non-Periodic <br />Limited Release</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
