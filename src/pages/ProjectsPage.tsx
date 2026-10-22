import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Sparkles, 
  MapPin, 
  Building2, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  SlidersHorizontal, 
  ArrowUpRight, 
  MessageSquare, 
  Layers, 
  Clock, 
  Check, 
  Maximize2
} from "lucide-react";

import { PROJECTS_DATA } from "../data/furnitureData";
import { createWhatsAppUrl } from "../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const sliderWrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const caseStudiesGridRef = useRef<HTMLDivElement | null>(null);

  // SEO Page Title & Instant Scroll Reset
  useEffect(() => {
    document.title = "Office Fit-Out Case Studies & Transformations | Saddat Atelier Pakistan";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    if (selectedFilter === "all") return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category.toLowerCase().includes(selectedFilter.toLowerCase()));
  }, [selectedFilter]);

  // Handle Before/After Dragging
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

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

      if (sliderWrapperRef.current) {
        gsap.fromTo(
          sliderWrapperRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sliderWrapperRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (caseStudiesGridRef.current) {
        gsap.fromTo(
          caseStudiesGridRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: caseStudiesGridRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, pageContainerRef);

    return () => ctx.revert();
  }, []);

  // Filter change transition
  useEffect(() => {
    if (!caseStudiesGridRef.current) return;

    gsap.fromTo(
      caseStudiesGridRef.current.children,
      { opacity: 0, y: 20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: "power2.out" }
    );
  }, [selectedFilter]);

  const consultationWhatsAppUrl = createWhatsAppUrl(
    "Assalam-o-Alaikum Saddat Office Furniture, I reviewed your Turnkey Corporate Fit-Out case studies and transformations. We are planning a new office setup and need a free 2D/3D floor layout consultation."
  );

  return (
    <div 
      ref={pageContainerRef}
      className="w-full bg-[#120B07] text-stone-100 min-h-screen overflow-x-hidden selection:bg-[#C5A880] selection:text-[#18110B]"
    >
      
      {/* 1. Page Hero Header */}
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
            <span>TURNKEY FIT-OUT CASE STUDIES // 2026 ARCHIVE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white max-w-4xl mx-auto leading-[1.02]">
            Enterprise Workplace Transformations <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
              Across Corporate Pakistan.
            </span>
          </h1>

          <p className="text-stone-300 text-xs sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            From empty concrete shells to high-performance corporate headquarters. Drag the interactive comparison slider below to witness how Saddat Atelier engineers turnkey workspaces.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-stone-300 font-mono">
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% On-Time Delivery Track Record
            </span>
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              FBR-Compliant Commercial BOQ
            </span>
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <Maximize2 className="w-4 h-4 text-[#C5A880]" />
              Complimentary 2D/3D CAD Layouts
            </span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Before / After Office Transformation Slider Canvas */}
      <section 
        ref={sliderWrapperRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-[#C5A880] text-xs font-mono uppercase tracking-widest mb-1.5">
            <SlidersHorizontal className="w-4 h-4" />
            <span>INTERACTIVE VISUAL INSPECTION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif text-white">
            PayNex Global HQ Transformation
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 font-light">
            Blue Area, Islamabad &bull; 120 Workstations, 8 Executive Cabins & 2 Boardrooms (Delivered in 21 Days)
          </p>

          {/* Quick Preset Buttons */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={() => setSliderPos(0)}
              className={`px-3 py-1.5 text-[11px] font-mono border transition-all ${
                sliderPos === 0
                  ? "bg-[#C5A880] text-[#18110B] border-[#C5A880] font-bold"
                  : "bg-[#1C120B] text-stone-300 border-[#C5A880]/30 hover:border-[#C5A880]"
              }`}
            >
              Raw Space (0%)
            </button>
            <button
              onClick={() => setSliderPos(50)}
              className={`px-3 py-1.5 text-[11px] font-mono border transition-all ${
                sliderPos === 50
                  ? "bg-[#C5A880] text-[#18110B] border-[#C5A880] font-bold"
                  : "bg-[#1C120B] text-stone-300 border-[#C5A880]/30 hover:border-[#C5A880]"
              }`}
            >
              50/50 Split (50%)
            </button>
            <button
              onClick={() => setSliderPos(100)}
              className={`px-3 py-1.5 text-[11px] font-mono border transition-all ${
                sliderPos === 100
                  ? "bg-[#C5A880] text-[#18110B] border-[#C5A880] font-bold"
                  : "bg-[#1C120B] text-stone-300 border-[#C5A880]/30 hover:border-[#C5A880]"
              }`}
            >
              Delivered HQ (100%)
            </button>
          </div>
        </div>

        {/* The Slider Frame (Obsidian & Champagne Gold) */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-none overflow-hidden shadow-2xl border-2 border-[#C5A880]/40 cursor-ew-resize select-none bg-[#120B07]"
        >
          {/* After Image (Full Background) */}
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            alt="After: Fully Furnished Executive Corporate Office by Saddat"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none brightness-95"
          />

          {/* "AFTER" Floating Gold Badge */}
          <div className="absolute top-4 right-4 z-20 bg-[#18110B]/90 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/50 text-xs font-mono font-bold px-3.5 py-1.5 shadow-lg tracking-wider uppercase">
            AFTER: Fully Furnished HQ
          </div>

          {/* Before Image (Clipped via Width) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
              alt="Before: Unfinished Raw Office Space"
              className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none grayscale contrast-125"
              style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%" }}
            />

            {/* "BEFORE" Floating Badge */}
            <div className="absolute top-4 left-4 z-20 bg-[#18110B]/90 backdrop-blur-md text-stone-300 border border-white/20 text-xs font-mono font-bold px-3.5 py-1.5 shadow-lg tracking-wider uppercase">
              BEFORE: Raw Space
            </div>
          </div>

          {/* Vertical Divider Line with Center Drag Handle */}
          <div
            className="absolute top-0 bottom-0 z-30 w-0.5 bg-[#C5A880] shadow-[0_0_15px_#C5A880] pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#18110B] border-2 border-[#C5A880] text-[#C5A880] flex items-center justify-center shadow-2xl">
              <SlidersHorizontal className="w-4 h-4 animate-pulse" />
            </div>
          </div>
        </div>

      </section>

      {/* 3. Featured Case Studies Grid with Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-[#C5A880]/20">
        
        {/* Section Header & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-2">
              <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>NATIONWIDE ENTERPRISE PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
              Featured Corporate Case Studies
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 font-light max-w-xl">
              Walkthroughs of corporate headquarters delivered strictly on schedule, backed by FBR NTN tax invoicing and white-glove on-site assembly.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {[
              { id: "all", label: "All Projects" },
              { id: "fit-out", label: "Complete Floor Fit-Outs" },
              { id: "executive", label: "Executive Director Suites" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold transition-all border whitespace-nowrap ${
                  selectedFilter === tab.id
                    ? "bg-[#C5A880] text-[#18110B] border-[#C5A880] shadow-md font-bold"
                    : "bg-[#1E140C] text-stone-300 border-[#C5A880]/20 hover:border-[#C5A880]/50 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Cards Grid */}
        <div 
          ref={caseStudiesGridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {filteredProjects.map((proj) => (
            <article
              key={proj.id}
              className="bg-[#1A100A] rounded-none overflow-hidden border border-[#C5A880]/25 hover:border-[#C5A880]/70 transition-all duration-500 flex flex-col justify-between shadow-2xl relative group"
            >
              {/* Top Gold Hover Line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

              <div className="aspect-[16/10] overflow-hidden relative bg-[#120B07]">
                <img
                  src={proj.imageAfter}
                  alt={proj.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 brightness-95"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-[#18110B]/90 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/40 text-xs font-mono font-bold px-3 py-1 shadow-md">
                  {proj.category}
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#C5A880] font-mono mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{proj.city}</span>
                    <span>&bull;</span>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Delivered {proj.completionYear}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif text-white group-hover:text-[#E0C6A0] transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mt-2.5 font-light">
                    {proj.description}
                  </p>

                  {/* Scope of Fit-Out */}
                  <div className="mt-4 p-4 bg-[#22160E] border border-[#C5A880]/20 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#C5A880] uppercase tracking-wider block">
                      Scope of Turnkey Procurement:
                    </span>
                    <p className="text-xs font-semibold text-white font-mono">
                      {proj.scope}
                    </p>
                  </div>

                  {/* Products Deployed */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {proj.productsUsed.map((pName, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-[10px] font-mono text-stone-300 bg-[#120B07] px-2.5 py-1 border border-[#C5A880]/20"
                      >
                        &bull; {pName}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#C5A880]/15 flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-mono">
                    Client: <strong className="text-white">{proj.client}</strong>
                  </span>

                  <a
                    href={consultationWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A880] hover:text-[#E0C6A0] uppercase tracking-wider"
                  >
                    <span>Request Similar Layout</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Consultation CTA Banner */}
      <section className="bg-[#18110B] text-white py-20 border-t border-[#C5A880]/20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
            <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>COMPLIMENTARY ARCHITECTURAL WORKSPACE CAD SERVICE</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">
            Planning a Workplace Setup or Renovation?
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Our architectural team offers free 2D/3D floor space planning, on-site sample chair visits, and itemized NTN commercial proposals across Karachi, Lahore, and Islamabad.
          </p>
          <div className="pt-2">
            <a
              href={consultationWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] px-8 py-4 rounded-none font-bold text-xs uppercase tracking-[0.18em] shadow-xl transition-transform transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-[#18110B]" />
              <span>Get Free 3D Floor Layout & Quotation</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}