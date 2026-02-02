
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trail1Ref = useRef<HTMLDivElement>(null);
  const trail2Ref = useRef<HTMLDivElement>(null);
  const trail3Ref = useRef<HTMLDivElement>(null);
  const trail4Ref = useRef<HTMLDivElement>(null);
  const trail5Ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Primary dot - precise and sharp
      gsap.to(cursorRef.current, {
        x,
        y,
        duration: 0.1,
        ease: "none"
      });

      // Main follower ring - the core of the motion
      gsap.to(followerRef.current, {
        x,
        y,
        duration: 0.4,
        ease: "power3.out"
      });

      // Trail Layer 1 - Close ghosting
      gsap.to(trail1Ref.current, {
        x,
        y,
        duration: 0.55,
        ease: "power2.out"
      });

      // Trail Layer 2 - Soft blur
      gsap.to(trail2Ref.current, {
        x,
        y,
        duration: 0.75,
        ease: "power2.out"
      });

      // Trail Layer 3 - Deep blur
      gsap.to(trail3Ref.current, {
        x,
        y,
        duration: 1.0,
        ease: "power1.out"
      });

      // Trail Layer 4 - Ethereal after-image (Luxurious lag)
      gsap.to(trail4Ref.current, {
        x,
        y,
        duration: 1.3,
        ease: "power1.out"
      });

      // Trail Layer 5 - The 'Void' trail (Almost imperceptible)
      gsap.to(trail5Ref.current, {
        x,
        y,
        duration: 1.6,
        ease: "sine.out"
      });
    };

    const onPointerEnter = () => {
      const elements = [
        followerRef.current, 
        trail1Ref.current, 
        trail2Ref.current, 
        trail3Ref.current, 
        trail4Ref.current, 
        trail5Ref.current
      ];
      gsap.to(elements, {
        scale: 2.8,
        backgroundColor: "rgba(197, 179, 88, 0.05)",
        borderColor: "rgba(197, 179, 88, 0.3)",
        duration: 0.8,
        stagger: 0.03,
        ease: "expo.out"
      });
    };

    const onPointerLeave = () => {
      const elements = [
        followerRef.current, 
        trail1Ref.current, 
        trail2Ref.current, 
        trail3Ref.current, 
        trail4Ref.current, 
        trail5Ref.current
      ];
      gsap.to(elements, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(246, 245, 243, 0.15)",
        duration: 0.8,
        stagger: -0.03,
        ease: "expo.out"
      });
    };

    window.addEventListener('mousemove', moveCursor);

    const updateLinks = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, .about-image-wrapper');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', onPointerEnter);
        el.addEventListener('mouseleave', onPointerLeave);
      });
    };

    updateLinks();

    const observer = new MutationObserver(updateLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  // Subtle accent shift on About page for the cursor trail
  const isAboutPage = location.pathname === '/about';

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] mix-blend-difference hidden md:block">
      {/* Ghost Trail 5 - Deepest lag, silken vanishing */}
      <div 
        ref={trail5Ref} 
        className={`fixed top-0 left-0 w-8 h-8 border rounded-full -translate-x-1/2 -translate-y-1/2 blur-[10px] opacity-[0.02] ${isAboutPage ? 'border-[#C5B358]' : 'border-[#F6F5F3]'}`}
      />

      {/* Ghost Trail 4 - Ethereal drift */}
      <div 
        ref={trail4Ref} 
        className={`fixed top-0 left-0 w-8 h-8 border rounded-full -translate-x-1/2 -translate-y-1/2 blur-[6px] opacity-[0.04] ${isAboutPage ? 'border-[#C5B358]' : 'border-[#F6F5F3]'}`}
      />
      
      {/* Ghost Trail 3 - Medium-high blur */}
      <div 
        ref={trail3Ref} 
        className="fixed top-0 left-0 w-8 h-8 border border-[#F6F5F3]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[4px]"
      />
      
      {/* Ghost Trail 2 - Medium blur */}
      <div 
        ref={trail2Ref} 
        className="fixed top-0 left-0 w-8 h-8 border border-[#F6F5F3]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[2px]"
      />
      
      {/* Ghost Trail 1 - Light blur */}
      <div 
        ref={trail1Ref} 
        className="fixed top-0 left-0 w-8 h-8 border border-[#F6F5F3]/15 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[1px]"
      />

      {/* Main Follower Ring */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-[#F6F5F3]/25 rounded-full -translate-x-1/2 -translate-y-1/2"
      />

      {/* Primary Dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#F6F5F3] rounded-full -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default CustomCursor;
