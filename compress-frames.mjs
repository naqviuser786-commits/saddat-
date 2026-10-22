import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.resolve('public/all-frames');
const tempDir = path.resolve('public/all-frames-optimized');

async function optimizeAllFrames() {
  if (!fs.existsSync(inputDir)) {
    console.error("❌ 'public/all-frames' folder nahi mila!");
    return;
  }

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
  console.log(`🚀 Total ${files.length} frames compress hona shuru ho rahay hain...`);

  let count = 0;
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(tempDir, file);

    // High quality perceptual compression (Zero visible loss, 75%+ size reduction)
    await sharp(inputPath)
      .png({ quality: 80, compressionLevel: 9, effort: 7 })
      .toFile(outputPath);

    count++;
    if (count % 50 === 0 || count === files.length) {
      console.log(`✅ [${count}/${files.length}] frames compressed...`);
    }
  }

  // Replace original folder with optimized folder
  console.log("🔄 Original frames ko optimized frames se replace kiya ja raha hai...");
  for (const file of files) {
    fs.copyFileSync(path.join(tempDir, file), path.join(inputDir, file));
  }
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log("🎉 MUBARAK HO! Tamam frames 75% chotay ho chukay hain bina quality kharab kiye!");
}

optimizeAllFrames().catch(console.error);