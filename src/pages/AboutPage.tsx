import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Factory, 
  Users, 
  History, 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight, 
  Target, 
  Compass, 
  Building2 
} from "lucide-react";

import { SITE_CONFIG } from "../data/furnitureData";

gsap.registerPlugin(ScrollTrigger);

interface TimelineMilestone {
  year: string;
  title: string;
  desc: string;
}

const TIMELINE: TimelineMilestone[] = [
  {
    year: "2012",
    title: "Founding of Saddat Woodworking",
    desc: "Began as an artisanal joinery workshop in Lahore crafting bespoke executive desks with traditional walnut edge-veneering.",
  },
  {
    year: "2017",
    title: "Ergonomic Seating Line Launch",
    desc: "Partnered with international component manufacturers to introduce BIFMA-tested Class-4 hydraulic task seating across Pakistan.",
  },
  {
    year: "2021",
    title: "Turnkey Corporate Fleet Expansion",
    desc: "Established direct white-glove delivery and assembly operations in Karachi and Islamabad to serve multinational head offices.",
  },
  {
    year: "2026",
    title: "The Architectural Suite Era",
    desc: "Deployed turnkey furniture across 500+ corporate offices, powering tech unicorns, banks, and architectural studios nationwide.",
  },
];

export default function AboutPage() {
  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const pillarsRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // SEO Page Title & Instant Scroll Reset
  useEffect(() => {
    document.title = "Company Story & Heritage | Saddat Atelier Pakistan";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    if (!pageContainerRef.current) return;

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: "power3.out" }
        );
      }

      if (pillarsRef.current) {
        gsap.fromTo(
          pillarsRef.current.children,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, pageContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={pageContainerRef}
      className="w-full bg-[#120B07] text-stone-100 min-h-screen overflow-x-hidden selection:bg-[#C5A880] selection:text-[#18110B]"
    >
      
      {/* 1. Heritage Hero Header */}
      <section className="relative w-full bg-[#18110B] text-white py-20 sm:py-28 border-b border-[#C5A880]/20 overflow-hidden">
        
        {/* Subtle Architectural Texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(197, 168, 128, 0.1) 0px, rgba(197, 168, 128, 0.1) 1px, transparent 1px, transparent 80px)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-4xl h-44 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

        <div 
          ref={heroRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#24170F] border border-[#C5A880]/40 text-[#E0C6A0] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>THE SADDAT ATELIER HERITAGE // EST. 2012</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white max-w-4xl mx-auto leading-[1.02]">
            Engineering Posture. <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
              Defining Corporate Workspaces.
            </span>
          </h1>

          <p className="text-stone-300 text-xs sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Founded with a commitment to eliminate physical fatigue from corporate Pakistani workdays. We merge aerospace ergonomics, cold-forged kinematics, and artisanal timber craftsmanship.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-stone-300 font-mono">
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <Award className="w-4 h-4 text-[#C5A880]" />
              BIFMA X5.1 Certified Testing
            </span>
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <Factory className="w-4 h-4 text-[#C5A880]" />
              45,000+ Sq Ft Modern Facility
            </span>
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              2 to 3-Year Official Warranty
            </span>
          </div>
        </div>
      </section>

      {/* 2. Philosophy & Manufacturing Facility Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
              <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>CRAFTED IN PAKISTAN FOR THE WORLD</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
              Where Industrial Rigor Meets <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                Executive Architectural Art.
              </span>
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
              Most commercial furniture in Pakistan either sacrifices ergonomics for low-grade imported aesthetics or delivers clumsy wooden desks that warp within two seasons. Saddat Atelier was established to bridge this divide.
            </p>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
              Every chair we deliver undergoes rigorous 150kg cyclic load trials, pneumatic cylinder stroke checks, and lumbar flexion calibrations. Our executive desking uses thermal-fused anti-scratch veneers engineered to endure extreme local temperature variations without delamination.
            </p>

            <div className="pt-2">
              <Link
                to="/custom-furniture"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#E0C6A0] hover:text-[#C5A880] border-b border-[#C5A880]/40 pb-0.5 transition-all"
              >
                <span>Tour Our Bespoke Custom Workshop</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative border border-[#C5A880]/30 bg-[#1A100A] p-3 aspect-[4/3] overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80"
              alt="Saddat Atelier Corporate Executive Headquarters Assembly"
              className="w-full h-full object-cover contrast-[1.05] brightness-90"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 bg-[#18110B]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#C5A880]/40 text-[10px] font-mono text-[#E0C6A0] uppercase tracking-wider shadow-md">
              45,000+ SQ FT PRODUCTION FACILITY
            </div>
          </div>

        </div>
      </section>

      {/* 3. 4 Core Quality & Engineering Pillars */}
      <section className="bg-[#18110B] border-t border-[#C5A880]/20 py-20 sm:py-24 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
              The Four Architectural Standards
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 font-light">
              Why leading software houses and multinational director suites standardize on Saddat
            </p>
          </div>

          <div 
            ref={pillarsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="p-6 bg-[#1A100A] border border-[#C5A880]/25 space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#C5A880]" />
              <h4 className="font-serif font-bold text-base text-white">BIFMA Certified Safety</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Class-4 gas cylinders and 5-star aluminum alloy bases tested to withstand 150kg+ continuous commercial loads.
              </p>
            </div>

            <div className="p-6 bg-[#1A100A] border border-[#C5A880]/25 space-y-3">
              <Award className="w-8 h-8 text-[#C5A880]" />
              <h4 className="font-serif font-bold text-base text-white">Spinal Kinematics</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Fluid 135° synchro-tilt recline with 4-point posture locking ensures zero lumbar fatigue during 10+ hour shifts.
              </p>
            </div>

            <div className="p-6 bg-[#1A100A] border border-[#C5A880]/25 space-y-3">
              <Building2 className="w-8 h-8 text-[#C5A880]" />
              <h4 className="font-serif font-bold text-base text-white">Full FBR NTN Invoicing</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Registered corporate vendor with official sales tax invoices, withholding credentials, and audit documentation.
              </p>
            </div>

            <div className="p-6 bg-[#1A100A] border border-[#C5A880]/25 space-y-3">
              <Users className="w-8 h-8 text-[#C5A880]" />
              <h4 className="font-serif font-bold text-base text-white">White-Glove Fleet Assembly</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                In-house technical crews handle unboxing, leveling, and packaging cleanup in Karachi, Lahore, and Islamabad.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Heritage Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-left">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-2">
            <History className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>JOURNEY OF EXCELLENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Our Evolution Over the Decade
          </h2>
        </div>

        <div ref={timelineRef} className="space-y-6">
          {TIMELINE.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1C120B] border border-[#C5A880]/25 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-xl relative"
            >
              <div className="text-3xl sm:text-4xl font-mono font-extrabold text-[#C5A880] shrink-0 w-24">
                {item.year}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-serif text-white font-medium">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Direct Callout Ribbon */}
      <section className="bg-[#18110B] border-t border-[#C5A880]/20 py-18 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 space-y-5">
          <h3 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">
            Ready to Furnish an Enterprise Workspace?
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Connect with our Chief Procurement Consultant for tailored 3D CAD layouts, sample chair demonstrations, and tiered corporate pricing.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/bulk-orders"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] font-bold text-xs uppercase tracking-[0.18em] shadow-lg transition-transform transform active:scale-95"
            >
              <span>Bulk Order Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#22160E] hover:bg-[#322014] text-white border border-[#C5A880]/30 font-semibold text-xs uppercase tracking-[0.18em] transition-colors"
            >
              <span>Visit Our Showrooms</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}