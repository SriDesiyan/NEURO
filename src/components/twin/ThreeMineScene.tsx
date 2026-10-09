import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Asset } from '../../types/mine';

export interface SceneLayers {
  equipment: boolean;
  sensors: boolean;
  telemetryLinks: boolean;
  haulRoutes: boolean;
  hazardZones: boolean;
  riskHeatmap: boolean;
  labels: boolean;
}

interface ThreeMineSceneProps {
  assets: Asset[];
  selectedAssetId: string | null;
  onSelectAsset: (assetId: string) => void;
  layers: SceneLayers;
  simulationSpeed: number;
  activeScenarioId?: string;
}

export const ThreeMineScene: React.FC<ThreeMineSceneProps> = ({
  assets,
  selectedAssetId,
  onSelectAsset,
  layers,
  simulationSpeed,
  activeScenarioId = 'SCENARIO-B'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Group references for toggling layers
  const equipmentGroupRef = useRef<THREE.Group>(new THREE.Group());
  const sensorsGroupRef = useRef<THREE.Group>(new THREE.Group());
  const telemetryLinksGroupRef = useRef<THREE.Group>(new THREE.Group());
  const haulRoutesGroupRef = useRef<THREE.Group>(new THREE.Group());
  const hazardGroupRef = useRef<THREE.Group>(new THREE.Group());
  const heatmapGroupRef = useRef<THREE.Group>(new THREE.Group());
  const labelsGroupRef = useRef<THREE.Group>(new THREE.Group());

  // Interactive meshes mapped to asset IDs
  const interactiveMeshesRef = useRef<Map<string, THREE.Object3D>>(new Map());

  // Alternative scenario route objects
  const baselineRouteLineRef = useRef<THREE.Line | null>(null);
  const bypassRouteLineRef = useRef<THREE.Line | null>(null);

  // Moving parts references for wheel animation
  const truckWheelsRef = useRef<THREE.Object3D[]>([]);

  // Animation states
  const truckWaypointProgress = useRef(0);
  const excavatorSwingAngle = useRef(0);
  const conveyorTextureOffset = useRef(0);
  const pulseUniform = useRef(0);
  const dustParticleGroupRef = useRef<THREE.Points | null>(null);

  // Camera lerp target
  const targetCameraPos = useRef<THREE.Vector3 | null>(null);
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 3, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 3, 0));

  // Mouse orbit controls state
  const isDragging = useRef(false);
  const isPanning = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const cameraSpherical = useRef({ radius: 95, theta: 0.85, phi: 1.15 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Setup Scene, Camera, Renderer
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a1017);
    scene.fog = new THREE.FogExp2(0x0a1017, 0.0055);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 600);
    cameraRef.current = camera;
    updateCameraPosition();

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Realistic Daylight & Industrial Ambient Lighting (Open-Pit Sky & Sun)
    const hemisphereLight = new THREE.HemisphereLight(0x62819f, 0x362c22, 1.4);
    scene.add(hemisphereLight);

    const ambientLight = new THREE.AmbientLight(0x283848, 1.1);
    scene.add(ambientLight);

    // Main Sun Directional Light (Azimuth 45°, Elevation 55°)
    const sunLight = new THREE.DirectionalLight(0xfff6e8, 2.6);
    sunLight.position.set(55, 80, 45);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 200;
    sunLight.shadow.camera.left = -70;
    sunLight.shadow.camera.right = 70;
    sunLight.shadow.camera.top = 70;
    sunLight.shadow.camera.bottom = -70;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Cool Sky Fill Light
    const skyFillLight = new THREE.DirectionalLight(0x19c8d8, 0.4);
    skyFillLight.position.set(-45, 35, -35);
    scene.add(skyFillLight);

    // Add Layer Groups
    scene.add(equipmentGroupRef.current);
    scene.add(sensorsGroupRef.current);
    scene.add(telemetryLinksGroupRef.current);
    scene.add(haulRoutesGroupRef.current);
    scene.add(hazardGroupRef.current);
    scene.add(heatmapGroupRef.current);
    scene.add(labelsGroupRef.current);

    // 3. Build Organic Terraced Open-Pit Mine Topography (Amphitheater Benches)
    buildOrganicMineTerrain(scene);

    // 4. Build Fixed Mine Infrastructure: Crusher Plant, Conveyors & Stockpiles
    buildMineInfrastructure(scene, equipmentGroupRef.current, interactiveMeshesRef.current);

    // 5. Build Equipment: Excavator Shovel & Mining Haul Trucks with Realistic Assemblies
    const wheels = buildMiningEquipment(scene, equipmentGroupRef.current, interactiveMeshesRef.current);
    truckWheelsRef.current = wheels;

    // 6. Build Haul Road Splines (Baseline Ramp B & Scenario C Bypass)
    const { baselineLine, bypassLine } = buildHaulRoads(haulRoutesGroupRef.current);
    baselineRouteLineRef.current = baselineLine;
    bypassRouteLineRef.current = bypassLine;

    // 7. Build Sensor Beacons & Optical Lines
    buildSensorBeacons(sensorsGroupRef.current, telemetryLinksGroupRef.current, interactiveMeshesRef.current);

    // 8. Build Hazard Area Perimeter (Ramp B Warning Zone)
    buildHazardZone(hazardGroupRef.current);

    // 9. Build Risk Heatmap Mesh
    buildRiskHeatmap(heatmapGroupRef.current);

    // 10. Build 3D Asset Labels
    buildAssetLabels(labelsGroupRef.current, assets);

    // 11. Mouse & Interaction Handlers
    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) isDragging.current = true;
      if (e.button === 2) isPanning.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      if (isDragging.current) {
        cameraSpherical.current.theta -= deltaX * 0.005;
        cameraSpherical.current.phi = Math.max(0.15, Math.min(Math.PI / 2 - 0.05, cameraSpherical.current.phi + deltaY * 0.005));
        targetCameraPos.current = null;
        updateCameraPosition();
      } else if (isPanning.current) {
        const panSpeed = 0.06;
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();

        currentLookAt.current.addScaledVector(right, -deltaX * panSpeed);
        currentLookAt.current.y += deltaY * panSpeed;
        targetCameraPos.current = null;
        updateCameraPosition();
      }

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
      isPanning.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraSpherical.current.radius = Math.max(25, Math.min(180, cameraSpherical.current.radius + e.deltaY * 0.05));
      targetCameraPos.current = null;
      updateCameraPosition();
    };

    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    // Raycaster for selecting equipment & sensors
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseCoord, camera);
      const interactives = Array.from(interactiveMeshesRef.current.values());
      const intersects = raycaster.intersectObjects(interactives, true);

      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && !obj.userData?.assetId && obj.parent) {
          obj = obj.parent;
        }
        if (obj && obj.userData?.assetId) {
          onSelectAsset(obj.userData.assetId);
        }
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('contextmenu', onContextMenu);
    container.addEventListener('click', onClick);

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 12. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const speedMult = simulationSpeed || 1.0;

      // Animate Moving Haul Truck according to active scenario
      animateHaulTruck(speedMult, delta);

      // Animate Excavator Shovel dipper slewing cycle
      animateExcavator(speedMult, delta);

      // Animate Conveyor Belt texture roll
      conveyorTextureOffset.current += delta * 0.5 * speedMult;

      // Animate Sensor Pulses
      pulseUniform.current += delta * 2.5;
      updateSensorPulses(pulseUniform.current);

      // Camera Smooth Lerp Transition if target active
      if (targetCameraPos.current) {
        camera.position.lerp(targetCameraPos.current, 0.08);
        currentLookAt.current.lerp(targetLookAt.current, 0.08);
        camera.lookAt(currentLookAt.current);
        if (camera.position.distanceTo(targetCameraPos.current) < 0.2) {
          targetCameraPos.current = null;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('contextmenu', onContextMenu);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Camera Orbit Spherical Coordinates
  const updateCameraPosition = () => {
    if (!cameraRef.current) return;
    const { radius, theta, phi } = cameraSpherical.current;
    cameraRef.current.position.x = currentLookAt.current.x + radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = currentLookAt.current.y + radius * Math.cos(phi);
    cameraRef.current.position.z = currentLookAt.current.z + radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(currentLookAt.current);
  };

  // React to Layer Visibility Changes
  useEffect(() => {
    equipmentGroupRef.current.visible = layers.equipment;
    sensorsGroupRef.current.visible = layers.sensors;
    telemetryLinksGroupRef.current.visible = layers.telemetryLinks;
    haulRoutesGroupRef.current.visible = layers.haulRoutes;
    hazardGroupRef.current.visible = layers.hazardZones;
    heatmapGroupRef.current.visible = layers.riskHeatmap;
    labelsGroupRef.current.visible = layers.labels;
  }, [layers]);

  // React to Active Scenario Selection (Highlighting alternative route)
  useEffect(() => {
    if (activeScenarioId === 'SCENARIO-C') {
      // Scenario C: Dynamic Rerouting active -> highlight bypass in bright amber/teal
      if (bypassRouteLineRef.current) bypassRouteLineRef.current.visible = true;
      if (baselineRouteLineRef.current) (baselineRouteLineRef.current.material as THREE.LineDashedMaterial).color.setHex(0x647c92);
    } else {
      if (bypassRouteLineRef.current) bypassRouteLineRef.current.visible = false;
      if (baselineRouteLineRef.current) (baselineRouteLineRef.current.material as THREE.LineDashedMaterial).color.setHex(0x19c8d8);
    }
  }, [activeScenarioId]);

  // React to Selected Asset (Smooth camera focus lerp)
  useEffect(() => {
    if (!selectedAssetId) return;
    const mesh = interactiveMeshesRef.current.get(selectedAssetId);
    if (mesh) {
      const worldPos = new THREE.Vector3();
      mesh.getWorldPosition(worldPos);

      targetLookAt.current = worldPos.clone().add(new THREE.Vector3(0, 2.0, 0));
      targetCameraPos.current = worldPos.clone().add(new THREE.Vector3(18, 14, 20));
    }
  }, [selectedAssetId]);

  // Dynamic Equipment Movement (responsive to active scenario)
  const animateHaulTruck = (speedMult: number, delta: number) => {
    const truckMesh = interactiveMeshesRef.current.get('TRK-105');
    if (!truckMesh) return;

    if (activeScenarioId === 'SCENARIO-B') {
      // Scenario B: TRK-105 is safely positioned at the Summit Maintenance Siding for servicing
      truckMesh.position.set(-28, 12.0, 16);
      truckMesh.rotation.y = -0.6;
      return;
    }

    truckWaypointProgress.current = (truckWaypointProgress.current + delta * 0.035 * speedMult) % 1;
    const t = truckWaypointProgress.current;

    let x = 0;
    let y = 0;
    let z = 0;
    let nextX = 0;
    let nextZ = 0;

    if (activeScenarioId === 'SCENARIO-C') {
      // Scenario C: Eastern Bypass Route (Lower 6% gradient, wider loop)
      x = 5 + Math.sin(t * Math.PI * 2) * 28;
      z = -2 + Math.cos(t * Math.PI * 2) * 26;
      y = 1.8 + (1 - Math.cos(t * Math.PI * 2)) * 4.8;
      nextX = 5 + Math.sin((t + 0.01) * Math.PI * 2) * 28;
      nextZ = -2 + Math.cos((t + 0.01) * Math.PI * 2) * 26;
    } else {
      // Scenario A / Baseline: Steep 11% Haul Ramp B switchback
      x = -12 + Math.sin(t * Math.PI * 2) * 16;
      z = 8 + Math.cos(t * Math.PI * 2) * 22;
      y = 3.2 + Math.sin(t * Math.PI) * 4.5;
      nextX = -12 + Math.sin((t + 0.01) * Math.PI * 2) * 16;
      nextZ = 8 + Math.cos((t + 0.01) * Math.PI * 2) * 22;
    }

    truckMesh.position.set(x, y, z);
    const heading = Math.atan2(nextX - x, nextZ - z);
    truckMesh.rotation.y = heading;

    // Rotate wheels
    truckWheelsRef.current.forEach((wheel) => {
      wheel.rotation.z += delta * 4 * speedMult;
    });
  };

  const animateExcavator = (speedMult: number, delta: number) => {
    const shovelMesh = interactiveMeshesRef.current.get('EXC-701');
    if (!shovelMesh) return;
    excavatorSwingAngle.current += delta * 0.45 * speedMult;
    const upperCab = shovelMesh.getObjectByName('upperCab');
    if (upperCab) {
      // Shovel swings between active blasted rock face and waiting haul truck
      upperCab.rotation.y = Math.sin(excavatorSwingAngle.current) * 0.65;
    }
  };

  const updateSensorPulses = (time: number) => {
    sensorsGroupRef.current.children.forEach((child) => {
      const ring = child.getObjectByName('pulseRing');
      if (ring) {
        const s = 1 + (Math.sin(time * 3 + child.id) + 1) * 0.35;
        ring.scale.set(s, s, s);
      }
    });
  };

  return (
    <div className="relative w-full h-full min-h-[500px] bg-[#080E14] overflow-hidden select-none">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 3D Viewport Controls & HUD Overlay */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
        <span className="cyber-badge badge-cyan bg-[#080E14]/90 backdrop-blur pointer-events-auto text-[10px]">
          <span className="w-2 h-2 rounded-full bg-[#19C8D8] animate-pulse" />
          WebGL Digital Twin &bull; 60 FPS
        </span>
        {activeScenarioId === 'SCENARIO-C' && (
          <span className="cyber-badge badge-amber bg-[#080E14]/90 backdrop-blur pointer-events-auto text-[10px]">
            Route: Eastern Bypass Active (6% Grade)
          </span>
        )}
        {activeScenarioId === 'SCENARIO-B' && (
          <span className="cyber-badge badge-teal bg-[#080E14]/90 backdrop-blur pointer-events-auto text-[10px]">
            TRK-105: At Summit Siding Bay (Serviced)
          </span>
        )}
      </div>

      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
        <button
          onClick={() => {
            currentLookAt.current.set(0, 3, 0);
            targetLookAt.current.set(0, 3, 0);
            cameraSpherical.current = { radius: 95, theta: 0.85, phi: 1.15 };
            updateCameraPosition();
          }}
          className="btn btn-secondary btn-sm bg-[#101923]/90 hover:border-[#19C8D8] text-xs font-mono text-cyan"
          title="Reset Camera to Mine Overview"
        >
          RESET OVERVIEW
        </button>
      </div>

      <div className="absolute bottom-3 right-3 z-10 text-[11px] font-mono text-dim bg-[#080E14]/85 px-2.5 py-1 rounded border border-[#243647]">
        [L-Click: Orbit / Select] &bull; [R-Click: Pan] &bull; [Scroll: Zoom]
      </div>
    </div>
  );
};

// =========================================================================
// REALISTIC PROCEDURAL OPEN-PIT TOPOGRAPHY & BENCH GENERATION
// =========================================================================

function buildOrganicMineTerrain(scene: THREE.Scene) {
  const terrainGroup = new THREE.Group();

  // Natural amphitheater open pit with 6 realistic terraced strata benches
  // We use angular perturbations so benches have organic blasted geometry rather than rigid circles
  const benchLevels = [
    { innerBase: 50, outerBase: 76, y: 15.0, color: 0x483e33, roughness: 0.96 }, // Surface Rim & Weathered Overburden
    { innerBase: 40, outerBase: 52, y: 11.5, color: 0x3d352c, roughness: 0.94 }, // Bench 1 Sandstone & Shale
    { innerBase: 30, outerBase: 42, y: 8.0,  color: 0x332c25, roughness: 0.92 }, // Bench 2 Host Strata
    { innerBase: 21, outerBase: 32, y: 4.8,  color: 0x2a241f, roughness: 0.90 }, // Bench 3 Transition Strata
    { innerBase: 13, outerBase: 23, y: 2.0,  color: 0x1e1917, roughness: 0.88 }, // Bench 4 Active Ore Dig Face
    { innerBase: 0,  outerBase: 15, y: 0.0,  color: 0x141210, roughness: 0.82 }  // Pit Sump Floor
  ];

  // Angular shape distortion function: authentic oval open-pit with blast variations
  const getRadius = (baseR: number, angle: number) => {
    if (baseR === 0) return 0;
    const ovalFactor = 1.0 + 0.14 * Math.sin(angle * 2.0) + 0.06 * Math.cos(angle * 3.0 + 0.8) + 0.03 * Math.sin(angle * 5.0);
    return baseR * ovalFactor;
  };

  const segments = 64;

  benchLevels.forEach((bench) => {
    // Generate organic flat bench floor ring
    const floorGeo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const indices: number[] = [];

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const rInner = getRadius(bench.innerBase, theta);
      const rOuter = getRadius(bench.outerBase, theta);

      const xInner = Math.cos(theta) * rInner;
      const zInner = Math.sin(theta) * rInner;
      const xOuter = Math.cos(theta) * rOuter;
      const zOuter = Math.sin(theta) * rOuter;

      positions.push(xInner, bench.y, zInner);
      positions.push(xOuter, bench.y, zOuter);
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = i * 2 + 1;
      const c = (i + 1) * 2;
      const d = (i + 1) * 2 + 1;
      indices.push(a, b, c);
      indices.push(b, d, c);
    }

    floorGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    floorGeo.setIndex(indices);
    floorGeo.computeVertexNormals();

    const floorMat = new THREE.MeshStandardMaterial({
      color: bench.color,
      roughness: bench.roughness,
      metalness: 0.08,
      flatShading: true
    });

    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.receiveShadow = true;
    terrainGroup.add(floorMesh);

    // Steep Highwall Excavation Face (blasted rock wall connecting to lower level)
    if (bench.innerBase > 0) {
      const wallGeo = new THREE.BufferGeometry();
      const wallPositions: number[] = [];
      const wallIndices: number[] = [];
      const lowerY = bench.y - 3.2;

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const rTop = getRadius(bench.innerBase, theta);
        const rBottom = rTop + 1.6; // slight batter/wall angle for geotechnical stability

        wallPositions.push(Math.cos(theta) * rTop, bench.y, Math.sin(theta) * rTop);
        wallPositions.push(Math.cos(theta) * rBottom, lowerY, Math.sin(theta) * rBottom);
      }

      for (let i = 0; i < segments; i++) {
        const a = i * 2;
        const b = i * 2 + 1;
        const c = (i + 1) * 2;
        const d = (i + 1) * 2 + 1;
        wallIndices.push(a, c, b);
        wallIndices.push(b, c, d);
      }

      wallGeo.setAttribute('position', new THREE.Float32BufferAttribute(wallPositions, 3));
      wallGeo.setIndex(wallIndices);
      wallGeo.computeVertexNormals();

      const wallMat = new THREE.MeshStandardMaterial({
        color: bench.color - 0x060606,
        roughness: 0.98,
        flatShading: true
      });

      const wallMesh = new THREE.Mesh(wallGeo, wallMat);
      wallMesh.receiveShadow = true;
      terrainGroup.add(wallMesh);
    }
  });

  // Pit Sump Floor Drainage Water Pool (elevation -0.15m)
  const poolGeo = new THREE.CylinderGeometry(6, 6, 0.4, 24);
  const poolMat = new THREE.MeshStandardMaterial({
    color: 0x0a1c22,
    roughness: 0.2,
    metalness: 0.7,
    transparent: true,
    opacity: 0.75
  });
  const pool = new THREE.Mesh(poolGeo, poolMat);
  pool.position.set(0, -0.05, 0);
  terrainGroup.add(pool);

  // Blasted Muckpile at Excavator Dig Face (Bench 4)
  const muckGeo = new THREE.ConeGeometry(5.2, 3.2, 16);
  const muckMat = new THREE.MeshStandardMaterial({ color: 0x181716, roughness: 0.98, flatShading: true });
  const muckpile = new THREE.Mesh(muckGeo, muckMat);
  muckpile.position.set(31, 3.0, -25);
  muckpile.castShadow = true;
  muckpile.receiveShadow = true;
  terrainGroup.add(muckpile);

  // Stockpiles of Run-of-Mine Crushed Ore on Upper Bench
  const stockpileConfigs = [
    { pos: [8, 0, 4], r: 5, h: 3.5, color: 0x1e1c1a },
    { pos: [19, 2.0, -12], r: 4.2, h: 2.8, color: 0x242220 },
    { pos: [-4, 0, -6], r: 3.8, h: 2.4, color: 0x1a1816 }
  ];

  stockpileConfigs.forEach((sp) => {
    const pileGeo = new THREE.ConeGeometry(sp.r, sp.h, 24);
    const pileMat = new THREE.MeshStandardMaterial({
      color: sp.color,
      roughness: 0.98,
      flatShading: true
    });
    const pile = new THREE.Mesh(pileGeo, pileMat);
    pile.position.set(sp.pos[0], sp.pos[1] + sp.h / 2, sp.pos[2]);
    pile.receiveShadow = true;
    pile.castShadow = true;
    terrainGroup.add(pile);
  });

  // Industrial Floodlight Mast Towers along Rim
  const floodlightPositions = [
    [-38, 15.0, 32],
    [36, 15.0, 34],
    [40, 15.0, -32]
  ];

  floodlightPositions.forEach(([fx, fy, fz]) => {
    const mast = new THREE.Group();
    mast.position.set(fx, fy, fz);

    // Lattice Pole
    const poleGeo = new THREE.CylinderGeometry(0.2, 0.35, 12, 6);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.6 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = 6;
    mast.add(pole);

    // Light Head Bracket & Banks
    const headGeo = new THREE.BoxGeometry(2.4, 0.6, 0.8);
    const headMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 12;
    mast.add(head);

    // Subtle downward spotlight
    const light = new THREE.SpotLight(0xfff5dd, 1.2, 35, Math.PI / 4, 0.4);
    light.position.set(0, 12, 0);
    light.target.position.set(0, 0, 0);
    mast.add(light);
    mast.add(light.target);

    terrainGroup.add(mast);
  });

  // Subtle Digital Spatial Grid Overlay
  const gridHelper = new THREE.GridHelper(140, 28, 0x19c8d8, 0x172635);
  gridHelper.position.y = -0.05;
  (gridHelper.material as THREE.Material).opacity = 0.16;
  (gridHelper.material as THREE.Material).transparent = true;
  terrainGroup.add(gridHelper);

  scene.add(terrainGroup);
}

