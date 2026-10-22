import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Sparkles, 
  Ruler, 
  Palette, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Layers, 
  Send, 
  FileText, 
  Check, 
  PhoneCall,
  Tv,
  ArrowUpRight
} from "lucide-react";

import { SITE_CONFIG } from "../data/furnitureData";
import { createWhatsAppUrl } from "../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

interface MaterialSwatch {
  id: string;
  name: string;
  type: string;
  textureBg: string;
  accentColor: string;
  description: string;
  bestFor: string;
}

const MATERIAL_SWATCHES: MaterialSwatch[] = [
  {
    id: "dark-walnut",
    name: "Executive Dark Walnut",
    type: "Natural Architectural Wood Veneer",
    textureBg: "linear-gradient(135deg, #2B1810 0%, #1A0D08 100%)",
    accentColor: "#C5A880",
    description: "Deep, rich timber grain with thermal scratch-resistant protective matte polyurethane finish.",
    bestFor: "Director Cabins, C-Suite Desks & Monolithic Boardrooms",
  },
  {
    id: "smoked-oak",
    name: "Smoked Architectural Oak",
    type: "Matte Natural Wood Finish",
    textureBg: "linear-gradient(135deg, #3D2D23 0%, #251A14 100%)",
    accentColor: "#D4BA93",
    description: "Contemporary linear oak grain with subtle grey undertones suited for modern corporate spaces.",
    bestFor: "Managerial Workstations & Modern Executive Suites",
  },
  {
    id: "royal-ash",
    name: "Royal Ash Grey",
    type: "Thermal-Fused Anti-Reflective Melamine",
    textureBg: "linear-gradient(135deg, #383431 0%, #22201E 100%)",
    accentColor: "#E0C6A0",
    description: "Anti-glare textured finish engineered for collaborative software houses and tech cluster pods.",
    bestFor: "Open-Plan Workstation Clusters & Project Review Tables",
  },
  {
    id: "italian-leather",
    name: "Obsidian Top-Grain Bonded Leather",
    type: "Commercial Upholstery Grade",
    textureBg: "linear-gradient(135deg, #181818 0%, #080808 100%)",
    accentColor: "#A68B65",
    description: "Supple, breathable upholstery rated for 100,000+ Martindale abrasion cycles.",
    bestFor: "Presidential High-Back Seating & Lounge Armchairs",
  },
];

