import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpRight, 
  RotateCcw, 
  Filter, 
  Sparkles, 
  ShieldCheck,
  Building2,
  Check
} from "lucide-react";

import { PRODUCTS_DATA, SITE_CONFIG } from "../data/furnitureData";
import ProductCard from "../components/ui/ProductCard";

gsap.registerPlugin(ScrollTrigger);

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [inStockOnly, setInStockOnly] = useState(false);

  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Sync category param
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // SEO Page Title & Instant Scroll Reset
  useEffect(() => {
    document.title = "Master Architectural Catalog 2026 | Saddat Atelier Pakistan";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  // Filter & Sort Engine
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.specs.material.toLowerCase().includes(query);

      const matchesStock = !inStockOnly || product.inStock;

      return matchesCategory && matchesSearch && matchesStock;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy, inStockOnly]);

  // Dynamic Category Counters
  const categoryCounts = useMemo(() => {
    return {
      all: PRODUCTS_DATA.length,
      chairs: PRODUCTS_DATA.filter((p) => p.category === "chairs").length,
      desks: PRODUCTS_DATA.filter((p) => p.category === "desks").length,
      tables: PRODUCTS_DATA.filter((p) => p.category === "tables").length,
    };
  }, []);

  // 1. Initial GSAP ScrollTrigger Animations
  useEffect(() => {
    if (!pageContainerRef.current) return;

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          {
            opacity: 0,
            y: 50,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, pageContainerRef);

    return () => ctx.revert();
  }, []);

  // 2. Filter / Search GSAP Animation
  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      {
        opacity: 0,
        y: 20,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.06,
        ease: "power2.out",
      }
    );
  }, [selectedCategory, searchQuery, sortBy, inStockOnly]);

  return (
    <div 
      ref={pageContainerRef}
      className="w-full bg-[#120B07] text-stone-100 min-h-screen overflow-x-hidden selection:bg-[#C5A880] selection:text-[#18110B]"
    >
      
      {/* 1. Editorial Catalog Hero Header */}
      <header className="relative w-full pt-20 pb-12 sm:pt-28 sm:pb-16 border-b border-[#C5A880]/20 bg-[#18110B] overflow-hidden">
        
        {/* Subtle Architectural Texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(197, 168, 128, 0.1) 0px, rgba(197, 168, 128, 0.1) 1px, transparent 1px, transparent 80px)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-4xl h-44 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            ref={heroRef}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10"
          >
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#24170F] border border-[#C5A880]/30 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#E0C6A0] uppercase mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>ATELIER MASTER INVENTORY // 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.02]">
                Precision Seating. <br />
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
                  Architectural Presence.
                </span>
              </h1>
            </div>

            <div className="max-w-md text-left md:text-right">
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light mb-4">
                Explore our full inventory of ergonomic task seating, executive managerial desks, and monolithic conference slabs engineered for modern corporate standards.
              </p>
              <div className="text-xs font-mono text-[#C5A880] flex items-center md:justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Immediate corporate dispatch in Karachi, Lahore & Islamabad</span>
              </div>
            </div>
          </div>

          {/* Category Tabs Switcher */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-6 border-t border-[#C5A880]/20">
            {[
              { id: "all", label: "All Collections", count: categoryCounts.all },
              { id: "chairs", label: "Executive & Task Chairs", count: categoryCounts.chairs },
              { id: "desks", label: "Executive Desks & Pods", count: categoryCounts.desks },
              { id: "tables", label: "Conference Tables", count: categoryCounts.tables },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleCategorySelect(tab.id)}
                className={`px-4 sm:px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 border flex items-center gap-2 select-none ${
                  selectedCategory === tab.id
                    ? "bg-[#C5A880] text-[#18110B] border-[#C5A880] shadow-[0_4px_20px_rgba(197,168,128,0.25)] font-bold"
                    : "bg-[#22160E] text-stone-300 border-[#C5A880]/20 hover:border-[#C5A880]/50 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 font-mono ${
                    selectedCategory === tab.id
                      ? "bg-[#18110B] text-[#C5A880]"
                      : "bg-[#160E08] text-stone-400 border border-[#C5A880]/20"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 2. Interactive Controls Bar: Live Search, Sort, Stock Filter */}
      <section className="sticky top-20 z-30 bg-[#18110B]/95 backdrop-blur-xl border-b border-[#C5A880]/25 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#C5A880]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model, SKU, or specs (e.g. mesh, walnut, tilt)..."
              className="w-full pl-10 pr-8 py-2.5 bg-[#120B07] border border-[#C5A880]/30 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-stone-400 hover:text-white"
                title="Clear Search"
              >
                &times;
              </button>
            )}
          </div>

          {/* Right Controls: Sort & In-Stock Switch */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-[#22160E] px-3.5 py-2 border border-[#C5A880]/25">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="text-stone-400 uppercase tracking-wider text-[10px]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[#E0C6A0] text-xs font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#18110B]">Best Sellers First</option>
                <option value="price-asc" className="bg-[#18110B]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#18110B]">Price: High to Low</option>
              </select>
            </div>

            {/* In-Stock Toggle */}
            <label className="flex items-center gap-2 cursor-pointer bg-[#22160E] px-3.5 py-2 border border-[#C5A880]/25 select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#C5A880] cursor-pointer"
              />
              <span className="text-stone-300 text-xs uppercase tracking-wider">In Stock Only</span>
            </label>

            {/* Result Counter */}
            <span className="text-[#C5A880] text-[11px] uppercase tracking-widest hidden lg:inline-block font-bold">
              {filteredProducts.length} {filteredProducts.length === 1 ? "Item" : "Items"}
            </span>
          </div>
        </div>
      </section>

      {/* 3. Product Grid Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#1A100A] border border-[#C5A880]/30 p-8 max-w-lg mx-auto">
            <Filter className="w-10 h-10 text-[#C5A880] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-serif text-white mb-2">
              No matching architectural models found
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mb-6 font-light">
              Try adjusting your search criteria or resetting filters to view our full collection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setInStockOnly(false);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A880] text-[#18110B] text-xs uppercase tracking-[0.18em] font-bold shadow-md hover:bg-[#D4BA93] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 min-h-[480px]"
          >
            {filteredProducts.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* 4. Corporate Volume Calculator Callout Banner */}
        <section className="mt-20 bg-gradient-to-r from-[#1A100A] via-[#24170F] to-[#1A100A] p-8 sm:p-12 border border-[#C5A880]/35 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

          <div className="max-w-2xl space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>CORPORATE PROCUREMENT ADVANTAGE</span>
            </div>
            
            <h3 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">
              Furnishing a Headquarters or Regional Floor?
            </h3>
            
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              Unlock tiered procurement discounts up to 20% on volume orders (10+ units). We provide official FBR-compliant NTN tax invoices, free 3D architectural floor layouts, and turnkey delivery across Pakistan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Link
              to="/bulk-orders"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] text-xs uppercase tracking-[0.18em] font-bold transition-all shadow-md active:scale-95 whitespace-nowrap"
            >
              <span>Bulk Order Calculator</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 border border-[#C5A880]/40 text-stone-200 text-xs uppercase tracking-[0.18em] font-semibold transition-colors whitespace-nowrap"
            >
              <span>{SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}