// =========================================================================
// FIXED MINE INFRASTRUCTURE: CRUSHER PLANT & OVERLAND CONVEYOR
// =========================================================================

function buildMineInfrastructure(
  scene: THREE.Scene,
  group: THREE.Group,
  interactiveMap: Map<string, THREE.Object3D>
) {
  // 1. Primary Crushing & Processing Plant Building (CRU-01) at Upper Rim (x: -34, y: 11.5, z: -6)
  const crusherGroup = new THREE.Group();
  crusherGroup.position.set(-34, 11.5, -6);
  crusherGroup.userData = { assetId: 'CRU-01' };

  // Main Processing Building Enclosure
  const bldgGeo = new THREE.BoxGeometry(12, 7.5, 9);
  const bldgMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6, metalness: 0.3 });
  const bldg = new THREE.Mesh(bldgGeo, bldgMat);
  bldg.position.y = 3.75;
  bldg.castShadow = true;
  bldg.receiveShadow = true;
  crusherGroup.add(bldg);

  // Gable Roof
  const roofGeo = new THREE.ConeGeometry(8, 2.5, 4);
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.set(0, 8.5, 0);
  roof.rotation.y = Math.PI / 4;
  crusherGroup.add(roof);

  // Intake Feed Hopper & Concrete Dump Pocket Apron
  const hopperGeo = new THREE.BoxGeometry(6.5, 4.5, 6.5);
  const hopperMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
  const hopper = new THREE.Mesh(hopperGeo, hopperMat);
  hopper.position.set(7.5, 2.25, 0);
  crusherGroup.add(hopper);

  // Hydraulic Rock Breaker Boom on Crusher Hopper Rim
  const breakerArmGeo = new THREE.BoxGeometry(0.4, 0.4, 3.5);
  const yellowMat = new THREE.MeshStandardMaterial({ color: 0xe4a12d, roughness: 0.5 });
  const breakerArm = new THREE.Mesh(breakerArmGeo, yellowMat);
  breakerArm.position.set(9, 4.5, 1.5);
  breakerArm.rotation.x = 0.4;
  crusherGroup.add(breakerArm);

  group.add(crusherGroup);
  interactiveMap.set('CRU-01', crusherGroup);

  // 2. Continuous Overland Steel-Truss Conveyor (CNV-04)
  const conveyorGroup = new THREE.Group();
  conveyorGroup.position.set(-18, 9.5, -9);
  conveyorGroup.userData = { assetId: 'CNV-04' };

  // Steel Warren Truss Framework
  const length = 32;
  const trussGeo = new THREE.BoxGeometry(length, 1.4, 2.4);
  const trussMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.5, roughness: 0.4 });
  const truss = new THREE.Mesh(trussGeo, trussMat);
  truss.position.set(-2, 1.2, 0);
  truss.rotation.z = 0.07;
  conveyorGroup.add(truss);

  // Continuous Black Rubber Belt with Ore Burden
  const beltGeo = new THREE.BoxGeometry(length + 1, 0.35, 2.0);
  const beltMat = new THREE.MeshStandardMaterial({ color: 0x1b1f24, roughness: 0.85 });
  const belt = new THREE.Mesh(beltGeo, beltMat);
  belt.position.set(-2, 2.0, 0);
  belt.rotation.z = 0.07;
  conveyorGroup.add(belt);

  // Structural Support Trestle Pillars
  for (let i = -14; i <= 12; i += 7) {
    const pillarGeo = new THREE.CylinderGeometry(0.35, 0.45, 9);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(i, -3, 0);
    conveyorGroup.add(pillar);
  }

  group.add(conveyorGroup);
  interactiveMap.set('CNV-04', conveyorGroup);
}

