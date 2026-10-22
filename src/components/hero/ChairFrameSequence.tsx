import React, { useEffect, useRef, useState, useCallback } from "react";
import { 
  TOTAL_FRAMES,
  getNearestPreloadedFrame 
} from "../../utils/frameLoader";

// Export TOTAL_FRAMES taake LuxuryHero.tsx isay direct import kar sake
export { TOTAL_FRAMES };

interface ChairFrameSequenceProps {
  currentFrame: number;
  className?: string;
  onInitialReady?: () => void;
}

export default function ChairFrameSequence({
  currentFrame,
  className = "",
  onInitialReady
}: ChairFrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const targetFrameRef = useRef<number>(1);
  const currentRenderedFrameRef = useRef<number>(1);
  const rafIdRef = useRef<number | null>(null);

  // Instant 0ms GPU Drawing from Preloaded Memory
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cutoutCanvas = getNearestPreloadedFrame(frameIdx);
    if (!cutoutCanvas) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = cutoutCanvas.width || 1280;
    const ih = cutoutCanvas.height || 720;

    ctx.clearRect(0, 0, cw, ch);

    const isPortrait = (cw / ch) < 1.1;
    let scaleFactor: number;
    let offsetY: number;

    if (isPortrait) {
      const fitHeightScale = (ch * 0.56) / 640;
      const fitWidthScale = (cw * 0.84) / 560;
      scaleFactor = Math.min(fitHeightScale, fitWidthScale);
      offsetY = (ch - (ih * scaleFactor)) / 2 + (ch * 0.05);
    } else {
      const hRatio = cw / iw;
      const vRatio = ch / ih;
      scaleFactor = Math.min(hRatio, vRatio) * 0.88;
      offsetY = (ch - (ih * scaleFactor)) / 2;
    }

    const renderW = iw * scaleFactor;
    const renderH = ih * scaleFactor;
    const offsetX = (cw - renderW) / 2;

    ctx.drawImage(cutoutCanvas, 0, 0, iw, ih, offsetX, offsetY, renderW, renderH);
  }, []);

  useEffect(() => {
    targetFrameRef.current = currentFrame;
  }, [currentFrame]);

  // Smooth 60fps RAF Loop
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;
      const target = targetFrameRef.current;
      const current = currentRenderedFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.05) {
        currentRenderedFrameRef.current += diff * 0.40;
        renderFrame(Math.round(currentRenderedFrameRef.current));
      } else if (Math.round(current) !== Math.round(target)) {
        currentRenderedFrameRef.current = target;
        renderFrame(target);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [renderFrame]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    renderFrame(Math.round(currentRenderedFrameRef.current));
  }, [renderFrame]);

  useEffect(() => {
    handleResize();
    if (onInitialReady) onInitialReady();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize, onInitialReady]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none select-none relative z-10 opacity-100"
      />
    </div>
  );
}