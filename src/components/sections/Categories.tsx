import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, LayoutGrid, Layers, ShieldCheck } from "lucide-react";
import { CATEGORIES_LIST } from "../../data/furnitureData";

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsGridRef = useRef<HTMLDivElement | null>(null);

  // GSAP ScrollTrigger Animations
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

      // 3D Staggered Cards Reveal with Scale
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#18110B] text-stone-100 py-24 sm:py-32 border-t border-[#C5A880]/20 overflow-hidden"
    >
      {/* Subtle Architectural Wood Slat Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, rgba(197, 168, 128, 0.1) 0px, rgba(197, 168, 128, 0.1) 1px, transparent 1px, transparent 72px)",
        }}
      />
      
      {/* Atmospheric Ambient Warm Radiance */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Section Header */}
        <div 
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20 pb-8 border-b border-[#C5A880]/20 text-left"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#24170F] border border-[#C5A880]/30 text-[#C5A880] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-3 shadow-sm">
              <LayoutGrid className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>ARCHITECTURAL DOMAINS // 2026 SUITE</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.02]">
              Engineered for Every Floor of the <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                Modern Enterprise.
              </span>
            </h2>
          </div>

          <div className="max-w-md text-left md:text-right">
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light mb-4">
              Explore our master domains: from individual active ergonomic seating to managerial walnut workstations and monolithic boardroom slabs.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#E0C6A0] hover:text-[#C5A880] border-b border-[#C5A880]/40 hover:border-[#C5A880] pb-0.5 transition-all"
            >
              <span>View Complete 2026 Master Catalog</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </Link>
          </div>
        </div>

        {/* 2. 3-Card Category Grid with GSAP Stagger */}
        <div 
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10"
        >
          {CATEGORIES_LIST.map((cat, idx) => (
            <Link
              key={cat.slug}
              to={`/products/${cat.slug}`}
              className="group relative rounded-none overflow-hidden bg-[#160E08] border border-[#C5A880]/25 hover:border-[#C5A880]/80 transition-all duration-500 flex flex-col justify-end aspect-[4/5] shadow-2xl hover:shadow-[0_20px_50px_rgba(197,168,128,0.15)] p-6 sm:p-8"
            >
              {/* Background Category Image Container */}
              <div className="absolute inset-0 w-full h-full bg-[#120B07] overflow-hidden flex items-center justify-center">
                {cat.slug === "chairs" ? (
                  <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-b from-[#1C120B] to-[#120B07]">
                    <div className="absolute bottom-6 w-3/4 h-16 bg-[#C5A880]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#C5A880]/25 transition-all duration-500" />
                    <img
                      src="/Ergonomic%20Executive%20Chair.png"
                      alt={cat.name}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] transform group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                  </div>
                ) : (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out brightness-[0.75] group-hover:brightness-[0.88] contrast-[1.05]"
                  />
                )}
              </div>

              {/* Gradient Dark Walnut Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120B07] via-[#160E08]/60 to-transparent pointer-events-none" />

              {/* Top Gold Hover Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

              {/* Category Details Text */}
              <div className="relative z-10 space-y-2.5 text-left">
                <div className="inline-block bg-[#18110B]/90 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/30 text-[10px] font-mono tracking-widest px-2.5 py-1 shadow-md">
                  0{idx + 1} // {cat.count}+ Models
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-white group-hover:text-[#E0C6A0] transition-colors font-medium">
                  {cat.name}
                </h3>

                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed font-sans font-light">
                  {cat.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#C5A880] group-hover:text-white transition-colors">
                  <span className="uppercase tracking-[0.18em]">Explore Domain</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}