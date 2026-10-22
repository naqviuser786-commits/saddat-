import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { 
  Menu, 
  X, 
  ShoppingBag, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  MapPin,
  Hammer
} from "lucide-react";
import { SITE_CONFIG } from "../../data/furnitureData";
import { useQuote } from "../../context/QuoteContext";
import { getGeneralWhatsAppUrl } from "../../utils/whatsapp";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount } = useQuote();

  // Primary Navigation Links (Desktop Spaced)
  const primaryLinks = [
    { name: "Chairs", path: "/products/chairs" },
    { name: "Desks", path: "/products/desks" },
    { name: "Tables", path: "/products/tables" },
    { name: "Bespoke", path: "/custom-furniture", highlight: true },
    { name: "Bulk -20%", path: "/bulk-orders" },
    { name: "Projects", path: "/projects" },
    { name: "Catalog", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Showrooms", path: "/contact" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 shadow-2xl transition-all duration-300">
      
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#0E0804] border-b border-[#C5A880]/20 text-xs text-stone-300 py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 bg-[#C5A880]/15 text-[#C5A880] px-2 py-0.5 rounded-none border border-[#C5A880]/30 font-mono tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-[#C5A880]" /> Corporate Advantage
            </span>
            <span className="text-stone-300 font-light">
              Up to 20% Volume Benefits on Enterprise Orders across Pakistan
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="hidden md:inline text-stone-400">Karachi &bull; Lahore &bull; Islamabad</span>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="flex items-center gap-1.5 text-[#C5A880] hover:text-[#E0C6A0] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="bg-[#18110B]/95 backdrop-blur-xl border-b border-[#C5A880]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo & Wordmark */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none flex-shrink-0">
              <div className="w-9 h-9 rounded-none border border-[#C5A880]/50 bg-[#2A1B12] flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:border-[#C5A880] transition-colors">
                S
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white font-extrabold text-lg sm:text-xl tracking-[0.22em] uppercase font-sans leading-none">
                  SADDAT
                </span>
                <span className="text-[#C5A880] text-[9px] font-mono tracking-[0.28em] uppercase mt-1">
                  OFFICE FURNITURE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
              {primaryLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-[0.16em] font-medium transition-colors whitespace-nowrap py-1 flex items-center gap-1 ${
                      isActive
                        ? "text-[#C5A880] border-b-2 border-[#C5A880] font-semibold"
                        : "text-stone-300 hover:text-[#C5A880]"
                    }`
                  }
                >
                  <span>{link.name}</span>
                  {link.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
              
              {/* Showroom Map Pin Link */}
              <Link
                to="/contact"
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-stone-300 hover:text-[#C5A880] text-xs font-mono tracking-wider transition-colors"
                title="View Showroom Locations"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Showrooms</span>
              </Link>

              {/* WhatsApp Desk Button */}
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2A1B12] hover:bg-[#382417] text-[#C5A880] hover:text-white border border-[#C5A880]/40 px-3.5 py-2.5 rounded-none text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-sm"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Quote Bag Button */}
              <Link
                to="/request-quote"
                className="relative p-2.5 rounded-none bg-[#2A1B12] hover:bg-[#382417] text-[#C5A880] border border-[#C5A880]/40 transition-all flex items-center justify-center shadow-sm"
                title="View Quotation Cart"
                aria-label="View Quotation Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#C5A880] text-[#18110B] text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {totalItemsCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Actions & Menu Trigger Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <Link
                to="/request-quote"
                className="relative p-2 rounded-none bg-[#2A1B12] text-[#C5A880] border border-[#C5A880]/30"
                aria-label="View Quotation Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C5A880] text-[#18110B] text-[9px] font-mono font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-none bg-[#2A1B12] text-[#C5A880] hover:text-white border border-[#C5A880]/30 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer (All Dedicated Routes Accessible) */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#18110B]/98 backdrop-blur-2xl border-t border-[#C5A880]/30 px-6 pt-4 pb-8 space-y-2.5 animate-fadeIn text-left">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-xs uppercase tracking-[0.2em] font-medium text-stone-200 hover:text-[#C5A880]"
          >
            <span>Home Flagship</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
          </NavLink>

          {primaryLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 text-xs uppercase tracking-[0.2em] font-medium transition-colors ${
                  isActive
                    ? "text-[#18110B] bg-[#C5A880] font-bold"
                    : "text-stone-200 hover:text-[#C5A880]"
                }`
              }
            >
              <span>{link.name}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </NavLink>
          ))}

          <NavLink
            to="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-xs uppercase tracking-[0.2em] font-medium text-stone-200 hover:text-[#C5A880]"
          >
            <span>Knowledgebase & FAQ</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
          </NavLink>

          <div className="pt-4 border-t border-[#C5A880]/20 space-y-2">
            <Link
              to="/request-quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#C5A880] text-[#18110B] py-3 text-xs uppercase tracking-[0.2em] font-bold shadow-md"
            >
              <span>Request Quotation</span>
              <ShoppingBag className="w-4 h-4 text-[#18110B]" />
            </Link>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#24170F] text-[#C5A880] border border-[#C5A880]/40 py-3 text-xs uppercase tracking-[0.2em] font-semibold"
            >
              <span>Inquire on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}