// =========================================================================
// MINING MACHINERY: HYDRAULIC SHOVEL & ULTRA-CLASS HAUL TRUCKS
// =========================================================================

function buildMiningEquipment(
  scene: THREE.Scene,
  group: THREE.Group,
  interactiveMap: Map<string, THREE.Object3D>
): THREE.Object3D[] {
  const allTruckWheels: THREE.Object3D[] = [];

  // 1. Excavator Shovel EXC-701 at Bench 4 Dig Face
  const shovelGroup = new THREE.Group();
  shovelGroup.position.set(28, 2.0, -22);
  shovelGroup.userData = { assetId: 'EXC-701' };

  // Heavy Crawler Undercarriage Tracks
  const trackGeo = new THREE.BoxGeometry(8.0, 2.2, 7.0);
  const trackMat = new THREE.MeshStandardMaterial({ color: 0x1b2028, roughness: 0.92 });
  const tracks = new THREE.Mesh(trackGeo, trackMat);
  tracks.position.y = 1.1;
  shovelGroup.add(tracks);

  // Revolving Upper Body
  const upperCab = new THREE.Group();
  upperCab.name = 'upperCab';
  upperCab.position.y = 2.2;

  // Machinery House & Counterweight
  const cabGeo = new THREE.BoxGeometry(6.4, 3.8, 5.2);
  const yellowMat = new THREE.MeshStandardMaterial({ color: 0xe4a12d, roughness: 0.45, metalness: 0.25 });
  const cab = new THREE.Mesh(cabGeo, yellowMat);
  cab.position.set(-0.8, 1.9, 0);
  cab.castShadow = true;
  upperCab.add(cab);

  // Raised Operator Cabin with Panoramic Glass
  const opCabGeo = new THREE.BoxGeometry(2.0, 2.2, 1.8);
  const opCabMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.6 });
  const opCab = new THREE.Mesh(opCabGeo, opCabMat);
  opCab.position.set(1.8, 3.5, 2.0);
  upperCab.add(opCab);

  // Heavy Two-Piece Articulated Boom & Hydraulic Hoist Rams
  const boomGeo = new THREE.BoxGeometry(11, 1.6, 1.4);
  const boom = new THREE.Mesh(boomGeo, yellowMat);
  boom.position.set(6, 5.4, 0);
  boom.rotation.z = Math.PI / 3.8;
  boom.castShadow = true;
  upperCab.add(boom);

  // Heavy Rock Tooth-Bucket
  const bucketGeo = new THREE.BoxGeometry(3.0, 2.8, 3.4);
  const steelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.4 });
  const bucket = new THREE.Mesh(bucketGeo, steelMat);
  bucket.position.set(10.8, 2.3, 0);
  bucket.castShadow = true;
  upperCab.add(bucket);

  shovelGroup.add(upperCab);
  group.add(shovelGroup);
  interactiveMap.set('EXC-701', shovelGroup);

  // 2. Ultra-Class Haul Trucks: TRK-105, TRK-101, TRK-102
  const { truck: truck105, wheels: w105 } = createRealisticHaulTruckMesh('TRK-105', 0xe4a12d);
  truck105.position.set(-14, 3.2, 12);
  truck105.userData = { assetId: 'TRK-105' };
  group.add(truck105);
  interactiveMap.set('TRK-105', truck105);
  allTruckWheels.push(...w105);

  const { truck: truck101, wheels: w101 } = createRealisticHaulTruckMesh('TRK-101', 0x32c9a1);
  truck101.position.set(22, 2.0, -16);
  truck101.userData = { assetId: 'TRK-101' };
  group.add(truck101);
  interactiveMap.set('TRK-101', truck101);
  allTruckWheels.push(...w101);

  const { truck: truck102, wheels: w102 } = createRealisticHaulTruckMesh('TRK-102', 0x25c9ab);
  truck102.position.set(12, 7.8, 26);
  truck102.userData = { assetId: 'TRK-102' };
  group.add(truck102);
  interactiveMap.set('TRK-102', truck102);
  allTruckWheels.push(...w102);

  return allTruckWheels;
}

