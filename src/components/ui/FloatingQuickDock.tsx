import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, ShoppingBag, ArrowUp, Sparkles } from "lucide-react";
import { useQuote } from "../../context/QuoteContext";
import { getGeneralWhatsAppUrl } from "../../utils/whatsapp";

export default function FloatingQuickDock() {
  const { totalItemsCount } = useQuote();
  const { pathname } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 450);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <aside 
      aria-label="Quick Actions Dock"
      className="fixed bottom-5 right-4 sm:right-6 z-50 flex items-center gap-2 select-none"
    >
      {/* 1. Smooth Scroll To Top Button (Appears after 450px scroll) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          type="button"
          aria-label="Scroll back to top"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-none bg-[#1C120B]/90 hover:bg-[#C5A880] text-[#C5A880] hover:text-[#18110B] border border-[#C5A880]/35 hover:border-[#C5A880] backdrop-blur-xl shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-90 animate-fadeIn"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* 2. Floating Quotation Bag Pill */}
      <Link
        to="/request-quote"
        className="relative h-10 sm:h-11 px-3.5 sm:px-4 bg-[#1C120B]/90 hover:bg-[#2A1B12] text-[#C5A880] hover:text-white border border-[#C5A880]/40 backdrop-blur-xl shadow-2xl flex items-center gap-2 transition-all duration-300 active:scale-95 group"
        title="View Quotation Basket"
        aria-label="View Quotation Basket"
      >
        <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
        <span className="hidden sm:inline text-[11px] font-mono uppercase tracking-wider font-semibold">
          Quote
        </span>
        
        {totalItemsCount > 0 ? (
          <span className="bg-[#C5A880] text-[#18110B] text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full flex items-center justify-center shadow-md animate-pulse">
            {totalItemsCount}
          </span>
        ) : (
          <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
        )}
      </Link>

      {/* 3. Pulsing Corporate WhatsApp Desk Button */}
      <a
        href={getGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-10 sm:h-11 px-3.5 sm:px-4 bg-[#1C120B]/95 hover:bg-[#2A1B12] text-white border border-[#C5A880]/50 hover:border-[#C5A880] backdrop-blur-xl shadow-2xl flex items-center gap-2.5 transition-all duration-300 active:scale-95 group"
        title="24/7 Corporate WhatsApp Desk"
        aria-label="Contact Corporate WhatsApp Desk"
      >
        {/* Pulsing Beacon Indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>

        <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
        
        <span className="hidden sm:inline text-[11px] font-mono uppercase tracking-[0.16em] text-stone-200 group-hover:text-white font-semibold">
          WhatsApp Desk
        </span>
      </a>
    </aside>
  );
}