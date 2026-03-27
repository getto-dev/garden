import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const iconSizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'icon-72x72.png', size: 72 },
  { name: 'icon-96x96.png', size: 96 },
  { name: 'icon-128x128.png', size: 128 },
  { name: 'icon-144x144.png', size: 144 },
  { name: 'icon-152x152.png', size: 152 },
  { name: 'icon-167x167.png', size: 167 },
  { name: 'icon-180x180.png', size: 180 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-384x384.png', size: 384 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

const maskableSizes = [
  { name: 'maskable-192.png', size: 192 },
  { name: 'maskable-512.png', size: 512 },
];

async function generateIcons() {
  const inputPath = './public/icons/icon-base.png';
  const outputDir = './public/icons';
  
  // Check if input exists
  if (!fs.existsSync(inputPath)) {
    console.error('Base icon not found:', inputPath);
    return;
  }

  console.log('Generating icons from base image...');

  // Generate standard icons
  for (const icon of iconSizes) {
    const outputPath = path.join(outputDir, icon.name);
    await sharp(inputPath)
      .resize(icon.size, icon.size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toFile(outputPath);
    console.log(`✓ Generated: ${icon.name}`);
  }

  // Generate maskable icons (with padding for safe zone)
  for (const icon of maskableSizes) {
    const outputPath = path.join(outputDir, icon.name);
    const paddedSize = Math.floor(icon.size * 0.8); // 80% for safe zone
    
    await sharp(inputPath)
      .resize(paddedSize, paddedSize, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .extend({
        top: Math.floor((icon.size - paddedSize) / 2),
        bottom: Math.floor((icon.size - paddedSize) / 2),
        left: Math.floor((icon.size - paddedSize) / 2),
        right: Math.floor((icon.size - paddedSize) / 2),
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toFile(outputPath);
    console.log(`✓ Generated (maskable): ${icon.name}`);
  }

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