function createRealisticHaulTruckMesh(assetId: string, accentColor: number): { truck: THREE.Group; wheels: THREE.Object3D[] } {
  const truck = new THREE.Group();
  const wheels: THREE.Object3D[] = [];

  // Heavy Lower Box Chassis & Axles
  const chassisGeo = new THREE.BoxGeometry(6.2, 1.5, 3.6);
  const chassisMat = new THREE.MeshStandardMaterial({ color: 0x1a212b, roughness: 0.85 });
  const chassis = new THREE.Mesh(chassisGeo, chassisMat);
  chassis.position.y = 1.4;
  chassis.castShadow = true;
  truck.add(chassis);

  // Tapered Dump Body / Rock Tray with High Front Canopy (FOPS)
  const bedGeo = new THREE.BoxGeometry(5.8, 2.6, 3.8);
  const yellowMat = new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.5, metalness: 0.2 });
  const bed = new THREE.Mesh(bedGeo, yellowMat);
  bed.position.set(-0.4, 3.0, 0);
  bed.rotation.z = -0.06;
  bed.castShadow = true;
  truck.add(bed);

  // Front FOPS Canopy extending over cab
  const canopyGeo = new THREE.BoxGeometry(2.4, 0.4, 3.8);
  const canopy = new THREE.Mesh(canopyGeo, yellowMat);
  canopy.position.set(2.8, 4.4, 0);
  truck.add(canopy);

  // Operator Cab with Safety Glass
  const cabGeo = new THREE.BoxGeometry(1.8, 1.8, 1.6);
  const cabMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.5 });
  const cab = new THREE.Mesh(cabGeo, cabMat);
  cab.position.set(2.2, 2.8, 0.9);
  truck.add(cab);

  // Cab Roof Amber Hazard Strobe Beacon
  const strobeGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 8);
  const strobeMat = new THREE.MeshBasicMaterial({ color: 0xe4a12d });
  const strobe = new THREE.Mesh(strobeGeo, strobeMat);
  strobe.position.set(2.2, 3.8, 0.9);
  truck.add(strobe);

  // Giant Ultra-Class Mining Tires (6 Wheels: 2 front single, 4 rear dual)
  const wheelGeo = new THREE.CylinderGeometry(1.3, 1.3, 1.0, 24);
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x10141a, roughness: 0.95 });

  const wheelPositions = [
    [2.1, 1.3, 2.0],
    [2.1, 1.3, -2.0],
    [-1.8, 1.3, 2.0],
    [-1.8, 1.3, -2.0],
    [-2.9, 1.3, 2.0],
    [-2.9, 1.3, -2.0]
  ];

  wheelPositions.forEach(([wx, wy, wz]) => {
    const wheel = new THREE.Mesh(wheelGeo, tireMat);
    wheel.position.set(wx, wy, wz);
    wheel.rotation.x = Math.PI / 2;
    wheel.castShadow = true;
    truck.add(wheel);
    wheels.push(wheel);
  });

  return { truck, wheels };
}

