import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Sparkles, ShieldCheck } from "lucide-react";

interface LuxuryPreloaderProps {
  onComplete: () => void;
}

const CRITICAL_ASSETS = [
  "/all-frames/ezgif-frame-001.png",
  "/Ergonomic%20Executive%20Chair.png",
  "/Premium%20Leather%20Executive%20Chair.png",
  "/Modern%20Task%20Chair%20Feature%20Showcase.png",
];

export default function LuxuryPreloader({ onComplete }: LuxuryPreloaderProps) {
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("INITIALIZING ATELIER CORE...");
  const preloaderRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Lock scroll during preloading
    document.body.style.overflow = "hidden";

    let loadedCount = 0;
    const totalAssets = CRITICAL_ASSETS.length + 1; // +1 for fonts

    // Preload Critical Images
    CRITICAL_ASSETS.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
      };
    });

    // Wait for Fonts
    if (document.fonts) {
      document.fonts.ready.then(() => {
        loadedCount++;
      });
    } else {
      loadedCount++;
    }

    // Smooth High-End Progress Simulation (Guarantees smooth 0 to 100 curve)
    let currentProg = 0;
    const interval = setInterval(() => {
      const targetProg = Math.round((loadedCount / totalAssets) * 100);

      // Smoothly increment towards target, ensuring a luxurious ~2.2s pacing
      if (currentProg < targetProg) {
        currentProg += Math.ceil((targetProg - currentProg) * 0.25) || 1;
      } else if (currentProg < 99) {
        currentProg += 1;
      }

      if (currentProg >= 100) {
        currentProg = 100;
        clearInterval(interval);
        setStatusText("ATELIER READY // ENTERING WORKSPACE");

        // Cinematic GSAP Curtain Raise
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
              y: -25,
              duration: 0.5,
              ease: "power2.in",
            }).to(
              preloaderRef.current,
              {
                yPercent: -100,
                duration: 0.9,
                ease: "power4.inOut",
              },
              "-=0.1"
            );
          } else {
            document.body.style.overflow = "";
            onComplete();
          }
        }, 350);
      } else if (currentProg > 75) {
        setStatusText("FINALIZING 360° SPATIAL RENDERING...");
      } else if (currentProg > 45) {
        setStatusText("CALIBRATING KINEMATIC MATRIX...");
      } else if (currentProg > 20) {
        setStatusText("SYNCHRONIZING ARCHITECTURAL ASSETS...");
      }

      setProgress(currentProg);
    }, 28);

    return () => {
      clearInterval(interval);
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
          <span className="text-[#C5A880] tracking-[0.25em] uppercase font-bold">
            SADDAT ATELIER
          </span>
        </div>
        <span className="tracking-[0.2em] uppercase text-[10px]">
          2026 ARCHITECTURAL SUITE
        </span>
      </div>

      {/* Center Cinematic Brand Monogram & Numerical Counter */}
      <div ref={contentRef} className="max-w-md mx-auto text-center space-y-6 my-auto">
        
        {/* Monogram Box */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto border border-[#C5A880]/50 bg-[#1A100A] flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl shadow-[0_0_35px_rgba(197,168,128,0.25)] relative">
          <span>S</span>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#C5A880]" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#C5A880]" />
        </div>

        {/* Wordmark */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-[0.3em] uppercase font-sans text-white">
            SADDAT
          </h1>
          <p className="text-[10px] font-mono tracking-[0.35em] text-[#C5A880] uppercase">
            OFFICE FURNITURE
          </p>
        </div>

        {/* Big Serif Numerical Counter */}
        <div className="text-5xl sm:text-7xl font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0] tracking-tight">
          {String(progress).padStart(2, "0")}
          <span className="text-xl sm:text-2xl font-mono text-[#C5A880] ml-1">%</span>
        </div>

        {/* Shifting Status Log */}
        <p className="text-[11px] font-mono tracking-[0.2em] text-stone-400 uppercase animate-pulse">
          {statusText}
        </p>

        {/* Champagne Gold Progress Line */}
        <div className="w-full max-w-xs mx-auto h-[2px] bg-white/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#C5A880] shadow-[0_0_12px_#C5A880] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      {/* Bottom Coordinates & Standards Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-stone-500 uppercase tracking-wider text-center sm:text-left">
        <span>BIFMA X5.1 CERTIFIED ERGONOMICS</span>
        <span className="text-stone-400">KARACHI &bull; LAHORE &bull; ISLAMABAD</span>
      </div>
    </div>
  );
}