
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // 1. INITIAL REVEAL (Page Load)
      const tlIntro = gsap.timeline({ defaults: { ease: "expo.out" } });

      tlIntro
        .fromTo(".hero-bg-accent", { opacity: 0 }, { opacity: 1, duration: 2.5 })
        .fromTo(brandRef.current,
          { opacity: 0, y: 30, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 2.2 },
          "-=1.8"
        )
        // Reduced the upward 'y' travel to ensure it never hits the header during reveal
        .fromTo(productRef.current,
          { opacity: 0, scale: 0.9, y: 100 },
          { opacity: 1, scale: 1, y: 0, duration: 3, ease: "expo.out" },
          "-=2.4"
        )
        .fromTo(".narrative-step-1",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.8 },
          "-=2.2"
        );

      // 2. SCROLL EXPERIENCE (Narrative Journey)
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      });

      masterTl
        // Step 1 -> Step 2: Reduced Complexity
        .to(".narrative-step-1", { opacity: 0, y: -50, filter: "blur(10px)", duration: 1 })
        .to(productRef.current, {
          x: isMobile ? "0%" : "-32%",
          scale: isMobile ? 1.3 : 0.8,
          rotateZ: isMobile ? 3 : -4,
          duration: 2.5,
          ease: "power2.inOut"
        }, "-=0.5")
        .fromTo(".narrative-step-2",
          { opacity: 0, x: isMobile ? 0 : 160, y: isMobile ? 60 : 0, filter: "blur(15px)" },
          { opacity: 1, x: 0, y: 0, filter: "blur(0px)", duration: 2 },
          "-=1.5"
        )

        // Step 2 -> Step 3: Obsidian Glass
        .to(".narrative-step-2", { opacity: 0, y: -60, duration: 1.2 }, "+=1")
        .to(productRef.current, {
          x: isMobile ? "0%" : "32%",
          scale: isMobile ? 1.5 : 1.1,
          rotateZ: isMobile ? -3 : 5,
          duration: 3,
          ease: "power2.inOut"
        }, "-=0.5")
        .fromTo(".narrative-step-3",
          { opacity: 0, x: isMobile ? 0 : -160, y: isMobile ? 60 : 0, filter: "blur(15px)" },
          { opacity: 1, x: 0, y: 0, filter: "blur(0px)", duration: 2 },
          "-=1.5"
        )

        // Step 3 -> Outro: The Call to Action
        .to(".narrative-step-3", { opacity: 0, y: -60, duration: 1.2 }, "+=1")
        .to(productRef.current, {
          x: "0%",
          y: isMobile ? "-10vh" : "-18vh",
          scale: isMobile ? 0.7 : 0.55,
          rotateZ: 0,
          opacity: 0.1,
          duration: 3,
          ease: "power2.inOut"
        }, "-=0.5")
        .fromTo(".narrative-step-4",
          { opacity: 0, y: 80, filter: "blur(15px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 2.5 },
          "-=2.0"
        );

      // Secondary sections reveals
      gsap.utils.toArray('.reveal-section').forEach((section: any) => {
        gsap.from(section, {
          y: 120,
          opacity: 0,
          duration: 2.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0E0E0E] relative min-h-screen selection:bg-white selection:text-black overflow-hidden">

      {/* BACKGROUND ELEMENTS */}
      <div className="hero-bg-accent absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-25%] left-[-15%] w-[65%] h-[65%] bg-white/[0.04] rounded-full blur-[200px]" />
        <div className="absolute bottom-[-25%] right-[-15%] w-[75%] h-[75%] bg-white/[0.02] rounded-full blur-[220px]" />
      </div>

      {/* HERO SECTION */}
      <section className="h-screen w-full flex flex-col items-center justify-start px-8 md:px-24 overflow-hidden relative">

        {/* TOP BRANDING - FIXED HIGHER TO ENSURE GAP */}
        <div ref={brandRef} className="absolute top-[6vh] md:top-[8vh] text-center z-[100] opacity-0 pointer-events-none">
          <h2 className="text-[9px] tracking-[1.4em] font-sans uppercase opacity-40 mb-5 text-white">Essence in Absentia</h2>
          <h1 className="text-4xl md:text-8xl font-serif tracking-[0.4em] uppercase text-white font-light">VOIDBLOSSOM</h1>
        </div>

        {/* PRODUCT STAGE - INCREASED TOP MARGIN FOR DEFINITIVE GAP */}
        {/* The large MT ensures the image starts well below the brand text even on short screens */}
        <div ref={productRef} className="relative z-10 flex items-center justify-center w-full max-w-2xl aspect-square opacity-0 transform-gpu mt-[38vh] md:mt-[28vh]">
          <img
            src={`${import.meta.env.BASE_URL}hero.png`}
            alt="Void 01 Molecule Vessel"
            className="h-[42vh] md:h-[68vh] w-auto object-contain mix-blend-screen drop-shadow-[0_100px_120px_rgba(0,0,0,1)] brightness-[1.1]"
          />
        </div>

        {/* NARRATIVE STEPS - THESE OVERLAY THE PNG ON SCROLL */}
        <div ref={narrativeRef} className="absolute inset-0 flex items-center justify-center pointer-events-none px-8 md:px-32 z-50">

          {/* STEP 1: INITIAL SUBTITLE */}
          <div className="narrative-step-1 absolute bottom-[10vh] md:bottom-[6vh] text-center">
            <p className="text-[10px] md:text-xs font-sans uppercase tracking-[1.2em] opacity-40 text-white">Series 01 - Vitamin C Concentrate</p>
          </div>

          {/* STEP 2: REDUCED COMPLEXITY 
              Mobile: mix-blend-difference creates the "multicolor" inversion when text hits white PNG parts.
          */}
          <div className="narrative-step-2 absolute w-full md:w-auto md:right-[4%] text-center md:text-right opacity-0 mix-blend-difference md:mix-blend-normal px-8 md:px-0">
            <h3 className="text-5xl md:text-[9rem] font-serif mb-8 leading-[0.9] text-white font-light tracking-tighter">Reduced <br />Complexity.</h3>
            <p className="text-[12px] md:text-[13px] font-sans uppercase tracking-[0.6em] opacity-40 md:opacity-30 leading-loose text-white max-w-[280px] md:max-w-lg mx-auto md:ml-auto">
              We remove until only the essential remains. <br className="hidden md:block" />A singular focus on molecular stability.
            </p>
          </div>

          {/* STEP 3: OBSIDIAN GLASS */}
          <div className="narrative-step-3 absolute w-full md:w-auto md:left-[4%] text-center md:text-left opacity-0 mix-blend-difference md:mix-blend-normal px-8 md:px-0">
            <h3 className="text-5xl md:text-[9rem] font-serif mb-8 leading-[0.9] text-white font-light tracking-tighter">Obsidian <br />Glass.</h3>
            <p className="text-[12px] md:text-[13px] font-sans uppercase tracking-[0.6em] opacity-40 md:opacity-30 leading-loose text-white max-w-[280px] md:max-w-lg mx-auto md:mr-auto">
              Absolute protection from the visible spectrum. <br className="hidden md:block" />Preserving potency in permanent shadow.
            </p>
          </div>

          {/* STEP 4: FINAL CTA */}
          <div className="narrative-step-4 absolute text-center opacity-0 pointer-events-auto">
            <p className="text-2xl md:text-5xl font-serif italic mb-16 opacity-60 text-white font-light px-8 leading-tight">"The luxury of radical restraint."</p>
            <div className="flex flex-col items-center">
              <Link to="/product" className="group relative inline-block">
                <span className="text-[12px] font-sans uppercase tracking-[1em] text-[#F6F5F3] transition-opacity group-hover:opacity-40">Acquire Series 01</span>
                <span className="absolute left-0 -bottom-6 w-full h-[1px] bg-white/30 origin-right transition-transform duration-1000 scale-x-100 group-hover:scale-x-0 group-hover:origin-left" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* LUXURY WHITE BANNER */}
      <section className="reveal-section py-56 md:py-80 px-8 bg-[#F6F5F3] text-black overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-black/[0.08]" />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="text-[10px] tracking-[1.6em] uppercase opacity-40 font-sans mb-12">Product Statement</span>
          <h3 className="text-2xl md:text-4xl font-serif tracking-[0.5em] uppercase mb-16 md:mb-20 font-light">VOID 01 — MOLECULE</h3>
          <h2 className="text-4xl md:text-[10rem] font-serif italic leading-[0.85] max-w-7xl tracking-tighter mb-24 md:mb-32 px-4">
            "We do not decorate the skin. We nourish the silence beneath it."
          </h2>
          <div className="w-[1px] h-32 md:h-48 bg-black/10 my-16 md:my-20" />
          <p className="text-[11px] uppercase tracking-[1.2em] font-sans opacity-50 leading-loose">
            L-Ascorbic Acid / Stabilized / Pure Absence / 10ml Batch 01
          </p>
        </div>
      </section>

      {/* MATERIALITY SECTION */}
      <section className="reveal-section py-64 px-8 bg-[#090909] border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]" />
        <div className="max-w-6xl mx-auto text-center space-y-24 relative z-10">
          <span className="text-[10px] tracking-[1.4em] opacity-40 uppercase block font-sans text-white">The Vessel</span>
          <h2 className="text-6xl md:text-[11rem] font-serif leading-[0.85] tracking-tighter text-white font-light">The weight <br /> of intentional <br /> restraint.</h2>
          <div className="pt-24">
            <Link to="/philosophy" className="text-[12px] uppercase tracking-[0.9em] border-b border-white/20 pb-5 hover:border-white transition-all duration-700 text-white">Read the Manifesto</Link>
          </div>
        </div>
      </section>

      {/* BRAND CLOSURE */}
      <section className="reveal-section py-56 md:py-[35vh] bg-[#0E0E0E] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.006] opacity-40 blur-[150px] pointer-events-none" />
        <div className="text-center px-8 relative z-10">
          <p className="max-w-5xl text-3xl md:text-6xl font-serif italic mb-24 opacity-30 text-white leading-[1.2] font-light">
            "Voidblossom is for those who understand that the most powerful thing in a room is the stillness."
          </p>
          <div className="flex flex-col items-center gap-20">
            <div className="w-[1px] h-20 bg-white/20" />
            <Link to="/product" className="text-[13px] uppercase tracking-[1.1em] font-sans text-white border border-white/10 px-20 py-7 hover:bg-white hover:text-black transition-all duration-1000 font-light">
              Explore Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
