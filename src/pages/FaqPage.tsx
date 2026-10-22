import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  MessageSquare, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Award, 
  FileCheck, 
  CheckCircle2, 
  RotateCcw 
} from "lucide-react";

import { SITE_CONFIG } from "../data/furnitureData";
import { createWhatsAppUrl } from "../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

interface DetailedFaq {
  id: string;
  category: "Bulk & NTN" | "Chairs & Ergonomics" | "Desks & Workstations" | "Delivery & Logistics" | "Warranty & Support";
  question: string;
  answer: string;
}

const EXTENDED_FAQS: DetailedFaq[] = [
  {
    id: "faq-01",
    category: "Bulk & NTN",
    question: "Do you provide FBR-compliant Sales Tax Invoices and NTN corporate documentation?",
    answer: "Yes, absolutely. Saddat Office Furniture is a registered corporate vendor with the Federal Board of Revenue (FBR). All commercial and bulk orders are supplied with official Sales Tax Invoices showing applicable GST, withholding tax credentials, and vendor NTN certificates required for audit compliance.",
  },
  {
    id: "faq-02",
    category: "Bulk & NTN",
    question: "What volume discounts apply to corporate orders of 10+ or 50+ units?",
    answer: "We offer structured corporate procurement tiers: 10–24 units activate a 10% volume benefit; 25–49 units activate a 15% mid-corporate benefit; and orders of 50+ units unlock our 20% Enterprise Tier. Enterprise packages also include complimentary 3D AutoCAD space layouts and priority production scheduling.",
  },
  {
    id: "faq-03",
    category: "Delivery & Logistics",
    question: "Which cities in Pakistan do you deliver to and what are the delivery timelines?",
    answer: "We operate dedicated delivery and installation fleets across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, and Peshawar. In-stock seating and standard desks are dispatched within 24 to 48 hours in major metropolitan hubs. Custom finishes or large modular fits-outs are delivered within 10 to 14 business days.",
  },
  {
    id: "faq-04",
    category: "Warranty & Support",
    question: "What is covered under the 2 to 3-Year Official Replacement Warranty?",
    answer: "All executive and ergonomic chairs feature a 2-Year comprehensive replacement warranty covering Class-4 pneumatic hydraulic cylinders, multi-angle synchro-tilt mechanisms, and nylon caster wheels. Executive desks and boardroom tables carry a 3-Year structural guarantee against panel delamination, sagging, and hardware malfunction.",
  },
  {
    id: "faq-05",
    category: "Chairs & Ergonomics",
    question: "How does your active lumbar tracking prevent back pain during 10+ hour workdays?",
    answer: "Unlike fixed foam backrests that force static posture, Saddat ergonomic chairs feature dynamic pivot lumbar hinges that automatically track the natural lordotic curve of your lower spine (L4-L5 vertebrae). Combined with high-tensile breathable Korean AeroMesh, this eliminates thermal fatigue and spinal compression.",
  },
  {
    id: "faq-06",
    category: "Desks & Workstations",
    question: "How do your executive desks handle monitor cables, laptop chargers, and HDMI feeds?",
    answer: "Our executive desks and boardroom tables feature factory-fitted flush pop-up brushed aluminum multi-boxes with integrated AC universal sockets, USB-C fast-charging ports, and concealed under-desk steel raceways to ensure 100% clutter-free wire management.",
  },
  {
    id: "faq-07",
    category: "Bulk & NTN",
    question: "Can we request a sample chair evaluation at our corporate premises before confirming a bulk order?",
    answer: "Yes. For corporate requirements of 20 or more chairs, our technical team delivers evaluation demo units directly to your office in Lahore, Karachi, or Islamabad. Your management, admin, and HR teams can test ergonomics and build quality on-site for up to 48 hours before issuing a formal Purchase Order.",
  },
  {
    id: "faq-08",
    category: "Delivery & Logistics",
    question: "Do you provide on-site assembly, leveling, and packaging disposal?",
    answer: "Yes. For corporate orders in major metropolitan centers, our trained installation crews perform complete unboxing, precision alignment, floor leveling, and packaging cleanup so that your new office floor is turn-key operational immediately.",
  },
];

