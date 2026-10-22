import React from "react";
import LuxuryHero from "../hero/LuxuryHero";
import ProductIntroduction from "../hero/ProductIntroduction";

export default function Hero() {
  return (
    <>
      {/* 1. 360° Cinematic Sequence + Luxury Finale Hero */}
      <LuxuryHero />

      {/* 2. Editorial Transition Into Categories & Collections */}
      <ProductIntroduction />
    </>
  );
}