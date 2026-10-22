import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Plus, ShieldCheck, MessageSquare, ImageOff, Tv, Cable, Sparkles } from "lucide-react";
import { Product } from "../../types";
import { useQuote } from "../../context/QuoteContext";
import { getProductWhatsAppUrl } from "../../utils/whatsapp";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToQuote } = useQuote();
  const [justAdded, setJustAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isChair = product.category === "chairs";

  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToQuote(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <article className="group bg-[#160E08] rounded-none border border-[#C5A880]/25 hover:border-[#C5A880]/80 transition-all duration-500 flex flex-col justify-between overflow-hidden h-full shadow-2xl hover:shadow-[0_20px_50px_rgba(197,168,128,0.12)] relative">
      
      {/* Top Brushed Gold Accent Line on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />

      {/* 1. Dual-Mode Image Viewport */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#1C120B] to-[#120B07] overflow-hidden border-b border-[#C5A880]/15 flex items-center justify-center">
        
        {/* Mode A (Chairs): Ambient Studio Pedestal Glow */}
        {isChair && (
          <div className="absolute bottom-4 w-3/4 h-12 bg-[#C5A880]/12 rounded-full blur-xl pointer-events-none group-hover:bg-[#C5A880]/22 transition-all duration-500" />
        )}

        {/* Top Badges Layer (z-20) */}
        <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-1.5 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-[#18110B]/95 backdrop-blur-md text-[#E0C6A0] border border-[#C5A880]/50 text-[9px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 shadow-md">
              Atelier Best Seller
            </span>
          )}
          {product.specs?.warranty && (
            <span className="bg-[#18110B]/90 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/30 text-[9px] font-mono tracking-wider px-2 py-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
              {product.specs.warranty.split(" ")[0]} {product.specs.warranty.split(" ")[1]}
            </span>
          )}
        </div>

        {/* SKU Watermark (Top Right) */}
        <div className="absolute top-3 right-3 z-20 bg-[#18110B]/80 backdrop-blur-sm px-2 py-0.5 text-[9px] font-mono text-[#C5A880]/80 border border-[#C5A880]/25 pointer-events-none">
          {product.sku}
        </div>

        {/* Image Display */}
        <Link 
          to={`/products/${product.slug}`} 
          className="relative z-10 w-full h-full flex items-center justify-center focus:outline-none overflow-hidden"
        >
          {imageError ? (
            <div className="flex flex-col items-center justify-center text-[#C5A880]/60 gap-2">
              <ImageOff className="w-8 h-8" />
              <span className="text-[10px] font-mono uppercase tracking-wider">Preview Unavailable</span>
            </div>
          ) : isChair ? (
            /* Chair Mode: 3D Transparent Floating Cutout */
            <div className="w-full h-full p-6 flex items-center justify-center">
              <img
                src={product.thumbnail}
                alt={product.name}
                loading="lazy"
                onError={() => setImageError(true)}
                className="max-w-full max-h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] transform group-hover:scale-108 transition-transform duration-700 ease-out"
              />
            </div>
          ) : (
            /* Desks & Tables Mode: Architectural Photography with Seamless Vignette & Bottom Gradient Fade */
            <div className="relative w-full h-full">
              <img
                src={product.thumbnail}
                alt={product.name}
                loading="lazy"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-700 ease-out brightness-[0.88] group-hover:brightness-[0.98] contrast-[1.08]"
              />
              {/* Seamless Bottom Shadow Blend into Card */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#160E08] via-transparent to-black/20 pointer-events-none" />
              
              {/* Feature Pill Overlay for Desks / Tables */}
              <div className="absolute bottom-2.5 left-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#18110B]/90 backdrop-blur-md text-[9px] font-mono uppercase text-[#E0C6A0] border border-[#C5A880]/30 shadow-md">
                  {product.category === "desks" ? <Cable className="w-2.5 h-2.5 text-[#C5A880]" /> : <Tv className="w-2.5 h-2.5 text-[#C5A880]" />}
                  <span>{product.category === "desks" ? "Cable Raceway" : "Flip-Up AV Hub"}</span>
                </span>
              </div>
            </div>
          )}
        </Link>
      </div>

      {/* 2. Content & Specifications */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
        <div>
          <span className="text-[10px] font-mono tracking-[0.22em] text-[#C5A880] uppercase font-semibold block mb-1">
            {product.categoryName}
          </span>

          <Link to={`/products/${product.slug}`} className="focus:outline-none">
            <h3 className="text-white font-serif text-lg sm:text-xl group-hover:text-[#E0C6A0] transition-colors line-clamp-1 mb-1.5 font-medium">
              {product.name}
            </h3>
          </Link>

          <p className="text-stone-400 text-xs line-clamp-1 font-light font-sans mb-3.5">
            {product.tagline}
          </p>

          {/* Features Bullets */}
          <ul className="space-y-1.5 text-[11px] text-stone-300 font-sans">
            {product.features.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 line-clamp-1">
                <span className="text-[#C5A880] text-xs leading-none mt-0.5">&#9670;</span>
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price & Commercial Guarantee */}
        <div className="mt-5 pt-4 border-t border-[#C5A880]/15 flex items-baseline justify-between">
          <div>
            <span className="text-[9px] font-mono text-stone-400 uppercase block tracking-wider">
              Direct Atelier Price
            </span>
            <span className="text-white font-sans font-bold text-lg sm:text-xl">
              PKR {product.price.toLocaleString()}
            </span>
          </div>

          <span className="text-[9px] font-mono text-[#C5A880] bg-[#C5A880]/10 border border-[#C5A880]/30 px-2 py-0.5 tracking-wider">
            B2B Tier Eligible
          </span>
        </div>
      </div>

      {/* 3. Luxury Actions: Add to Quote + WhatsApp Desk */}
      <div className="p-5 sm:p-6 pt-0 flex items-center gap-2.5">
        <button
          onClick={handleAddToQuote}
          type="button"
          className={`flex-1 py-3 px-4 rounded-none font-semibold text-xs uppercase tracking-[0.16em] transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
            justAdded
              ? "bg-emerald-600 text-white"
              : "bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] active:scale-95"
          }`}
          aria-label={`Add ${product.name} to Official Quote`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added to Basket</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Quote</span>
            </>
          )}
        </button>

        <a
          href={getProductWhatsAppUrl(product, 1)}
          target="_blank"
          rel="noopener noreferrer"
          title="Direct WhatsApp Inquiry"
          aria-label="Direct WhatsApp Inquiry"
          className="p-3 bg-[#22160E] hover:bg-[#2F1F14] text-[#C5A880] hover:text-white border border-[#C5A880]/35 transition-all flex items-center justify-center shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
        </a>
      </div>

    </article>
  );
}