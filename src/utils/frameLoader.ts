export const TOTAL_FRAMES = 960;
export const FRAME_STEP = 6; // 160 Keyframes = 100% complete 360° circle coverage (2.25° per frame)

// Global memory cache (Already processed & ready in GPU memory)
export const loadedImagesMap = new Map<number, HTMLImageElement>();
export const processedCanvasMap = new Map<number, HTMLCanvasElement>();

export function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/all-frames/ezgif-frame-${padded}.png`;
}

// 32-bit hardware-accelerated cutout processor
export function processCutout(img: HTMLImageElement, frameIdx: number): HTMLCanvasElement {
  if (processedCanvasMap.has(frameIdx)) {
    return processedCanvasMap.get(frameIdx)!;
  }

  const iw = img.naturalWidth || 1280;
  const ih = img.naturalHeight || 720;

  const offscreen = document.createElement("canvas");
  offscreen.width = iw;
  offscreen.height = ih;
  const offCtx = offscreen.getContext("2d", { willReadFrequently: true });

  if (!offCtx) return offscreen;
  offCtx.drawImage(img, 0, 0, iw, ih);

  try {
    const imgData = offCtx.getImageData(0, 0, iw, ih);
    const data32 = new Uint32Array(imgData.data.buffer);
    const len = data32.length;

    const groundFloorY = Math.round(ih * 0.87);
    const edgeLeft = Math.round(iw * 0.20);
    const edgeRight = Math.round(iw * 0.80);

    for (let i = 0; i < len; i++) {
      const pixel = data32[i];
      const r = pixel & 0xFF;
      const g = (pixel >> 8) & 0xFF;
      const b = (pixel >> 16) & 0xFF;

      const minC = r < g ? (r < b ? r : b) : (g < b ? g : b);
      const maxC = r > g ? (r > b ? r : b) : (g > b ? g : b);
      const diff = maxC - minC;

      const x = i % iw;
      const y = Math.floor(i / iw);

      // 1. Clear outer sides
      if (x < edgeLeft || x > edgeRight) {
        if (minC > 85) {
          data32[i] = 0;
          continue;
        }
      }

      // 2. Clear ground shadow puddle (y >= 87%)
      if (y >= groundFloorY) {
        if (r < 65 && g < 65 && b < 65) {
          continue; // Keep wheels
        }
        if (diff < 26 && minC > 68) {
          data32[i] = 0;
          continue;
        }
      }

      // 3. Clear studio wall behind mesh & frame
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

    offCtx.putImageData(imgData, 0, 0);
    processedCanvasMap.set(frameIdx, offscreen);
    return offscreen;
  } catch {
    return offscreen;
  }
}

// Parallel Batch Preloader with Real Progress Tracking
export async function preloadAll360Frames(
  onProgress: (pct: number, status: string) => void
): Promise<void> {
  // Generate list of 160 core frames covering the complete 360 circle
  const targetFrames: number[] = [];
  for (let i = 1; i <= TOTAL_FRAMES; i += FRAME_STEP) {
    targetFrames.push(i);
  }
  if (!targetFrames.includes(TOTAL_FRAMES)) targetFrames.push(TOTAL_FRAMES);

  const total = targetFrames.length;
  let completed = 0;
  const CONCURRENT_BATCH = 12; // 12 parallel streams

  for (let i = 0; i < total; i += CONCURRENT_BATCH) {
    const batch = targetFrames.slice(i, i + CONCURRENT_BATCH);
    
    await Promise.all(
      batch.map((f) => {
        return new Promise<void>((resolve) => {
          if (loadedImagesMap.has(f) && processedCanvasMap.has(f)) {
            completed++;
            const pct = Math.round((completed / total) * 100);
            onProgress(pct, `BUFFERING ATELIER FRAME ${completed}/${total}...`);
            resolve();
            return;
          }

          const img = new Image();
          img.src = getFrameUrl(f);
          img.onload = () => {
            loadedImagesMap.set(f, img);
            processCutout(img, f); // Pre-process cutout in background
            completed++;
            const pct = Math.round((completed / total) * 100);
            onProgress(pct, `BUFFERING ATELIER FRAME ${completed}/${total}...`);
            resolve();
          };
          img.onerror = () => {
            completed++;
            resolve();
          };
        });
      })
    );
  }

  onProgress(100, "ATELIER 360° READY // OPENING WORKSPACE");
}

// Instant nearest keyframe retriever
export function getNearestPreloadedFrame(target: number): HTMLCanvasElement | null {
  if (processedCanvasMap.has(target)) {
    return processedCanvasMap.get(target)!;
  }

  // Look for closest preloaded keyframe
  for (let offset = 1; offset <= 36; offset++) {
    const fwd = target + offset;
    if (fwd <= TOTAL_FRAMES && processedCanvasMap.has(fwd)) {
      return processedCanvasMap.get(fwd)!;
    }
    const bwd = target - offset;
    if (bwd >= 1 && processedCanvasMap.has(bwd)) {
      return processedCanvasMap.get(bwd)!;
    }
  }

  return processedCanvasMap.get(1) || null;
}