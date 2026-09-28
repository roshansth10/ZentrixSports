import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const kits = [
  // Europe
  { country: 'england', type: 'home', name: 'England Home Jersey 2026', base: '#FFFFFF', collar: '#0B132B', trim: '#CE1126', accent: '#002B49', crest: '3 Lions', star: true },
  { country: 'england', type: 'away', name: 'England Away Jersey 2026', base: '#1D1E3A', collar: '#2A2C54', trim: '#6C63FF', accent: '#A5B4FC', crest: '3 Lions', star: true },
  
  { country: 'france', type: 'home', name: 'France Home Jersey 2026', base: '#0A192F', collar: '#0F2744', trim: '#D4AF37', accent: '#D4AF37', crest: 'FFF Coq', star: true },
  { country: 'france', type: 'away', name: 'France Away Jersey 2026', base: '#FFFFFF', collar: '#0A192F', trim: '#CE1126', accent: '#0A192F', crest: 'FFF Coq', star: true },
  
  { country: 'germany', type: 'home', name: 'Germany Home Jersey 2026', base: '#FFFFFF', collar: '#111111', trim: '#DD0000', accent: '#FFCC00', crest: 'DFB Eagle', star: true },
  { country: 'germany', type: 'away', name: 'Germany Away Jersey 2026', base: '#D81B60', collar: '#8E24AA', trim: '#F48FB1', accent: '#FFFFFF', crest: 'DFB Eagle', star: true },
  
  { country: 'spain', type: 'home', name: 'Spain Home Jersey 2026', base: '#C8102E', collar: '#AA0A22', trim: '#FFC72C', accent: '#FFC72C', crest: 'RFEF Shield', star: true },
  { country: 'spain', type: 'away', name: 'Spain Away Jersey 2026', base: '#FFF8DC', collar: '#80DEEA', trim: '#FFC72C', accent: '#00838F', crest: 'RFEF Shield', star: true },
  
  { country: 'portugal', type: 'home', name: 'Portugal Home Jersey 2026', base: '#A51C30', collar: '#046A38', trim: '#046A38', accent: '#FFC72C', crest: 'FPF Shield', star: false },
  { country: 'portugal', type: 'away', name: 'Portugal Away Jersey 2026', base: '#F4F6F0', collar: '#A51C30', trim: '#046A38', accent: '#A51C30', crest: 'FPF Shield', star: false },
  
  { country: 'netherlands', type: 'home', name: 'Netherlands Home Jersey 2026', base: '#FF4F00', collar: '#001D4A', trim: '#001D4A', accent: '#FFFFFF', crest: 'KNVB Lion', star: false },
  { country: 'netherlands', type: 'away', name: 'Netherlands Away Jersey 2026', base: '#001D4A', collar: '#FF4F00', trim: '#FF4F00', accent: '#FF4F00', crest: 'KNVB Lion', star: false },
  
  { country: 'croatia', type: 'home', name: 'Croatia Home Jersey 2026', base: '#FFFFFF', collar: '#D00000', trim: '#D00000', accent: '#D00000', crest: 'HNS Checkers', pattern: 'checkers_red' },
  { country: 'croatia', type: 'away', name: 'Croatia Away Jersey 2026', base: '#0B1B3D', collar: '#1E3A8A', trim: '#3B82F6', accent: '#60A5FA', crest: 'HNS Checkers', pattern: 'checkers_blue' },

  // Americas
  { country: 'argentina', type: 'home', name: 'Argentina Home Jersey 2026', base: '#FFFFFF', collar: '#75AADB', trim: '#75AADB', accent: '#75AADB', crest: 'AFA 3 Stars', pattern: 'stripes_albice' },
  { country: 'argentina', type: 'away', name: 'Argentina Away Jersey 2026', base: '#1A1A40', collar: '#2D2D70', trim: '#6B46C1', accent: '#9F7AEA', crest: 'AFA 3 Stars', star: true },
  
  { country: 'brazil', type: 'home', name: 'Brazil Home Jersey 2026', base: '#FEDD00', collar: '#009739', trim: '#009739', accent: '#002776', crest: 'CBF 5 Stars', star: true },
  { country: 'brazil', type: 'away', name: 'Brazil Away Jersey 2026', base: '#002776', collar: '#009739', trim: '#80DEEA', accent: '#FEDD00', crest: 'CBF 5 Stars', star: true },
  
  { country: 'uruguay', type: 'home', name: 'Uruguay Home Jersey 2026', base: '#00A3E0', collar: '#FFFFFF', trim: '#FFFFFF', accent: '#000000', crest: 'AUF 4 Stars', star: true },
  { country: 'uruguay', type: 'away', name: 'Uruguay Away Jersey 2026', base: '#FFFFFF', collar: '#00A3E0', trim: '#00A3E0', accent: '#00A3E0', crest: 'AUF 4 Stars', star: true },
  
  { country: 'colombia', type: 'home', name: 'Colombia Home Jersey 2026', base: '#FCD116', collar: '#00205B', trim: '#C8102E', accent: '#00205B', crest: 'FCF Shield', star: false },
  { country: 'colombia', type: 'away', name: 'Colombia Away Jersey 2026', base: '#1C2541', collar: '#FF6B6B', trim: '#FF6B6B', accent: '#FF6B6B', crest: 'FCF Shield', star: false },
  
  { country: 'usa', type: 'home', name: 'USA Home Jersey 2026', base: '#FFFFFF', collar: '#002868', trim: '#C8102E', accent: '#002868', crest: 'US Soccer', star: false },
  { country: 'usa', type: 'away', name: 'USA Away Jersey 2026', base: '#002868', collar: '#C8102E', trim: '#C8102E', accent: '#FFFFFF', crest: 'US Soccer', star: false },
  
  { country: 'mexico', type: 'home', name: 'Mexico Home Jersey 2026', base: '#006847', collar: '#CE1126', trim: '#CE1126', accent: '#FFFFFF', crest: 'Femexfut Eagle', pattern: 'aztec' },
  { country: 'mexico', type: 'away', name: 'Mexico Away Jersey 2026', base: '#F5F5DC', collar: '#8B0000', trim: '#8B0000', accent: '#8B0000', crest: 'Femexfut Eagle', pattern: 'aztec' },
  
  { country: 'canada', type: 'home', name: 'Canada Home Jersey 2026', base: '#C8102E', collar: '#8B0000', trim: '#FFFFFF', accent: '#FFFFFF', crest: 'Canada Soccer', star: false },
  { country: 'canada', type: 'away', name: 'Canada Away Jersey 2026', base: '#FFFFFF', collar: '#C8102E', trim: '#C8102E', accent: '#C8102E', crest: 'Canada Soccer', star: false },

  // Asia
  { country: 'japan', type: 'home', name: 'Japan Home Jersey 2026', base: '#002B49', collar: '#104E8B', trim: '#C8102E', accent: '#FFFFFF', crest: 'JFA Crow', pattern: 'flames' },
  { country: 'japan', type: 'away', name: 'Japan Away Jersey 2026', base: '#FFFFFF', collar: '#002B49', trim: '#C8102E', accent: '#002B49', crest: 'JFA Crow', star: false },
  
  { country: 'south-korea', type: 'home', name: 'South Korea Home Jersey 2026', base: '#EC1C24', collar: '#000000', trim: '#000000', accent: '#FFFFFF', crest: 'KFA Tiger', star: false },
  { country: 'south-korea', type: 'away', name: 'South Korea Away Jersey 2026', base: '#111111', collar: '#EC1C24', trim: '#3B82F6', accent: '#FFD700', crest: 'KFA Tiger', star: false },
  
  { country: 'saudi-arabia', type: 'home', name: 'Saudi Arabia Home Jersey 2026', base: '#FFFFFF', collar: '#006C35', trim: '#006C35', accent: '#006C35', crest: 'SAFF Falcon', star: false },
  { country: 'saudi-arabia', type: 'away', name: 'Saudi Arabia Away Jersey 2026', base: '#006C35', collar: '#004D25', trim: '#81C784', accent: '#FFFFFF', crest: 'SAFF Falcon', star: false },
  
  { country: 'iran', type: 'home', name: 'Iran Home Jersey 2026', base: '#FFFFFF', collar: '#DA291C', trim: '#009739', accent: '#DA291C', crest: 'FFIRI Shield', star: false },
  { country: 'iran', type: 'away', name: 'Iran Away Jersey 2026', base: '#DA291C', collar: '#009739', trim: '#FFFFFF', accent: '#FFFFFF', crest: 'FFIRI Shield', star: false },
  
  { country: 'nepal', type: 'home', name: 'Nepal Home Jersey 2026', base: '#C8102E', collar: '#002B49', trim: '#002B49', accent: '#FFFFFF', crest: 'ANFA Crest', star: false },
  { country: 'nepal', type: 'away', name: 'Nepal Away Jersey 2026', base: '#0038A8', collar: '#C8102E', trim: '#C8102E', accent: '#FFFFFF', crest: 'ANFA Crest', star: false },

  // Africa
  { country: 'morocco', type: 'home', name: 'Morocco Home Jersey 2026', base: '#C1272D', collar: '#006233', trim: '#006233', accent: '#FFD700', crest: 'FRMF Star', star: false },
  { country: 'morocco', type: 'away', name: 'Morocco Away Jersey 2026', base: '#FFFFFF', collar: '#C1272D', trim: '#006233', accent: '#C1272D', crest: 'FRMF Star', star: false },
  
  { country: 'senegal', type: 'home', name: 'Senegal Home Jersey 2026', base: '#FFFFFF', collar: '#00853F', trim: '#FDEF42', accent: '#E31B23', crest: 'FSF Lion', star: false },
  { country: 'senegal', type: 'away', name: 'Senegal Away Jersey 2026', base: '#00853F', collar: '#FDEF42', trim: '#E31B23', accent: '#FDEF42', crest: 'FSF Lion', star: false },
  
  { country: 'nigeria', type: 'home', name: 'Nigeria Home Jersey 2026', base: '#008751', collar: '#005C37', trim: '#FFFFFF', accent: '#FFFFFF', crest: 'NFF Eagle', pattern: 'nigeria_geo' },
  { country: 'nigeria', type: 'away', name: 'Nigeria Away Jersey 2026', base: '#004D25', collar: '#008751', trim: '#A7F3D0', accent: '#A7F3D0', crest: 'NFF Eagle', star: false },
  
  { country: 'ghana', type: 'home', name: 'Ghana Home Jersey 2026', base: '#FFFFFF', collar: '#000000', trim: '#EF4444', accent: '#000000', crest: 'GFA Black Star', star: false },
  { country: 'ghana', type: 'away', name: 'Ghana Away Jersey 2026', base: '#E03C31', collar: '#FDEF42', trim: '#00853F', accent: '#000000', crest: 'GFA Black Star', star: false },
];

