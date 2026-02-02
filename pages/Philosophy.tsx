
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const firstLineRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. INTRO ANIMATION (On Load)
      const introTl = gsap.timeline({ defaults: { ease: "expo.out" } });
      
      introTl
        .from(".manifesto-header", {
          y: 30,
          opacity: 0,
          duration: 2,
          delay: 0.5
        })
        .from(firstLineRef.current, {
          y: 50,
          opacity: 0,
          filter: "blur(10px)",
          duration: 2.5
        }, "-=1.5");

      // 2. SCROLL NARRATIVE (Sequential Swaps)
      ScrollTrigger.create({
        trigger: scrollSectionRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 1.5,
        invalidateOnRefresh: true,
      });

      const lines = gsap.utils.toArray('.phi-line');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollSectionRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1.2,
        }
      });

      lines.forEach((line: any, index: number) => {
        if (index === 0) {
          tl.to(line, { 
            opacity: 0, 
            y: -60, 
            filter: "blur(10px)",
            duration: 1.5,
            ease: "power2.inOut",
            pointerEvents: "none"
          }, "+=1.2");
        } else {
          tl.fromTo(line, 
            { opacity: 0, y: 60, filter: "blur(10px)" },
            { 
              opacity: 1, 
              y: 0, 
              filter: "blur(0px)",
              duration: 2.2,
              ease: "expo.out",
              pointerEvents: "auto"
            }
          )
          .to(line, { 
            opacity: 0, 
            y: -60, 
            filter: "blur(10px)",
            duration: 1.8,
            ease: "power2.inOut",
            pointerEvents: "none"
          }, "+=1.0");
        }
      });

      // Reveal principles section
      gsap.utils.toArray('.reveal-block').forEach((block: any) => {
        gsap.from(block, {
          y: 80,
          opacity: 0,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0E0E0E] selection:bg-white selection:text-black">
      
      {/* SECTION 1: POETIC REVEAL */}
      <section ref={scrollSectionRef} className="phi-scroll h-screen flex flex-col items-center justify-center px-8 text-center relative overflow-hidden">
        
        {/* Main Heading & Subheading - Intro Animated */}
        <div className="manifesto-header absolute top-[15vh] left-0 w-full text-center px-8 z-20 pointer-events-none">
          <h1 className="text-[11px] tracking-[1.2em] opacity-30 uppercase font-sans mb-5 text-white">The Manifesto</h1>
          <p className="text-lg md:text-xl font-serif italic opacity-20 max-w-xl mx-auto leading-relaxed text-white">
            A declaration of aesthetic and molecular purity.
          </p>
        </div>

        <div className="relative z-10 w-full flex items-center justify-center h-64">
          <p 
            ref={firstLineRef}
            className="phi-line opacity-100 translate-y-0 text-3xl md:text-7xl font-serif absolute w-full max-w-5xl pointer-events-auto px-4 font-light text-white leading-tight"
          >
            Luxury is the absence of persuasion.
          </p>
          <p className="phi-line opacity-0 translate-y-16 text-3xl md:text-7xl font-serif absolute w-full max-w-5xl pointer-events-none px-4 font-light text-white leading-tight">
            We speak only when we have reduced the world.
          </p>
          <p className="phi-line opacity-0 translate-y-16 text-3xl md:text-7xl font-serif absolute w-full max-w-5xl pointer-events-none px-4 font-light text-white leading-tight">
            Voidblossom is the silence before the bloom.
          </p>
        </div>

        <div className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 flex flex-col items-center opacity-10">
          <span className="text-[10px] uppercase tracking-[0.5em] mb-6 font-sans">Scroll to reveal</span>
          <div className="w-[1px] h-16 bg-white/40" />
        </div>
      </section>
      
      {/* SECTION 2: COMPANY MANIFESTO - THE ETHOS */}
      <section className="py-48 md:py-80 px-8 md:px-24 bg-[#0E0E0E]">
        <div className="max-w-6xl mx-auto flex flex-col items-start gap-20 md:gap-32">
          <div className="reveal-block">
             <h4 className="text-[10px] uppercase tracking-[1em] opacity-20 font-sans mb-10 text-white">Ethos</h4>
             <h2 className="text-5xl md:text-[10rem] font-serif leading-[0.85] tracking-tighter max-w-5xl text-white font-light">
               Against the <br/><span className="italic">noise of surplus.</span>
             </h2>
          </div>
          <div className="reveal-block grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
            <p className="text-xl md:text-3xl font-serif italic opacity-40 leading-relaxed text-white font-light">
              We live in an age of aesthetic friction. Brands scream for attention while offering nothing to the soul. Voidblossom was founded to be the visual and chemical opposite of the market.
            </p>
            <div className="space-y-12 font-sans text-[11px] tracking-[0.5em] opacity-30 leading-loose uppercase text-white">
              <p>We do not advertise. We notify.</p>
              <p>We do not package. We vessel.</p>
              <p>We do not compete. We exist.</p>
              <p>Our goal is not to improve your vanity, but to respect your biology through radical reduction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCT MANIFESTO - THE FORMULA */}
      <section className="py-48 md:py-80 px-8 md:px-24 bg-[#F6F5F3] text-black overflow-hidden relative">
         <div className="absolute -top-32 -right-32 w-96 h-96 bg-black/[0.03] rounded-full blur-[120px]" />
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="reveal-block mb-40">
               <h4 className="text-[11px] uppercase tracking-[1.2em] opacity-30 font-sans mb-12">Product Manifesto</h4>
               <h2 className="text-4xl md:text-[8rem] font-serif leading-[0.9] tracking-tighter font-light">The Molecule <br/>is <span className="italic">Sacred.</span></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
               <div className="reveal-block md:col-span-7 space-y-24">
                  <div className="space-y-8">
                    <h3 className="text-2xl md:text-3xl font-serif border-b border-black/10 pb-6 font-light">On Preservation</h3>
                    <p className="text-xl md:text-2xl font-serif leading-relaxed opacity-60 font-light">
                      Standard industry glass is porous to light. It allows UV and high-energy visible frequencies to vibrate at the frequency of destruction, tearing apart the delicate bonds of L-ascorbic acid. Our Obsidian glass acts as a vault - blocking 100% of the spectrum.
                    </p>
                  </div>
                  <div className="space-y-8">
                    <h3 className="text-2xl md:text-3xl font-serif border-b border-black/10 pb-6 font-light">On Volatility</h3>
                    <p className="text-xl md:text-2xl font-serif leading-relaxed opacity-60 font-light">
                      We accept the volatility of nature. We do not use synthetics to "calm" our ingredients into submission. We use nitrogen displacement during bottling to ensure the formula never meets air until it meets your skin.
                    </p>
                  </div>
               </div>
               
               <div className="reveal-block md:col-span-4 md:col-start-9 flex flex-col justify-center">
                  <div className="p-12 border border-black/10 bg-white/50 backdrop-blur-sm">
                    <ul className="space-y-8">
                      <li className="flex justify-between items-end border-b border-black/5 pb-4">
                        <span className="text-[10px] uppercase tracking-[0.6em] font-sans opacity-40">Fragrance</span>
                        <span className="font-serif italic text-lg">Zero</span>
                      </li>
                      <li className="flex justify-between items-end border-b border-black/5 pb-4">
                        <span className="text-[10px] uppercase tracking-[0.6em] font-sans opacity-40">Fillers</span>
                        <span className="font-serif italic text-lg">Zero</span>
                      </li>
                      <li className="flex justify-between items-end border-b border-black/5 pb-4">
                        <span className="text-[10px] uppercase tracking-[0.6em] font-sans opacity-40">Stability Index</span>
                        <span className="font-serif italic text-lg">99.8%</span>
                      </li>
                      <li className="flex justify-between items-end border-b border-black/5 pb-4">
                        <span className="text-[10px] uppercase tracking-[0.6em] font-sans opacity-40">Batch Cycle</span>
                        <span className="font-serif italic text-lg">Lunar</span>
                      </li>
                    </ul>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 4: THE THREE TENETS */}
      <section className="py-48 md:py-80 px-8 md:px-24 bg-[#0E0E0E] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-16">
            
            <div className="reveal-block space-y-12">
              <span className="text-5xl md:text-7xl font-serif opacity-10 text-white font-light">01</span>
              <h3 className="text-xl uppercase tracking-[0.6em] font-sans border-b border-white/10 pb-6 text-white">Reduction</h3>
              <p className="text-lg font-serif italic opacity-40 leading-relaxed text-white font-light">
                We remove until only the essential remains. No fragrance, no fillers, no unnecessary noise. Pure molecular intent.
              </p>
            </div>

            <div className="reveal-block space-y-12 md:mt-32">
              <span className="text-5xl md:text-7xl font-serif opacity-10 text-white font-light">02</span>
              <h3 className="text-xl uppercase tracking-[0.6em] font-sans border-b border-white/10 pb-6 text-white">Stability</h3>
              <p className="text-lg font-serif italic opacity-40 leading-relaxed text-white font-light">
                Active ingredients are volatile. We design environments - obsidian glass and nitrogen caps - to preserve absolute efficacy.
              </p>
            </div>

            <div className="reveal-block space-y-12 md:mt-64">
              <span className="text-5xl md:text-7xl font-serif opacity-10 text-white font-light">03</span>
              <h3 className="text-xl uppercase tracking-[0.6em] font-sans border-b border-white/10 pb-6 text-white">Silence</h3>
              <p className="text-lg font-serif italic opacity-40 leading-relaxed text-white font-light">
                A product should not shout. It should sit in a space as an object of art, performing its duty with quiet authority.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: THE FINAL DECLARATION */}
      <section className="py-64 px-8 md:px-24 bg-[#0E0E0E] text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.01] blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto reveal-block space-y-16 relative z-10">
           <h2 className="text-3xl md:text-6xl font-serif opacity-25 italic text-white font-light leading-relaxed">
             "The highest form of luxury is the ability to be quiet in a world that never stops talking."
           </h2>
           <div className="flex flex-col items-center gap-8">
              <div className="w-[1px] h-20 bg-white/10" />
              <p className="text-[11px] uppercase tracking-[1em] font-sans opacity-40 text-white">Voidblossom Collective</p>
           </div>
        </div>
      </section>

    </div>
  );
};

export default Philosophy;
