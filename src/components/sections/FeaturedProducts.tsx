import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowUpRight, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  SlidersHorizontal,
  Layers,
  Check
} from "lucide-react";
import { PRODUCTS_DATA } from "../../data/furnitureData";
import ProductCard from "../ui/ProductCard";
import { createWhatsAppUrl } from "../../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

type TabType = "all" | "mesh" | "leather" | "task";

interface TabItem {
  id: TabType;
  label: string;
  badge: string;
}

const SEATING_TABS: TabItem[] = [
  { id: "all", label: "Master Seating Suite", badge: "All Models" },
  { id: "mesh", label: "AeroMesh Ergonomics", badge: "Spinal Tracking" },
  { id: "leather", label: "Presidential Leather", badge: "Knee-Tilt" },
  { id: "task", label: "Agile Task & Drafting", badge: "Commercial" },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // All Chairs Data
  const allChairs = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => p.category === "chairs");
  }, []);

  // Filtered Chairs based on Active Tab
  const filteredChairs = useMemo(() => {
    if (activeTab === "all") return allChairs.slice(0, 3);
    if (activeTab === "mesh") {
      return allChairs.filter(
        (p) =>
          p.name.toLowerCase().includes("mesh") ||
          p.tagline.toLowerCase().includes("mesh") ||
          p.specs.material.toLowerCase().includes("mesh")
      );
    }
    if (activeTab === "leather") {
      return allChairs.filter((p) =>
        p.name.toLowerCase().includes("leather")
      );
    }
    if (activeTab === "task") {
      return allChairs.filter(
        (p) =>
          p.name.toLowerCase().includes("task") ||
          p.name.toLowerCase().includes("drafting")
      );
    }
    return allChairs.slice(0, 3);
  }, [activeTab, allChairs]);

  // 1. Initial ScrollTrigger Section Entry Animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header Text Reveal
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Tabs Bar Entry
      gsap.fromTo(
        tabsContainerRef.current,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tabsContainerRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3D Staggered Cards Reveal
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          {
            opacity: 0,
            y: 50,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Smooth GSAP Transition when switching Tabs
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.children;
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 20,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      }
    );
  }, [activeTab]);

  // Corporate Procurement WhatsApp Link
  const bulkWhatsAppUrl = createWhatsAppUrl(
    "Assalam-o-Alaikum Saddat Office Furniture, I am inquiring regarding Corporate Bulk Procurement (10+ units) for our office headquarters. Please provide an itemized corporate quotation and catalog."
  );

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#120B07] text-stone-100 py-24 sm:py-32 border-t border-[#C5A880]/20 overflow-hidden"
    >
      {/* Subtle Architectural Wood Louver Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, rgba(197, 168, 128, 0.1) 0px, rgba(197, 168, 128, 0.1) 1px, transparent 1px, transparent 80px)",
        }}
      />

      {/* Atmospheric Ambient Gold Radiance */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-[#8C6D46]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Architectural Section Header */}
        <div 
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-[#C5A880]/20"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#1F140D] border border-[#C5A880]/30 text-[#C5A880] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>SIGNATURE ATELIER LINE // 2026</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.02]">
              The Executive <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                Ergonomic Seating Suite.
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light mb-4">
              Precision spinal synchronization, aerospace-grade cold kinematics, and breathable Korean matrix weave engineered for prolonged C-suite comfort.
            </p>
            <Link
              to="/products/chairs"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#E0C6A0] hover:text-[#C5A880] border-b border-[#C5A880]/40 hover:border-[#C5A880] pb-0.5 transition-all"
            >
              <span>Explore All 24+ Executive Models</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </Link>
          </div>
        </div>

        {/* 2. Top-Class Interactive Filter Tabs (Architectural Bronze Bar) */}
        <div 
          ref={tabsContainerRef}
          className="mb-10 sm:mb-14 flex items-center justify-between flex-wrap gap-4"
        >
          {/* Scrollable Tabs Pill on Mobile */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar">
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono uppercase text-stone-400 mr-2 tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Filter Atelier:</span>
            </div>

            {SEATING_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`relative px-4 sm:px-5 py-2.5 rounded-none text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-2 border select-none ${
                    isActive
                      ? "bg-[#C5A880] text-[#18110B] border-[#C5A880] shadow-[0_8px_25px_rgba(197,168,128,0.25)] font-bold"
                      : "bg-[#1A100A] text-stone-300 hover:text-white border-[#C5A880]/20 hover:border-[#C5A880]/50"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 font-mono ${
                      isActive
                        ? "bg-[#18110B] text-[#C5A880]"
                        : "bg-[#120B07] text-stone-400 border border-[#C5A880]/20"
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Model Status Counter */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#C5A880]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ready for 24-Hr Dispatch</span>
          </div>
        </div>

        {/* 3. Responsive 3-Card Animated Luxury Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch min-h-[460px]"
        >
          {filteredChairs.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* 4. High-Impact Corporate Procurement Banner */}
        <div className="mt-18 sm:mt-24 relative overflow-hidden bg-gradient-to-r from-[#1A100A] via-[#24170F] to-[#1A100A] border border-[#C5A880]/35 p-8 sm:p-12 lg:p-14 shadow-2xl">
          
          {/* Top Gold Accent Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
              <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>TURNKEY WORKPLACE PROCUREMENT // NATIONWIDE</span>
            </div>

            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
              Equipping an Enterprise Headquarters or Regional Office?
            </h3>

            <p className="text-xs sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
              Unlock dedicated commercial tier discounts of up to 20% on orders of 10+ units. Includes official FBR-compliant NTN tax invoicing, free 3D architectural floor layouts, and white-glove assembly across Pakistan.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={bulkWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold shadow-lg transition-transform duration-300 transform active:scale-95"
              >
                <span>Request Corporate Bulk Quotation</span>
                <ArrowUpRight className="w-4 h-4 text-[#18110B]" />
              </a>

              <Link
                to="/bulk-orders"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-stone-200 border border-[#C5A880]/30 px-7 py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-200"
              >
                <span>Bulk Savings Calculator</span>
              </Link>
            </div>

            <p className="text-[10px] font-mono text-stone-400 tracking-wider">
              Karachi &bull; Lahore &bull; Islamabad &bull; Express 48-Hour Corporate Dispatch
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}