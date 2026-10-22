import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  ShoppingBag, 
  MessageSquare, 
  Check, 
  Sparkles, 
  ArrowLeft,
  Share2,
  Award,
  Layers,
  ImageOff,
  CheckCircle2,
  Percent,
  ArrowUpRight
} from "lucide-react";

import { PRODUCTS_DATA, SITE_CONFIG } from "../data/furnitureData";
import { useQuote } from "../context/QuoteContext";
import { getProductWhatsAppUrl } from "../utils/whatsapp";
import ProductCard from "../components/ui/ProductCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { addToQuote } = useQuote();

  const product = useMemo(() => {
    return PRODUCTS_DATA.find((p) => p.slug === slug || p.id === slug);
  }, [slug]);

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "shipping">("specs");
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const relatedRef = useRef<HTMLDivElement | null>(null);

  // Sync state when product changes
  useEffect(() => {
    if (product) {
      if (product.specs?.colorOptions?.length) {
        setSelectedColor(product.specs.colorOptions[0]);
      }
      setActiveImageIndex(0);
      setQuantity(1);
      setImageError(false);
      document.title = `${product.name} | Saddat Atelier Pakistan`;
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      document.title = "Model Not Found | Saddat Atelier";
    }
  }, [product]);

  // GSAP Entrance Animations
  useEffect(() => {
    if (!product || !pageContainerRef.current) return;

    const ctx = gsap.context(() => {
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" }
        );
      }

      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current.children,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.1 }
        );
      }

      if (relatedRef.current) {
        gsap.fromTo(
          relatedRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: relatedRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, pageContainerRef);

    return () => ctx.revert();
  }, [product]);

  // Volume Tier Calculation
  const volumeDiscount = useMemo(() => {
    if (quantity >= 50) return { pct: 20, label: "Enterprise Tier (-20% OFF)" };
    if (quantity >= 25) return { pct: 15, label: "Mid-Corporate Tier (-15% OFF)" };
    if (quantity >= 10) return { pct: 10, label: "Bulk Tier (-10% OFF)" };
    return { pct: 0, label: "Direct Atelier Pricing" };
  }, [quantity]);

  if (!product) {
    return (
      <div className="w-full bg-[#120B07] min-h-[80vh] flex items-center justify-center p-6 text-center text-stone-100">
        <div className="max-w-md bg-[#1C120B] border border-[#C5A880]/30 p-8 sm:p-10 shadow-2xl relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />
          <h1 className="text-2xl font-serif mb-3 text-white">Model Not Found</h1>
          <p className="text-xs text-stone-400 mb-6 font-light leading-relaxed">
            The requested office furniture model does not exist or has been relocated to our archive.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C5A880] text-[#18110B] text-xs uppercase tracking-[0.18em] font-bold hover:bg-[#D4BA93] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Master Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const imagesList = product.images?.length ? product.images : [product.thumbnail];
  const activeImageSrc = imagesList[activeImageIndex] || product.thumbnail;

  const handleAddToCart = () => {
    addToQuote(product, quantity, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const whatsappUrl = getProductWhatsAppUrl(product, quantity);

  return (
    <div 
      ref={pageContainerRef}
      className="w-full bg-[#120B07] text-stone-100 min-h-screen overflow-x-hidden selection:bg-[#C5A880] selection:text-[#18110B]"
    >
      
      {/* 1. Breadcrumb Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-xs font-mono text-stone-400 flex items-center gap-2 overflow-x-auto whitespace-nowrap border-b border-[#C5A880]/15 no-scrollbar">
        <Link to="/" className="hover:text-[#C5A880] transition-colors">
          HOME
        </Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0 text-[#C5A880]" />
        <Link to="/products" className="hover:text-[#C5A880] transition-colors">
          CATALOG
        </Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0 text-[#C5A880]" />
        <Link
          to={`/products/${product.category}`}
          className="hover:text-[#C5A880] uppercase transition-colors"
        >
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0 text-[#C5A880]" />
        <span className="text-[#E0C6A0] font-semibold truncate max-w-[260px]">
          {product.name}
        </span>
      </nav>

      {/* 2. Main Product Showcase Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: Image Gallery Viewport (7 Cols) */}
          <div ref={galleryRef} className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Primary High-Res Viewport */}
            <div className="relative aspect-[4/3] w-full bg-gradient-to-b from-[#1C120B] to-[#120B07] border border-[#C5A880]/30 overflow-hidden shadow-2xl flex items-center justify-center p-6 sm:p-8">
              
              {/* Soft Golden Pedestal Glow */}
              <div className="absolute bottom-6 w-3/4 h-14 bg-[#C5A880]/15 rounded-full blur-2xl pointer-events-none" />

              {/* Status Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-20 pointer-events-none">
                {product.isBestSeller && (
                  <span className="bg-[#18110B]/95 backdrop-blur-md text-[#E0C6A0] border border-[#C5A880]/50 text-[9px] font-mono uppercase tracking-[0.2em] px-3 py-1 shadow-md">
                    Atelier Best Seller
                  </span>
                )}
                {product.inStock && (
                  <span className="bg-emerald-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[9px] font-mono uppercase tracking-wider px-2.5 py-0.5">
                    Ready For Dispatch
                  </span>
                )}
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 bg-[#18110B]/80 backdrop-blur-md p-2.5 text-[#C5A880] hover:text-white border border-[#C5A880]/30 transition-colors shadow-md z-20"
                title="Share model link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {copiedLink && (
                <div className="absolute top-14 right-4 bg-[#C5A880] text-[#18110B] text-[10px] font-mono font-bold px-3 py-1 z-20 shadow-lg">
                  Link Copied!
                </div>
              )}

              {/* Main Product Showcase Image */}
              {imageError ? (
                <div className="flex flex-col items-center justify-center text-[#C5A880]/60 gap-2">
                  <ImageOff className="w-10 h-10" />
                  <span className="text-xs font-mono uppercase tracking-wider">Preview Unavailable</span>
                </div>
              ) : (
                <img
                  src={activeImageSrc}
                  alt={product.name}
                  onError={() => setImageError(true)}
                  className="max-w-full max-h-full object-contain filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] transition-all duration-500"
                />
              )}
            </div>

            {/* Thumbnail Row */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {imagesList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setImageError(false);
                    }}
                    className={`aspect-[4/3] w-24 sm:w-28 flex-shrink-0 overflow-hidden border transition-all p-2 bg-[#1A100A] flex items-center justify-center ${
                      activeImageIndex === idx
                        ? "border-[#C5A880] ring-1 ring-[#C5A880] shadow-md"
                        : "border-[#C5A880]/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Guarantees Ribbon */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#C5A880]/20 text-center text-xs font-mono">
              <div className="p-3.5 bg-[#1C120B] border border-[#C5A880]/20 space-y-0.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] mx-auto mb-1" />
                <span className="text-[10px] text-stone-400 block uppercase tracking-wider">GUARANTEE</span>
                <span className="font-semibold text-white">{product.specs?.warranty || "2 Years Official"}</span>
              </div>
              <div className="p-3.5 bg-[#1C120B] border border-[#C5A880]/20 space-y-0.5">
                <Truck className="w-4 h-4 text-[#C5A880] mx-auto mb-1" />
                <span className="text-[10px] text-stone-400 block uppercase tracking-wider">LOGISTICS</span>
                <span className="font-semibold text-white">Nationwide Fleet</span>
              </div>
              <div className="p-3.5 bg-[#1C120B] border border-[#C5A880]/20 space-y-0.5">
                <Award className="w-4 h-4 text-[#C5A880] mx-auto mb-1" />
                <span className="text-[10px] text-stone-400 block uppercase tracking-wider">STANDARDS</span>
                <span className="font-semibold text-white">BIFMA X5.1 Tested</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Specs, Quantity, & Actions (5 Cols) */}
          <div ref={infoRef} className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            
            {/* Category & SKU */}
            <div className="flex items-center justify-between text-xs font-mono border-b border-[#C5A880]/15 pb-2">
              <span className="text-[#C5A880] tracking-[0.2em] uppercase font-semibold">
                {product.categoryName}
              </span>
              <span className="text-stone-400">
                SKU: {product.sku}
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-[1.05] mb-2 font-medium">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm font-sans text-stone-300 font-light">
                {product.tagline}
              </p>
            </div>

            {/* Price Banner with Live Volume Tier Calculation */}
            <div className="p-5 bg-[#1C120B] border border-[#C5A880]/30 shadow-xl space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                <span>DIRECT ATELIER PRICE</span>
                <span className="text-[#C5A880] bg-[#C5A880]/15 px-2 py-0.5 border border-[#C5A880]/30">
                  FBR / NTN Invoiced
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold font-sans text-white">
                  PKR {(product.price * (1 - volumeDiscount.pct / 100)).toLocaleString()}
                </span>
                {volumeDiscount.pct > 0 && (
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1">
                    {volumeDiscount.label}
                  </span>
                )}
              </div>

              {volumeDiscount.pct > 0 && (
                <div className="text-[10px] font-mono text-stone-400 line-through">
                  Standard Unit Price: PKR {product.price.toLocaleString()}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Architectural Finish Swatches */}
            {product.specs?.colorOptions && product.specs.colorOptions.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 block">
                  Architectural Finish: <span className="font-bold text-[#C5A880]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {product.specs.colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3.5 py-2 text-xs font-mono border transition-all ${
                        selectedColor === color
                          ? "bg-[#C5A880] text-[#18110B] border-[#C5A880] font-bold shadow-md"
                          : "bg-[#22160E] text-stone-300 border-[#C5A880]/20 hover:border-[#C5A880]/50 hover:text-white"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector with Corporate Volume Incentive */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300">
                  Quantity Required:
                </label>
                <span className="text-[10px] font-mono text-[#C5A880]">
                  {quantity < 10 ? "Add 10+ units for 10% OFF" : "Volume Discount Active!"}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#C5A880]/30 bg-[#120B07]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-sm text-[#C5A880] hover:bg-[#1C120B] transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-sm text-[#C5A880] hover:bg-[#1C120B] transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="text-xs font-mono text-stone-400">
                  Total: <strong className="text-white">PKR {(product.price * (1 - volumeDiscount.pct / 100) * quantity).toLocaleString()}</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#C5A880]/20">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-xl active:scale-95 ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B]"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Quotation Basket</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Official Quotation Request</span>
                  </>
                )}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-semibold bg-[#22160E] hover:bg-[#2F1F14] border border-[#C5A880]/40 text-[#C5A880] hover:text-white flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Inquire on WhatsApp with Details</span>
              </a>
            </div>

          </div>
        </div>

        {/* 3. Technical Deep-Dive Tabs */}
        <section className="mt-20 sm:mt-28 pt-10 border-t border-[#C5A880]/20">
          
          <div className="flex items-center gap-6 border-b border-[#C5A880]/20 mb-8 overflow-x-auto whitespace-nowrap no-scrollbar">
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-3 text-xs uppercase tracking-[0.2em] font-semibold transition-all border-b-2 ${
                activeTab === "specs"
                  ? "border-[#C5A880] text-[#C5A880]"
                  : "border-transparent text-stone-400 hover:text-white"
              }`}
            >
              Architectural Specifications
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`pb-3 text-xs uppercase tracking-[0.2em] font-semibold transition-all border-b-2 ${
                activeTab === "features"
                  ? "border-[#C5A880] text-[#C5A880]"
                  : "border-transparent text-stone-400 hover:text-white"
              }`}
            >
              Material & Kinematics
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`pb-3 text-xs uppercase tracking-[0.2em] font-semibold transition-all border-b-2 ${
                activeTab === "shipping"
                  ? "border-[#C5A880] text-[#C5A880]"
                  : "border-transparent text-stone-400 hover:text-white"
              }`}
            >
              Turnkey Logistics & Assembly
            </button>
          </div>

          <div className="bg-[#1A100A] border border-[#C5A880]/30 p-7 sm:p-10 shadow-2xl">
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-[#C5A880]/15">
                    <span className="text-stone-400 uppercase">Structural Material</span>
                    <span className="font-semibold text-white text-right">{product.specs?.material || "Commercial Grade Steel & Alloy"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#C5A880]/15">
                    <span className="text-stone-400 uppercase">Dimensions (W x D x H)</span>
                    <span className="font-semibold text-white text-right">{product.specs?.dimensions || "Standard Commercial Form Factor"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#C5A880]/15">
                    <span className="text-stone-400 uppercase">Tested Weight Capacity</span>
                    <span className="font-semibold text-[#E0C6A0] text-right">{product.specs?.weightCapacity || "150 kg Tested"}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-[#C5A880]/15">
                    <span className="text-stone-400 uppercase">Warranty Coverage</span>
                    <span className="font-semibold text-[#C5A880] text-right">{product.specs?.warranty || "2 Years Official"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#C5A880]/15">
                    <span className="text-stone-400 uppercase">Kinematic Mechanism</span>
                    <span className="font-semibold text-white text-right">{product.specs?.mechanism || "Heavy-Duty Synchro-Tilt Core"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#C5A880]/15">
                    <span className="text-stone-400 uppercase">Corporate Dispatch Time</span>
                    <span className="font-semibold text-white text-right">{product.leadTime || "24-48 Hours"}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-[#22160E] border border-[#C5A880]/20">
                    <Check className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-stone-200 leading-relaxed font-light">{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4 text-xs text-stone-300 leading-relaxed font-light">
                <p>
                  <strong className="text-white font-medium">Metropolitan Hubs (Karachi, Lahore, Islamabad/Rawalpindi):</strong> In-stock inventory dispatched via dedicated company fleet within 24 to 48 hours. Our technical installation crew provides complete unboxing, precision alignment, leveling, and packaging cleanup at no additional charge for corporate orders.
                </p>
                <p>
                  <strong className="text-white font-medium">Nationwide Commercial Shipments:</strong> Deliveries to Faisalabad, Multan, Peshawar, Sialkot, and other regional hubs are handled via insured heavy-freight carriers with direct tracking.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 4. Related Designs Showcase with GSAP Stagger */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-14 border-t border-[#C5A880]/20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase block mb-1">
                  RELATED SPECIFICATIONS
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white">
                  Complementary {product.categoryName}
                </h3>
              </div>
              <Link
                to={`/products/${product.category}`}
                className="text-xs uppercase tracking-[0.18em] font-semibold text-[#E0C6A0] hover:text-[#C5A880] border-b border-[#C5A880]/40 pb-0.5 transition-colors"
              >
                View Category
              </Link>
            </div>

            <div 
              ref={relatedRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
            >
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="h-full">
                  <ProductCard product={rel} />
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}