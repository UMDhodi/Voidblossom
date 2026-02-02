
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollThreshold = 10;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY);

      if (currentScrollY < 50) {
        gsap.to(navRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "expo.out"
        });
      } else if (diff > scrollThreshold) {
        if (currentScrollY > lastScrollY) {
          gsap.to(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.6,
            ease: "expo.inOut",
            overwrite: true
          });
        } else {
          gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "expo.out",
            overwrite: true
          });
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        visibility: 'visible',
        duration: 1.5,
        ease: "expo.inOut"
      });
      gsap.fromTo(linksRef.current?.children || [],
        { y: 100, opacity: 0, skewY: 4 },
        { y: 0, opacity: 1, skewY: 0, stagger: 0.1, duration: 1.4, ease: "expo.out", delay: 0.5 }
      );
    } else {
      document.body.style.overflow = 'auto';
      gsap.to(menuRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(menuRef.current, { visibility: 'hidden' });
        }
      });
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full px-8 py-10 md:px-20 flex justify-between items-center z-[100] mix-blend-difference"
      >
        <Link to="/" className="text-xl font-serif tracking-[0.25em] font-light text-white hover:opacity-50 transition-opacity duration-500">
          VOIDBLOSSOM
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex flex-col items-end gap-2.5 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span className={`h-[1px] bg-white transition-all duration-700 ease-expo ${isOpen ? 'w-10 rotate-45 translate-y-[11px]' : 'w-10'}`} />
          <span className={`h-[1px] bg-white transition-all duration-700 ease-expo ${isOpen ? 'w-10 -rotate-45 -translate-y-[11px]' : 'w-5'}`} />
        </button>
      </nav>

      <div
        ref={menuRef}
        className="fixed inset-0 bg-[#0E0E0E] z-[90] invisible flex flex-col items-center justify-center overflow-hidden"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        <div ref={linksRef} className="flex flex-col items-center space-y-6 md:space-y-10">
          {[
            { label: 'ESSENCE', path: '/' },
            { label: 'VOID 01', path: '/product' },
            { label: 'MANIFESTO', path: '/philosophy' },
            { label: 'THE MAKERS', path: '/about' },
            { label: 'INQUIRY', path: '/contact' }
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="text-4xl md:text-7xl font-serif hover:italic hover:text-[#C5B358] transition-all duration-700 tracking-tighter uppercase font-light text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-16 text-[8px] tracking-[1em] opacity-20 uppercase font-sans text-white">
          The Architecture of Pure Absence
        </div>
      </div>
    </>
  );
};

export default Navbar;