// =========================================================================
// HAUL ROADS, SENSORS, HAZARD PERIMETERS & 3D LABELS
// =========================================================================

function buildHaulRoads(group: THREE.Group): { baselineLine: THREE.Line; bypassLine: THREE.Line } {
  // Baseline Haul Road (Steep 11% grade on Ramp B switchback)
  const baselinePoints = [
    new THREE.Vector3(26, 2.0, -18),
    new THREE.Vector3(14, 2.8, -4),
    new THREE.Vector3(0, 3.8, 12),
    new THREE.Vector3(-15, 4.8, 18),
    new THREE.Vector3(-26, 7.8, 6),
    new THREE.Vector3(-30, 10.4, -4),
    new THREE.Vector3(-34, 11.5, -6)
  ];

  const baselineCurve = new THREE.CatmullRomCurve3(baselinePoints);
  const tubeGeo = new THREE.TubeGeometry(baselineCurve, 64, 2.5, 8, false);
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x2e353f, roughness: 0.92 });
  const roadMesh = new THREE.Mesh(tubeGeo, roadMat);
  roadMesh.scale.y = 0.16;
  group.add(roadMesh);

  // Roadway Dash Centerline
  const lineMat = new THREE.LineDashedMaterial({
    color: 0x19c8d8,
    linewidth: 2,
    scale: 1,
    dashSize: 2.5,
    gapSize: 1.2
  });
  const linePoints = baselineCurve.getPoints(120);
  const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
  const baselineLine = new THREE.Line(lineGeo, lineMat);
  baselineLine.position.y += 0.28;
  baselineLine.computeLineDistances();
  group.add(baselineLine);

  // Scenario C: Eastern Bypass Alternative Route (Gentler 6% grade loop)
  const bypassPoints = [
    new THREE.Vector3(26, 2.0, -18),
    new THREE.Vector3(32, 3.4, 4),
    new THREE.Vector3(24, 6.0, 24),
    new THREE.Vector3(2, 8.0, 30),
    new THREE.Vector3(-18, 10.0, 22),
    new THREE.Vector3(-30, 11.2, 8),
    new THREE.Vector3(-34, 11.5, -6)
  ];
  const bypassCurve = new THREE.CatmullRomCurve3(bypassPoints);
  const bypassLineMat = new THREE.LineDashedMaterial({
    color: 0xe4a12d,
    linewidth: 3,
    scale: 1,
    dashSize: 3,
    gapSize: 1.5
  });
  const bypassLineGeo = new THREE.BufferGeometry().setFromPoints(bypassCurve.getPoints(140));
  const bypassLine = new THREE.Line(bypassLineGeo, bypassLineMat);
  bypassLine.position.y += 0.35;
  bypassLine.computeLineDistances();
  bypassLine.visible = false;
  group.add(bypassLine);

  return { baselineLine, bypassLine };
}

