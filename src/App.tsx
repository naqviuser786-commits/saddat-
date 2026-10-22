import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Global Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import FloatingQuickDock from "./components/ui/FloatingQuickDock";
import LuxuryPreloader from "./components/ui/LuxuryPreloader";

// Global Quote Provider
import { QuoteProvider } from "./context/QuoteContext";

// Dedicated Pages (Rule 9 Complete SEO Architecture)
import Home from "./pages/Home";
import ChairsPage from "./pages/ChairsPage";
import DesksPage from "./pages/DesksPage";
import TablesPage from "./pages/TablesPage";
import ProjectsPage from "./pages/ProjectsPage";
import BulkOrdersPage from "./pages/BulkOrdersPage";
import CustomFurniturePage from "./pages/CustomFurniturePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import FaqPage from "./pages/FaqPage";
import NotFound from "./pages/NotFound";

function SiteLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const mainContentRef = useRef<HTMLElement | null>(null);

  // Smooth Scroll Restoration + Route Transitions
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    if (progressBarRef.current) {
      gsap.fromTo(
        progressBarRef.current,
        { width: "0%", opacity: 1 },
        {
          width: "100%",
          duration: 0.35,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.to(progressBarRef.current, { opacity: 0, duration: 0.2 });
          },
        }
      );
    }

    if (mainContentRef.current) {
      gsap.fromTo(
        mainContentRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.3, 
          ease: "power2.out",
          onComplete: () => {
            gsap.set(mainContentRef.current, { clearProps: "transform" });
          }
        }
      );
    }
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#120B07] w-full overflow-x-hidden selection:bg-[#C5A880] selection:text-[#18110B] relative">
      
      {/* 1. Champagne Gold Top Route Progress Bar */}
      <div 
        ref={progressBarRef}
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#C5A880] z-[100] pointer-events-none shadow-[0_0_12px_rgba(197,168,128,0.8)]"
        style={{ width: "0%" }}
        aria-hidden="true"
      />

      {/* 2. Global Microscopic Velvet Film Grain Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[60] velvet-noise opacity-[0.035] mix-blend-overlay"
        aria-hidden="true"
      />

      {/* 3. Global Soft Studio Ambient Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(8,4,2,0.55)_100%)]"
        aria-hidden="true"
      />

      {!isHome && <Header />}
      
      <main 
        ref={mainContentRef}
        className="flex-1 w-full overflow-x-hidden relative z-10"
      >
        <Outlet />
      </main>
      
      <FloatingQuickDock />

      <Footer />
    </div>
  );
}

export default function App() {
  const [isSiteLoaded, setIsSiteLoaded] = useState<boolean>(false);

  const handlePreloaderComplete = () => {
    setIsSiteLoaded(true);
    // Refresh ScrollTrigger so all 360° pinned stages calibrate at 60fps immediately
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <QuoteProvider>
      {/* Cinematic Luxury Preloader (Curtain raises smoothly when 100% ready) */}
      {!isSiteLoaded && (
        <LuxuryPreloader onComplete={handlePreloaderComplete} />
      )}

      <Routes>
        <Route element={<SiteLayout />}>
          {/* 1. Cinematic Homepage */}
          <Route path="/" element={<Home />} />

          {/* 2. Dedicated Category Pages */}
          <Route path="/products/chairs" element={<ChairsPage />} />
          <Route path="/products/desks" element={<DesksPage />} />
          <Route path="/products/tables" element={<TablesPage />} />

          {/* 3. Turnkey Projects & Transformations */}
          <Route path="/projects" element={<ProjectsPage />} />

          {/* 4. Dedicated Corporate Bulk Orders Page */}
          <Route path="/bulk-orders" element={<BulkOrdersPage />} />

          {/* 5. Bespoke Architectural Workshop & Custom Finishes */}
          <Route path="/custom-furniture" element={<CustomFurniturePage />} />

          {/* 6. Dedicated Company Story & Heritage */}
          <Route path="/about" element={<AboutPage />} />

          {/* 7. Dedicated Showroom Locations, Map & Inquiries */}
          <Route path="/contact" element={<ContactPage />} />

          {/* 8. Complete Catalog & Product Details */}
          <Route path="/products" element={<Shop />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/product/:slug" element={<ProductDetail />} />

          {/* 9. Quotation Builder & Cart */}
          <Route path="/request-quote" element={<Cart />} />
          <Route path="/cart" element={<Cart />} />

          {/* 10. Dedicated Searchable FAQ Knowledgebase */}
          <Route path="/faq" element={<FaqPage />} />

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </QuoteProvider>
  );
}