import React, { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Building2, 
  Percent, 
  ShieldCheck, 
  Truck, 
  FileCheck, 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  Send, 
  CheckCircle2, 
  Users, 
  Clock, 
  ArrowUpRight, 
  Sliders, 
  Award
} from "lucide-react";

import { SITE_CONFIG } from "../data/furnitureData";
import { createWhatsAppUrl } from "../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  companyName: string;
  ntnNumber: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  chairsQty: number;
  desksQty: number;
  tablesQty: number;
  budgetRange: string;
  deliveryTimeline: string;
  requestDemoChair: boolean;
  additionalNotes: string;
}

export default function BulkOrdersPage() {
  const [step, setStep] = useState<number>(1);

  const [form, setForm] = useState<FormData>({
    companyName: "",
    ntnNumber: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "Lahore",
    chairsQty: 20,
    desksQty: 8,
    tablesQty: 1,
    budgetRange: "PKR 1,000,000 – 2,500,000",
    deliveryTimeline: "Within 2 Weeks",
    requestDemoChair: true,
    additionalNotes: "",
  });

  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const calculatorCardRef = useRef<HTMLDivElement | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);
  const trustGridRef = useRef<HTMLDivElement | null>(null);

  // SEO Page Title & Instant Scroll Reset
  useEffect(() => {
    document.title = "Corporate Bulk Office Furniture Orders Pakistan | Saddat Atelier";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Total Units & Tier Calculations
  const totalUnits = Number(form.chairsQty) + Number(form.desksQty) + Number(form.tablesQty);

  const tierDetails = useMemo(() => {
    if (totalUnits >= 50) {
      return {
        pct: 20,
        tierName: "Enterprise Tier",
        benefit: "Maximum 20% Volume Benefit + Free 3D Architectural CAD Layout + Priority Nationwide Logistics",
      };
    }
    if (totalUnits >= 25) {
      return {
        pct: 15,
        tierName: "Mid-Corporate Tier",
        benefit: "15% Commercial Discount + Free On-Site Demo Unit Trial + Complimentary White-Glove Assembly",
      };
    }
    if (totalUnits >= 10) {
      return {
        pct: 10,
        tierName: "Standard Bulk Tier",
        benefit: "10% Volume Discount + Free Assembly in Karachi, Lahore & Islamabad",
      };
    }
    return {
      pct: 0,
      tierName: "Standard Corporate Price",
      benefit: "Add 10 or more total units to activate commercial tier discounts",
    };
  }, [totalUnits]);

  // Estimated Gross & Net Savings calculation
  const estimatedGrossPKR = (form.chairsQty * 24500) + (form.desksQty * 68500) + (form.tablesQty * 135000);
  const estimatedSavingsPKR = Math.round((estimatedGrossPKR * tierDetails.pct) / 100);
  const estimatedNetPKR = estimatedGrossPKR - estimatedSavingsPKR;

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

      if (calculatorCardRef.current) {
        gsap.fromTo(
          calculatorCardRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: calculatorCardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (trustGridRef.current) {
        gsap.fromTo(
          trustGridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: trustGridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, pageContainerRef);

    return () => ctx.revert();
  }, []);

  // WhatsApp Proposal Submission
  const handleSubmitToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*OFFICIAL CORPORATE PROCUREMENT PROPOSAL INQUIRY*
---------------------------------------
• Organization: ${form.companyName || "N/A"}
• NTN Number: ${form.ntnNumber || "FBR Registered / Applicable"}
• Contact Officer: ${form.contactPerson || "N/A"}
• WhatsApp / Phone: ${form.phone || "N/A"}
• Email: ${form.email || "N/A"}
• Delivery City: ${form.city}

*ESTIMATED EQUIPMENT QUANTITIES (${totalUnits} Total Units):*
• Executive / Task Chairs: ${form.chairsQty} Units
• Executive Desks / Workstation Pods: ${form.desksQty} Units
• Conference Boardroom Tables: ${form.tablesQty} Units

*ESTIMATED COMMERCIAL BENEFIT:*
• Applicable Tier: *${tierDetails.tierName} (${tierDetails.pct}% OFF)*
• Estimated Gross: PKR ${estimatedGrossPKR.toLocaleString()}
• Estimated Savings: -PKR ${estimatedSavingsPKR.toLocaleString()}
• Estimated Net Proposal: *PKR ${estimatedNetPKR.toLocaleString()}*

*PROJECT LOGISTICS & SERVICES:*
• Budget Bracket: ${form.budgetRange}
• Delivery Timeline: ${form.deliveryTimeline}
• 48-Hour Demo Chair Requested: ${form.requestDemoChair ? "YES" : "NO"}
• Floor Notes: ${form.additionalNotes || "Standard layout"}
---------------------------------------
Please provide an itemized formal GST quotation and 3D architectural CAD layout schedule.`;

    window.open(createWhatsAppUrl(message), "_blank");
  };

  return (
    <div 
      ref={pageContainerRef}
      className="w-full bg-[#120B07] text-stone-100 min-h-screen overflow-x-hidden selection:bg-[#C5A880] selection:text-[#18110B]"
    >
      
      {/* 1. Procurement Hero Header */}
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
            <Percent className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>OFFICIAL B2B CORPORATE PROCUREMENT DESK</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white max-w-4xl mx-auto leading-[1.02]">
            Furnish Your Entire Enterprise <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
              With Up to 20% Volume Benefits.
            </span>
          </h1>

          <p className="text-stone-300 text-xs sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Turnkey office furniture packages tailored for growing tech enterprises, multinational headquarters, architectural studios, and banking institutions across Pakistan.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-stone-300 font-mono">
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <FileCheck className="w-4 h-4 text-[#C5A880]" />
              Direct FBR / NTN Tax Invoicing
            </span>
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <Truck className="w-4 h-4 text-emerald-400" />
              Nationwide White-Glove Fleet Assembly
            </span>
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              2 to 3-Year Direct Replacement Warranty
            </span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Real-Time Tier Savings Engine */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20">
        <div 
          ref={calculatorCardRef}
          className="bg-[#1C120B] border border-[#C5A880]/35 shadow-2xl p-6 sm:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Interactive Quantity Sliders */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-[#C5A880]/20 pb-3">
                <div className="flex items-center gap-2 text-white font-serif font-bold text-lg sm:text-xl">
                  <Calculator className="w-5 h-5 text-[#C5A880]" />
                  <span>Real-Time Volume Discount Simulator</span>
                </div>
                <span className="text-xs font-mono text-[#C5A880] bg-[#C5A880]/15 px-2.5 py-0.5 border border-[#C5A880]/30">
                  {totalUnits} Units Total
                </span>
              </div>

              {/* Slider 1: Chairs */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-300">Office Chairs (AeroMesh / Leather):</span>
                  <span className="text-[#C5A880] font-bold">{form.chairsQty} Units</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={form.chairsQty}
                  onChange={(e) => setForm({ ...form, chairsQty: Number(e.target.value) })}
                  className="w-full accent-[#C5A880] cursor-pointer bg-[#120B07] h-2 rounded-none"
                />
              </div>

              {/* Slider 2: Desks */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-300">Managerial Desks & Workstations:</span>
                  <span className="text-[#C5A880] font-bold">{form.desksQty} Units</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={form.desksQty}
                  onChange={(e) => setForm({ ...form, desksQty: Number(e.target.value) })}
                  className="w-full accent-[#C5A880] cursor-pointer bg-[#120B07] h-2 rounded-none"
                />
              </div>

              {/* Slider 3: Tables */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-300">Conference & Boardroom Tables:</span>
                  <span className="text-[#C5A880] font-bold">{form.tablesQty} Units</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={form.tablesQty}
                  onChange={(e) => setForm({ ...form, tablesQty: Number(e.target.value) })}
                  className="w-full accent-[#C5A880] cursor-pointer bg-[#120B07] h-2 rounded-none"
                />
              </div>

              <p className="text-[11px] font-mono text-stone-400">
                {tierDetails.benefit}
              </p>
            </div>

            {/* Right: Real-Time Commercial Output Box */}
            <div className="lg:col-span-5 bg-[#120B07] border border-[#C5A880]/30 p-6 sm:p-7 space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-[#C5A880]/15 pb-2">
                <span className="text-[10px] font-mono uppercase text-stone-400">ACTIVATED TIER</span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5">
                  {tierDetails.tierName}
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-stone-400">
                  <span>Gross Value:</span>
                  <span className="text-white font-medium">PKR {estimatedGrossPKR.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Applied Volume Discount:</span>
                  <span className="text-emerald-400 font-bold">
                    {tierDetails.pct > 0 ? `-${tierDetails.pct}% (-PKR ${estimatedSavingsPKR.toLocaleString()})` : "0%"}
                  </span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Nationwide Assembly:</span>
                  <span className="text-emerald-400 font-semibold">Included Free</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#C5A880]/20">
                <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">
                  ESTIMATED COMMERCIAL TOTAL
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                  PKR {estimatedNetPKR.toLocaleString()}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Multi-Step Procurement Quotation Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        <div 
          ref={formCardRef}
          className="bg-[#1A100A] border border-[#C5A880]/30 shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

          {/* Steps Indicator Header */}
          <div className="bg-[#22160E] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#C5A880]/20">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Request Official Commercial Quotation
              </h2>
              <p className="text-xs text-stone-400 mt-1 font-light">
                Receive an itemized commercial proposal with official GST invoice breakdown
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 flex items-center justify-center text-xs font-mono font-bold ${step === 1 ? "bg-[#C5A880] text-[#18110B]" : "bg-[#18110B] text-stone-400 border border-[#C5A880]/20"}`}>
                1
              </span>
              <div className="w-6 h-0.5 bg-[#C5A880]/30" />
              <span className={`w-8 h-8 flex items-center justify-center text-xs font-mono font-bold ${step === 2 ? "bg-[#C5A880] text-[#18110B]" : "bg-[#18110B] text-stone-400 border border-[#C5A880]/20"}`}>
                2
              </span>
              <div className="w-6 h-0.5 bg-[#C5A880]/30" />
              <span className={`w-8 h-8 flex items-center justify-center text-xs font-mono font-bold ${step === 3 ? "bg-[#C5A880] text-[#18110B]" : "bg-[#18110B] text-stone-400 border border-[#C5A880]/20"}`}>
                3
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmitToWhatsApp} className="p-6 sm:p-10 space-y-6 text-left">
            
            {/* STEP 1: Corporate Entity & Officer Info */}
            {step === 1 && (
              <div className="space-y-5">
                <h3 className="font-serif font-bold text-white text-lg flex items-center gap-2 border-b border-[#C5A880]/20 pb-3">
                  <Building2 className="w-5 h-5 text-[#C5A880]" />
                  <span>Step 1: Company & Procurement Officer Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      placeholder="e.g. Systems Limited, Techlogix, Unilever"
                      className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                      FBR NTN Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={form.ntnNumber}
                      onChange={(e) => setForm({ ...form, ntnNumber: e.target.value })}
                      placeholder="e.g. 1234567-8"
                      className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                      Contact Person & Designation *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.contactPerson}
                      onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                      placeholder="e.g. Tariq Mansoor (Head of Admin)"
                      className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0300 1234567"
                      className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                      Project Delivery City *
                    </label>
                    <select
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] cursor-pointer"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Multan">Multan</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Other City across Pakistan">Other City across Pakistan</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!form.companyName || !form.contactPerson || !form.phone) {
                        alert("Please fill in company name, contact person, and phone number.");
                        return;
                      }
                      setStep(2);
                    }}
                    className="px-8 py-4 bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] font-bold text-xs uppercase tracking-[0.18em] flex items-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <span>Next: Project Logistics & Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Project Logistics & Demo Chair Request */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="font-serif font-bold text-white text-lg flex items-center gap-2 border-b border-[#C5A880]/20 pb-3">
                  <Clock className="w-5 h-5 text-[#C5A880]" />
                  <span>Step 2: Deployment Timeline & Demo Evaluation</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                      Estimated Project Budget Bracket
                    </label>
                    <select
                      value={form.budgetRange}
                      onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] cursor-pointer"
                    >
                      <option value="Under PKR 1,000,000">Under PKR 1,000,000</option>
                      <option value="PKR 1,000,000 – 2,500,000">PKR 1,000,000 – 2,500,000</option>
                      <option value="PKR 2,500,000 – 5,000,000">PKR 2,500,000 – 5,000,000</option>
                      <option value="PKR 5,000,000+ (Full Headquarters Fitout)">PKR 5,000,000+ (Full Headquarters Fitout)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                      Required Delivery Timeline
                    </label>
                    <select
                      value={form.deliveryTimeline}
                      onChange={(e) => setForm({ ...form, deliveryTimeline: e.target.value })}
                      className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] cursor-pointer"
                    >
                      <option value="Immediate Dispatch (24-48 Hours)">Immediate Dispatch (24-48 Hours - In Stock)</option>
                      <option value="Within 2 Weeks">Within 2 Weeks</option>
                      <option value="Within 1 Month (Site Finishing)">Within 1 Month (Site Finishing)</option>
                      <option value="Flexible / Preliminary BOQ Tender">Flexible / Preliminary BOQ Tender</option>
                    </select>
                  </div>
                </div>

                {/* Demo Unit Checkbox */}
                <div className="p-4 bg-[#22160E] border border-[#C5A880]/30 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="demoCheck"
                    checked={form.requestDemoChair}
                    onChange={(e) => setForm({ ...form, requestDemoChair: e.target.checked })}
                    className="w-4 h-4 accent-[#C5A880] mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="demoCheck" className="text-xs text-stone-200 cursor-pointer font-light">
                    <strong className="text-white font-medium block">Request Free 48-Hour On-Site Demo Chair:</strong>
                    For corporate orders of 20+ chairs, our technical team delivers a sample chair to your office in Lahore, Karachi, or Islamabad for executive evaluation prior to bulk confirmation.
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 text-stone-400 hover:text-white font-mono text-xs uppercase tracking-wider"
                  >
                    &larr; Back to Company Info
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-4 bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] font-bold text-xs uppercase tracking-[0.18em] flex items-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <span>Next: Review & Export Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Proposal Review & Official WhatsApp Dispatch */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="font-serif font-bold text-white text-lg flex items-center gap-2 border-b border-[#C5A880]/20 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Step 3: Review Commercial Summary & Export Proposal</span>
                </h3>

                <div className="p-5 bg-[#22160E] border border-[#C5A880]/25 space-y-3 text-xs sm:text-sm font-mono">
                  <div className="flex justify-between border-b border-[#C5A880]/15 pb-2">
                    <span className="text-stone-400">Organization:</span>
                    <span className="font-bold text-white">{form.companyName} ({form.city})</span>
                  </div>

                  <div className="flex justify-between border-b border-[#C5A880]/15 pb-2">
                    <span className="text-stone-400">Procurement Officer:</span>
                    <span className="font-bold text-white">{form.contactPerson} ({form.phone})</span>
                  </div>

                  <div className="flex justify-between border-b border-[#C5A880]/15 pb-2">
                    <span className="text-stone-400">Total Equipment Volume:</span>
                    <span className="font-bold text-[#E0C6A0]">
                      {form.chairsQty} Chairs &bull; {form.desksQty} Desks &bull; {form.tablesQty} Tables ({totalUnits} Total Units)
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-[#C5A880]/15 pb-2">
                    <span className="text-stone-400">Applied Discount Tier:</span>
                    <span className="font-extrabold text-[#C5A880]">
                      {tierDetails.tierName} (-{tierDetails.pct}%)
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-400">Estimated Net Proposal:</span>
                    <span className="font-extrabold text-emerald-400">
                      PKR {estimatedNetPKR.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                    Architectural Notes / Specific Finish Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.additionalNotes}
                    onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
                    placeholder="Provide details on specific laminate colors, room dimensions, or tender specs..."
                    className="w-full px-4 py-3 bg-[#120B07] border border-[#C5A880]/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 text-stone-400 hover:text-white font-mono text-xs uppercase tracking-wider"
                  >
                    &larr; Back to Logistics
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl active:scale-95"
                  >
                    <Send className="w-4 h-4 text-[#18110B]" />
                    <span>Send Official Proposal via WhatsApp</span>
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>

      </section>

      {/* 4. Corporate Procurement Standards Grid */}
      <section className="bg-[#18110B] border-t border-[#C5A880]/20 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl font-serif text-white">
              Corporate Procurement Standards
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 font-light">
              Why 500+ enterprises, software houses, and banking institutions trust Saddat Atelier
            </p>
          </div>

          <div 
            ref={trustGridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          >
            <div className="p-6 sm:p-8 bg-[#1A100A] border border-[#C5A880]/25 space-y-3">
              <FileCheck className="w-8 h-8 text-[#C5A880]" />
              <h4 className="font-serif font-bold text-base sm:text-lg text-white">
                FBR Sales Tax & NTN Compliance
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Complete corporate audit documentation, official GST invoicing, and registered vendor documentation provided with every shipment.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-[#1A100A] border border-[#C5A880]/25 space-y-3">
              <Users className="w-8 h-8 text-[#C5A880]" />
              <h4 className="font-serif font-bold text-base sm:text-lg text-white">
                48-Hour Demo Chair Evaluation
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                For corporate orders of 20+ chairs, our team brings evaluation units directly to your office for management and HR comfort trials.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-[#1A100A] border border-[#C5A880]/25 space-y-3">
              <Clock className="w-8 h-8 text-[#C5A880]" />
              <h4 className="font-serif font-bold text-base sm:text-lg text-white">
                Guaranteed Contractual Delivery
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                We guarantee contractual delivery schedules backed by turnkey white-glove assembly in Karachi, Lahore, and Islamabad.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}