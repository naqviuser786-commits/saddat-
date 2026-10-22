import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Users,
  Tv,
  Filter,
  ArrowUpRight,
  MessageSquare,
  Layers,
  SlidersHorizontal,
  RotateCcw,
  Monitor,
  Maximize2
} from "lucide-react";

import { PRODUCTS_DATA } from "../data/furnitureData";
import ProductCard from "../components/ui/ProductCard";
import { createWhatsAppUrl } from "../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

type TableFilterType = "all" | "boardroom" | "meeting";

interface TableTabItem {
  id: TableFilterType;
  label: string;
  badge: string;
}

const TABLE_TABS: TableTabItem[] = [
  { id: "all", label: "Master Boardroom Suite", badge: "All Tables" },
  { id: "boardroom", label: "10–16 Person Monoliths", badge: "Dual AV Boxes" },
  { id: "meeting", label: "4–8 Person Huddle & Round", badge: "Fluted Base" },
];

interface CapacityPreset {
  seats: string;
  tableSize: string;
  roomSize: string;
  avHubs: string;
  subframe: string;
}

const CAPACITY_PRESETS: Record<number, CapacityPreset> = {
  6: {
    seats: "4 to 6 Executives",
    tableSize: "135cm x 135cm (Circular / Square)",
    roomSize: "12ft x 14ft Minimum",
    avHubs: "1x Pop-Up Central Multi-Port (Power + USB-C)",
    subframe: "Central Fluted Steel Pedestal (Zero Knee Clutter)",
  },
  10: {
    seats: "10 to 12 Executives",
    tableSize: "320cm x 130cm x 75cm",
    roomSize: "16ft x 20ft Minimum",
    avHubs: "2x Pop-Up Multi-Boxes (HDMI + AC + USB Fast Charge)",
    subframe: "Dual Laser-Cut Recessed Steel Pedestals",
  },
  14: {
    seats: "14 to 16 Executives",
    tableSize: "420cm x 140cm x 75cm",
    roomSize: "18ft x 26ft Minimum",
    avHubs: "3x Pop-Up Flush Multi-Boxes (4K HDMI Screen Mirroring)",
    subframe: "Heavy-Gauge Box-Section I-Beam Subframe",
  },
  20: {
    seats: "18 to 22 Executives",
    tableSize: "540cm x 150cm (Modular Monolith)",
    roomSize: "22ft x 34ft Minimum",
    avHubs: "4x Pop-Up Integrated Audio/Video Conference Hubs",
    subframe: "Triple Recessed Reinforced Steel Chassis (Zero Sag)",
  },
};

