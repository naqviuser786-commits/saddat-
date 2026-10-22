import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FileText, 
  Mail, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  FileCode2, 
  Check 
} from "lucide-react";
import { createWhatsAppUrl } from "../../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

interface SpecDocument {
  id: string;
  title: string;
  fileType: string;
  desc: string;
}

const SPEC_DOCS: SpecDocument[] = [
  {
    id: "price-schedule",
    title: "2026 Master Commercial Price Schedule",
    fileType: "PDF (18.4 MB)",
    desc: "Itemized corporate procurement schedule with GST tax breakdown & 20% bulk tiers.",
  },
  {
    id: "cad-kit",
    title: "AutoCAD 2D/3D BIM Space Planning Kit",
    fileType: "DWG / 3DS (45 MB)",
    desc: "Complete architectural blocks for desks, workstations, and boardroom monolithic slabs.",
  },
  {
    id: "bifma-certs",
    title: "BIFMA X5.1 Safety & Kinematic Test Reports",
    fileType: "PDF (8.2 MB)",
    desc: "Independent lab certifications for Class-4 gas lifts and 150kg cyclic load trials.",
  },
];

export default function Newsletter() {
  const [selectedDoc, setSelectedDoc] = useState<string>("price-schedule");
  const [contactInput, setContactInput] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // GSAP ScrollTrigger Animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 45, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;

    const activeDoc = SPEC_DOCS.find((d) => d.id === selectedDoc)?.title || "Master Corporate Catalog";

    const catalogUrl = createWhatsAppUrl(
      `*OFFICIAL SPECIFICATION & CATALOG DOWNLOAD REQUEST*
---------------------------------------
• Document Requested: ${activeDoc}
• Recipient Email / WhatsApp: ${contactInput}
---------------------------------------
Please dispatch the official PDF download link and architectural specification sheet.`
    );
    window.open(catalogUrl, "_blank");

    setSubmitted(true);
    setContactInput("");
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#120B07] text-stone-100 py-24 sm:py-32 border-t border-[#C5A880]/20 overflow-hidden"
    >
      {/* Architectural Ambient Gold Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#8C6D46]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card with Deep Walnut Obsidian & Gold Border */}
        <div 
          ref={cardRef}
          className="relative rounded-none bg-gradient-to-r from-[#1A100A] via-[#22160E] to-[#1A100A] text-white p-8 sm:p-14 lg:p-16 overflow-hidden border border-[#C5A880]/35 shadow-2xl"
        >
          {/* Top Gold Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-7">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#18110B]/90 border border-[#C5A880]/40 text-[#E0C6A0] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>OFFICIAL 2026 ATELIER SPECIFICATION KIT</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
              Download the Master Corporate Catalog & <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                Commercial Price Schedule.
              </span>
            </h2>

            {/* Description */}
            <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
              Access complete CAD layout specifications, material swatches (Korean mesh, premium Italian leathers, natural walnut veneers), and tiered 20% corporate procurement pricing.
            </p>

            {/* Interactive Document Selector Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
              {SPEC_DOCS.map((doc) => {
                const isSelected = selectedDoc === doc.id;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => setSelectedDoc(doc.id)}
                    className={`p-3.5 border transition-all text-left flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#C5A880] text-[#18110B] border-[#C5A880] shadow-md font-bold"
                        : "bg-[#140C07] text-stone-300 border-[#C5A880]/25 hover:border-[#C5A880]/60"
                    }`}
                  >
                    <div>
                      <span className={`text-[9px] font-mono uppercase tracking-wider block mb-1 ${isSelected ? "text-[#18110B]" : "text-[#C5A880]"}`}>
                        {doc.fileType}
                      </span>
                      <h4 className="text-xs font-serif font-bold leading-snug">
                        {doc.title}
                      </h4>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[10px] font-mono opacity-80">
                      <span>Instant Dispatch</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Form */}
            {submitted ? (
              <div className="p-4 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-2 text-sm font-medium animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Thank you. Your official specification request has been dispatched to WhatsApp.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto pt-2">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <input
                    type="text"
                    required
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    placeholder="Enter corporate email or WhatsApp number"
                    className="w-full pl-10 pr-4 py-3.5 rounded-none bg-[#120B07] border border-[#C5A880]/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-none bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] font-bold text-xs uppercase tracking-[0.18em] transition-all shrink-0 flex items-center justify-center gap-2 shadow-lg active:scale-95"
                >
                  <Download className="w-4 h-4 text-[#18110B]" />
                  <span>Get Spec Kit</span>
                </button>
              </form>
            )}

            {/* Micro Details */}
            <p className="text-[10px] font-mono text-stone-400 tracking-wider">
              Instant PDF &bull; Zero spam &bull; Direct B2B procurement assistance
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}