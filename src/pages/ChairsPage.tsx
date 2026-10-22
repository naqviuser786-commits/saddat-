import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  Filter,
  Award,
  Layers,
  MessageSquare,
  Activity,
  SlidersHorizontal,
  RotateCcw
} from "lucide-react";

import { PRODUCTS_DATA } from "../data/furnitureData";
import ProductCard from "../components/ui/ProductCard";
import { createWhatsAppUrl } from "../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

type ChairFilterType = "all" | "mesh" | "leather" | "task";

interface FilterTab {
  id: ChairFilterType;
  label: string;
  categoryDesc: string;
}

const CHAIR_TABS: FilterTab[] = [
  { id: "all", label: "Master Seating Suite", categoryDesc: "Complete Atelier Inventory" },
  { id: "mesh", label: "AeroMesh Ergonomics", categoryDesc: "Spinal Tracking Matrix" },
  { id: "leather", label: "Presidential Leather", categoryDesc: "Knee-Tilt Executive Cabin" },
  { id: "task", label: "Task & Drafting", categoryDesc: "High-Agile Agile Pods" },
];

export default function ChairsPage() {
  const [activeFilter, setActiveFilter] = useState<ChairFilterType>("all");

  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const stickyTabsRef = useRef<HTMLDivElement | null>(null);
  const cardsGridRef = useRef<HTMLDivElement | null>(null);
  const anatomySectionRef = useRef<HTMLDivElement | null>(null);

  // SEO Page Title & Scroll Reset
  useEffect(() => {
    document.title = "Executive Ergonomic Office Chairs Pakistan | Saddat Atelier";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Filter chairs data
  const allChairs = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => p.category === "chairs");
  }, []);

  const filteredChairs = useMemo(() => {
    if (activeFilter === "all") return allChairs;
    if (activeFilter === "mesh") {
      return allChairs.filter(
        (p) =>
          p.name.toLowerCase().includes("mesh") ||
          p.specs.material.toLowerCase().includes("mesh") ||
          p.tagline.toLowerCase().includes("mesh")
      );
    }
    if (activeFilter === "leather") {
      return allChairs.filter((p) => p.name.toLowerCase().includes("leather"));
    }
    if (activeFilter === "task") {
      return allChairs.filter(
        (p) =>
          p.name.toLowerCase().includes("task") ||
          p.name.toLowerCase().includes("drafting")
      );
    }
    return allChairs;
  }, [activeFilter, allChairs]);

  // 1. Initial GSAP ScrollTrigger Animations
  useEffect(() => {
    if (!pageContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero Elements Staggered Reveal
      if (heroTextRef.current) {
        gsap.fromTo(
          heroTextRef.current.children,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }

      // Initial Cards Grid Entrance
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          {
            opacity: 0,
            y: 55,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Anatomical Matrix Section Reveal
      if (anatomySectionRef.current) {
        gsap.fromTo(
          anatomySectionRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: anatomySectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, pageContainerRef);

    return () => ctx.revert();
  }, []);

  // 2. Tab Change Animated Transition
  useEffect(() => {
    if (!cardsGridRef.current) return;

    gsap.fromTo(
      cardsGridRef.current.children,
      {
        opacity: 0,
        y: 20,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out",
      }
    );
  }, [activeFilter]);

  const chairsWhatsAppUrl = createWhatsAppUrl(
    "Assalam-o-Alaikum Saddat Office Furniture, I am inquiring regarding your Executive & Ergonomic Chairs collection. Please share complete specifications, demo unit availability, and corporate bulk pricing."
  );

  return (
    <div 
      ref={pageContainerRef}
      className="w-full bg-[#120B07] text-stone-100 min-h-screen overflow-x-hidden selection:bg-[#C5A880] selection:text-[#18110B]"
    >
      
      {/* 1. Cinematic Category Hero */}
      <section className="relative w-full bg-[#18110B] text-white py-20 sm:py-28 border-b border-[#C5A880]/20 overflow-hidden">
        
        {/* Subtle Architectural Grid Texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(197, 168, 128, 0.1) 0px, rgba(197, 168, 128, 0.1) 1px, transparent 1px, transparent 80px)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-4xl h-44 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

        <div 
          ref={heroTextRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#24170F] border border-[#C5A880]/40 text-[#E0C6A0] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>ERGONOMIC POSTURE ENGINEERING // 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white max-w-4xl mx-auto leading-[1.02]">
            Executive & Orthopedic <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
              Office Seating Collection.
            </span>
          </h1>

          <p className="text-stone-300 text-xs sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Engineered for 10+ hours of continuous C-suite focus with active anatomical spinal tracking, breathable Korean matrix weave, and BIFMA X5.1-tested cold kinematics.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-stone-300 font-mono">
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              2-Year Direct Replacement Guarantee
            </span>
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <Award className="w-4 h-4 text-[#C5A880]" />
              BIFMA X5.1 Certified Hydraulics
            </span>
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              48-Hour Demo Unit for 25+ Orders
            </span>
          </div>
        </div>
      </section>

      {/* 2. Top-Class Sticky Architectural Filter Tabs Bar */}
      <div 
        ref={stickyTabsRef}
        className="bg-[#18110B]/95 backdrop-blur-xl border-b border-[#C5A880]/25 sticky top-20 z-30 shadow-2xl py-3.5 transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Scrollable Luxury Tab Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono uppercase text-stone-400 mr-2 tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Domain:</span>
            </div>

            {CHAIR_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  type="button"
                  className={`px-4 sm:px-5 py-2.5 rounded-none text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-2 border select-none ${
                    isActive
                      ? "bg-[#C5A880] text-[#18110B] border-[#C5A880] shadow-[0_4px_20px_rgba(197,168,128,0.25)] font-bold"
                      : "bg-[#22160E] text-stone-300 hover:text-white border-[#C5A880]/20 hover:border-[#C5A880]/50"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 font-mono ${
                      isActive
                        ? "bg-[#18110B] text-[#C5A880]"
                        : "bg-[#160E08] text-stone-400 border border-[#C5A880]/20"
                    }`}
                  >
                    {tab.id === "all"
                      ? allChairs.length
                      : tab.id === "mesh"
                      ? allChairs.filter((c) => c.name.toLowerCase().includes("mesh") || c.tagline.toLowerCase().includes("mesh")).length
                      : tab.id === "leather"
                      ? allChairs.filter((c) => c.name.toLowerCase().includes("leather")).length
                      : allChairs.filter((c) => c.name.toLowerCase().includes("task") || c.name.toLowerCase().includes("drafting")).length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Model Status Indicator */}
          <div className="flex items-center justify-between w-full sm:w-auto text-xs font-mono text-stone-400">
            <span>
              Displaying <strong className="text-[#C5A880]">{filteredChairs.length}</strong> verified models
            </span>
            <span className="hidden sm:inline-block ml-4 text-[10px] uppercase tracking-widest text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5">
              &bull; FBR Tax Compliant
            </span>
          </div>

        </div>
      </div>

      {/* 3. Products Grid with GSAP Stagger */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {filteredChairs.length === 0 ? (
          <div className="text-center py-20 bg-[#1A100A] border border-[#C5A880]/30 p-8 max-w-lg mx-auto">
            <Filter className="w-10 h-10 text-[#C5A880] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-serif text-white mb-2">No chairs found in this category</h3>
            <p className="text-xs sm:text-sm text-stone-400 mb-6 font-light">
              Try resetting the active category filter to view our full seating line.
            </p>
            <button
              onClick={() => setActiveFilter("all")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A880] text-[#18110B] text-xs uppercase tracking-[0.18em] font-bold shadow-md hover:bg-[#D4BA93] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          </div>
        ) : (
          <div 
            ref={cardsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 min-h-[480px]"
          >
            {filteredChairs.map((chair) => (
              <div key={chair.id} className="h-full">
                <ProductCard product={chair} />
              </div>
            ))}
          </div>
        )}

      </section>

      {/* 4. Ergonomic Health & Anatomical Spine Architecture (High-Value SEO) */}
      <section 
        ref={anatomySectionRef}
        className="bg-[#18110B] border-y border-[#C5A880]/20 py-20 sm:py-28 overflow-hidden relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                <Activity className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>ANATOMICAL SPINE & CIRCULATION ENGINEERING</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                Why Corporate Pakistan Relies on <br />
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                  Saddat Ergonomic Seating.
                </span>
              </h2>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                Cheap imported seating causes chronic lumbar strain, thermal fatigue, and pneumatic failure within months. Saddat executive chairs integrate orthopedic weight-distribution curves, synchronous 135° recline kinematics, and heavy Class-4 hydraulics rated for 150kg+ continuous commercial loads.
              </p>
              
              <div className="space-y-3.5 pt-2 text-xs sm:text-sm text-stone-300 font-light">
                <div className="flex items-start gap-3.5 p-4 bg-[#22160E] border border-[#C5A880]/25">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-medium block mb-0.5">Active Lumbar Tracking:</strong> 
                    Dynamically moves with your lower spine to relieve L4-L5 disc compression during 10+ hour executive workdays.
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-[#22160E] border border-[#C5A880]/25">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-medium block mb-0.5">Waterfall Seat Contour:</strong> 
                    Sloped front edge eliminates pressure points behind the knees to maintain healthy blood circulation and eliminate numbness.
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-[#22160E] border border-[#C5A880]/25">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-medium block mb-0.5">High-Tensile AeroMesh:</strong> 
                    Dissipates body heat efficiently during demanding Pakistani summers, preventing thermal fatigue and discomfort.
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Frame Showcase */}
            <div className="relative border border-[#C5A880]/30 bg-[#160E08] p-3 aspect-[4/3] overflow-hidden shadow-2xl">
              <img
                src="/Ergonomic%20Executive%20Chair.png"
                alt="Saddat Ergonomic Executive Chair Engineering Details"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 bg-[#18110B]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#C5A880]/40 text-[10px] font-mono text-[#E0C6A0] uppercase tracking-wider shadow-md">
                BIFMA X5.1 Certified // 150KG TESTED
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Chair Bulk Inquiry Ribbon */}
      <section className="bg-[#120B07] text-white py-18 border-t border-[#C5A880]/20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
            <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>ENTERPRISE HEADQUARTERS PROCUREMENT</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">
            Planning Seating for 10+ Team Members?
          </h3>

          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Receive dedicated volume tier pricing with official FBR-compliant NTN tax invoices, free on-site demo evaluation units in Karachi, Lahore, and Islamabad, and complimentary white-glove assembly.
          </p>

          <div className="pt-2">
            <a
              href={chairsWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] px-8 py-4 rounded-none font-bold text-xs uppercase tracking-[0.18em] shadow-lg transition-transform transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-[#18110B]" />
              <span>Request Chair Bulk Quotation on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}