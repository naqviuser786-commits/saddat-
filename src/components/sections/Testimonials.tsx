import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Star, 
  Quote, 
  Award, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp 
} from "lucide-react";
import { TESTIMONIALS_DATA } from "../../data/furnitureData";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsGridRef = useRef<HTMLDivElement | null>(null);
  const statsBarRef = useRef<HTMLDivElement | null>(null);

  // Animated Numbers State
  const [officesCount, setOfficesCount] = useState<number>(0);
  const [onTimeRate, setOnTimeRate] = useState<number>(0);
  const [warrantyYears, setWarrantyYears] = useState<number>(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header Text Reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Testimonial Cards Stagger
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Stats Bar & Number Counter Animations
      if (statsBarRef.current) {
        ScrollTrigger.create({
          trigger: statsBarRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            const counters = { offices: 0, onTime: 0, warranty: 0 };

            gsap.to(counters, {
              offices: 500,
              onTime: 99.4,
              warranty: 3,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                setOfficesCount(Math.round(counters.offices));
                setOnTimeRate(Number(counters.onTime.toFixed(1)));
                setWarrantyYears(Math.round(counters.warranty));
              },
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#120B07] text-stone-100 py-24 sm:py-32 border-t border-[#C5A880]/20 overflow-hidden"
    >
      {/* Subtle Wood Slat Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, rgba(197, 168, 128, 0.1) 0px, rgba(197, 168, 128, 0.1) 1px, transparent 1px, transparent 80px)",
        }}
      />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Header */}
        <div 
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#24170F] border border-[#C5A880]/30 text-[#C5A880] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-4 shadow-sm">
            <Award className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>VERIFIED CORPORATE CITATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.02]">
            Trusted by Pakistan’s Leading <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
              Enterprise Workplaces.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 mt-4 max-w-xl mx-auto leading-relaxed font-light">
            Empowering sustained executive focus across high-growth software houses, multinational director suites, and premier architecture firms.
          </p>
        </div>

        {/* 2. Testimonial Cards Grid */}
        <div 
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto"
        >
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-[#1C120B] rounded-none p-8 sm:p-10 border border-[#C5A880]/25 hover:border-[#C5A880]/70 transition-all duration-500 flex flex-col justify-between relative group shadow-2xl text-left"
            >
              {/* Top Gold Hover Line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

              {/* Background Accent Quote Mark */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-[#C5A880]/10 group-hover:text-[#C5A880]/20 transition-colors pointer-events-none" />

              <div className="relative z-10 space-y-4">
                {/* 5-Star Rating (Champagne Gold) */}
                <div className="flex items-center gap-1.5 text-[#C5A880]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#C5A880]" />
                  ))}
                </div>

                {/* Client Review Comment */}
                <p className="text-stone-200 text-sm sm:text-base leading-relaxed italic font-serif">
                  "{t.comment}"
                </p>
              </div>

              {/* Author & Designation Info */}
              <div className="pt-6 mt-6 border-t border-[#C5A880]/15 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-sans font-bold text-sm sm:text-base tracking-wide">
                    {t.clientName}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-0.5 font-light">
                    <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{t.designation}, {t.company}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {t.city}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Verified Enterprise Trust Strip */}
        <div className="mt-14 max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-5 border-y border-[#C5A880]/15 text-stone-400 text-xs font-mono uppercase tracking-[0.2em]">
          <span className="text-[#C5A880]">Verified Installations:</span>
          <span className="hover:text-white transition-colors">Systems Ltd</span>
          <span>&bull;</span>
          <span className="hover:text-white transition-colors">PayNex Global</span>
          <span>&bull;</span>
          <span className="hover:text-white transition-colors">Univera Foods</span>
          <span>&bull;</span>
          <span className="hover:text-white transition-colors">ArchLine Studio</span>
          <span>&bull;</span>
          <span className="hover:text-white transition-colors">Zestlogics</span>
        </div>

        {/* 4. Corporate Performance Stats Strip with Live GSAP Counters */}
        <div 
          ref={statsBarRef}
          className="mt-14 sm:mt-18 bg-gradient-to-r from-[#1A100A] via-[#24170F] to-[#1A100A] p-8 sm:p-12 border border-[#C5A880]/35 shadow-2xl max-w-5xl mx-auto relative overflow-hidden"
        >
          {/* Top Gold Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#C5A880]/20">
            
            <div className="pt-4 sm:pt-0">
              <span className="block text-4xl sm:text-5xl font-extrabold font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                {officesCount}+
              </span>
              <span className="text-xs uppercase tracking-[0.16em] text-stone-300 mt-2 block font-mono">
                Corporate Offices Furnished
              </span>
            </div>

            <div className="pt-4 sm:pt-0">
              <span className="block text-4xl sm:text-5xl font-extrabold font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                {onTimeRate}%
              </span>
              <span className="text-xs uppercase tracking-[0.16em] text-stone-300 mt-2 block font-mono">
                On-Time Turnkey Delivery
              </span>
            </div>

            <div className="pt-4 sm:pt-0">
              <span className="block text-4xl sm:text-5xl font-extrabold font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                {warrantyYears} Years
              </span>
              <span className="text-xs uppercase tracking-[0.16em] text-stone-300 mt-2 block font-mono">
                Direct Official Warranty
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}