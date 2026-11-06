import * as THREE from 'three';

/**
 * Generates an ornate celestial / bookish gold foil artwork for the magnetic bookmark flap.
 */
export function createBookmarkTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Deep Midnight Cosmic Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#090B14');
  grad.addColorStop(0.35, '#16122E');
  grad.addColorStop(0.7, '#24103D');
  grad.addColorStop(1, '#0D071B');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Subtle Star Dust
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 1.8 + 0.4;
    const alpha = Math.random() * 0.75 + 0.25;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(254, 240, 138, ${alpha})`;
    ctx.fill();
  }

  // 3. Ornate Double Gold Foil Border
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 5;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  ctx.strokeStyle = '#FEF08A';
  ctx.lineWidth = 1.8;
  ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

  // Corner filigree flourishes
  const drawCorner = (cx: number, cy: number, rot: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 28);
    ctx.lineTo(0, 8);
    ctx.arc(8, 8, 8, Math.PI, Math.PI * 1.5);
    ctx.lineTo(28, 0);
    ctx.stroke();

    ctx.fillStyle = '#FEF08A';
    ctx.beginPath();
    ctx.arc(12, 12, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  drawCorner(28, 28, 0);
  drawCorner(canvas.width - 28, 28, Math.PI / 2);
  drawCorner(canvas.width - 28, canvas.height - 28, Math.PI);
  drawCorner(28, canvas.height - 28, -Math.PI / 2);

  // 4. Central Moon & Celestial Compass
  const centerX = canvas.width / 2;
  const centerY = canvas.height * 0.42;

  // Crescent Moon
  ctx.save();
  ctx.translate(centerX, centerY - 60);
  ctx.fillStyle = '#FEF08A';
  ctx.shadowColor = '#F59E0B';
  ctx.shadowBlur = 25;
  ctx.beginPath();
  ctx.arc(0, 0, 52, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(18, -8, 44, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Celestial Starburst inside compass
  ctx.save();
  ctx.translate(centerX, centerY + 30);
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 68, 0, Math.PI * 2);
  ctx.stroke();

  // 8-point compass star
  ctx.fillStyle = '#FEF08A';
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const rOuter = i % 2 === 0 ? 52 : 24;
    const rInner = 10;
    const a1 = angle;
    const a2 = angle + Math.PI / 8;
    ctx.lineTo(Math.cos(a1) * rOuter, Math.sin(a1) * rOuter);
    ctx.lineTo(Math.cos(a2) * rInner, Math.sin(a2) * rInner);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 5. Stack of Antique Books at the Bottom
  const bookY = canvas.height - 180;
  const books = [
    { w: 220, h: 22, color: '#7E22CE', spine: '#9333EA', y: bookY + 44 },
    { w: 190, h: 20, color: '#047857', spine: '#10B981', y: bookY + 22 },
    { w: 160, h: 18, color: '#B45309', spine: '#F59E0B', y: bookY }
  ];

  books.forEach(b => {
    ctx.fillStyle = b.color;
    ctx.fillRect(centerX - b.w / 2, b.y, b.w, b.h);
    ctx.fillStyle = b.spine;
    ctx.fillRect(centerX - b.w / 2, b.y, 22, b.h);
    // Gold trim on spine
    ctx.strokeStyle = '#FEF08A';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(centerX - b.w / 2 + 5, b.y + 3, b.w - 10, b.h - 6);
  });

  // 6. Typography & Brand Signature
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FEF08A';
  ctx.font = 'bold 22px "Georgia", serif';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 8;
  ctx.fillText('AQUELARRE LITERARIO', centerX, 95);

  ctx.fillStyle = '#F59E0B';
  ctx.font = 'italic 13px "Georgia", serif';
  ctx.fillText('✦ Edición Especial de Taller ✦', centerX, 122);

  ctx.fillStyle = '#FEF08A';
  ctx.font = 'italic 14px "Georgia", serif';
  ctx.fillText('«To the stars who listen...»', centerX, canvas.height - 85);

  ctx.fillStyle = '#E9D5FF';
  ctx.font = 'bold 11px sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('MARTENSCRAP • VALENCIA', centerX, canvas.height - 52);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates an illustrated Chibi Reading Dragon on books for the Acrylic Standee.
 */
export function createStandeeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 680;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Clear transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height * 0.44;

  // 1. Soft glowing aura behind the character
  const aura = ctx.createRadialGradient(cx, cy, 30, cx, cy, 220);
  aura.addColorStop(0, 'rgba(236, 72, 153, 0.45)');
  aura.addColorStop(0.5, 'rgba(147, 51, 234, 0.25)');
  aura.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Magic Floating Sparkles
  const sparkles = [
    { x: cx - 140, y: cy - 90, r: 14 },
    { x: cx + 130, y: cy - 70, r: 12 },
    { x: cx - 110, y: cy + 80, r: 10 },
    { x: cx + 120, y: cy + 90, r: 15 }
  ];
  sparkles.forEach(s => {
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.fillStyle = '#FEF08A';
    ctx.beginPath();
    ctx.arc(0, 0, s.r / 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FDE047';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -s.r);
    ctx.lineTo(0, s.r);
    ctx.moveTo(-s.r, 0);
    ctx.lineTo(s.r, 0);
    ctx.stroke();
    ctx.restore();
  });

  // 3. Stack of 3 Books
  const baseBookY = cy + 120;
  const bookStack = [
    { w: 260, h: 36, color: '#7E22CE', spine: '#C084FC', label: 'CORTES DE FANTASÍA' },
    { w: 220, h: 34, color: '#065F46', spine: '#34D399', label: 'DRAGONES ARTICULADOS' },
    { w: 180, h: 32, color: '#991B1B', spine: '#F87171', label: 'TALLER MARTENSCRAP' }
  ];

  bookStack.forEach((b, idx) => {
    const yPos = baseBookY - idx * 30;
    // Book body
    ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.roundRect(cx - b.w / 2, yPos, b.w, b.h, 6);
    ctx.fill();

    // Spine highlights
    ctx.fillStyle = b.spine;
    ctx.fillRect(cx - b.w / 2, yPos, 28, b.h);

    // Spine title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(b.label, cx - b.w / 2 + 36, yPos + b.h / 2 + 3);
  });

  // 4. Chibi Dragon Character Sitting on Books
  const charY = cy - 20;

  // Dragon Wings
  ctx.fillStyle = '#A855F7';
  ctx.beginPath();
  // Left Wing
  ctx.moveTo(cx - 30, charY + 20);
  ctx.quadraticCurveTo(cx - 130, charY - 60, cx - 110, charY + 40);
  ctx.quadraticCurveTo(cx - 70, charY + 25, cx - 30, charY + 40);
  // Right Wing
  ctx.moveTo(cx + 30, charY + 20);
  ctx.quadraticCurveTo(cx + 130, charY - 60, cx + 110, charY + 40);
  ctx.quadraticCurveTo(cx + 70, charY + 25, cx + 30, charY + 40);
  ctx.fill();

  // Dragon Body (Pear shape)
  ctx.fillStyle = '#06B6D4';
  ctx.beginPath();
  ctx.ellipse(cx, charY + 50, 48, 54, 0, 0, Math.PI * 2);
  ctx.fill();

  // Belly Scale plate (Cream/gold)
  ctx.fillStyle = '#FEF08A';
  ctx.beginPath();
  ctx.ellipse(cx, charY + 56, 26, 38, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dragon Head (Round cute chibi)
  ctx.fillStyle = '#06B6D4';
  ctx.beginPath();
  ctx.arc(cx, charY - 20, 58, 0, Math.PI * 2);
  ctx.fill();

  // Dragon Horns
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.moveTo(cx - 32, charY - 60);
  ctx.quadraticCurveTo(cx - 65, charY - 110, cx - 38, charY - 115);
  ctx.quadraticCurveTo(cx - 24, charY - 80, cx - 18, charY - 65);
  ctx.moveTo(cx + 32, charY - 60);
  ctx.quadraticCurveTo(cx + 65, charY - 110, cx + 38, charY - 115);
  ctx.quadraticCurveTo(cx + 24, charY - 80, cx + 18, charY - 65);
  ctx.fill();

  // Giant Cute Chibi Eyes
  const drawEye = (ex: number) => {
    // Eye white/gold
    ctx.fillStyle = '#FEF08A';
    ctx.beginPath();
    ctx.ellipse(ex, charY - 20, 16, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pupil
    ctx.fillStyle = '#1C1917';
    ctx.beginPath();
    ctx.ellipse(ex, charY - 20, 10, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Glint highlight
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(ex - 4, charY - 26, 5, 0, Math.PI * 2);
    ctx.arc(ex + 3, charY - 14, 2.5, 0, Math.PI * 2);
    ctx.fill();
  };
  drawEye(cx - 22);
  drawEye(cx + 22);

  // Cute Snout & Blush
  ctx.fillStyle = 'rgba(244, 114, 182, 0.55)';
  ctx.beginPath();
  ctx.arc(cx - 36, charY - 4, 10, 0, Math.PI * 2);
  ctx.arc(cx + 36, charY - 4, 10, 0, Math.PI * 2);
  ctx.fill();

  // Tiny smiling mouth
  ctx.strokeStyle = '#0E7490';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, charY - 2, 7, 0.1 * Math.PI, 0.9 * Math.PI);
  ctx.stroke();

  // Little Open Book held in tiny paws
  ctx.fillStyle = '#EC4899';
  ctx.beginPath();
  ctx.roundRect(cx - 28, charY + 36, 56, 32, 4);
  ctx.fill();

  ctx.fillStyle = '#FFFBEB';
  ctx.fillRect(cx - 24, charY + 39, 22, 26);
  ctx.fillRect(cx + 2, charY + 39, 22, 26);

  // 5. Standee Base Title Ribbon
  ctx.fillStyle = '#1C1917';
  ctx.beginPath();
  ctx.roundRect(cx - 120, canvas.height - 75, 240, 36, 12);
  ctx.fill();

  ctx.strokeStyle = '#FEF08A';
  ctx.lineWidth = 2;
  ctx.strokeRect(cx - 116, canvas.height - 71, 232, 28);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#FEF08A';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('STANDEE OFICIAL • MARTENSPET', cx, canvas.height - 52);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates an artisan tactile kawaii paw texture for the Clicker Keycap.
 */
export function createKeycapTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Soft Candy Gradient
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, '#F472B6');
  grad.addColorStop(1, '#DB2777');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cx = 128;
  const cy = 118;

  // Main Cat Paw Pad (Heart-rounded shape)
  ctx.fillStyle = '#FFF1F2';
  ctx.shadowColor = 'rgba(157, 23, 77, 0.4)';
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.ellipse(cx, cy + 18, 38, 28, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3 Toe beans
  const beans = [
    { x: cx - 34, y: cy - 22, rx: 14, ry: 18, rot: -0.25 },
    { x: cx, y: cy - 36, rx: 15, ry: 20, rot: 0 },
    { x: cx + 34, y: cy - 22, rx: 14, ry: 18, rot: 0.25 }
  ];

  beans.forEach(b => {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, b.rx, b.ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // Keycap label at bottom edge
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'black 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CLICK • MARTENS', cx, 224);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates an engraved birch wood texture for the Book Tracker.
 */
export function createTrackerTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Warm Birch / Walnut Wood Base
  ctx.fillStyle = '#D97706';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Procedural Wood Grain Rings
  for (let i = 0; i < 45; i++) {
    const y = (i * canvas.height) / 45;
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(180, 83, 9, 0.45)' : 'rgba(245, 158, 11, 0.35)';
    ctx.lineWidth = Math.random() * 4 + 1.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(
      canvas.width * 0.3,
      y + Math.sin(i) * 14,
      canvas.width * 0.7,
      y - Math.cos(i) * 14,
      canvas.width,
      y
    );
    ctx.stroke();
  }

  // Laser Burn Engraving Overlay
  ctx.strokeStyle = '#78350F';
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#451A03';
  ctx.font = 'bold 20px "Georgia", serif';
  ctx.fillText('✦ MI DIARIO DE LECTURA ✦', canvas.width / 2, 54);

  ctx.font = 'italic 12px "Georgia", serif';
  ctx.fillText('Página Actual Alcanzada', canvas.width / 2, 78);

  // Labels for the three rotating dials
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('CIENTOS', canvas.width * 0.25, 258);
  ctx.fillText('DECENAS', canvas.width * 0.5, 258);
  ctx.fillText('UNIDADES', canvas.width * 0.75, 258);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates engraved dial numbers (0 to 9) for the wooden tracker wheels.
 */
export function createDialTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Circular brushed brass
  const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 128);
  grad.addColorStop(0, '#FEF08A');
  grad.addColorStop(0.7, '#D97706');
  grad.addColorStop(1, '#78350F');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Center pointer
  ctx.fillStyle = '#451A03';
  ctx.beginPath();
  ctx.arc(128, 128, 18, 0, Math.PI * 2);
  ctx.fill();

  // Indicator Arrow
  ctx.fillStyle = '#991B1B';
  ctx.beginPath();
  ctx.moveTo(128, 28);
  ctx.lineTo(118, 54);
  ctx.lineTo(138, 54);
  ctx.closePath();
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
