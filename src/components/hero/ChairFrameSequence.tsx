import React, { useEffect, useRef, useState, useCallback } from "react";

export const TOTAL_FRAMES = 960;
const MAX_CACHE_SIZE = 60; // Lightweight RAM footprint for mobile devices

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

  const workerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rawImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES + 1).fill(false));
  const cutoutCacheRef = useRef<Map<number, HTMLCanvasElement>>(new Map());

  const [initialFrameLoaded, setInitialFrameLoaded] = useState(false);
  
  const targetFrameRef = useRef<number>(1);
  const currentRenderedFrameRef = useRef<number>(1);
  const rafIdRef = useRef<number | null>(null);

  // Detect mobile device
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  // On mobile, load every 6th frame (160 frames total = 85% data savings & ZERO lag!)
  const frameStep = isMobile ? 6 : 2;

  const getFrameUrl = useCallback((index: number) => {
    const padded = String(index).padStart(3, "0");
    return `/all-frames/ezgif-frame-${padded}.png`;
  }, []);

  // 10x FASTER 32-BIT BITWISE PROCESSING ENGINE
  const processWhiteCutout = useCallback((img: HTMLImageElement, frameIdx: number): HTMLCanvasElement => {
    if (cutoutCacheRef.current.has(frameIdx)) {
      return cutoutCacheRef.current.get(frameIdx)!;
    }

    const iw = img.naturalWidth || 1280;
    const ih = img.naturalHeight || 720;

    if (!workerCanvasRef.current) {
      workerCanvasRef.current = document.createElement("canvas");
      workerCanvasRef.current.width = iw;
      workerCanvasRef.current.height = ih;
    }
    const workerCanvas = workerCanvasRef.current;
    const workerCtx = workerCanvas.getContext("2d", { willReadFrequently: true });
    if (!workerCtx) return img as unknown as HTMLCanvasElement;

    workerCtx.drawImage(img, 0, 0, iw, ih);

    try {
      const imgData = workerCtx.getImageData(0, 0, iw, ih);
      const data32 = new Uint32Array(imgData.data.buffer);
      const totalPixels = data32.length;

      const groundFloorY = Math.round(ih * 0.87);
      const edgeLeft = Math.round(iw * 0.20);
      const edgeRight = Math.round(iw * 0.80);

      for (let i = 0; i < totalPixels; i++) {
        const pixel = data32[i];
        const r = pixel & 0xFF;
        const g = (pixel >> 8) & 0xFF;
        const b = (pixel >> 16) & 0xFF;

        const minC = r < g ? (r < b ? r : b) : (g < b ? g : b);
        const maxC = r > g ? (r > b ? r : b) : (g > b ? g : b);
        const diff = maxC - minC;

        const x = i % iw;
        const y = Math.floor(i / iw);

        // 1. Clear outer perimeter
        if (x < edgeLeft || x > edgeRight) {
          if (minC > 85) {
            data32[i] = 0;
            continue;
          }
        }

        // 2. Ground floor shadow puddle (y >= 87%)
        if (y >= groundFloorY) {
          if (r < 65 && g < 65 && b < 65) {
            continue;
          }
          if (diff < 26 && minC > 68) {
            data32[i] = 0;
            continue;
          }
        }

        // 3. Studio wall background
        if (diff < 26 && minC > 115) {
          if (minC > 160) {
            data32[i] = 0;
          } else {
            const alpha = Math.round(255 * ((160 - minC) / 45));
            data32[i] = (alpha << 24) | (b << 16) | (g << 8) | r;
          }
          continue;
        }

        if (minC > 175) {
          data32[i] = 0;
        }
      }

      workerCtx.putImageData(imgData, 0, 0);

      const cached = document.createElement("canvas");
      cached.width = iw;
      cached.height = ih;
      const cCtx = cached.getContext("2d");
      if (cCtx) cCtx.drawImage(workerCanvas, 0, 0);

      if (cutoutCacheRef.current.size >= MAX_CACHE_SIZE) {
        const firstKey = cutoutCacheRef.current.keys().next().value;
        if (firstKey !== undefined) cutoutCacheRef.current.delete(firstKey);
      }

      cutoutCacheRef.current.set(frameIdx, cached);
      return cached;
    } catch {
      return img as unknown as HTMLCanvasElement;
    }
  }, []);

  // Snap to nearest loaded keyframe on mobile
  const getNearestLoadedFrameIndex = useCallback((target: number): number => {
    const loaded = isLoadedRef.current;
    if (loaded[target]) return target;

    // Search outward for nearest loaded keyframe
    for (let offset = 1; offset <= 36; offset++) {
      const fwd = target + offset;
      if (fwd <= TOTAL_FRAMES && loaded[fwd]) return fwd;
      const bwd = target - offset;
      if (bwd >= 1 && loaded[bwd]) return bwd;
    }

    return loaded[1] ? 1 : 0;
  }, []);

  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bestIdx = getNearestLoadedFrameIndex(frameIdx);
    if (!bestIdx) return;

    const rawImg = rawImagesRef.current[bestIdx];
    if (!rawImg || !rawImg.complete) return;

    const cutoutCanvas = processWhiteCutout(rawImg, bestIdx);

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
  }, [getNearestLoadedFrameIndex, processWhiteCutout]);

  useEffect(() => {
    targetFrameRef.current = currentFrame;
  }, [currentFrame]);

  // HIGH-PERFORMANCE 60FPS RAF LOOP (Buttery Smooth Damping)
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const target = targetFrameRef.current;
      const current = currentRenderedFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.08) {
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

  // 1. Load initial frame instantly
  useEffect(() => {
    const firstImg = new Image();
    firstImg.src = getFrameUrl(1);
    firstImg.onload = () => {
      rawImagesRef.current[1] = firstImg;
      isLoadedRef.current[1] = true;
      processWhiteCutout(firstImg, 1);
      setInitialFrameLoaded(true);
      handleResize();
      if (onInitialReady) onInitialReady();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getFrameUrl, handleResize, onInitialReady, processWhiteCutout]);

  // 2. Mobile-Friendly Lazy Batch Streamer
  useEffect(() => {
    if (!initialFrameLoaded) return;
    let isCancelled = false;

    // Build keyframes based on device step (every 6th on mobile, every 2nd on desktop)
    const keyframes: number[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += frameStep) {
      if (i !== 1) keyframes.push(i);
    }
    if (!keyframes.includes(TOTAL_FRAMES)) keyframes.push(TOTAL_FRAMES);

    let idx = 0;
    const loadNextBatch = () => {
      if (isCancelled || idx >= keyframes.length) return;
      const batchSize = isMobile ? 8 : 14;
      const end = Math.min(idx + batchSize, keyframes.length);

      for (let k = idx; k < end; k++) {
        const f = keyframes[k];
        if (!rawImagesRef.current[f]) {
          const img = new Image();
          img.src = getFrameUrl(f);
          img.onload = () => {
            if (!isCancelled) {
              rawImagesRef.current[f] = img;
              isLoadedRef.current[f] = true;
            }
          };
        }
      }
      idx = end;
      setTimeout(loadNextBatch, isMobile ? 40 : 20);
    };

    const timer = setTimeout(loadNextBatch, 50);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [initialFrameLoaded, getFrameUrl, frameStep, isMobile]);

  // 3. Quick on-demand lookahead buffer
  useEffect(() => {
    const lookahead = isMobile ? 8 : 16;
    const start = Math.max(1, currentFrame - lookahead);
    const end = Math.min(TOTAL_FRAMES, currentFrame + lookahead);

    for (let f = start; f <= end; f += (isMobile ? 3 : 1)) {
      if (!rawImagesRef.current[f]) {
        const img = new Image();
        img.src = getFrameUrl(f);
        img.onload = () => {
          rawImagesRef.current[f] = img;
          isLoadedRef.current[f] = true;
        };
      }
    }
  }, [currentFrame, getFrameUrl, isMobile]);

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

      {!initialFrameLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#C5A880]/30 border-t-[#C5A880] rounded-full animate-spin" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#C5A880]/80">
              PREPARING ATELIER // 360°
            </span>
          </div>
        </div>
      )}
    </div>
  );
}