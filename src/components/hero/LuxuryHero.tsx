import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowUpRight, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  ChevronDown,
  MessageSquare
} from "lucide-react";
import ChairFrameSequence, { TOTAL_FRAMES } from "./ChairFrameSequence";
import HeroNavigation from "./HeroNavigation";
import { getGeneralWhatsAppUrl } from "../../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCallout {
  start: number;
  end: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  alignment: "left" | "right";
}

const ROTATION_CALLOUTS: FeatureCallout[] = [
  {
    start: 0.12,
    end: 0.28,
    number: "01",
    title: "High-Tensile AeroMesh",
    subtitle: "ANATOMICAL SPINAL TRACKING",
    description: "Multidirectional breathable matrix eliminates thermal fatigue during 10+ hour executive workdays.",
    alignment: "left",
  },
  {
    start: 0.32,
    end: 0.48,
    number: "02",
    title: "Synchronous Kinematics",
    subtitle: "COLD-FORGED ALLOY CORE",
    description: "Fluid 135° recline with precision 4-point posture memory locking for dynamic ergonomic balance.",
    alignment: "right",
  },
  {
    start: 0.52,
    end: 0.68,
    number: "03",
    title: "Class-4 Star Base",
    subtitle: "BIFMA X5.1 CERTIFIED",
    description: "Mirror-cast structural aluminum alloy star base tested to withstand 150kg+ continuous commercial loads.",
    alignment: "left",
  },
];

