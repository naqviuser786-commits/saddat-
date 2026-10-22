import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ChevronDown, 
  HelpCircle, 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  ShieldCheck 
} from "lucide-react";

// Components Import
import Hero from "../components/sections/Hero";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import Categories from "../components/sections/Categories";
import Testimonials from "../components/sections/Testimonials";
import Newsletter from "../components/sections/Newsletter";

// Data & Helpers
import { FAQ_DATA } from "../data/furnitureData";
import { getGeneralWhatsAppUrl } from "../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [openFaq, setOpenFaq] = useState<string | null>("faq-01");

  const faqSectionRef = useRef<HTMLElement | null>(null);
  const faqHeaderRef = useRef<HTMLDivElement | null>(null);
  const faqListRef = useRef<HTMLDivElement | null>(null);

  // SEO Page Title & Instant Scroll Reset
  useEffect(() => {
    document.title = "Saddat Office Furniture | Premium Architectural Office Furniture Pakistan";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // GSAP ScrollTrigger for Homepage FAQ Section
  useEffect(() => {
    if (!faqSectionRef.current) return;

    const ctx = gsap.context(() => {
      if (faqHeaderRef.current) {
        gsap.fromTo(
          faqHeaderRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: faqHeaderRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (faqListRef.current) {
        gsap.fromTo(
          faqListRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: faqListRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, faqSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-[#18110B] text-stone-100 overflow-x-hidden selection:bg-[#C5A880] selection:text-[#18110B]">
      
      {/* 1. Cinematic 360° Hero & Atelier Intro */}
      <Hero />

      {/* 2. Executive Ergonomic Seating Suite (with Interactive Tabs & Local Images) */}
      <FeaturedProducts />

      {/* 3. Architectural Workspace Domains (Chairs, Desks, Boardroom) */}
      <Categories />

      {/* 4. Client Testimonials & Live GSAP Animated Metrics Counters */}
      <Testimonials />

      {/* 5. Frequently Asked Questions (GSAP ScrollTriggered Accordion) */}
      <section 
        ref={faqSectionRef}
        className="relative w-full bg-[#18110B] text-stone-100 py-24 sm:py-32 border-t border-[#C5A880]/20 overflow-hidden"
      >
        {/* Subtle Architectural Wood Texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(197, 168, 128, 0.1) 0px, rgba(197, 168, 128, 0.1) 1px, transparent 1px, transparent 80px)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-4xl h-44 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div 
            ref={faqHeaderRef}
            className="text-center mb-16 sm:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#24170F] border border-[#C5A880]/30 text-[#C5A880] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-4 shadow-sm">
              <HelpCircle className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>ARCHITECTURAL KNOWLEDGEBASE</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.02]">
              Corporate Procurement & <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                Warranty Guidelines.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 mt-4 max-w-xl mx-auto leading-relaxed font-light">
              Clear specifications regarding nationwide transit, FBR-compliant NTN tax invoicing, and our comprehensive 2 to 3-year replacement guarantees.
            </p>
          </div>

          {/* Accordion Items in Obsidian & Walnut Glass */}
          <div ref={faqListRef} className="space-y-4 text-left">
            {FAQ_DATA.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border transition-all duration-300 overflow-hidden shadow-xl ${
                    isOpen
                      ? "bg-[#1C120B] border-[#C5A880]/70"
                      : "bg-[#160E08] border-[#C5A880]/25 hover:border-[#C5A880]/50"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                      <span className="font-serif text-white text-base sm:text-lg pr-4 font-normal">
                        {faq.question}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-none border border-[#C5A880]/30 bg-[#22160E] flex items-center justify-center shrink-0">
                      <ChevronDown
                        className={`w-4 h-4 text-[#C5A880] transform transition-transform duration-300 ${
                          isOpen ? "rotate-180 bg-[#C5A880] text-[#18110B]" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="p-5 sm:p-6 pt-0 text-stone-300 text-xs sm:text-sm leading-relaxed border-t border-[#C5A880]/15 font-light animate-fadeIn">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dedicated FAQ Link & Consultation Helpline Strip */}
          <div className="mt-12 p-6 sm:p-8 rounded-none bg-[#1C120B] border border-[#C5A880]/35 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

            <div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                Need more detailed tender or delivery guidelines?
              </h4>
              <p className="text-xs text-stone-400 mt-1 font-light">
                Browse our complete searchable knowledgebase or speak with our corporate procurement desk.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link
                to="/faq"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-none bg-[#24170F] hover:bg-[#342014] text-white border border-[#C5A880]/40 text-xs uppercase tracking-[0.16em] font-semibold transition-colors whitespace-nowrap"
              >
                <span>Browse Full FAQ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-none bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] font-bold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 shrink-0 transition-colors shadow-md active:scale-95 whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-[#18110B]" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Master Catalog Download Section */}
      <Newsletter />

    </div>
  );
}