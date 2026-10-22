import React, { useEffect, useRef, useState, useCallback } from "react";
import { 
  getNearestPreloadedFrame, 
  processedCanvasMap 
} from "../../utils/frameLoader";

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

  const [initialFrameLoaded, setInitialFrameLoaded] = useState(false);
  const targetFrameRef = useRef<number>(1);
  const currentRenderedFrameRef = useRef<number>(1);
  const rafIdRef = useRef<number | null>(null);

  // Pure 0ms Instant GPU Blitting (Everything is ALREADY in RAM!)
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Instant map lookup from memory (0.001ms)
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

    // Instant GPU draw
    ctx.drawImage(cutoutCanvas, 0, 0, iw, ih, offsetX, offsetY, renderW, renderH);
  }, []);

  useEffect(() => {
    targetFrameRef.current = currentFrame;
  }, [currentFrame]);

  // HIGH-SPEED 60-120FPS RAF PLAYBACK ENGINE
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const target = targetFrameRef.current;
      const current = currentRenderedFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.08) {
        currentRenderedFrameRef.current += diff * 0.45; // Fast responsive follow
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

  // Check initial frame status
  useEffect(() => {
    if (processedCanvasMap.size > 0) {
      setInitialFrameLoaded(true);
      handleResize();
      if (onInitialReady) onInitialReady();
    } else {
      const checkTimer = setInterval(() => {
        if (processedCanvasMap.size > 0) {
          setInitialFrameLoaded(true);
          handleResize();
          if (onInitialReady) onInitialReady();
          clearInterval(checkTimer);
        }
      }, 50);

      return () => clearInterval(checkTimer);
    }

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
        className="w-full h-full object-contain pointer-events-none select-none transition-opacity duration-300 relative z-10"
        style={{
          opacity: initialFrameLoaded ? 1 : 0,
        }}
      />
    </div>
  );
}