function buildSensorBeacons(
  sensorsGroup: THREE.Group,
  telemetryLinksGroup: THREE.Group,
  interactiveMap: Map<string, THREE.Object3D>
) {
  const sensorConfigs = [
    { id: 'SN-DAS-01', name: 'DAS Fiber Optic Array', pos: [-8, 5.0, 11], color: 0x19c8d8 },
    { id: 'SN-RAD-02', name: 'Interferometric Slope Radar', pos: [12, 12.2, -4], color: 0x25c9ab }
  ];

  sensorConfigs.forEach((cfg) => {
    const sGroup = new THREE.Group();
    sGroup.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
    sGroup.userData = { assetId: cfg.id };

    const poleGeo = new THREE.CylinderGeometry(0.18, 0.22, 4.2);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x64748b });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = 2.1;
    sGroup.add(pole);

    const bulbGeo = new THREE.SphereGeometry(0.65, 16, 16);
    const bulbMat = new THREE.MeshBasicMaterial({ color: cfg.color });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.y = 4.4;
    sGroup.add(bulb);

    const ringGeo = new THREE.RingGeometry(0.85, 1.3, 32);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: cfg.color,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.name = 'pulseRing';
    ring.position.y = 4.4;
    sGroup.add(ring);

    sensorsGroup.add(sGroup);
    interactiveMap.set(cfg.id, sGroup);

    const linkGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(cfg.pos[0], cfg.pos[1] + 4.4, cfg.pos[2]),
      new THREE.Vector3(-34, 16, -20)
    ]);
    const linkMat = new THREE.LineBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.35 });
    const linkLine = new THREE.Line(linkGeo, linkMat);
    telemetryLinksGroup.add(linkLine);
  });
}

