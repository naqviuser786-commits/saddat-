import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          obsidian: "#030712",   // Ultra-deep luxury black-navy
          navy: "#0A192F",       // Deep corporate blue from reference
          darkNavy: "#060D17",   // Rich dark contrast
          surface: "#0F2038",    // Elevated cards with subtle metallic feel
          surfaceLight: "#162D4E",
          lightNavy: "#1E3A5F",  // Sharp luxury borders
          borderSubtle: "rgba(255, 255, 255, 0.08)",
          blue: "#2563EB",       // High conversion CTA blue
          blueHover: "#1D4ED8",
          royal: "#1D4ED8",
          accent: "#38BDF8",     // Electric cyan highlight
          emerald: "#25D366",    // Official WhatsApp
        },
        luxury: {
          ivory: "#F6F5F1",       // Architectural warm ivory background
          studio: "#F8F8F8",      // High-precision studio frame match
          charcoal: "#171715",    // Primary deep charcoal typography
          muted: "#77756F",       // Secondary warm-gray text
          border: "#DCDAD3",      // Hairline precision border
          borderLight: "#EAE8E1", // Soft divider
          bronze: "#A68B65",      // Understated muted metallic bronze accent
          surface: "#FFFFFF",     // Clean card surface
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        display: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 20px 50px -15px rgba(2, 12, 27, 0.6)",
        cardGlow: "0 10px 30px -10px rgba(37, 99, 235, 0.25)",
        cyanGlow: "0 0 30px -5px rgba(56, 189, 248, 0.3)",
      },
      animation: {
        pulseSlow: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;