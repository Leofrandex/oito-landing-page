const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const hourglassSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 24 24" fill="none" stroke="#ff4757" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 22h14"/>
  <path d="M5 2h14"/>
  <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
  <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
</svg>`;

const trendingUpSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 24 24" fill="none" stroke="#09bc8a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
  <polyline points="16 7 22 7 22 13"/>
</svg>`;

async function main() {
    // Generate inside public/iconos
    const publicIconosDir = path.join(__dirname, '..', 'public', 'iconos');
    if (!fs.existsSync(publicIconosDir)) {
        fs.mkdirSync(publicIconosDir, { recursive: true });
    }

    await sharp(Buffer.from(hourglassSvg)).png().toFile(path.join(publicIconosDir, 'hourglass-red.png'));
    await sharp(Buffer.from(trendingUpSvg)).png().toFile(path.join(publicIconosDir, 'trending-up-green.png'));
    console.log("Done generating PNGs");
}

main().catch(console.error);
