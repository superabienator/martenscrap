import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playMagneticSnapSound, playPopSound } from '../utils/audio';
import { RotateCw, Sparkles, Volume2, RefreshCw, Upload, Cpu, ZoomIn, ZoomOut } from 'lucide-react';
import { TRANSLATIONS, type Language } from '../i18n/translations';
import { 
  createBookmarkTexture, 
  createStandeeTexture, 
  createKeycapTexture, 
  createTrackerTexture, 
  createDialTexture 
} from '../utils/canvasTextures';

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
      // 1. Foldable Magnetic Bookmark with Celestial Gold Foil Design
      const flapHeight = 1.8;
      const flapWidth = 1.2;

      // Base Flap (Back part): Deep midnight indigo
      const baseGeo = new THREE.BoxGeometry(flapWidth, flapHeight, 0.05);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x111422,
        roughness: 0.35,
        metalness: 0.15
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.set(0, 0, 0);
      baseMesh.castShadow = true;
      mainGroup.add(baseMesh);

      // Base Neodymium Magnet (Brushed chrome shine)
      const magnetGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24);
      const magnetMat = new THREE.MeshStandardMaterial({
        color: 0xd4d4d8,
        metalness: 0.95,
        roughness: 0.15
      });
      const baseMagnet = new THREE.Mesh(magnetGeo, magnetMat);
      baseMagnet.rotation.x = Math.PI / 2;
      baseMagnet.position.set(0, -0.35, 0.03);
      mainGroup.add(baseMagnet);

      // Top Hinge at y = 0.9
      const topPivot = new THREE.Group();
      topPivot.position.set(0, 0.9, 0.025);
      topFlapRef.current = topPivot;

      // Top flap artwork (Illustrated Celestial Gold Foil or custom texture)
      let topArtworkTexture: THREE.Texture;
      if (textureUrl) {
        const loader = new THREE.TextureLoader();
        topArtworkTexture = loader.load(textureUrl);
      } else {
        topArtworkTexture = createBookmarkTexture();
      }

      const topMat = new THREE.MeshStandardMaterial({
        map: topArtworkTexture,
        roughness: 0.28,
        metalness: 0.2
      });

      const topMesh = new THREE.Mesh(baseGeo, topMat);
      topMesh.position.set(0, -0.9, 0.03);
      topMesh.castShadow = true;
      topPivot.add(topMesh);

      // Top Neodymium Magnet inside the flap
      const topMagnet = new THREE.Mesh(magnetGeo, magnetMat);
      topMagnet.rotation.x = Math.PI / 2;
      topMagnet.position.set(0, -1.25, -0.01);
      topPivot.add(topMagnet);

      // Golden foil embossed seal / badge on front
      const sealGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.04, 32);
      const sealMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.85,
        roughness: 0.25
      });
      const seal = new THREE.Mesh(sealGeo, sealMat);
      seal.rotation.x = Math.PI / 2;
      seal.position.set(0, -0.9, 0.065);
      topPivot.add(seal);

      mainGroup.add(topPivot);
    } else if (type === 'dragon') {
      // 2. Articulated 3D Silk Dual-Color Dragon (Sapphire & Gold)
      const dragonMat = new THREE.MeshPhysicalMaterial({
        color: 0x0284c7,
        roughness: 0.2,
        metalness: 0.35,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        iridescence: 0.6
      });

      const goldSpikeMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.25,
        metalness: 0.85
      });

      // Dragon Head Group
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 0.85, 0);

      // Snout / Head body
      const dragonHeadGeo = new THREE.ConeGeometry(0.42, 0.82, 6);
      const head = new THREE.Mesh(dragonHeadGeo, dragonMat);
      head.rotation.x = Math.PI;
      headGroup.add(head);

      // Golden Horns (left and right curved backward)
      const hornGeo = new THREE.ConeGeometry(0.08, 0.65, 8);
      const leftHorn = new THREE.Mesh(hornGeo, goldSpikeMat);
      leftHorn.position.set(-0.25, 0.3, -0.15);
      leftHorn.rotation.set(-0.35, 0, -0.3);
      headGroup.add(leftHorn);

      const rightHorn = new THREE.Mesh(hornGeo, goldSpikeMat);
      rightHorn.position.set(0.25, 0.3, -0.15);
      rightHorn.rotation.set(-0.35, 0, 0.3);
      headGroup.add(rightHorn);

      // Golden Dragon Eyes with dark slit
      const eyeGeo = new THREE.SphereGeometry(0.07, 16, 16);
      const eyeMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.1, metalness: 0.4 });
      const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
      leftEye.position.set(-0.22, 0.05, 0.22);
      headGroup.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
      rightEye.position.set(0.22, 0.05, 0.22);
      headGroup.add(rightEye);

      mainGroup.add(headGroup);

      // Articulated segments with golden dorsal spikes
      const segments: THREE.Mesh[] = [];
      for (let i = 0; i < 7; i++) {
        const segGroup = new THREE.Mesh(
          new THREE.BoxGeometry(0.58 - i * 0.04, 0.26, 0.44 - i * 0.03),
          dragonMat
        );
        segGroup.position.set(0, 0.4 - i * 0.24, 0);
        segGroup.castShadow = true;

        // Golden dorsal spike on top of each segment
        const spikeGeo = new THREE.ConeGeometry(0.12 - i * 0.008, 0.28, 4);
        const spike = new THREE.Mesh(spikeGeo, goldSpikeMat);
        spike.position.set(0, 0.22, 0);
        spike.rotation.x = -0.3;
        segGroup.add(spike);

        // Claws / Fins on first 2 segments
        if (i === 1 || i === 2) {
          const finGeo = new THREE.ConeGeometry(0.09, 0.36, 4);
          const leftFin = new THREE.Mesh(finGeo, goldSpikeMat);
          leftFin.position.set(-0.35, 0, 0);
          leftFin.rotation.z = Math.PI / 2 + 0.3;
          segGroup.add(leftFin);

          const rightFin = new THREE.Mesh(finGeo, goldSpikeMat);
          rightFin.position.set(0.35, 0, 0);
          rightFin.rotation.z = -Math.PI / 2 - 0.3;
          segGroup.add(rightFin);
        }

        mainGroup.add(segGroup);
        segments.push(segGroup);
      }

      // Tail arrow tip at the end of the last segment
      const tailTipGeo = new THREE.ConeGeometry(0.24, 0.45, 4);
      const tailTip = new THREE.Mesh(tailTipGeo, goldSpikeMat);
      tailTip.position.set(0, -1.45, 0);
      tailTip.rotation.x = Math.PI;
      mainGroup.add(tailTip);

      dragonSegmentsRef.current = segments;
    } else if (type === 'clicker') {
      // 3. Fidget 3D Mechanical Clicker (Galaxy Black PLA + Kawaii Cat Paw Keycap + Keychain Ring)
      const caseGeo = new THREE.BoxGeometry(1.65, 1.3, 1.45);
      const caseMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        roughness: 0.35,
        metalness: 0.2
      });
      const casing = new THREE.Mesh(caseGeo, caseMat);
      casing.position.set(0, -0.2, 0);
      casing.castShadow = true;
      mainGroup.add(casing);

      // Chrome Metallic Keychain Ring on top-left corner
      const ringGeo = new THREE.TorusGeometry(0.28, 0.045, 16, 32);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xe4e4e7,
        metalness: 0.95,
        roughness: 0.1
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(-0.85, 0.3, 0);
      ring.rotation.y = Math.PI / 2;
      mainGroup.add(ring);

      // Mechanical Switch Housing (Blue mechanical switch stem)
      const switchBaseGeo = new THREE.BoxGeometry(0.9, 0.25, 0.9);
      const switchBaseMat = new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        roughness: 0.3
      });
      const switchBase = new THREE.Mesh(switchBaseGeo, switchBaseMat);
      switchBase.position.set(0, 0.52, 0);
      mainGroup.add(switchBase);

      // Keycap textured with Kawaii Paw Pad
      const keycapTexture = createKeycapTexture();
      const keycapMat = new THREE.MeshStandardMaterial({
        map: keycapTexture,
        roughness: 0.25,
        metalness: 0.1
      });
      const keycapGeo = new THREE.BoxGeometry(1.15, 0.45, 1.15);
      const keycap = new THREE.Mesh(keycapGeo, keycapMat);
      keycap.position.set(0, 0.72, 0);
      keycap.castShadow = true;
      mainGroup.add(keycap);
      buttonKeyRef.current = keycap;
    } else if (type === 'standee') {
      // 4. Optical Acrylic Standee with Illustrated Chibi Artwork
      const baseGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.12, 32);
      const baseMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.95,
        transparent: true,
        roughness: 0.05,
        ior: 1.49
      });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.set(0, -0.92, 0);
      mainGroup.add(base);

      // Upright optical clear acrylic pane
      const uprightGeo = new THREE.BoxGeometry(1.45, 1.88, 0.08);
      const uprightMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.94,
        transparent: true,
        roughness: 0.04,
        ior: 1.49
      });
      const upright = new THREE.Mesh(uprightGeo, uprightMat);
      upright.position.set(0, 0.05, 0);
      upright.castShadow = true;
      mainGroup.add(upright);

      // Artwork inside the acrylic pane (Illustrated Chibi Dragon on Books)
      const standeeArtTexture = createStandeeTexture();
      const artGeo = new THREE.PlaneGeometry(1.38, 1.8);
      const artMat = new THREE.MeshStandardMaterial({
        map: standeeArtTexture,
        transparent: true,
        side: THREE.DoubleSide,
        roughness: 0.2
      });
      const artMesh = new THREE.Mesh(artGeo, artMat);
      artMesh.position.set(0, 0.05, 0.002);
      mainGroup.add(artMesh);
    } else {
      // 5. Engraved Birch Wood Book Tracker with 3 Rotating Brass Dials
      const woodTexture = createTrackerTexture();
      const woodGeo = new THREE.BoxGeometry(2.5, 1.45, 0.18);
      const woodMat = new THREE.MeshStandardMaterial({
        map: woodTexture,
        roughness: 0.65,
        metalness: 0.05
      });
      const plate = new THREE.Mesh(woodGeo, woodMat);
      plate.position.set(0, 0, 0);
      plate.castShadow = true;
      mainGroup.add(plate);

      const dialTexture = createDialTexture();
      const dialMat = new THREE.MeshStandardMaterial({
        map: dialTexture,
        roughness: 0.35,
        metalness: 0.6
      });

      const positions = [-0.62, 0, 0.62];
      positions.forEach((xPos) => {
        const dialGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.22, 28);
        const dial = new THREE.Mesh(dialGeo, dialMat);
        dial.position.set(xPos, -0.05, 0.07);
        dial.rotation.x = Math.PI / 2;
        mainGroup.add(dial);
      });
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
      buttonKeyRef.current.position.y = 0.58;
      setTimeout(() => {
        if (buttonKeyRef.current) buttonKeyRef.current.position.y = 0.72;
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
          <button
            onClick={() => setModelType('tracker')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              modelType === 'tracker'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#57534E] hover:bg-neutral-100'
            }`}
          >
            📖 Contador
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
              🐉 Pieza articulada 3D en filamento seda zafiro y oro
            </span>
          </div>
        ) : modelType === 'tracker' ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
              📖 Madera grabada a láser con diales de latón
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-purple-900 bg-purple-100 px-3 py-1 rounded-full">
              ✨ Standee acrílico óptico 4mm con ilustración chibi
            </span>
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