const CATEGORIES = [
  "All",
  "Bulk & NTN",
  "Chairs & Ergonomics",
  "Desks & Workstations",
  "Delivery & Logistics",
  "Warranty & Support"
] as const;

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-01");

  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const accordionContainerRef = useRef<HTMLDivElement | null>(null);

  // SEO Page Title & Instant Scroll Reset
  useEffect(() => {
    document.title = "Frequently Asked Questions & Corporate Knowledgebase | Saddat Atelier";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = useMemo(() => {
    return EXTENDED_FAQS.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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

      if (accordionContainerRef.current) {
        gsap.fromTo(
          accordionContainerRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: accordionContainerRef.current,
              start: "top 85%",
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
    if (!accordionContainerRef.current) return;

    gsap.fromTo(
      accordionContainerRef.current.children,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
  }, [selectedCategory, searchQuery]);

  // Schema.org FAQPage Rich Snippet Data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": EXTENDED_FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <div 
      ref={pageContainerRef}
      className="w-full bg-[#120B07] text-stone-100 min-h-screen overflow-x-hidden selection:bg-[#C5A880] selection:text-[#18110B]"
    >
      
      {/* Schema.org Rich Snippet for Google Search Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Page Hero Header with Search Bar */}
      <section className="relative w-full pt-20 pb-14 sm:pt-28 sm:pb-20 border-b border-[#C5A880]/20 bg-[#18110B] overflow-hidden">
        
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
          className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#24170F] border border-[#C5A880]/30 text-[#E0C6A0] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>SEARCHABLE ARCHITECTURAL KNOWLEDGEBASE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.02] mb-5">
            Frequently Asked <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
              Commercial Guidelines.
            </span>
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed font-light mb-8">
            Clear specifications regarding nationwide transit, FBR-compliant NTN tax invoicing, 48-hour demo chair trials, and our 2-to-3 year replacement warranty.
          </p>

          {/* Instant Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#C5A880]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. warranty, FBR, Karachi, mesh, cable)..."
              className="w-full pl-12 pr-10 py-4 bg-[#120B07] border border-[#C5A880]/35 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] shadow-2xl transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-stone-400 hover:text-white"
                title="Clear Search"
              >
                &times;
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Main Accordion Content Area */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Category Domain Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold transition-all border select-none ${
                selectedCategory === cat
                  ? "bg-[#C5A880] text-[#18110B] border-[#C5A880] shadow-[0_4px_20px_rgba(197,168,128,0.25)] font-bold"
                  : "bg-[#22160E] text-stone-300 border-[#C5A880]/20 hover:border-[#C5A880]/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 bg-[#1A100A] border border-[#C5A880]/30 p-8 shadow-xl max-w-lg mx-auto">
            <HelpCircle className="w-12 h-12 text-[#C5A880]/60 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">No matching questions found</h3>
            <p className="text-xs sm:text-sm text-stone-400 mb-6 font-light">
              Couldn't find the exact answer? Connect directly with our corporate specialists on WhatsApp.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A880] text-[#18110B] text-xs uppercase tracking-[0.18em] font-bold shadow-md hover:bg-[#D4BA93] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Search Filters</span>
            </button>
          </div>
        ) : (
          <div ref={accordionContainerRef} className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border transition-all duration-300 overflow-hidden shadow-xl text-left ${
                    isOpen
                      ? "bg-[#1C120B] border-[#C5A880]/70"
                      : "bg-[#1A100A] border-[#C5A880]/25 hover:border-[#C5A880]/50"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] flex-shrink-0" />
                      <h2 className="text-base sm:text-lg font-serif text-white tracking-wide font-normal">
                        {faq.question}
                      </h2>
                    </div>

                    <div
                      className={`w-8 h-8 border border-[#C5A880]/30 bg-[#22160E] flex items-center justify-center text-[#C5A880] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180 bg-[#C5A880] text-[#18110B]" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-stone-300 text-xs sm:text-sm leading-relaxed border-t border-[#C5A880]/15 font-light">
                      <p>{faq.answer}</p>
                      
                      <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono text-stone-400 border-t border-[#C5A880]/15">
                        <span className="text-[#C5A880] text-[10px] uppercase tracking-wider">
                          Domain: {faq.category}
                        </span>
                        
                        <a
                          href={createWhatsAppUrl(`Assalam-o-Alaikum Saddat Furniture, I need more details regarding: "${faq.question}"`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors flex items-center gap-1.5 text-emerald-400 text-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Ask on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 3. Corporate Procurement Helpline Callout */}
        <div className="mt-16 sm:mt-20 bg-gradient-to-r from-[#1A100A] via-[#24170F] to-[#1A100A] p-8 sm:p-10 border border-[#C5A880]/35 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-left">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-serif text-white flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
              <span>Have a Project or Tender BOQ Specification?</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl font-light">
              Connect directly with our Chief Procurement Consultant for tailored 3D CAD layouts, sample chair demonstrations, and volume discounting.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/bulk-orders"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] font-bold text-xs uppercase tracking-[0.18em] shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              <span>Bulk Order Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-[#C5A880]/30 text-stone-200 hover:text-white font-semibold text-xs uppercase tracking-[0.18em] transition-all whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 text-[#C5A880]" />
              <span>{SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>

      </section>

    </div>
  );
}