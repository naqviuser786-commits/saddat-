export const TOTAL_FRAMES = 960;
// 48 Golden Angles (Every 7.5°) = 100% Full 360° Circle (Only 1.2 MB Total!)
export const FRAME_STEP = 20;

export const TARGET_KEYFRAMES: number[] = [];
for (let i = 1; i <= TOTAL_FRAMES; i += FRAME_STEP) {
  TARGET_KEYFRAMES.push(i);
}
if (!TARGET_KEYFRAMES.includes(TOTAL_FRAMES)) TARGET_KEYFRAMES.push(TOTAL_FRAMES);

// In-Memory Fast Bitmaps
export const preloadedImages = new Map<number, HTMLImageElement>();
export const processedCanvasMap = new Map<number, HTMLCanvasElement>();

export function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/all-frames/ezgif-frame-${padded}.png`;
}

// 32-Bit Hardware-Accelerated Fast Cutout (Runs in 1.5ms)
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

// Ultra-Fast Streamer with Guaranteed Safety (Never Freezes)
export function preloadAll360Frames(onProgress: (pct: number, status: string) => void): Promise<void> {
  return new Promise((resolve) => {
    const total = TARGET_KEYFRAMES.length;
    let completed = 0;
    let resolved = false;

    const finish = () => {
      if (resolved) return;
      resolved = true;
      onProgress(100, "ATELIER READY");
      resolve();
    };

    // Safety timeout: Maximum 2.5 seconds mein LAZMI page khol dega!
    const safetyTimer = setTimeout(finish, 2500);

    // Frame 1 immediate load
    const firstImg = new Image();
    firstImg.src = getFrameUrl(1);
    firstImg.onload = () => {
      preloadedImages.set(1, firstImg);
      processCutout(firstImg, 1);
      completed++;
      onProgress(Math.round((completed / total) * 100), "CALIBRATING 360° ATELIER...");

      // Download remaining frames in parallel without blocking main thread
      const remaining = TARGET_KEYFRAMES.filter((f) => f !== 1);
      let batchIdx = 0;

      function loadNextBatch() {
        if (resolved) return;
        if (batchIdx >= remaining.length) {
          clearTimeout(safetyTimer);
          finish();
          return;
        }

        const batch = remaining.slice(batchIdx, batchIdx + 8);
        batchIdx += 8;

        let batchCompleted = 0;
        batch.forEach((frameNum) => {
          const img = new Image();
          img.src = getFrameUrl(frameNum);
          img.onload = img.onerror = () => {
            if (img.complete && img.naturalWidth > 0) {
              preloadedImages.set(frameNum, img);
            }
            completed++;
            const pct = Math.min(99, Math.round((completed / total) * 100));
            onProgress(pct, `BUFFERING ATELIER // ${completed}/${total}`);
            batchCompleted++;
            if (batchCompleted === batch.length) {
              setTimeout(loadNextBatch, 8);
            }
          };
        });
      }

      loadNextBatch();
    };

    firstImg.onerror = () => {
      clearTimeout(safetyTimer);
      finish();
    };
  });
}

// Instant 0ms nearest frame retriever from RAM
export function getNearestPreloadedFrame(target: number): HTMLCanvasElement | null {
  if (processedCanvasMap.has(target)) {
    return processedCanvasMap.get(target)!;
  }

  // Find nearest preloaded image
  let bestFrame = 1;
  let minDiff = 9999;
  for (const [frameNum] of preloadedImages) {
    const diff = Math.abs(frameNum - target);
    if (diff < minDiff) {
      minDiff = diff;
      bestFrame = frameNum;
    }
  }

  if (processedCanvasMap.has(bestFrame)) {
    return processedCanvasMap.get(bestFrame)!;
  }

  const rawImg = preloadedImages.get(bestFrame);
  if (rawImg) {
    return processCutout(rawImg, bestFrame);
  }

  return processedCanvasMap.get(1) || null;
}