function buildHazardZone(group: THREE.Group) {
  const hazardGeo = new THREE.CylinderGeometry(8, 8, 3, 24, 1, true);
  const hazardMat = new THREE.MeshBasicMaterial({
    color: 0xe4a12d,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    wireframe: true
  });
  const hazardMesh = new THREE.Mesh(hazardGeo, hazardMat);
  hazardMesh.position.set(-10, 4.4, 12);
  group.add(hazardMesh);
}

function buildRiskHeatmap(group: THREE.Group) {
  const heatGeo = new THREE.PlaneGeometry(28, 18, 16, 16);
  heatGeo.rotateX(-Math.PI / 2);
  const heatMat = new THREE.MeshBasicMaterial({
    color: 0xf05a63,
    transparent: true,
    opacity: 0.16
  });
  const heatMesh = new THREE.Mesh(heatGeo, heatMat);
  heatMesh.position.set(-12, 4.6, 10);
  group.add(heatMesh);
}

function buildAssetLabels(group: THREE.Group, assets: Asset[]) {
  assets.slice(0, 6).forEach((asset) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'rgba(8, 14, 20, 0.9)';
    ctx.roundRect(4, 4, 248, 56, 6);
    ctx.fill();

    ctx.strokeStyle = asset.status === 'warning' ? '#E4A12D' : '#19C8D8';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillText(asset.id, 16, 34);

    ctx.fillStyle = asset.status === 'warning' ? '#E4A12D' : '#25C9AB';
    ctx.font = '14px JetBrains Mono, monospace';
    ctx.fillText(asset.status.toUpperCase(), 16, 52);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, depthTest: false });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(7, 2, 1);
    sprite.position.set(asset.position.x, asset.position.y + 5.0, asset.position.z);
    group.add(sprite);
  });
}
