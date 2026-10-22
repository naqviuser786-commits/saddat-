import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Truck, 
  CheckCircle2, 
  Layers 
} from "lucide-react";
import { CATEGORIES_LIST } from "../../data/furnitureData";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function ProductIntroduction() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsGridRef = useRef<HTMLDivElement | null>(null);
  const trustBarRef = useRef<HTMLDivElement | null>(null);

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

      // 3 Domain Cards Stagger
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          { opacity: 0, y: 45, scale: 0.97 },
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

      // Bottom Trust Pillars Stagger
      if (trustBarRef.current) {
        gsap.fromTo(
          trustBarRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: trustBarRef.current,
              start: "top 85%",
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
      className="relative z-20 w-full bg-[#120B07] text-stone-100 py-24 sm:py-32 border-t border-[#C5A880]/20 overflow-hidden text-left"
    >
      {/* Architectural Background Texture & Ambient Lighting */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, rgba(197, 168, 128, 0.1) 0px, rgba(197, 168, 128, 0.1) 1px, transparent 1px, transparent 72px)",
        }}
      />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Section Header: Walnut & Gold Editorial Interplay */}
        <div 
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20 pb-8 border-b border-[#C5A880]/20"
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.28em] text-[#C5A880] uppercase font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>THE 2026 ATELIER SPECIFICATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.02]">
              Sculpted in timber. <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                Engineered in steel.
              </span>
            </h2>
          </div>

          <div className="max-w-md text-left md:text-right">
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light mb-6">
              Bespoke executive seating, monolithic conference slabs, and modular workstation systems engineered for high-growth enterprises and C-suite suites across Pakistan.
            </p>
            <MagneticButton strength={0.25}>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#E0C6A0] hover:text-[#C5A880] border-b border-[#C5A880]/40 hover:border-[#C5A880] pb-1 transition-all"
              >
                <span>View Full 2026 Master Catalog</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* 2. 3 Categories Showcase Grid with Dual-Mode Framing */}
        <div 
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10"
        >
          {CATEGORIES_LIST.map((cat, idx) => (
            <Link
              key={cat.slug}
              to={`/products/${cat.slug}`}
              className="group block relative focus:outline-none"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#160E08] border border-[#C5A880]/30 group-hover:border-[#C5A880]/80 mb-6 relative shadow-2xl transition-all duration-500">
                
                {cat.slug === "chairs" ? (
                  /* Mode A (Chairs): 3D Floating Cutout with Golden Halo */
                  <div className="w-full h-full p-6 flex items-center justify-center bg-gradient-to-b from-[#1C120B] to-[#120B07] relative">
                    <div className="absolute bottom-4 w-3/4 h-12 bg-[#C5A880]/15 rounded-full blur-xl pointer-events-none group-hover:bg-[#C5A880]/25 transition-all duration-500" />
                    <img
                      src="/Ergonomic%20Executive%20Chair.png"
                      alt={cat.name}
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] transform group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  /* Mode B (Desks & Tables): Architectural Digest Photography with Seamless Shadow Blend */
                  <div className="relative w-full h-full">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-700 ease-out brightness-[0.88] group-hover:brightness-[0.98] contrast-[1.08]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#160E08] via-transparent to-black/20 pointer-events-none" />
                  </div>
                )}
                
                {/* Gold Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#C5A880] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-[#18110B]/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A880] border border-[#C5A880]/30 shadow-md z-20">
                  0{idx + 1} // {cat.count}+ Models
                </div>
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-xl sm:text-2xl font-serif text-white group-hover:text-[#C5A880] transition-colors font-medium">
                  {cat.name}
                </h3>
                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <p className="text-xs text-stone-400 leading-relaxed font-light">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>

        {/* 3. Corporate Trust Credentials Strip */}
        <div 
          ref={trustBarRef}
          className="mt-20 pt-12 border-t border-[#C5A880]/20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left"
        >
          <div className="flex items-start gap-4 p-5 rounded-none bg-[#1A100A]/60 border border-[#C5A880]/20">
            <span className="text-xs font-mono font-bold text-[#C5A880] uppercase">01</span>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-1.5 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#C5A880]" />
                2 to 3-Year Official Warranty
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Full component replacement coverage on hydraulics, synchro mechanisms, and structural wood joinery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-none bg-[#1A100A]/60 border border-[#C5A880]/20">
            <span className="text-xs font-mono font-bold text-[#C5A880] uppercase">02</span>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-1.5 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#C5A880]" />
                Turnkey Nationwide Logistics
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Insured transit and white-glove corporate assembly teams across Karachi, Lahore, and Islamabad.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-none bg-[#1A100A]/60 border border-[#C5A880]/20">
            <span className="text-xs font-mono font-bold text-[#C5A880] uppercase">03</span>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                NTN Corporate Volume Pricing
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Dedicated FBR-compliant GST invoicing, tiered discounts, and free 2D/3D architectural CAD support.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}