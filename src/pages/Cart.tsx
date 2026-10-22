import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { 
  ShoppingBag, 
  Trash2, 
  ArrowLeft, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Truck, 
  Building2, 
  PhoneCall, 
  Percent, 
  Plus, 
  Minus, 
  ArrowUpRight 
} from "lucide-react";

import { useQuote } from "../context/QuoteContext";
import { SITE_CONFIG } from "../data/furnitureData";
import { createWhatsAppUrl } from "../utils/whatsapp";

export default function Cart() {
  const { 
    items, 
    removeFromQuote, 
    updateQuantity, 
    clearQuote, 
    totalEstimatedPrice, 
    totalItemsCount 
  } = useQuote();

  const [clientName, setClientName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [ntnNumber, setNtnNumber] = useState<string>("");
  const [city, setCity] = useState<string>("Lahore");
  const [address, setAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const itemsContainerRef = useRef<HTMLDivElement | null>(null);
  const summaryCardRef = useRef<HTMLDivElement | null>(null);

  // SEO Page Title & Instant Scroll Reset
  useEffect(() => {
    document.title = "Official Quotation Builder & Cart | Saddat Atelier Pakistan";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    if (!pageContainerRef.current) return;

    const ctx = gsap.context(() => {
      if (itemsContainerRef.current) {
        gsap.fromTo(
          itemsContainerRef.current.children,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power2.out" }
        );
      }

      if (summaryCardRef.current) {
        gsap.fromTo(
          summaryCardRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power3.out", delay: 0.1 }
        );
      }
    }, pageContainerRef);

    return () => ctx.revert();
  }, [items.length]);

  // Dynamic Tier Calculation
  const tierInfo = useMemo(() => {
    if (totalItemsCount >= 50) {
      return {
        pct: 20,
        label: "Enterprise Tier (20% OFF)",
        nextTarget: null,
        itemsNeeded: 0,
      };
    }
    if (totalItemsCount >= 25) {
      return {
        pct: 15,
        label: "Mid-Corporate Tier (15% OFF)",
        nextTarget: 50,
        itemsNeeded: 50 - totalItemsCount,
      };
    }
    if (totalItemsCount >= 10) {
      return {
        pct: 10,
        label: "Standard Bulk Tier (10% OFF)",
        nextTarget: 25,
        itemsNeeded: 25 - totalItemsCount,
      };
    }
    return {
      pct: 0,
      label: "Direct Catalog Pricing",
      nextTarget: 10,
      itemsNeeded: 10 - totalItemsCount,
    };
  }, [totalItemsCount]);

  const discountAmount = Math.round((totalEstimatedPrice * tierInfo.pct) / 100);
  const netEstimatedTotal = totalEstimatedPrice - discountAmount;

  // Structured WhatsApp Message Dispatch
  const whatsappQuoteUrl = useMemo(() => {
    let itemsList = items
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (SKU: ${item.product.sku}) - Qty: ${
            item.quantity
          } x PKR ${item.product.price.toLocaleString()} | Finish: ${
            item.selectedColor || "Standard"
          }`
      )
      .join("\n");

    const message = `*OFFICIAL B2B QUOTATION REQUEST - SADDAT ATELIER*
---------------------------------------
• Client / Officer: ${clientName || "N/A"}
• Organization: ${companyName || "N/A"}
• Phone / WhatsApp: ${phone || "N/A"}
• FBR NTN Number: ${ntnNumber || "FBR Applicable"}
• Delivery Location: ${city} ${address ? `(${address})` : ""}

*SELECTED EQUIPMENT (${totalItemsCount} Total Units):*
${itemsList}

*COMMERCIAL BREAKDOWN:*
• Gross Catalog Total: PKR ${totalEstimatedPrice.toLocaleString()}
• Volume Discount Tier: *${tierInfo.label}*
• Applied Savings: -PKR ${discountAmount.toLocaleString()}
• Net Commercial Total: *PKR ${netEstimatedTotal.toLocaleString()}*
• On-Site Assembly: Included Complimentary

*LOGISTICS / FLOOR NOTES:*
${notes || "Please include official FBR-compliant GST invoice and estimated delivery schedule."}
---------------------------------------
Please provide a formal PDF corporate invoice schedule.`;

    return createWhatsAppUrl(message);
  }, [items, totalItemsCount, totalEstimatedPrice, tierInfo, discountAmount, netEstimatedTotal, clientName, companyName, phone, ntnNumber, city, address, notes]);

  // Empty State View
  if (items.length === 0) {
    return (
      <div className="w-full bg-[#120B07] text-stone-100 min-h-[85vh] py-24 px-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#1C120B] border border-[#C5A880]/35 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

          <div className="w-16 h-16 bg-[#24170F] border border-[#C5A880]/30 flex items-center justify-center mx-auto mb-6 text-[#C5A880]">
            <ShoppingBag className="w-8 h-8" />
          </div>

          <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase block mb-2">
            QUOTATION BASKET EMPTY
          </span>

          <h1 className="text-2xl sm:text-3xl font-serif text-white mb-3">
            No Models Selected
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light mb-8">
            Your commercial quotation request currently contains zero items. Browse our master catalog to select executive seating, workstations, or boardroom tables.
          </p>

          <Link
            to="/products"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#C5A880] text-[#18110B] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#D4BA93] transition-colors shadow-md active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse Master Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={pageContainerRef}
      className="w-full bg-[#120B07] text-stone-100 min-h-screen overflow-x-hidden selection:bg-[#C5A880] selection:text-[#18110B] py-12 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#C5A880]/20 mb-10 text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-2">
              <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>OFFICIAL B2B QUOTATION COCKPIT // 2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
              Quotation Review & <br className="sm:hidden" />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                Commercial Dispatch.
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono">
            <button
              onClick={clearQuote}
              className="text-rose-400 hover:text-rose-300 uppercase tracking-wider underline transition-colors"
            >
              Clear Basket
            </button>
            <Link
              to="/products"
              className="text-[#C5A880] hover:text-[#E0C6A0] uppercase tracking-wider border-b border-[#C5A880]/40 pb-0.5 transition-colors"
            >
              + Add More Models
            </Link>
          </div>
        </div>

        {/* 2-Column Grid: Itemized Basket (7 Cols) + Summary & Officer Info (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: Itemized Table */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Dynamic Tier Progression Alert */}
            <div className="p-4 sm:p-5 bg-[#1C120B] border border-[#C5A880]/30 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-stone-300 flex items-center gap-2">
                  <Percent className="w-4 h-4 text-[#C5A880]" />
                  <span>Current Status: <strong className="text-white">{tierInfo.label}</strong></span>
                </span>
                <span className="text-[#C5A880] font-bold">
                  {totalItemsCount} Total Units
                </span>
              </div>

              {tierInfo.nextTarget ? (
                <div className="space-y-1.5">
                  <div className="w-full h-1.5 bg-[#120B07] border border-[#C5A880]/20 overflow-hidden">
                    <div 
                      className="h-full bg-[#C5A880] transition-all duration-300"
                      style={{ width: `${Math.min(100, (totalItemsCount / tierInfo.nextTarget) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] font-mono text-stone-400">
                    Add <strong className="text-[#E0C6A0]">{tierInfo.itemsNeeded} more units</strong> to unlock the next volume tier!
                  </p>
                </div>
              ) : (
                <p className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Maximum 20% Enterprise Volume Discount unlocked!</span>
                </p>
              )}
            </div>

            {/* Items List */}
            <div ref={itemsContainerRef} className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor || "default"}`}
                  className="bg-[#1A100A] border border-[#C5A880]/25 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl relative group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#120B07] border border-[#C5A880]/20 flex-shrink-0 overflow-hidden p-2 flex items-center justify-center">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.name}
                        className="max-w-full max-h-full object-contain filter drop-shadow-md"
                      />
                    </div>

                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#C5A880] block">
                        {item.product.categoryName} &bull; {item.product.sku}
                      </span>
                      <h3 className="text-base sm:text-lg font-serif text-white line-clamp-1 font-medium">
                        {item.product.name}
                      </h3>
                      <div className="text-xs font-mono text-stone-400 mt-0.5">
                        <span>Finish: </span>
                        <span className="font-semibold text-[#E0C6A0]">
                          {item.selectedColor || "Standard"}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-white font-semibold mt-1">
                        PKR {item.product.price.toLocaleString()} / unit
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Line Total */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#C5A880]/15">
                    <div className="flex items-center border border-[#C5A880]/30 bg-[#120B07]">
                      <button
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="p-2 text-[#C5A880] hover:bg-[#1C120B] transition-colors"
                        title="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-9 text-center text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 text-[#C5A880] hover:bg-[#1C120B] transition-colors"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm sm:text-base font-bold font-sans text-white block">
                        PKR {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromQuote(item.product.id)}
                        className="text-[10px] font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1 mt-1 ml-auto"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT: Corporate Form & Commercial Summary */}
          <div ref={summaryCardRef} className="lg:col-span-5 space-y-6 text-left">
            
            <div className="bg-[#1C120B] border border-[#C5A880]/35 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

              <h2 className="text-xl font-serif text-white pb-3 border-b border-[#C5A880]/20">
                Commercial Summary
              </h2>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between text-stone-400">
                  <span>Gross Catalog Total</span>
                  <span className="text-white font-semibold">
                    PKR {totalEstimatedPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-stone-400">
                  <span>Volume Tier ({tierInfo.label})</span>
                  <span className={`font-semibold ${tierInfo.pct > 0 ? "text-emerald-400" : "text-stone-500"}`}>
                    {tierInfo.pct > 0 ? `- PKR ${discountAmount.toLocaleString()}` : "0%"}
                  </span>
                </div>

                <div className="flex justify-between text-stone-400">
                  <span>Nationwide Assembly</span>
                  <span className="text-emerald-400 font-semibold">
                    Complimentary in Major Hubs
                  </span>
                </div>

                <div className="pt-4 border-t border-[#C5A880]/20 flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-wider font-bold text-stone-300">
                    Net Commercial Total
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                    PKR {netEstimatedTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Corporate Procurement Details Form */}
              <div className="pt-6 border-t border-[#C5A880]/20 space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A880] font-semibold block">
                  Procurement Officer Information
                </span>

                <div>
                  <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                    Contact Officer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Mr. Tariq Mansoor"
                    className="w-full px-3.5 py-2.5 bg-[#120B07] border border-[#C5A880]/30 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                      Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Systems Limited"
                      className="w-full px-3.5 py-2.5 bg-[#120B07] border border-[#C5A880]/30 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full px-3.5 py-2.5 bg-[#120B07] border border-[#C5A880]/30 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                      Delivery City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#120B07] border border-[#C5A880]/30 text-xs text-white focus:outline-none focus:border-[#C5A880] cursor-pointer"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Multan">Multan</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Other City">Other City</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                      NTN Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={ntnNumber}
                      onChange={(e) => setNtnNumber(e.target.value)}
                      placeholder="e.g. 1234567-8"
                      className="w-full px-3.5 py-2.5 bg-[#120B07] border border-[#C5A880]/30 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                    Special Layout Requirements / Notes
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specify delivery timeline, custom dimensions, or tender specs..."
                    className="w-full px-3.5 py-2 bg-[#120B07] border border-[#C5A880]/30 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-xl active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-[#18110B]" />
                  <span>Send Quotation to WhatsApp</span>
                </a>

                <div className="text-[10px] font-mono text-center text-stone-400 leading-relaxed font-light">
                  Official FBR-compliant NTN invoice and 2D/3D architectural CAD layout will be issued upon receipt.
                </div>
              </div>
            </div>

            {/* Direct Specialist Desk Card */}
            <div className="p-5 bg-[#1A100A] border border-[#C5A880]/25 flex items-center justify-between text-xs font-mono shadow-xl">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">DIRECT PROCUREMENT DESK</span>
                <span className="font-semibold text-white">{SITE_CONFIG.phoneDisplay}</span>
              </div>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="px-4 py-2 bg-[#22160E] border border-[#C5A880]/30 hover:border-[#C5A880] text-[#C5A880] hover:text-white transition-colors"
              >
                Call Specialist
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}