export default function TablesPage() {
  const [activeFilter, setActiveFilter] = useState<TableFilterType>("all");
  const [selectedCapacity, setSelectedCapacity] = useState<number>(10);

  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const stickyTabsRef = useRef<HTMLDivElement | null>(null);
  const cardsGridRef = useRef<HTMLDivElement | null>(null);
  const avSectionRef = useRef<HTMLDivElement | null>(null);

  // SEO Page Title & Instant Scroll Reset
  useEffect(() => {
    document.title = "Corporate Boardroom & Conference Tables Pakistan | Saddat Atelier";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Filter tables data
  const allTables = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => p.category === "tables");
  }, []);

  const filteredTables = useMemo(() => {
    if (activeFilter === "all") return allTables;
    if (activeFilter === "boardroom") {
      return allTables.filter(
        (p) =>
          p.name.toLowerCase().includes("boardroom") ||
          p.name.toLowerCase().includes("summit") ||
          p.name.toLowerCase().includes("12-person")
      );
    }
    if (activeFilter === "meeting") {
      return allTables.filter(
        (p) =>
          p.name.toLowerCase().includes("meeting") ||
          p.name.toLowerCase().includes("round") ||
          p.name.toLowerCase().includes("aura")
      );
    }
    return allTables;
  }, [activeFilter, allTables]);

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
            stagger: 0.14,
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
            y: 50,
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

      // AV Connectivity Section Reveal
      if (avSectionRef.current) {
        gsap.fromTo(
          avSectionRef.current,
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
              trigger: avSectionRef.current,
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

  const activePreset = CAPACITY_PRESETS[selectedCapacity];

  const tablesWhatsAppUrl = createWhatsAppUrl(
    `Assalam-o-Alaikum Saddat Office Furniture, I am inquiring regarding Boardroom & Conference Tables for a ${selectedCapacity}-Person meeting space. Please share dimensions, AV pop-up power box specifications, and delivery timelines.`
  );

  return (
    <div 
      ref={pageContainerRef}
      className="w-full bg-[#120B07] text-stone-100 min-h-screen overflow-x-hidden selection:bg-[#C5A880] selection:text-[#18110B]"
    >
      
      {/* 1. Cinematic Category Hero */}
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
          ref={heroTextRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#24170F] border border-[#C5A880]/40 text-[#E0C6A0] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>EXECUTIVE BOARDROOM ARCHITECTURE // 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white max-w-4xl mx-auto leading-[1.02]">
            Monolithic Boardroom & <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
              Conference Table Systems.
            </span>
          </h1>

          <p className="text-stone-300 text-xs sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Command executive board meetings with modular 8 to 22-person monolithic slabs featuring concealed flip-top power sockets, 4K HDMI presentation feeds, beveled edges, and zero-wobble structural steel chassis.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-stone-300 font-mono">
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              3-Year Structural Warranty
            </span>
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <Tv className="w-4 h-4 text-[#C5A880]" />
              Integrated Flip-Up AV Multi-Boxes
            </span>
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Complimentary On-Site Assembly
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
              <span>Format:</span>
            </div>

            {TABLE_TABS.map((tab) => {
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
                      ? allTables.length
                      : tab.id === "boardroom"
                      ? allTables.filter((t) => t.name.toLowerCase().includes("boardroom") || t.name.toLowerCase().includes("summit") || t.name.toLowerCase().includes("12-person")).length
                      : allTables.filter((t) => t.name.toLowerCase().includes("meeting") || t.name.toLowerCase().includes("round") || t.name.toLowerCase().includes("aura")).length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Model Status Indicator */}
          <div className="flex items-center justify-between w-full sm:w-auto text-xs font-mono text-stone-400">
            <span>
              Displaying <strong className="text-[#C5A880]">{filteredTables.length}</strong> boardroom series
            </span>
            <span className="hidden sm:inline-block ml-4 text-[10px] uppercase tracking-widest text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5">
              &bull; FBR Invoiced
            </span>
          </div>

        </div>
      </div>

      {/* 3. Products Grid with GSAP Stagger */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {filteredTables.length === 0 ? (
          <div className="text-center py-20 bg-[#1A100A] border border-[#C5A880]/30 p-8 max-w-lg mx-auto">
            <Filter className="w-10 h-10 text-[#C5A880] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-serif text-white mb-2">No conference tables found in this category</h3>
            <p className="text-xs sm:text-sm text-stone-400 mb-6 font-light">
              Try resetting the active category filter to view our complete conference table collection.
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
            {filteredTables.map((table) => (
              <div key={table.id} className="h-full">
                <ProductCard product={table} />
              </div>
            ))}
          </div>
        )}

      </section>

      {/* 4. Interactive Boardroom Dimensional Space Planner Widget */}
      <section className="bg-[#18110B] border-t border-[#C5A880]/20 py-20 sm:py-28 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-3">
              <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>ARCHITECTURAL SPACE PLANNING // CAPACITY MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-[1.05]">
              Configure Your Executive <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                Conference Footprint.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-3 font-light leading-relaxed">
              Select your meeting attendee capacity below to view recommended table dimensions, room clearance ratios, and built-in AV pop-up hub configurations.
            </p>
          </div>

          {/* Interactive Planner Card */}
          <div className="max-w-4xl mx-auto bg-[#1C120B] border border-[#C5A880]/35 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

            {/* Capacity Presets Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[6, 10, 14, 20].map((cap) => (
                <button
                  key={cap}
                  onClick={() => setSelectedCapacity(cap)}
                  className={`p-4 border text-left transition-all relative ${
                    selectedCapacity === cap
                      ? "bg-[#C5A880] text-[#18110B] border-[#C5A880] font-bold shadow-lg"
                      : "bg-[#120B07] text-stone-300 border-[#C5A880]/20 hover:border-[#C5A880]/50"
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase block opacity-80">CAPACITY</span>
                  <span className="text-lg sm:text-xl font-serif font-bold block">{cap} Persons</span>
                </button>
              ))}
            </div>

            {/* Dynamic Footprint Output Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono bg-[#120B07] border border-[#C5A880]/20 p-6 sm:p-8">
              <div className="space-y-4 text-left">
                <div className="border-b border-[#C5A880]/15 pb-2.5">
                  <span className="text-stone-400 block text-[10px] uppercase">EXECUTIVE SEATING CAPACITY</span>
                  <span className="text-white font-bold text-sm sm:text-base">{activePreset.seats}</span>
                </div>
                <div className="border-b border-[#C5A880]/15 pb-2.5">
                  <span className="text-stone-400 block text-[10px] uppercase">TABLE SLAB DIMENSIONS</span>
                  <span className="text-[#C5A880] font-bold text-sm sm:text-base">{activePreset.tableSize}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">RECOMMENDED ROOM CLEARANCE</span>
                  <span className="text-white font-semibold text-xs sm:text-sm">{activePreset.roomSize}</span>
                </div>
              </div>

              <div className="space-y-4 text-left">
                <div className="border-b border-[#C5A880]/15 pb-2.5">
                  <span className="text-stone-400 block text-[10px] uppercase">AUDIO-VISUAL FLIP BOXES</span>
                  <span className="text-white font-semibold text-xs sm:text-sm">{activePreset.avHubs}</span>
                </div>
                <div className="border-b border-[#C5A880]/15 pb-2.5">
                  <span className="text-stone-400 block text-[10px] uppercase">STRUCTURAL SUBFRAME CHASSIS</span>
                  <span className="text-white font-semibold text-xs sm:text-sm">{activePreset.subframe}</span>
                </div>
                <div className="pt-2">
                  <a
                    href={tablesWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A880] hover:text-white uppercase tracking-wider transition-colors"
                  >
                    <span>Request CAD Drawing for {selectedCapacity} Persons</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Built-In Audio-Visual & Power Connectivity Hubs Deep-Dive */}
      <section 
        ref={avSectionRef}
        className="bg-[#140C07] border-y border-[#C5A880]/20 py-20 overflow-hidden relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                <Tv className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>CONFERENCE CONNECTIVITY INTEGRATION</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                Built-In Audio-Visual & <br />
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                  Power Connectivity Hubs.
                </span>
              </h2>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                Extension cords running across director boardroom floors belong to the past. Saddat conference tables are factory-fitted with flush pop-up brushed aluminum multi-boxes supporting universal AC power, USB-C fast charging, and 4K HDMI presentation feeds.
              </p>

              <div className="space-y-3.5 pt-2 text-xs sm:text-sm text-stone-300 font-light">
                <div className="flex items-start gap-3.5 p-4 bg-[#1E140C] border border-[#C5A880]/25">
                  <Monitor className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-medium block mb-0.5">Flip-Up Multi-Port AV Boxes:</strong> 
                    Instant laptop screen mirroring for Zoom, Microsoft Teams, and executive presentations with zero visible tangled cables.
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-[#1E140C] border border-[#C5A880]/25">
                  <Users className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-medium block mb-0.5">Zero Knee Obstruction:</strong> 
                    Center-recessed structural steel beam substructures provide unrestricted 360° legroom for all attendees.
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-[#1E140C] border border-[#C5A880]/25">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-medium block mb-0.5">Thermal & Stain Resistant:</strong> 
                    Multi-layer sealed natural walnut finish resists hot beverage spills, laptop thermal heat, and micro-scratches.
                  </div>
                </div>
              </div>
            </div>

            <div className="relative border border-[#C5A880]/30 bg-[#160E08] p-3 aspect-[4/3] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80"
                alt="Summit 12 Person Conference Boardroom Table Architectural Fitout"
                className="w-full h-full object-cover contrast-[1.05] brightness-90"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 bg-[#18110B]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#C5A880]/40 text-[10px] font-mono text-[#E0C6A0] uppercase tracking-wider shadow-md">
                Integrated Flip-Top AV Hubs // 4K HDMI
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Boardroom Custom Sizing CTA */}
      <section className="bg-[#120B07] text-white py-18 border-t border-[#C5A880]/20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
            <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>BESPOKE ARCHITECTURAL WORKSHOP</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">
            Need a Bespoke Length or U-Shaped Boardroom Sizing?
          </h3>

          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Our master woodworking atelier crafts custom 16-seater, 20-seater, and circular director meeting tables tailored to your architectural dimensions and wood veneer preferences.
          </p>

          <div className="pt-2">
            <a
              href={tablesWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] px-8 py-4 rounded-none font-bold text-xs uppercase tracking-[0.18em] shadow-lg transition-transform transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-[#18110B]" />
              <span>Consult on WhatsApp for Custom Boardroom</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}