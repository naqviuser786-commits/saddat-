import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  FileCheck, 
  ArrowUpRight,
  Navigation,
  Compass,
  Car
} from "lucide-react";

import { SITE_CONFIG } from "../data/furnitureData";
import { createWhatsAppUrl } from "../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

type ShowroomCity = "Lahore" | "Karachi" | "Islamabad";

interface ShowroomDetail {
  city: ShowroomCity;
  title: string;
  badge: string;
  address: string;
  landmark: string;
  phone: string;
  hours: string;
  mapEmbedUrl: string;
  googleMapsLink: string;
  amenities: string[];
}

const SHOWROOM_DATA: Record<ShowroomCity, ShowroomDetail> = {
  Lahore: {
    city: "Lahore",
    title: "Gulberg Corporate Experience Center",
    badge: "PUNJAB FLAGSHIP ATELIER",
    address: "Showroom 14-B, Main Boulevard, Commercial Area, Gulberg III, Lahore",
    landmark: "Direct Main Boulevard access, opposite corporate banking square",
    phone: "+92 300 1234567",
    hours: "Mon - Sat: 9:30 AM - 8:00 PM (Sunday Closed)",
    mapEmbedUrl: "https://maps.google.com/maps?q=Main+Boulevard+Gulberg+III+Lahore&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Main+Boulevard+Gulberg+III+Lahore",
    amenities: ["24+ Ergonomic Chairs for Test-Sit", "Sit-Stand Motorized Demonstrations", "Full Walnut & Leather Swatch Library", "VIP Executive Parking"],
  },
  Karachi: {
    city: "Karachi",
    title: "DHA Executive Display Gallery",
    badge: "SOUTHERN REGIONAL SHOWROOM",
    address: "Plot 32-C, Khayaban-e-Ittehad, Phase 6, DHA, Karachi",
    landmark: "Corner showroom with dedicated valet and freight parking",
    phone: "+92 300 1234567",
    hours: "Mon - Sat: 10:00 AM - 8:00 PM (Sunday Closed)",
    mapEmbedUrl: "https://maps.google.com/maps?q=Khayaban-e-Ittehad+Phase+6+DHA+Karachi&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Khayaban-e-Ittehad+Phase+6+DHA+Karachi",
    amenities: ["Presidential Leather Suite", "Modular Acoustic Cluster Pods", "Commercial Monolithic Boardrooms", "On-Site Architectural Designers"],
  },
  Islamabad: {
    city: "Islamabad",
    title: "Blue Area Corporate Liaison Office",
    badge: "FEDERAL CAPITAL LIAISON",
    address: "Level 4, Executive Heights, Jinnah Avenue, Blue Area, Islamabad",
    landmark: "Direct Jinnah Avenue access, adjacent to metro terminal",
    phone: "+92 300 1234567",
    hours: "Mon - Fri: 9:00 AM - 6:30 PM (Sat by Appointment)",
    mapEmbedUrl: "https://maps.google.com/maps?q=Jinnah+Avenue+Blue+Area+Islamabad&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Jinnah+Avenue+Blue+Area+Islamabad",
    amenities: ["Public Sector & Government Tender Desk", "AutoCAD 3D Layout Workstations", "FBR Sales Tax Audit Documentation", "Conference Room Mockups"],
  },
};

