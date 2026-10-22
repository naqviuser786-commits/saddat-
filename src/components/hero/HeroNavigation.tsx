import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  ShoppingBag, 
  ArrowRight,
  MapPin
} from "lucide-react";
import { useQuote } from "../../context/QuoteContext";
import { getGeneralWhatsAppUrl } from "../../utils/whatsapp";

export default function HeroNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { totalItemsCount } = useQuote();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#18110B]/95 backdrop-blur-xl border-b border-[#C5A880]/25 py-3.5 shadow-2xl"
          : "bg-transparent border-b border-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Editorial Descriptor */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none flex-shrink-0"
        >
          <div className="w-8 h-8 rounded-none border border-[#C5A880]/50 bg-[#2A1B12]/80 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:border-[#C5A880] transition-colors">
            S
          </div>
          <div className="flex flex-col text-left">
            <span className="text-lg sm:text-xl font-extrabold tracking-[0.22em] text-white uppercase font-sans leading-none">
              SADDAT
            </span>
            <span className="text-[9px] tracking-[0.28em] text-[#C5A880] uppercase font-mono font-medium mt-1">
              OFFICE FURNITURE
            </span>
          </div>
        </Link>

        {/* Desktop Editorial Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
          <Link
            to="/products/chairs"
            className="text-xs uppercase tracking-[0.16em] font-medium text-stone-300 hover:text-[#C5A880] transition-colors whitespace-nowrap"
          >
            Ergonomics
          </Link>
          <Link
            to="/products/desks"
            className="text-xs uppercase tracking-[0.16em] font-medium text-stone-300 hover:text-[#C5A880] transition-colors whitespace-nowrap"
          >
            Workstations
          </Link>
          <Link
            to="/products/tables"
            className="text-xs uppercase tracking-[0.16em] font-medium text-stone-300 hover:text-[#C5A880] transition-colors whitespace-nowrap"
          >
            Boardroom
          </Link>
          <Link
            to="/custom-furniture"
            className="text-xs uppercase tracking-[0.16em] font-medium text-stone-300 hover:text-[#C5A880] transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Bespoke</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          </Link>
          <Link
            to="/projects"
            className="text-xs uppercase tracking-[0.16em] font-medium text-stone-300 hover:text-[#C5A880] transition-colors whitespace-nowrap"
          >
            Case Studies
          </Link>
          <Link
            to="/bulk-orders"
            className="text-xs uppercase tracking-[0.16em] font-medium text-stone-300 hover:text-[#C5A880] transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Bulk Procurement</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-none bg-[#C5A880]/20 text-[#C5A880] font-mono border border-[#C5A880]/30">
              -20%
            </span>
          </Link>
          <Link
            to="/contact"
            className="text-xs uppercase tracking-[0.16em] font-medium text-stone-300 hover:text-[#C5A880] transition-colors whitespace-nowrap"
          >
            Showrooms
          </Link>
        </nav>

        {/* Right Actions: Master Catalog & Quote Bag */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#2A1B12]/80 hover:bg-[#C5A880] text-[#E0C6A0] hover:text-[#18110B] border border-[#C5A880]/40 hover:border-[#C5A880] text-[11px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-sm whitespace-nowrap"
          >
            <span>Master Catalog</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Quotation Bag */}
          <Link
            to="/request-quote"
            className="relative p-2.5 bg-[#2A1B12]/80 hover:bg-[#382417] border border-[#C5A880]/30 hover:border-[#C5A880] text-[#C5A880] transition-all flex items-center justify-center shadow-sm"
            title="Quotation Builder"
            aria-label="View Quotation Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C5A880] text-[#18110B] text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {totalItemsCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="xl:hidden p-2 text-[#C5A880] hover:text-white focus:outline-none transition-colors border border-[#C5A880]/30 bg-[#2A1B12]/80"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#18110B]/98 backdrop-blur-2xl border-b border-[#C5A880]/30 px-6 py-6 transition-all animate-fadeIn text-left">
          <div className="flex flex-col gap-3">
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200 hover:text-[#C5A880] flex items-center justify-between py-1"
            >
              <span>Master Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </Link>

            <Link
              to="/products/chairs"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200 hover:text-[#C5A880] flex items-center justify-between py-1"
            >
              <span>Executive Ergonomics (Chairs)</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </Link>

            <Link
              to="/products/desks"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200 hover:text-[#C5A880] flex items-center justify-between py-1"
            >
              <span>Executive Desks & Sit-Stand</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </Link>

            <Link
              to="/products/tables"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200 hover:text-[#C5A880] flex items-center justify-between py-1"
            >
              <span>Boardroom Conference Tables</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </Link>

            <Link
              to="/custom-furniture"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E0C6A0] hover:text-[#C5A880] flex items-center justify-between py-1"
            >
              <span>Bespoke Workshop & Finishes</span>
              <span className="text-[9px] px-2 py-0.5 bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40 font-mono">
                Custom CAD
              </span>
            </Link>

            <Link
              to="/bulk-orders"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200 hover:text-[#C5A880] flex items-center justify-between py-1"
            >
              <span>Corporate Bulk Procurement</span>
              <span className="text-[9px] px-2 py-0.5 rounded-none bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40 font-mono">
                20% OFF
              </span>
            </Link>

            <Link
              to="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200 hover:text-[#C5A880] flex items-center justify-between py-1"
            >
              <span>Completed Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200 hover:text-[#C5A880] flex items-center justify-between py-1"
            >
              <span>Company Story & Heritage</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200 hover:text-[#C5A880] flex items-center justify-between py-1"
            >
              <span>Showroom Locations (LHR &bull; KHI &bull; ISB)</span>
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
            </Link>

            <Link
              to="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200 hover:text-[#C5A880] flex items-center justify-between py-1"
            >
              <span>Knowledgebase & FAQ</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
            
            <div className="pt-4 border-t border-[#C5A880]/20 space-y-2">
              <Link
                to="/request-quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C5A880] text-[#18110B] text-xs uppercase tracking-[0.2em] font-bold py-3.5 px-6 rounded-none transition-colors hover:bg-[#D4BA93]"
              >
                <span>Request Quotation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#18110B]" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}