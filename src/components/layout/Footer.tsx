import React from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Truck, 
  Settings, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight,
  ExternalLink,
  Hammer,
  FileCheck
} from "lucide-react";
import { SITE_CONFIG } from "../../data/furnitureData";
import { getGeneralWhatsAppUrl } from "../../utils/whatsapp";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0E0804] text-stone-300 border-t border-[#C5A880]/20 mt-auto overflow-hidden text-left">
      
      {/* 1. Value & Trust Pillars Bar */}
      <div className="border-b border-[#C5A880]/20 bg-[#140C07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            
            {/* Feature 1 */}
            <div className="flex items-start gap-4 p-4 bg-[#1C120B]/80 border border-[#C5A880]/20">
              <div className="w-12 h-12 bg-[#2A1B12] border border-[#C5A880]/30 text-[#C5A880] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
              </div>
              <div>
                <h4 className="text-white font-serif font-bold text-base">Premium Quality Guarantee</h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  BIFMA X5.1 tested materials with 2 to 3-year official replacement warranty.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4 p-4 bg-[#1C120B]/80 border border-[#C5A880]/20">
              <div className="w-12 h-12 bg-[#2A1B12] border border-[#C5A880]/30 text-[#C5A880] flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-[#C5A880]" />
              </div>
              <div>
                <h4 className="text-white font-serif font-bold text-base">Nationwide Turnkey Logistics</h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Insured fleet delivery and on-site assembly in Karachi, Lahore, and Islamabad.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4 p-4 bg-[#1C120B]/80 border border-[#C5A880]/20">
              <div className="w-12 h-12 bg-[#2A1B12] border border-[#C5A880]/30 text-[#C5A880] flex items-center justify-center shrink-0">
                <Settings className="w-6 h-6 text-[#C5A880]" />
              </div>
              <div>
                <h4 className="text-white font-serif font-bold text-base">Bespoke Architectural Workshop</h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Custom walnut finishes, wire conduits, and tailored executive CAD plans.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info & Wordmark */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 border border-[#C5A880]/50 bg-[#2A1B12] flex items-center justify-center text-white font-bold text-base">
                S
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white font-extrabold text-base tracking-[0.2em] uppercase">
                  SADDAT
                </span>
                <span className="text-[#C5A880] text-[9px] font-mono tracking-widest uppercase">
                  OFFICE FURNITURE
                </span>
              </div>
            </Link>

            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Your premier corporate partner for high-durability executive seating, managerial workstations, and high-capacity boardroom tables across Pakistan.
            </p>

            <div className="pt-2">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#C5A880] hover:text-[#E0C6A0] transition-colors"
              >
                <span>Direct Corporate WhatsApp Desk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Furniture Collections (Direct Category Routes) */}
          <div>
            <h5 className="text-white font-serif font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#C5A880] pl-2.5">
              Atelier Collections
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/products/chairs" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  Office Chairs (AeroMesh & Leather)
                </Link>
              </li>
              <li>
                <Link to="/products/desks" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  Executive Desks & Smart Standing
                </Link>
              </li>
              <li>
                <Link to="/products/tables" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  Boardroom Conference Tables
                </Link>
              </li>
              <li>
                <Link to="/custom-furniture" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  Bespoke Workshop & Finishes
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  Complete 2026 Master Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Trust (All Dedicated Multi-Pages) */}
          <div>
            <h5 className="text-white font-serif font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#C5A880] pl-2.5">
              Corporate Desk
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  Company Story & Heritage
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  Turnkey Office Fit-Out Case Studies
                </Link>
              </li>
              <li>
                <Link to="/bulk-orders" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  Corporate Bulk Procurement (-20%)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  Showroom Locations (LHR &bull; KHI &bull; ISB)
                </Link>
              </li>
              <li>
                <Link to="/request-quote" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  B2B Quotation Builder & Cart
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  Corporate Knowledgebase & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Showrooms & Inquiries */}
          <div className="space-y-3.5 text-xs">
            <h5 className="text-white font-serif font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#C5A880] pl-2.5">
              Showrooms & Inquiries
            </h5>
            
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <Link to="/contact" className="text-stone-400 hover:text-white transition-colors">
                Showroom 14-B, Gulberg III, Lahore / DHA Phase 6, Karachi / Blue Area, Islamabad
              </Link>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
              <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-stone-300 hover:text-[#C5A880]">
                {SITE_CONFIG.phoneDisplay}
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-stone-300 hover:text-[#C5A880] break-all">
                {SITE_CONFIG.email}
              </a>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <p className="text-stone-300">{SITE_CONFIG.businessHours}</p>
                <p className="text-stone-500 text-[11px]">Corporate WhatsApp: 24/7</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Legal & Corporate Bar */}
      <div className="border-t border-[#C5A880]/15 py-5 bg-[#090503]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-mono">
          <p>© {currentYear} Saddat Office Furniture. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-stone-400">NTN: 1234567-8 Registered Corporate Vendor</span>
            <Link to="/faq" className="hover:text-[#C5A880] transition-colors">Support & Warranty</Link>
            <Link to="/contact" className="hover:text-[#C5A880] transition-colors">Showrooms</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}