export default function LuxuryHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinStageRef = useRef<HTMLDivElement | null>(null);

  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Clean Natural Pinning: pinSpacing: false prevents layout clashes
  useEffect(() => {
    if (!containerRef.current || !pinStageRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinStageRef.current,
        pinSpacing: false,
        scrub: 0.35,
        anticipatePin: 1,
        onUpdate: (self) => {
          const prog = self.progress;
          setScrollProgress(prog);

          // Chair spins smoothly from 0% to 75% of scroll
          const chairProgress = Math.min(1, Math.max(0, prog / 0.75));
          const targetFrame = Math.min(
            TOTAL_FRAMES,
            Math.max(1, Math.round(chairProgress * (TOTAL_FRAMES - 1)) + 1)
          );
          setCurrentFrame(targetFrame);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Phase 1: Initial "Scroll to Inspect" badge
  const scrollHintOpacity = useMemo(() => {
    if (scrollProgress <= 0.02) return 1;
    if (scrollProgress >= 0.10) return 0;
    return 1 - (scrollProgress - 0.02) / 0.08;
  }, [scrollProgress]);

  // Phase 2: Finale Chair Position
  const chairStageStyles = useMemo(() => {
    if (scrollProgress < 0.75) {
      return {
        transform: "translate3d(0, 0, 0) scale(1)",
        opacity: 1,
      };
    }
    const t = Math.min(1, (scrollProgress - 0.75) / 0.20);
    const translateX = window.innerWidth >= 1024 ? t * 14 : 0;
    return {
      transform: `translate3d(${translateX}%, 0, 0) scale(1.02)`,
      opacity: 1,
    };
  }, [scrollProgress]);

  // Phase 3: Grand Editorial Hero Revelation
  const heroRevealProgress = useMemo(() => {
    if (scrollProgress < 0.75) return 0;
    if (scrollProgress >= 0.95) return 1;
    return (scrollProgress - 0.75) / 0.20;
  }, [scrollProgress]);

  const heroTranslateY = (1 - heroRevealProgress) * 35;

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#18110B] text-stone-100"
      style={{
        height: "400vh",
      }}
    >
      {/* Pinned 100vh Stage */}
      <div
        ref={pinStageRef}
        className="w-full h-screen overflow-hidden relative flex flex-col justify-between"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, #2B1C12 0%, #1E130B 50%, #120B07 100%)",
        }}
      >
        <HeroNavigation />

        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(197, 168, 128, 0.08) 0px, rgba(197, 168, 128, 0.08) 1px, transparent 1px, transparent 64px)",
          }}
        />

        {/* 1. CHAIR CANVAS (Zero lag, instant draw) */}
        <div 
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 transition-transform duration-500 ease-out"
          style={chairStageStyles}
        >
          <ChairFrameSequence
            currentFrame={currentFrame}
            className="w-full h-full"
          />
        </div>

        {/* 2. INITIAL PHASE: Notice */}
        <div
          className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 sm:pt-36 pointer-events-none transition-opacity duration-300 text-left"
          style={{
            opacity: scrollHintOpacity,
            visibility: scrollHintOpacity > 0 ? "visible" : "hidden",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A1B12]/85 backdrop-blur-md border border-[#C5A880]/40 text-[10px] font-mono tracking-[0.25em] text-[#E0C6A0] uppercase shadow-sm">
            <RotateCcw className="w-3.5 h-3.5 text-[#C5A880] animate-spin" style={{ animationDuration: "14s" }} />
            <span>Photogrammetric 360° Atelier Inspection</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight mt-3 max-w-2xl leading-[1.05]">
            Scroll to experience <br />
            <span className="italic font-normal text-[#C5A880]">
              the anatomy of executive posture.
            </span>
          </h2>

          <div className="flex items-center gap-2 mt-4 text-xs font-mono text-[#C5A880]/90 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
            <span>Scroll Down to Rotate</span>
          </div>
        </div>

        {/* 3. ROTATION MICRO-CALLOUTS */}
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {ROTATION_CALLOUTS.map((callout, idx) => {
              const mid = (callout.start + callout.end) / 2;
              const range = (callout.end - callout.start) / 2;
              const dist = Math.abs(scrollProgress - mid);

              let opacity = 0;
              if (scrollProgress >= callout.start && scrollProgress <= callout.end) {
                opacity = 1 - Math.pow(dist / range, 1.8);
                opacity = Math.max(0, Math.min(1, opacity));
              }

              const isLeft = callout.alignment === "left";
              const translateY = (scrollProgress - mid) * 30;

              return (
                <div
                  key={idx}
                  className={`max-w-xs sm:max-w-sm transition-opacity duration-150 ease-out ${
                    isLeft ? "mr-auto text-left" : "ml-auto text-left"
                  }`}
                  style={{
                    opacity,
                    transform: `translate3d(0, ${translateY}px, 0)`,
                    visibility: opacity > 0.05 ? "visible" : "hidden",
                  }}
                >
                  <div className="bg-[#1C120B]/90 backdrop-blur-md p-6 border-l-2 border-[#C5A880] shadow-2xl border-t border-r border-b border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase font-bold">
                        {callout.subtitle}
                      </span>
                      <span className="text-xs font-mono text-stone-400">
                        {callout.number}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif text-white tracking-tight mb-2">
                      {callout.title}
                    </h3>
                    <p className="text-xs text-stone-300 leading-relaxed font-normal">
                      {callout.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. FINALE: EDITORIAL STORY */}
        <div
          className="absolute inset-0 z-40 flex items-center justify-start pointer-events-none transition-all duration-300 text-left"
          style={{
            opacity: heroRevealProgress,
            transform: `translate3d(0, ${heroTranslateY}px, 0)`,
            visibility: heroRevealProgress > 0.02 ? "visible" : "hidden",
          }}
        >
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 pointer-events-auto">
            <div className="max-w-2xl bg-[#1C120B]/95 backdrop-blur-xl p-8 sm:p-12 border border-[#C5A880]/35 shadow-2xl relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

              <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.28em] text-[#E0C6A0] uppercase font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>SADDAT ATELIER // 2026 ARCHITECTURAL SUITE</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[0.98] mb-5">
                Posture, <br />
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                  refined to pure art.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-lg mb-8 font-normal">
                Hand-curated executive ergonomics crafted with aerospace-grade cold kinematics, breathable matrix weave, and bespoke walnut finishes for Pakistan’s finest boardrooms and corporate headquarters.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#C5A880]/20 mb-8 text-xs text-stone-300 font-medium">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                  <span>BIFMA Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                  <span>2-Year Replacement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Turnkey Deployment</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/products/chairs"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C5A880] hover:bg-[#D4BA93] text-[#180F0A] text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-lg hover:shadow-[#C5A880]/20"
                >
                  <span>Explore Seating Suite</span>
                  <ArrowUpRight className="w-4 h-4 text-[#180F0A]" />
                </Link>

                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/5 hover:bg-white/10 text-stone-200 border border-[#C5A880]/40 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-200 backdrop-blur-sm"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Corporate WhatsApp Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 5. BOTTOM STATUS STRIP */}
        <footer className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-6 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase select-none pointer-events-none text-stone-400">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span className="text-stone-200 font-semibold">
              FRAME {String(currentFrame).padStart(3, "0")} / {TOTAL_FRAMES}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 w-48">
            <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 bottom-0 bg-[#C5A880] transition-all duration-75"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span>{Math.round(scrollProgress * 100)}%</span>
          </div>

          <div className="flex items-center gap-1.5">
            {scrollProgress < 0.75 ? (
              <span className="animate-pulse text-[#C5A880]">SCROLL TO ROTATE 360°</span>
            ) : (
              <span className="text-[#E0C6A0] font-bold">ATELIER SHOWCASE ACTIVE</span>
            )}
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </footer>
      </div>
    </div>
  );
}