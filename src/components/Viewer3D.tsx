import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playMagneticSnapSound, playPopSound } from '../utils/audio';
import { RotateCw, Sparkles, Volume2, RefreshCw, Upload, Cpu, ZoomIn, ZoomOut } from 'lucide-react';
import { TRANSLATIONS, type Language } from '../i18n/translations';

interface Viewer3DProps {
  currentTheme?: 'light' | 'candlelight';
  customTextureUrl?: string | null;
  externalModelType?: 'bookmark' | 'standee' | 'clicker' | 'dragon' | null;
  onOpenStudio?: () => void;
  language?: Language;
}

export const Viewer3D: React.FC<Viewer3DProps> = ({ 
  currentTheme = 'light',
  customTextureUrl = null,
  externalModelType = null,
  onOpenStudio,
  language = 'es'
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['es'];
  const mountRef = useRef<HTMLDivElement>(null);
  const [modelType, setModelType] = useState<'bookmark' | 'standee' | 'tracker' | 'clicker' | 'dragon'>('bookmark');
  const [isOpen, setIsOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (externalModelType) {
      setModelType(externalModelType);
    }
  }, [externalModelType]);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const topFlapRef = useRef<THREE.Group | null>(null);
  const buttonKeyRef = useRef<THREE.Mesh | null>(null);
  const dragonSegmentsRef = useRef<THREE.Mesh[]>([]);
  const targetAngleRef = useRef<number>(0);
  const currentAngleRef = useRef<number>(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE & CAMERA - Centered at (0, 0, 0)
    const width = container.clientWidth;
    const height = container.clientHeight || 450;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.6); // Perfectly level with object center
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(
      currentTheme === 'candlelight' ? 0xffdfba : 0xffffff,
      currentTheme === 'candlelight' ? 1.8 : 1.3
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(
      currentTheme === 'candlelight' ? 0xffa94d : 0xfff5ea,
      2.2
    );
    dirLight.position.set(3, 4, 4);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x9333ea, 1.6);
    rimLight.position.set(-3, -1, -3);
    scene.add(rimLight);

    // ROOT OBJECT GROUP
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    groupRef.current = mainGroup;

    // BUILD ACTIVE MODEL (All centered vertically at y = 0)
    buildSceneModel(modelType, customTextureUrl);

    // MOUSE ORBIT CONTROLS
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !mainGroup) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      mainGroup.rotation.y += deltaX * 0.008;
      mainGroup.rotation.x += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // ZOOM WHEEL LISTENER
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const zoomDelta = e.deltaY * 0.003;
      cameraRef.current.position.z = Math.min(Math.max(cameraRef.current.position.z + zoomDelta, 1.8), 6.5);
    };

    // TOUCH ORBIT & PINCH ZOOM
    let initialTouchDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        initialTouchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging && mainGroup) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        mainGroup.rotation.y += deltaX * 0.008;
        mainGroup.rotation.x += deltaY * 0.008;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      } else if (e.touches.length === 2 && cameraRef.current) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const diff = initialTouchDist - currentDist;
        cameraRef.current.position.z = Math.min(Math.max(cameraRef.current.position.z + diff * 0.01, 1.8), 6.5);
        initialTouchDist = currentDist;
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    domElement.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 450;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation
      if (isRotating && !isDragging && mainGroup) {
        mainGroup.rotation.y += 0.006;
      }

      // Smooth hinge for bookmark
      if (topFlapRef.current) {
        currentAngleRef.current += (targetAngleRef.current - currentAngleRef.current) * 0.12;
        topFlapRef.current.rotation.x = currentAngleRef.current;
      }

      // Dragon articulated segments undulating wave
      if (dragonSegmentsRef.current.length > 0) {
        dragonSegmentsRef.current.forEach((segment, idx) => {
          segment.position.x = Math.sin(elapsedTime * 3 + idx * 0.45) * 0.22;
          segment.rotation.z = Math.cos(elapsedTime * 3 + idx * 0.45) * 0.16;
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', onMouseDown);
      domElement.removeEventListener('wheel', onWheel);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('resize', handleResize);

      // Deep GPU memory disposal [ARCH-01]
      if (mainGroup) {
        disposeObject3D(mainGroup);
      }
      scene.clear();
      renderer.dispose();
      if (domElement.parentElement) {
        domElement.parentElement.removeChild(domElement);
      }
    };
  }, [modelType, currentTheme, customTextureUrl]);

  // Recursively disposes geometries, materials, and textures
  const disposeObject3D = (obj: THREE.Object3D) => {
    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if ('map' in mat && (mat as any).map) (mat as any).map.dispose();
              mat.dispose();
            });
          } else {
            const mat = mesh.material as any;
            if (mat.map) mat.map.dispose();
            mat.dispose();
          }
        }
      }
    });
  };

  // Builds each 3D model with its exact bounding center at y = 0
  const buildSceneModel = (type: string, textureUrl: string | null) => {
    const mainGroup = groupRef.current;
    if (!mainGroup) return;

    // Dispose old children before creating new ones to prevent VRAM leak
    disposeObject3D(mainGroup);
    while (mainGroup.children.length > 0) {
      mainGroup.remove(mainGroup.children[0]);
    }
    dragonSegmentsRef.current = [];
    buttonKeyRef.current = null;

    if (type === 'bookmark') {
      // 1. Foldable Magnetic Bookmark - Vertically centered around y = 0
      const flapHeight = 1.8;
      const flapWidth = 1.2;

      // Base Flap: centered at y = 0 (extends from y = -0.9 to y = 0.9)
      const baseGeo = new THREE.BoxGeometry(flapWidth, flapHeight, 0.05);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0xfaf5ff,
        roughness: 0.35,
        metalness: 0.1
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.set(0, 0, 0);
      baseMesh.castShadow = true;
      mainGroup.add(baseMesh);

      // Base Magnet: at y = -0.35
      const magnetGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24);
      const magnetMat = new THREE.MeshStandardMaterial({
        color: 0xc0c0c0,
        metalness: 0.95,
        roughness: 0.15
      });
      const baseMagnet = new THREE.Mesh(magnetGeo, magnetMat);
      baseMagnet.rotation.x = Math.PI / 2;
      baseMagnet.position.set(0, -0.35, 0.03);
      mainGroup.add(baseMagnet);

      // Top Hinge: situated at top edge y = 0.9
      const topPivot = new THREE.Group();
      topPivot.position.set(0, 0.9, 0.025);
      topFlapRef.current = topPivot;

      let topMat: THREE.Material = new THREE.MeshStandardMaterial({
        color: 0x9333ea,
        roughness: 0.25,
        metalness: 0.2
      });

      if (textureUrl) {
        const loader = new THREE.TextureLoader();
        const texture = loader.load(textureUrl);
        topMat = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3 });
      }

      // Top Flap Mesh: hangs down by flapHeight / 2 (-0.9) relative to hinge,
      // so when closed, it aligns perfectly from y = 0.9 down to y = -0.9!
      const topMesh = new THREE.Mesh(baseGeo, topMat);
      topMesh.position.set(0, -0.9, 0.03);
      topMesh.castShadow = true;
      topPivot.add(topMesh);

      // Top Magnet
      const topMagnet = new THREE.Mesh(magnetGeo, magnetMat);
      topMagnet.rotation.x = Math.PI / 2;
      topMagnet.position.set(0, -1.25, -0.01);
      topPivot.add(topMagnet);

      // Decorative Chibi badge on front of top flap
      const badgeGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.06, 32);
      const badgeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
      const badge = new THREE.Mesh(badgeGeo, badgeMat);
      badge.rotation.x = Math.PI / 2;
      badge.position.set(0, -0.9, 0.07);
      topPivot.add(badge);

      mainGroup.add(topPivot);
    } else if (type === 'dragon') {
      // 2. Articulated 3D Crystal Dragon - Vertically centered around y = 0
      const dragonMat = new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        roughness: 0.12,
        metalness: 0.25,
        transmission: 0.65,
        transparent: true,
        opacity: 0.95
      });

      // Dragon Head at y = 0.85
      const dragonHeadGeo = new THREE.ConeGeometry(0.38, 0.8, 6);
      const head = new THREE.Mesh(dragonHeadGeo, dragonMat);
      head.rotation.x = Math.PI;
      head.position.set(0, 0.85, 0);
      mainGroup.add(head);

      // Articulated segments centered around y = 0
      const segments: THREE.Mesh[] = [];
      for (let i = 0; i < 7; i++) {
        const segGeo = new THREE.BoxGeometry(0.55 - i * 0.04, 0.26, 0.42 - i * 0.03);
        const seg = new THREE.Mesh(segGeo, dragonMat);
        // Positioned symmetrically from y = 0.4 down to y = -0.95 (center ~ -0.25)
        seg.position.set(0, 0.4 - i * 0.25, 0);
        seg.castShadow = true;
        mainGroup.add(seg);
        segments.push(seg);
      }
      dragonSegmentsRef.current = segments;
    } else if (type === 'clicker') {
      // 3. Fidget 3D Clicker - Vertically centered around y = 0
      const caseGeo = new THREE.BoxGeometry(1.6, 1.3, 1.4);
      const caseMat = new THREE.MeshStandardMaterial({
        color: 0x1f2937,
        roughness: 0.4,
        metalness: 0.2
      });
      const casing = new THREE.Mesh(caseGeo, caseMat);
      casing.position.set(0, -0.2, 0);
      casing.castShadow = true;
      mainGroup.add(casing);

      // Switch Keycap (pulsador) centered on top
      const keycapGeo = new THREE.BoxGeometry(1.1, 0.5, 1.1);
      const keycapMat = new THREE.MeshStandardMaterial({
        color: 0xec4899,
        roughness: 0.2,
        metalness: 0.1
      });
      const keycap = new THREE.Mesh(keycapGeo, keycapMat);
      keycap.position.set(0, 0.65, 0);
      keycap.castShadow = true;
      mainGroup.add(keycap);
      buttonKeyRef.current = keycap;
    } else if (type === 'standee') {
      // 4. Standee Acrílico - Vertically centered around y = 0
      const baseGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.1, 32);
      const baseMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.85,
        transparent: true,
        roughness: 0.1
      });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.set(0, -0.9, 0);
      mainGroup.add(base);

      const uprightGeo = new THREE.BoxGeometry(1.4, 1.8, 0.08);
      const uprightMat = new THREE.MeshPhysicalMaterial({
        color: 0xfff0fa,
        transmission: 0.8,
        transparent: true,
        roughness: 0.05
      });
      const upright = new THREE.Mesh(uprightGeo, uprightMat);
      upright.position.set(0, 0.05, 0);
      upright.castShadow = true;
      mainGroup.add(upright);

      const coreGeo = new THREE.PlaneGeometry(1.2, 1.6);
      const coreMat = new THREE.MeshStandardMaterial({ color: 0xec4899, side: THREE.DoubleSide });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.set(0, 0.05, 0.001);
      mainGroup.add(core);
    } else {
      // 5. Wooden Book Tracker - Vertically centered around y = 0
      const woodGeo = new THREE.BoxGeometry(2.4, 1.4, 0.18);
      const woodMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 });
      const plate = new THREE.Mesh(woodGeo, woodMat);
      plate.position.set(0, 0, 0);
      plate.castShadow = true;
      mainGroup.add(plate);

      for (let i = -0.6; i <= 0.6; i += 0.6) {
        const dialGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.24, 24);
        const dialMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.4 });
        const dial = new THREE.Mesh(dialGeo, dialMat);
        dial.position.set(i, 0, 0.06);
        mainGroup.add(dial);
      }
    }
  };

  const toggleBookmark = () => {
    playMagneticSnapSound();
    const nextState = !isOpen;
    setIsOpen(nextState);
    targetAngleRef.current = nextState ? Math.PI * 0.78 : 0;
  };

  const handleClickerPress = () => {
    playPopSound();
    setClickCount(prev => prev + 1);
    if (buttonKeyRef.current) {
      buttonKeyRef.current.position.y = 0.5;
      setTimeout(() => {
        if (buttonKeyRef.current) buttonKeyRef.current.position.y = 0.65;
      }, 100);
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const delta = direction === 'in' ? -0.5 : 0.5;
    cameraRef.current.position.z = Math.min(Math.max(cameraRef.current.position.z + delta, 1.8), 6.5);
  };

  const handleReset = () => {
    if (groupRef.current) {
      groupRef.current.rotation.set(0, 0, 0);
    }
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 3.6);
    }
  };

  return (
    <div 
      data-cursor="3d"
      className="living-border relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#F5F2EB] to-[#ECE7DD] border border-[#E4DEC9] shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6"
    >
      {/* Header controls bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 z-10 relative">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#78716C]">
            {t.labTitle}
          </span>
        </div>

        {/* Object Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-xs">
          <button
            onClick={() => { setModelType('bookmark'); setIsOpen(false); targetAngleRef.current = 0; }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              modelType === 'bookmark'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#57534E] hover:bg-neutral-100'
            }`}
          >
            🧲 Marcapáginas
          </button>
          <button
            onClick={() => setModelType('dragon')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              modelType === 'dragon'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#57534E] hover:bg-neutral-100'
            }`}
          >
            🐉 Dragón 3D
          </button>
          <button
            onClick={() => setModelType('clicker')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              modelType === 'clicker'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#57534E] hover:bg-neutral-100'
            }`}
          >
            🔘 Clicker 3D
          </button>
          <button
            onClick={() => setModelType('standee')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              modelType === 'standee'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#57534E] hover:bg-neutral-100'
            }`}
          >
            ✨ Standee
          </button>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-[380px] sm:h-[420px] rounded-2xl cursor-grab active:cursor-grabbing relative flex items-center justify-center select-none"
      >
        {/* Floating Controls Overlay: Rotate + Zoom Helper */}
        <div className="absolute bottom-4 left-4 pointer-events-none text-[11px] text-[#A8A29E] flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60">
          <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Arrastra 360° • Usa la rueda para acercar/alejar</span>
        </div>

        {/* On-screen Zoom Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-20">
          <button
            onClick={() => handleZoom('in')}
            className="p-2 rounded-xl bg-white/80 hover:bg-white text-stone-700 shadow-md border border-white/60 transition-transform active:scale-90 cursor-pointer"
            title={t.zoomIn}
            aria-label={t.zoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="p-2 rounded-xl bg-white/80 hover:bg-white text-stone-700 shadow-md border border-white/60 transition-transform active:scale-90 cursor-pointer"
            title={t.zoomOut}
            aria-label={t.zoomOut}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-[#E5DFD4]">
        {modelType === 'bookmark' ? (
          <div className="flex items-center gap-3">
            <button
              onClick={toggleBookmark}
              data-cursor="snap"
              className="px-5 py-2.5 rounded-2xl bg-[#9333EA] hover:bg-[#7E22CE] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              {isOpen ? '¡Chasquido Magnético (Cerrar)!' : 'Abrir Marcapáginas'}
            </button>
            <span className="text-xs text-[#78716C] hidden sm:inline">
              Centrado en origen con doble imán
            </span>
          </div>
        ) : modelType === 'clicker' ? (
          <div className="flex items-center gap-3">
            <button
              onClick={handleClickerPress}
              className="px-5 py-2.5 rounded-2xl bg-[#EC4899] hover:bg-[#DB2777] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              ¡Pulsar Switch! ({clickCount} clicks)
            </button>
            <span className="text-xs text-[#78716C]">
              Sonido mecánico antiestrés
            </span>
          </div>
        ) : modelType === 'dragon' ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full">
              🐉 Pieza articulada 3D print-in-place
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#78716C]">Metacrilato óptico 4mm</span>
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {onOpenStudio && (
            <button
              onClick={onOpenStudio}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-[#9333EA] border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Flujo de Subida 3D</span>
            </button>
          )}

          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isRotating
                ? 'bg-white text-[#9333EA] border-[#9333EA]/30 shadow-xs'
                : 'bg-white/60 text-[#78716C] border-transparent'
            }`}
            title={t.autoRotate}
            aria-label={t.autoRotate}
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-white/60 hover:bg-white text-[#78716C] border border-white/60 transition-all cursor-pointer"
            title={t.resetView}
            aria-label={t.resetView}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
