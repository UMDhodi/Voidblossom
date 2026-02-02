
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Product: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const silkTextureRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Stabilized Pinning for Desktop
      if (window.innerWidth > 768) {
        ScrollTrigger.create({
          trigger: ".product-reveal",
          start: "top top",
          end: "bottom bottom",
          pin: ".sticky-column",
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: ".product-reveal",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          }
        })
          .fromTo(bottleRef.current,
            { y: 60, scale: 0.9, rotateZ: -4 },
            { y: -60, scale: 1.1, rotateZ: 4, ease: "none" }
          )
          .fromTo(silkTextureRef.current,
            { y: -60, scale: 1.3, opacity: 0.04 },
            { y: 60, scale: 1, opacity: 0.12, ease: "none" },
            0
          )
          .fromTo(atmosphereRef.current,
            { opacity: 0.08, scale: 0.85 },
            { opacity: 0.2, scale: 1.1, ease: "power1.inOut" },
            0
          )
          .fromTo(bgRef.current,
            { scale: 1.05, opacity: 0.1 },
            { scale: 1, opacity: 0.02, ease: "power2.out" },
            0
          );
      }

      // Initial Title Reveal
      gsap.to(".product-title .mask-text", {
        y: "0%",
        duration: 2.2,
        ease: "expo.out",
        delay: 0.3
      });

      // Content items reveal on scroll
      gsap.utils.toArray('.reveal-item').forEach((item: any) => {
        gsap.from(item, {
          y: 80,
          opacity: 0,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: "top 92%",
            toggleActions: "play none none reverse"
          }
        });
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0E0E0E] min-h-screen relative overflow-hidden">
      <div className="pt-40 md:pt-64 pb-32 px-6 md:px-24">
        <h1 className="product-title text-[12vw] md:text-[11vw] font-serif leading-none mb-48 md:mb-64 tracking-tighter">
          <span className="mask-wrap text-white font-light"><span className="mask-text">VOID</span></span>
          <span className="mask-wrap text-white font-light"><span className="mask-text italic">VITAMIN C</span></span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 product-reveal relative">

          {/* STICKY COLUMN */}
          <div className="md:col-span-6 relative sticky-column z-10">
            <div className="md:h-screen md:flex md:items-center relative">
              <div className="w-full aspect-square md:aspect-auto md:h-[85vh] bg-[#050505] border border-white/5 relative flex items-center justify-center overflow-hidden">

                <div
                  ref={silkTextureRef}
                  className="absolute inset-0 z-0 pointer-events-none mix-blend-soft-light opacity-10"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                    backgroundSize: '300px 300px',
                  }}
                />

                <div ref={bgRef} className="absolute inset-0 opacity-10 pointer-events-none z-[1]">
                  <div className="absolute top-0 left-1/3 w-[1px] h-full bg-white/10" />
                  <div className="absolute top-0 right-1/3 w-[1px] h-full bg-white/10" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
                </div>

                <div ref={atmosphereRef} className="absolute w-[90%] h-[90%] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.06)_0%,_transparent_75%)] rounded-full blur-[130px] pointer-events-none z-[2]" />

                <div
                  ref={bottleRef}
                  className="relative z-20 transform-gpu"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}hero.png`}
                    alt="Void 01 Molecule Vessel Detail"
                    className="h-[45vh] md:h-[65vh] w-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)] brightness-[1.05]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="md:col-span-5 md:col-start-8 product-content pb-48 md:pb-[40vh] relative z-0">
            <div className="space-y-48 md:space-y-[45vh]">

              <section className="reveal-item">
                <h3 className="text-[10px] uppercase tracking-[0.8em] opacity-30 mb-10 text-white font-sans">I. The Foundation</h3>
                <p className="text-3xl md:text-6xl font-serif leading-tight text-white font-light tracking-tight">
                  10% L-Ascorbic Acid. <br />Stabilized in absolute dark.
                </p>
                <p className="text-base md:text-lg font-light opacity-40 mt-10 leading-relaxed max-w-sm text-white font-serif italic">
                  Vitamin C is highly reactive. Voidblossom creates a sanctuary for its integrity, utilizing light-proof obsidian glass.
                </p>
              </section>

              <section className="reveal-item">
                <h3 className="text-[10px] uppercase tracking-[0.8em] opacity-30 mb-10 text-white font-sans">II. The Synergists</h3>
                <div className="space-y-12 md:space-y-20">
                  <div className="border-b border-white/10 pb-10">
                    <h4 className="font-serif text-2xl md:text-4xl text-white font-light">Acetyl Glucosamine</h4>
                    <p className="text-[10px] uppercase tracking-[0.6em] opacity-30 mt-5 text-white font-sans leading-relaxed">Refines texture and amplifies luminosity without friction.</p>
                  </div>
                  <div className="border-b border-white/10 pb-10">
                    <h4 className="font-serif text-2xl md:text-4xl text-white font-light">Centella Asiatica</h4>
                    <p className="text-[10px] uppercase tracking-[0.6em] opacity-30 mt-5 text-white font-sans leading-relaxed">The botanical conductor that calms cellular vibration.</p>
                  </div>
                </div>
              </section>

              <section className="reveal-item pt-20">
                <div className="p-16 md:p-32 border border-white/10 text-center relative overflow-hidden group cursor-none">
                  <div className="absolute inset-0 bg-[#F6F5F3] translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-expo" />
                  <div className="relative z-10 group-hover:text-black transition-colors duration-700 text-white">
                    <p className="text-[10px] uppercase tracking-[1em] mb-12 opacity-30 font-sans">10ml / 0.34 fl oz</p>
                    <p className="text-2xl md:text-6xl font-serif mb-12 tracking-tighter uppercase font-light">Acquire Void</p>
                    <span className="uppercase tracking-[0.8em] text-[10px] font-sans opacity-60">Registry Open</span>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
