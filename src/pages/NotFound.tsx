import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 - Architectural Path Not Found | Saddat Atelier";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full bg-[#140C07] text-stone-100 min-h-[85vh] flex items-center justify-center p-6 selection:bg-[#C5A880] selection:text-[#18110B] overflow-hidden relative">
      
      {/* Ambient Lighting */}
      <div className="absolute w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-[#1C120B] border border-[#C5A880]/35 p-8 sm:p-12 text-center shadow-2xl relative">
        
        {/* Top Gold Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

        <div className="w-14 h-14 bg-[#24170F] border border-[#C5A880]/30 flex items-center justify-center mx-auto mb-6 text-[#C5A880]">
          <Compass className="w-7 h-7 text-[#C5A880]" />
        </div>

        <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase block mb-2">
          ERROR 404 // ATELIER ARCHIVE
        </span>

        <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight mb-3">
          Space Not Found
        </h1>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light mb-8">
          The requested architectural specification, product model, or workspace floor layout has been relocated or archived.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#C5A880] text-[#18110B] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#D4BA93] transition-colors shadow-md active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Flagship Showroom</span>
          </Link>

          <Link
            to="/products"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#24170F] hover:bg-[#382417] text-stone-200 border border-[#C5A880]/30 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
          >
            <span>Explore 2026 Catalog</span>
          </Link>
        </div>

      </div>
    </div>
  );
}