export default function ContactPage() {
  const [selectedCity, setSelectedCity] = useState<ShowroomCity>("Lahore");

  // Booking Form State
  const [officerName, setOfficerName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [visitType, setVisitType] = useState<string>("Executive Ergonomic Chair Test-Sit");
  const [preferredDate, setPreferredDate] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const mapSectionRef = useRef<HTMLDivElement | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);

  // SEO Page Title & Instant Scroll Reset
  useEffect(() => {
    document.title = "Showroom Locations & Corporate Inquiries | Saddat Atelier Pakistan";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const activeShowroom = SHOWROOM_DATA[selectedCity];

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    if (!pageContainerRef.current) return;

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: "power3.out" }
        );
      }

      if (mapSectionRef.current) {
        gsap.fromTo(
          mapSectionRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mapSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formCardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, pageContainerRef);

    return () => ctx.revert();
  }, []);

  // WhatsApp Appointment Booking Dispatch
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = `*VIP SHOWROOM VISIT / CORPORATE CONSULTATION BOOKING*
---------------------------------------
• Organization: ${companyName || "N/A"}
• Officer Name: ${officerName || "N/A"}
• Phone / WhatsApp: ${phone || "N/A"}
• Preferred Showroom: ${selectedCity} Flagship
• Reason of Visit: ${visitType}
• Preferred Date: ${preferredDate || "Earliest available"}
• Notes: ${message || "Please arrange dedicated procurement specialist."}
---------------------------------------
Please confirm showroom appointment and send location pin.`;

    window.open(createWhatsAppUrl(whatsappMsg), "_blank");
  };

  return (
    <div 
      ref={pageContainerRef}
      className="w-full bg-[#120B07] text-stone-100 min-h-screen overflow-x-hidden selection:bg-[#C5A880] selection:text-[#18110B]"
    >
      
      {/* 1. Page Hero Header */}
      <section className="relative w-full bg-[#18110B] text-white py-20 sm:py-28 border-b border-[#C5A880]/20 overflow-hidden">
        
        {/* Subtle Architectural Texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(197, 168, 128, 0.1) 0px, rgba(197, 168, 128, 0.1) 1px, transparent 1px, transparent 80px)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-4xl h-44 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

        <div 
          ref={heroRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#24170F] border border-[#C5A880]/40 text-[#E0C6A0] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>NATIONWIDE SHOWROOMS & CORPORATE DESK // 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white max-w-4xl mx-auto leading-[1.02]">
            Experience Saddat Ergonomics <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] via-[#F4E3CB] to-[#E0C6A0]">
              In Person at Our Experience Centers.
            </span>
          </h1>

          <p className="text-stone-300 text-xs sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Visit our flagship showrooms in Lahore, Karachi, and Islamabad to test-sit BIFMA-certified seating, inspect natural walnut executive veneers, or book on-site 3D CAD space planning.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-stone-300 font-mono">
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <Building2 className="w-4 h-4 text-[#C5A880]" />
              Lahore &bull; Karachi &bull; Islamabad
            </span>
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <Clock className="w-4 h-4 text-emerald-400" />
              Corporate WhatsApp: 24/7 Active
            </span>
            <span className="flex items-center gap-2 bg-[#1C120B] px-3.5 py-1.5 border border-[#C5A880]/25">
              <FileCheck className="w-4 h-4 text-[#C5A880]" />
              FBR NTN Registered Vendor
            </span>
          </div>
        </div>
      </section>

      {/* 2. Interactive City Switcher & Embedded Live Google Map Stage */}
      <section 
        ref={mapSectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-left"
      >
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>INTERACTIVE METROPOLITAN HUBS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Select Showroom for Live Location
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 font-light">
            Switch between cities to inspect live navigation coordinates, operating hours, and showroom amenities.
          </p>
        </div>

        {/* City Tab Buttons Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-8">
          {(["Lahore", "Karachi", "Islamabad"] as ShowroomCity[]).map((city) => {
            const isActive = selectedCity === city;
            return (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-5 py-3 text-xs uppercase tracking-[0.18em] font-semibold transition-all border select-none flex items-center gap-2 ${
                  isActive
                    ? "bg-[#C5A880] text-[#18110B] border-[#C5A880] shadow-[0_4px_25px_rgba(197,168,128,0.25)] font-bold"
                    : "bg-[#1C120B] text-stone-300 border-[#C5A880]/25 hover:border-[#C5A880]/60 hover:text-white"
                }`}
              >
                <Compass className={`w-3.5 h-3.5 ${isActive ? "text-[#18110B]" : "text-[#C5A880]"}`} />
                <span>{city} Experience Hub</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Map & Showroom Details Split Stage */}
        <div className="bg-[#1C120B] border border-[#C5A880]/35 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Left: Live Google Map Iframe (7 Cols) */}
            <div className="lg:col-span-7 aspect-[16/11] sm:aspect-[16/10] bg-[#120B07] border border-[#C5A880]/30 relative overflow-hidden shadow-2xl">
              <iframe
                title={`${activeShowroom.city} Showroom Map`}
                src={activeShowroom.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(110%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
              />

              {/* Live Status Badge */}
              <div className="absolute top-3 left-3 bg-[#18110B]/95 backdrop-blur-md px-3 py-1.5 border border-[#C5A880]/40 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for Walk-Ins & Appointments</span>
              </div>
            </div>

            {/* Right: Showroom Details & Quick Action Panel (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              <div className="space-y-3.5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A880] bg-[#C5A880]/15 px-2.5 py-1 border border-[#C5A880]/30 inline-block">
                  {activeShowroom.badge}
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium">
                  {activeShowroom.title}
                </h3>

                <div className="space-y-2.5 text-xs text-stone-300 font-light">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span>{activeShowroom.address}</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Car className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span className="text-stone-400 text-[11px]">{activeShowroom.landmark}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="font-mono text-white hover:text-[#C5A880] transition-colors font-semibold">
                      {activeShowroom.phone}
                    </a>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span>{activeShowroom.hours}</span>
                  </div>
                </div>

                {/* Showroom Amenities */}
                <div className="pt-4 border-t border-[#C5A880]/15 space-y-1.5 text-[11px] font-mono text-stone-300">
                  <span className="text-[#C5A880] text-[10px] uppercase tracking-wider block mb-1">
                    FACILITY HIGHLIGHTS:
                  </span>
                  {activeShowroom.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[#C5A880]">&bull;</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#C5A880]/15 flex flex-col sm:flex-row gap-3">
                <a
                  href={activeShowroom.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] py-3 px-4 text-xs uppercase tracking-[0.16em] font-bold transition-all shadow-md active:scale-95 text-center"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps Directions</span>
                </a>

                <a
                  href={createWhatsAppUrl(`Assalam-o-Alaikum Saddat Office Furniture, please send me the direct location pin for your ${activeShowroom.city} showroom.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#22160E] hover:bg-[#322014] text-[#C5A880] border border-[#C5A880]/35 py-3 px-4 text-xs uppercase tracking-[0.16em] font-semibold transition-colors text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Send Pin</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* 3. VIP Appointment Booking Form & FBR Credentials */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-[#C5A880]/20 text-left">
        <div 
          ref={formCardRef}
          className="bg-[#1C120B] border border-[#C5A880]/35 p-6 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#E8D1B0] to-[#8C6D46]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Booking Form (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>VIP CONSULTATION PROTOCOL</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Schedule Showroom Experience
                </h2>
                <p className="text-xs text-stone-400 mt-1 font-light">
                  Reserve dedicated time with a Chief Workspace Ergonomist or architectural space planner.
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1">
                      Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Systems Ltd"
                      className="w-full px-3.5 py-2.5 bg-[#120B07] border border-[#C5A880]/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1">
                      Officer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={officerName}
                      onChange={(e) => setOfficerName(e.target.value)}
                      placeholder="e.g. Tariq Mansoor"
                      className="w-full px-3.5 py-2.5 bg-[#120B07] border border-[#C5A880]/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full px-3.5 py-2.5 bg-[#120B07] border border-[#C5A880]/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1">
                      Objective of Visit
                    </label>
                    <select
                      value={visitType}
                      onChange={(e) => setVisitType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#120B07] border border-[#C5A880]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] cursor-pointer"
                    >
                      <option value="Executive Chair Test-Sit (10+ Units)">Executive Chair Test-Sit (10+ Units)</option>
                      <option value="3D Floor CAD Layout Consultation">3D Floor CAD Layout Consultation</option>
                      <option value="Physical Wood Veneer Swatch Review">Physical Wood Veneer Swatch Review</option>
                      <option value="Boardroom Monolith Inspection">Boardroom Monolith Inspection</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1">
                    Preferred Date & Time
                  </label>
                  <input
                    type="text"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    placeholder="e.g. Wednesday at 3:30 PM"
                    className="w-full px-3.5 py-2.5 bg-[#120B07] border border-[#C5A880]/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1">
                    Special Requirements or Floor Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details on project size, number of workstations, or floor area..."
                    className="w-full px-3.5 py-2.5 bg-[#120B07] border border-[#C5A880]/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C5A880] hover:bg-[#D4BA93] text-[#18110B] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4 text-[#18110B]" />
                  <span>Confirm Showroom Appointment on WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Right: Corporate Audit & NTN Box (5 Cols) */}
            <div className="lg:col-span-5 bg-[#120B07] border border-[#C5A880]/25 p-6 sm:p-7 space-y-5 text-left">
              <div className="flex items-center gap-2 border-b border-[#C5A880]/20 pb-3">
                <FileCheck className="w-5 h-5 text-[#C5A880]" />
                <h3 className="font-serif font-bold text-lg text-white">Vendor Registration Credentials</h3>
              </div>

              <p className="text-xs text-stone-400 font-light leading-relaxed">
                For corporate procurement departments requiring active vendor registration forms, NTN sales tax certificates, or official bank account verification prior to tender bidding:
              </p>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between border-b border-[#C5A880]/15 pb-2">
                  <span className="text-stone-400">NTN Registration:</span>
                  <span className="text-white font-bold">1234567-8 (FBR Active)</span>
                </div>

                <div className="flex justify-between border-b border-[#C5A880]/15 pb-2">
                  <span className="text-stone-400">STRN / Sales Tax:</span>
                  <span className="text-white font-bold">GST Invoiced Active</span>
                </div>

                <div className="flex justify-between border-b border-[#C5A880]/15 pb-2">
                  <span className="text-stone-400">Commercial Bank:</span>
                  <span className="text-[#E0C6A0] font-semibold">Habib Bank Limited</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-400">Head Office:</span>
                  <span className="text-white">Gulberg III, Lahore</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#22160E] hover:bg-[#322014] text-white border border-[#C5A880]/30 py-3 text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                  <span>Call Head Office: {SITE_CONFIG.phoneDisplay}</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}