function generateSVG(k) {
  let patternDefs = '';
  let patternRects = '';

  if (k.pattern === 'stripes_albice') {
    patternDefs = `
      <pattern id="stripes_${k.country}_${k.type}" width="60" height="400" patternUnits="userSpaceOnUse">
        <rect x="0" width="30" height="400" fill="#75AADB"/>
        <rect x="30" width="30" height="400" fill="#FFFFFF"/>
      </pattern>`;
    patternRects = `<path d="M 120,90 Q 200,105 280,90 L 320,380 L 80,380 Z" fill="url(#stripes_${k.country}_${k.type})" />`;
  } else if (k.pattern === 'checkers_red') {
    patternDefs = `
      <pattern id="checkers_${k.country}_${k.type}" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="20" height="20" fill="#D00000"/>
        <rect x="20" y="0" width="20" height="20" fill="#FFFFFF"/>
        <rect x="0" y="20" width="20" height="20" fill="#FFFFFF"/>
        <rect x="20" y="20" width="20" height="20" fill="#D00000"/>
      </pattern>`;
    patternRects = `<path d="M 120,90 Q 200,105 280,90 L 320,380 L 80,380 Z" fill="url(#checkers_${k.country}_${k.type})" />`;
  } else if (k.pattern === 'checkers_blue') {
    patternDefs = `
      <pattern id="checkers_b_${k.country}_${k.type}" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="20" height="20" fill="#0B1B3D"/>
        <rect x="20" y="0" width="20" height="20" fill="#1E3A8A"/>
        <rect x="0" y="20" width="20" height="20" fill="#1E3A8A"/>
        <rect x="20" y="20" width="20" height="20" fill="#0B1B3D"/>
      </pattern>`;
    patternRects = `<path d="M 120,90 Q 200,105 280,90 L 320,380 L 80,380 Z" fill="url(#checkers_b_${k.country}_${k.type})" />`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="800" height="1000">
    <defs>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.12"/>
      </filter>
      <linearGradient id="fabric_${k.country}_${k.type}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.08"/>
      </linearGradient>
      ${patternDefs}
    </defs>

    <!-- Studio Background -->
    <rect width="400" height="500" fill="#F8FAFC"/>
    
    <!-- Jersey Body Shadow & Base -->
    <g filter="url(#shadow)">
      <!-- Left Sleeve -->
      <path d="M 120,90 L 40,150 L 75,210 L 125,160 Z" fill="${k.base}" />
      <path d="M 40,150 L 75,210 L 68,200 L 47,152 Z" fill="${k.trim}" />

      <!-- Right Sleeve -->
      <path d="M 280,90 L 360,150 L 325,210 L 275,160 Z" fill="${k.base}" />
      <path d="M 360,150 L 325,210 L 332,200 L 353,152 Z" fill="${k.trim}" />

      <!-- Main Torso -->
      <path d="M 120,90 Q 200,105 280,90 L 320,380 Q 200,395 80,380 Z" fill="${k.base}" />
      ${patternRects}
      
      <!-- Fabric Texture overlay -->
      <path d="M 120,90 Q 200,105 280,90 L 320,380 Q 200,395 80,380 Z" fill="url(#fabric_${k.country}_${k.type})" />

      <!-- Collar -->
      <path d="M 145,85 Q 200,140 255,85 Q 200,110 145,85 Z" fill="${k.collar}" />
      <path d="M 155,82 Q 200,120 245,82 Q 200,98 155,82 Z" fill="${k.base}" />

      <!-- Bottom Hem Trim -->
      <path d="M 80,375 Q 200,390 320,375 L 320,380 Q 200,395 80,380 Z" fill="${k.trim}" />
    </g>

    <!-- Crest / Badge Area -->
    <g transform="translate(250, 150)">
      <rect x="-24" y="-28" width="48" height="56" rx="10" fill="${k.collar}" stroke="${k.accent}" stroke-width="2"/>
      <text x="0" y="4" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="10" fill="${k.accent}" text-anchor="middle" letter-spacing="0.5">${k.country.slice(0,3).toUpperCase()}</text>
      <text x="0" y="16" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="7" fill="#FFFFFF" text-anchor="middle">${k.type.toUpperCase()}</text>
      ${k.star ? `<polygon points="0,-20 3,-12 11,-12 5,-7 7,1 0,-4 -7,1 -5,-7 -11,-12 -3,-12" fill="#FFC72C"/>` : ''}
    </g>

    <!-- Brand Symbol -->
    <g transform="translate(150, 150)">
      <circle cx="0" cy="0" r="12" fill="none" stroke="${k.accent}" stroke-width="3"/>
      <path d="M -6,2 L 0,-6 L 6,2" fill="none" stroke="${k.accent}" stroke-width="2.5" stroke-linecap="round"/>
    </g>

    <!-- Country & Kit Label -->
    <text x="200" y="445" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="15" fill="#1E293B" text-anchor="middle" letter-spacing="1">${k.name.toUpperCase()}</text>
    <text x="200" y="468" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="11" fill="#64748B" text-anchor="middle">OFFICIAL AUTHENTIC KIT • 2026</text>
  </svg>`;
}

kits.forEach(k => {
  const dir = path.join(__dirname, 'public', 'images', 'jerseys', k.country);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(dir, `${k.type}.svg`);
  fs.writeFileSync(filePath, generateSVG(k));
  console.log(`Generated: ${filePath}`);
});
