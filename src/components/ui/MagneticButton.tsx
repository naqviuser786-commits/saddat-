import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Magnetic pull factor (Default: 0.35)
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
}: MagneticButtonProps) {
  const magnetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = magnetRef.current;
    // Touch screens par bypass karein taake mobile par koi glitch na ho
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    // GPU-accelerated GSAP quickTo setters for 120Hz smooth tracking
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      xTo(distanceX);
      yTo(distanceY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={magnetRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}