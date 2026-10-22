import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom Hook for GSAP Animations with auto-cleanup
 * Route change par background triggers crash nahi honge
 */
export function useGsapContext(scopeRef?: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    // GSAP context provides easy scoped animations & automatic cleanup
    const ctx = gsap.context(() => {}, scopeRef?.current || undefined);
    
    return () => {
      ctx.revert(); // Complete cleanup when component unmounts
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [scopeRef]);
}

/**
 * Reusable utility for scroll-triggered clip-path reveal on images
 */
export function animateImageReveal(element: HTMLElement | null, delay = 0) {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      scale: 1.15,
      opacity: 0.2,
    },
    {
      clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
      scale: 1,
      opacity: 1,
      duration: 1.2,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * Reusable utility for upward staggered text reveal
 */
export function animateTextReveal(element: HTMLElement | null, delay = 0) {
  if (!element) return;

  gsap.fromTo(
    element,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    }
  );
}