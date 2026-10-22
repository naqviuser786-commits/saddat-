import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { preloadAll360Frames } from "../../utils/frameLoader";

interface LuxuryPreloaderProps {
  onComplete: () => void;
}

export default function LuxuryPreloader({ onComplete }: LuxuryPreloaderProps) {
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("INITIALIZING 360° ATELIER FRAMES...");
  const preloaderRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isFinishedRef = useRef<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Start REAL frame loading
    preloadAll360Frames((pct, status) => {
      setProgress(pct);
      setStatusText(status);

      if (pct >= 100 && !isFinishedRef.current) {
        isFinishedRef.current = true;

        setTimeout(() => {
          if (preloaderRef.current && contentRef.current) {
            const tl = gsap.timeline({
              onComplete: () => {
                document.body.style.overflow = "";
                onComplete();
              },
            });

            tl.to(contentRef.current, {
              opacity: 0,
              y: -20,
              duration: 0.4,
              ease: "power2.in",
            }).to(
              preloaderRef.current,
              {
                yPercent: -100,
                duration: 0.75,
                ease: "power4.inOut",
              },
              "-=0.1"
            );
          } else {
            document.body.style.overflow = "";
            onComplete();
          }
        }, 200);
      }
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#0E0804] text-stone-100 flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none pointer-events-auto"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, #1E120A 0%, #0E0804 100%)",
      }}
    >
      {/* Top Header Label */}
      <div className="flex items-center justify-between text-xs font-mono text-stone-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="text-[#C5A880] tracking-[0.25em] uppercase font-bold text-[11px]">
            SADDAT ATELIER
          </span>
        </div>
        <span className="tracking-[0.2em] uppercase text-[10px]">
          2026 ARCHITECTURAL SUITE
        </span>
      </div>

      {/* Center Monogram & Real Numerical Counter */}
      <div ref={contentRef} className="max-w-md mx-auto text-center space-y-6 my-auto">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto border border-[#C5A880]/50 bg-[#1A100A] flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl shadow-[0_0_35px_rgba(197,168,128,0.25)] relative">
          <span>S</span>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#C5A880]" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#C5A880]" />
        </div>

        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-[0.3em] uppercase font-sans text-white">
            SADDAT
          </h1>
          <p className="text-[10px] font-mono tracking-[0.35em] text-[#C5A880] uppercase">
            OFFICE FURNITURE
          </p>
        </div>

        {/* Real Percentage Display */}
        <div className="text-5xl sm:text-7xl font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0] tracking-tight">
          {String(progress).padStart(2, "0")}
          <span className="text-xl sm:text-2xl font-mono text-[#C5A880] ml-1">%</span>
        </div>

        <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-stone-400 uppercase animate-pulse">
          {statusText}
        </p>

        {/* Real Progress Bar */}
        <div className="w-full max-w-xs mx-auto h-[2px] bg-white/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#C5A880] shadow-[0_0_12px_#C5A880] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-stone-500 uppercase tracking-wider text-center sm:text-left">
        <span>BIFMA X5.1 CERTIFIED ERGONOMICS</span>
        <span className="text-stone-400">KARACHI &bull; LAHORE &bull; ISLAMABAD</span>
      </div>
    </div>
  );
}