export default function CustomFurniturePage() {
  const [selectedSwatch, setSelectedSwatch] = useState<MaterialSwatch>(MATERIAL_SWATCHES[0]);

  // Form State
  const [furnitureType, setFurnitureType] = useState<string>("Executive Suite Desk");
  const [customLength, setCustomLength] = useState<string>("210 cm (7 Feet)");
  const [customWidth, setCustomWidth] = useState<string>("90 cm (3 Feet)");
  const [woodFinish, setWoodFinish] = useState<string>("Executive Dark Walnut");
  const [avBoxes, setAvBoxes] = useState<boolean>(true);
  const [officerName, setOfficerName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("Lahore");
  const [notes, setNotes] = useState<string>("");

  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const swatchesRef = useRef<HTMLDivElement | null>(null);
  const processGridRef = useRef<HTMLDivElement | null>(null);

  // SEO Page Title & Instant Scroll Reset
  useEffect(() => {
    document.title = "Bespoke Workshop & Custom Office Furniture Pakistan | Saddat Atelier";
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

      if (swatchesRef.current) {
        gsap.fromTo(
          swatchesRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: swatchesRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (processGridRef.current) {
        gsap.fromTo(
          processGridRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: processGridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, pageContainerRef);

    return () => ctx.revert();
  }, []);

  // WhatsApp Custom Inquiries Dispatch
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*BESPOKE WORKSHOP CUSTOM SPECIFICATION INQUIRY*
---------------------------------------
• Organization: ${companyName || "N/A"}
• Contact Officer: ${officerName || "N/A"}
• Phone / WhatsApp: ${phone || "N/A"}
• Location: ${city}

*CUSTOM SPECIFICATIONS:*
• Furniture Type: ${furnitureType}
• Custom Dimensions: ${customLength} x ${customWidth}
• Selected Finish: ${woodFinish}
• Integrated AV Flip-Up Multi-Box: ${avBoxes ? "YES (Required)" : "NO"}
• Notes / Floor CAD: ${notes || "Standard executive room space"}
---------------------------------------
Please provide a customized 3D CAD drawing and an itemized commercial fabrication estimate.`;

    window.open(createWhatsAppUrl(message), "_blank");
  };

  return (
    <div 
      ref={pageContainerRef}
      className="w-full bg-[#120B07] text-stone-100 min-h-screen overflow-x-hidden selection:bg-[#C5A880] selection:text-[#18110B]"
    >
      
      {/* 1. Atelier Workshop Hero Header */}
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
          ref={heroRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#24170F] border border-[#C5A880]/40 text-[#E0C6A0] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>BESPOKE ARCHITECTURAL WORKSHOP // HAND-CRAFTED ATELIER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white max-w-4xl mx-auto leading-[1.02]">
            Custom Dimensions. Curated Veneers. <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
              Tailored to Your Exact Floor Plan.
            </span>
          </h1>

          <p className="text-stone-300 text-xs sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            When standard catalog sizes do not match your architectural room dimensions. We craft bespoke executive L-desks, U-shaped boardroom monoliths, and brand-matched cluster workstations.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-stone-300 font-mono">
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <Ruler className="w-4 h-4 text-[#C5A880]" />
              Millimeter Precision CNC Sizing
            </span>
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <Palette className="w-4 h-4 text-[#C5A880]" />
              30+ Natural Wood & Lacquer Finishes
            </span>
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              3-Year Structural Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Material & Swatch Inspector Widget */}
      <section 
        ref={swatchesRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-2">
            <Palette className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>ARCHITECTURAL MATERIAL MATRIX</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif text-white">
            Curated Wood Veneers & Textures
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 font-light">
            Touch or click any architectural finish below to inspect grain profile, protective coating, and recommended corporate applications.
          </p>
        </div>

        {/* Swatch Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {MATERIAL_SWATCHES.map((swatch) => (
            <button
              key={swatch.id}
              onClick={() => setSelectedSwatch(swatch)}
              className={`p-4 border text-left transition-all relative overflow-hidden group ${
                selectedSwatch.id === swatch.id
                  ? "bg-[#1C120B] border-[#C5A880] shadow-[0_4px_25px_rgba(197,168,128,0.25)]"
                  : "bg-[#160E08] border-[#C5A880]/20 hover:border-[#C5A880]/50"
              }`}
            >
              {/* Texture Graphic Block */}
              <div 
                className="w-full h-16 sm:h-20 mb-3 border border-white/10 shadow-inner transition-transform group-hover:scale-102"
                style={{ background: swatch.textureBg }}
              />
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A880] block mb-0.5">
                {swatch.type.split(" ")[0]}
              </span>
              <span className="text-sm font-serif font-bold text-white block truncate">
                {swatch.name}
              </span>
            </button>
          ))}
        </div>

        {/* Swatch Detail Output Stage */}
        <div className="bg-[#1C120B] border border-[#C5A880]/35 p-6 sm:p-10 shadow-2xl relative overflow-hidden text-left">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Visual Swatch Preview Plate */}
            <div 
              className="md:col-span-5 aspect-[4/3] border border-[#C5A880]/30 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden"
              style={{ background: selectedSwatch.textureBg }}
            >
              <div className="bg-[#18110B]/80 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#C5A880] border border-[#C5A880]/30 w-max">
                AUTHENTIC SPECIFICATION
              </div>

              <div className="bg-[#18110B]/90 backdrop-blur-md p-4 border border-[#C5A880]/25">
                <span className="text-xs font-mono text-stone-400 block text-[10px] uppercase">GRAIN TEXTURE</span>
                <span className="text-lg font-serif font-bold text-white block">{selectedSwatch.name}</span>
              </div>
            </div>

            {/* Swatch Technical Description */}
            <div className="md:col-span-7 space-y-4">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A880] bg-[#C5A880]/15 px-2.5 py-1 border border-[#C5A880]/30">
                {selectedSwatch.type}
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif text-white">
                {selectedSwatch.name}
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                {selectedSwatch.description}
              </p>

              <div className="p-4 bg-[#120B07] border border-[#C5A880]/20 space-y-1 text-xs font-mono">
                <span className="text-stone-400 text-[10px] uppercase tracking-wider block">RECOMMENDED APPLICATIONS:</span>
                <span className="text-white font-semibold">{selectedSwatch.bestFor}</span>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setWoodFinish(selectedSwatch.name)}
                  className="px-5 py-2.5 bg-[#C5A880] text-[#18110B] text-xs uppercase tracking-[0.16em] font-bold hover:bg-[#D4BA93] transition-colors"
                >
                  Use this Finish in Custom Form &darr;
                </button>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 3. 4-Step Bespoke Atelier Workflow */}
      <section className="bg-[#18110B] border-t border-[#C5A880]/20 py-20 sm:py-24 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
              The Bespoke Execution Process
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 font-light">
              From architectural concept drawings to white-glove corporate delivery
            </p>
          </div>

          <div 
            ref={processGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="p-6 bg-[#1A100A] border border-[#C5A880]/25 space-y-3">
              <span className="text-xs font-mono font-bold text-[#C5A880]">PHASE 01</span>
              <h4 className="font-serif font-bold text-base text-white">AutoCAD 2D/3D Space Review</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Our architectural team reviews your room layout, cable entry points, and director ergonomics free of charge.
              </p>
            </div>

            <div className="p-6 bg-[#1A100A] border border-[#C5A880]/25 space-y-3">
              <span className="text-xs font-mono font-bold text-[#C5A880]">PHASE 02</span>
              <h4 className="font-serif font-bold text-base text-white">Physical Swatch Dispatch</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                We courier physical veneer, laminate, and leather samples directly to your corporate desk for touch approval.
              </p>
            </div>

            <div className="p-6 bg-[#1A100A] border border-[#C5A880]/25 space-y-3">
              <span className="text-xs font-mono font-bold text-[#C5A880]">PHASE 03</span>
              <h4 className="font-serif font-bold text-base text-white">Precision CNC Fabrication</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Crafted in our modern woodworking workshop with high-density core board, laser edge-banding, and steel subframes.
              </p>
            </div>

            <div className="p-6 bg-[#1A100A] border border-[#C5A880]/25 space-y-3">
              <span className="text-xs font-mono font-bold text-[#C5A880]">PHASE 04</span>
              <h4 className="font-serif font-bold text-base text-white">Insured Turnkey Assembly</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Delivered via company fleet and assembled on-site by our expert technicians in Karachi, Lahore, and Islamabad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Custom Specifications Request Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-left">
        <div className="bg-[#1C120B] border border-[#C5A880]/35 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

          <div className="mb-8 border-b border-[#C5A880]/20 pb-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Request Bespoke Fabrication Estimate
            </h2>
            <p className="text-xs text-stone-400 mt-1 font-light">
              Submit your required dimensions and receive an itemized proposal with AutoCAD 3D layout support.
            </p>
          </div>

          <form onSubmit={handleCustomSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                  Bespoke Furniture Type *
                </label>
                <select
                  value={furnitureType}
                  onChange={(e) => setFurnitureType(e.target.value)}
                  className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] cursor-pointer"
                >
                  <option value="Executive Suite L-Desk with Credenza">Executive Suite L-Desk with Credenza</option>
                  <option value="Monolithic Boardroom Table (12-22 Persons)">Monolithic Boardroom Table (12-22 Persons)</option>
                  <option value="Circular / U-Shaped Meeting Table">Circular / U-Shaped Meeting Table</option>
                  <option value="Custom Modular Workstation Cluster (6-12 Pax)">Custom Modular Workstation Cluster (6-12 Pax)</option>
                  <option value="Executive Storage Credenza / Bookcase">Executive Storage Credenza / Bookcase</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                  Selected Finish / Veneer *
                </label>
                <input
                  type="text"
                  required
                  value={woodFinish}
                  onChange={(e) => setWoodFinish(e.target.value)}
                  className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                  Required Length (e.g. 210 cm / 7 Feet) *
                </label>
                <input
                  type="text"
                  required
                  value={customLength}
                  onChange={(e) => setCustomLength(e.target.value)}
                  className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                  Required Width / Depth (e.g. 90 cm / 3 Feet) *
                </label>
                <input
                  type="text"
                  required
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            {/* Pop-Up AV Multi-box checkbox */}
            <div className="p-4 bg-[#22160E] border border-[#C5A880]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Tv className="w-5 h-5 text-[#C5A880]" />
                <div>
                  <span className="text-xs font-semibold text-white block">Integrated Pop-Up Power & HDMI Multi-Box</span>
                  <span className="text-[11px] text-stone-400 font-light">Flush brushed aluminum multi-standard AC and 4K HDMI presentation ports</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={avBoxes}
                onChange={(e) => setAvBoxes(e.target.checked)}
                className="w-4 h-4 accent-[#C5A880] cursor-pointer"
              />
            </div>

            {/* Officer Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                  Company / Entity *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Systems Ltd"
                  className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                  Contact Officer *
                </label>
                <input
                  type="text"
                  required
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  placeholder="e.g. Ar. Tariq Mansoor"
                  className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300 1234567"
                  className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                Special Floor Plan Details / Custom Requests (Optional)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention wall dimensions, corner angles, or specific credenza drawer configurations..."
                className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
              >
                <Send className="w-4 h-4 text-[#18110B]" />
                <span>Send Bespoke Request via WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
}