"use client";

import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { blocksChromeSpawn, isPointerInHeroSection } from "./chromeSpawnUtils";

const dSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.68 63.61">
  <defs><style>.cls-1{fill:#231f20;}</style></defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <path class="cls-1" d="M35.18,2.5v17.9c-3.47-2.67-7.83-4.1-12.73-4.1C9.44,16.3,0,26.23,0,39.92s9.43,23.6,22.43,23.69c.1,0,.21,0,.31,0,13.03,0,19.67-6.13,22.95-11.29l.38-.6.6-49.2c.02-1.39-1.11-2.53-2.5-2.53h-6.5c-1.38,0-2.5,1.12-2.5,2.5ZM23.17,51.94c-7.46,0-12.47-4.83-12.47-12.02s4.89-11.93,12.47-11.93,12.55,4.68,12.55,11.93-5.04,12.02-12.55,12.02Z"/>
  </g>
</svg>`;

const eSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.82 47.48">
  <g id="Layer_1-2" data-name="Layer 1">
    <path d="M22.72,0C9.34,0,0,9.75,0,23.7s9.78,23.78,23.25,23.78c6.22,0,11.82-2.12,15.96-5.93,1.09-1.01,1.11-2.73.01-3.73l-4-3.64c-.89-.81-2.23-.87-3.2-.15-1.84,1.38-4.68,2.85-8.77,2.85-4.75,0-8.52-2.22-10.52-6.07,0,0,0,0,0,0l29.87-3.41c1.26-.14,2.22-1.21,2.22-2.48v-1.21C44.82,9.75,35.73,0,22.72,0ZM11.51,19.99c1.38-5.32,5.8-9.04,11.21-9.04,4.54,0,8.22,2.43,10.09,6.5l-21.3,2.54Z"/>
  </g>
</svg>`;

const lSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.41 62.9">
  <defs><style>.cls-1{fill:#231f20;}</style></defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <rect class="cls-1" width="11.41" height="62.9" rx="2.5" ry="2.5"/>
  </g>
</svg>`;

const nSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.9 46.6">
  <defs><style>.cls-1{fill:#231f20;}</style></defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <path class="cls-1" d="M22.1,0C17.18,0,2.25,0,.31,16.81c-.01.1-.02.2-.02.3L0,44.07c-.01,1.39,1.11,2.53,2.5,2.53h6.41c1.38,0,2.5-1.12,2.5-2.5v-24.32c0-6.76,4.65-9.17,9-9.17s9.08,2.41,9.08,9.17v24.32c0,1.38,1.12,2.5,2.5,2.5h6.41c1.38,0,2.5-1.12,2.5-2.5v-25.21C40.9,9.49,35.09,0,22.1,0Z"/>
  </g>
</svg>`;

const oSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.69 47.48">
  <defs><style>.cls-1{fill:#231f20;}</style></defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <path class="cls-1" d="M23.34,0C9.82,0,0,9.97,0,23.7s9.82,23.78,23.34,23.78,23.35-10,23.35-23.78S36.87,0,23.34,0ZM35.81,23.7c0,7.02-5.16,11.93-12.55,11.93s-12.47-4.79-12.47-11.93,5.01-11.85,12.47-11.85,12.55,4.76,12.55,11.85Z"/>
  </g>
</svg>`;

const oAltSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.69 47.48">
  <defs><style>.cls-1{fill:#231f20;}</style></defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <path class="cls-1" d="M23.34,0C9.82,0,0,9.97,0,23.7s9.82,23.78,23.34,23.78,23.35-10,23.35-23.78S36.87,0,23.34,0ZM35.81,23.7c0,7.02-5.16,11.93-12.55,11.93s-12.47-4.79-12.47-11.93,5.01-11.85,12.47-11.85,12.55,4.76,12.55,11.85Z"/>
  </g>
</svg>`;

const pSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.69 62.99">
  <defs><style>.cls-1{fill:#231f20;}</style></defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <path class="cls-1" d="M24.15,0c-7.5,0-14.23,3.01-18.47,8.27C-.22,15.57,0,26.33,0,26.72v33.77c0,1.38,1.12,2.5,2.5,2.5h6.41c1.38,0,2.5-1.12,2.5-2.5v-17.31c3.47,2.69,7.82,4.13,12.74,4.13,13.06,0,22.54-9.93,22.54-23.61S37.21,0,24.15,0ZM23.43,11.68c7.46,0,12.47,4.83,12.47,12.02s-5.01,11.93-12.47,11.93-12.55-4.8-12.55-11.93,5.04-12.02,12.55-12.02Z"/>
  </g>
</svg>`;

const PENDOLO_SEQUENCE = ["p", "e", "n", "d", "o", "l", "oAlt"] as const;
const LETTER_SVGS = { p: pSvg, e: eSvg, n: nSvg, d: dSvg, o: oSvg, l: lSvg, oAlt: oAltSvg };

const MAX_LETTERS = 12;
const RISE_SPEED = 0.54;
const FORWARD_SPEED = 0.16;
const DRIFT_SPEED = 0.06;
const WOBBLE_AMP_X = 0.05;
const WOBBLE_AMP_Y = 0.02;
const WOBBLE_AMP_Z = 0.04;
const CULL_Y_TOP = 4.6;
const CULL_RADIUS_SQ = 81;

type PendoloLetter = (typeof PENDOLO_SEQUENCE)[number];

type BubbleLetter = {
  id: number;
  letter: PendoloLetter;
  born: number;
  pos: THREE.Vector3;
  basePos: THREE.Vector3;
  velocity: THREE.Vector3;
  wobbleSeed: number;
  scale: number;
  rotationZ: number;
};

type LetterGeometry = {
  geometry: THREE.BufferGeometry;
  width: number;
  height: number;
};

function createBalloonLetterGeometry(svgMarkup: string): LetterGeometry {
  const loader = new SVGLoader();
  const data = loader.parse(svgMarkup);
  const geometries: THREE.BufferGeometry[] = [];

  for (const path of data.paths) {
    const shapes = SVGLoader.createShapes(path);
    for (const shape of shapes) {
      geometries.push(
        new THREE.ExtrudeGeometry(shape, {
          depth: 18,
          bevelEnabled: true,
          bevelThickness: 6.2,
          bevelSize: 5.2,
          bevelSegments: 24,
          curveSegments: 32,
        }),
      );
    }
  }

  const geometry =
    mergeGeometries(geometries, false) ?? geometries[0] ?? new THREE.BoxGeometry(1, 1, 0.12);
  for (const extra of geometries) {
    if (extra !== geometry) extra.dispose();
  }

  geometry.computeBoundingBox();
  const box =
    geometry.boundingBox ??
    new THREE.Box3(new THREE.Vector3(-0.5, -0.5, -0.05), new THREE.Vector3(0.5, 0.5, 0.05));
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  geometry.translate(-center.x, -center.y, -center.z);

  const maxAxis = Math.max(size.x, size.y, 1);
  const normalizedScale = 1 / maxAxis;
  geometry.scale(normalizedScale, -normalizedScale, normalizedScale);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();

  return { geometry, width: size.x * normalizedScale, height: size.y * normalizedScale };
}

function getHeliumVelocity(camera: THREE.Camera, seed: number): THREE.Vector3 {
  const horiz = new THREE.Vector3(camera.position.x, 0, camera.position.z);
  if (horiz.lengthSq() < 1e-6) horiz.set(0, 0, 1);
  else horiz.normalize();
  horiz.multiplyScalar(FORWARD_SPEED);

  const driftX = Math.sin(seed * 0.013 + 0.7) * DRIFT_SPEED;
  const driftZ = Math.cos(seed * 0.019 + 1.3) * DRIFT_SPEED * 0.5;
  const lift = RISE_SPEED + Math.cos(seed * 0.023) * 0.06;

  return new THREE.Vector3(horiz.x + driftX, lift, horiz.z + driftZ);
}

function BubbleSvgLetter({
  item,
  letterGeometry,
  foilMaterial,
  simEnabled,
  onExpired,
}: {
  item: BubbleLetter;
  letterGeometry: LetterGeometry;
  foilMaterial: THREE.Material;
  simEnabled: boolean;
  onExpired: (id: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const expiredRef = useRef(false);

  useFrame((_, dtRaw) => {
    const group = groupRef.current;
    if (!group) return;

    const dt = Math.min(Math.max(dtRaw, 0), 1 / 30);
    const now = performance.now();

    if (simEnabled) {
      item.basePos.x += item.velocity.x * dt;
      item.basePos.y += item.velocity.y * dt;
      item.basePos.z += item.velocity.z * dt;

      const phase = (now - item.born) * 0.001;
      item.pos.x = item.basePos.x + Math.sin(phase * 1.6 + item.wobbleSeed * 0.31) * WOBBLE_AMP_X;
      item.pos.y = item.basePos.y + Math.sin(phase * 1.25 + item.wobbleSeed * 0.19) * WOBBLE_AMP_Y;
      item.pos.z = item.basePos.z + Math.cos(phase * 1.9 + item.wobbleSeed * 0.43) * WOBBLE_AMP_Z;
      item.rotationZ += Math.sin(phase * 1.35 + item.wobbleSeed) * 0.003;

      if (
        !expiredRef.current &&
        (item.basePos.y > CULL_Y_TOP || item.basePos.lengthSq() > CULL_RADIUS_SQ)
      ) {
        expiredRef.current = true;
        onExpired(item.id);
      }
    }

    const pulse = 1 + Math.sin((now - item.born) * 0.005 + item.wobbleSeed) * 0.018;
    group.position.copy(item.pos);
    group.rotation.set(-0.08, 0.13, item.rotationZ);
    group.scale.set(item.scale * pulse, item.scale * (2 - pulse), item.scale * 1.15);
  });

  return (
    <group ref={groupRef} renderOrder={18}>
      <mesh
        geometry={letterGeometry.geometry}
        material={foilMaterial}
        frustumCulled={false}
        renderOrder={18}
      />
    </group>
  );
}

function BubbleSvgLetters({
  letters,
  setLetters,
  simEnabled,
}: {
  letters: BubbleLetter[];
  setLetters: Dispatch<SetStateAction<BubbleLetter[]>>;
  simEnabled: boolean;
}) {
  const letterGeometries = useMemo(() => {
    return Object.fromEntries(
      Object.entries(LETTER_SVGS).map(([letter, svg]) => [letter, createBalloonLetterGeometry(svg)]),
    ) as Record<PendoloLetter, LetterGeometry>;
  }, []);

  const foilMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#e6e8ed",
        metalness: 0.96,
        roughness: 0.055,
        specularIntensity: 1,
        specularColor: new THREE.Color("#ffffff"),
        envMapIntensity: 1.35,
        clearcoat: 1,
        clearcoatRoughness: 0.035,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      for (const { geometry } of Object.values(letterGeometries)) geometry.dispose();
      foilMaterial.dispose();
    };
  }, [letterGeometries, foilMaterial]);

  const handleExpired = (id: number) => {
    setLetters((current) => current.filter((letter) => letter.id !== id));
  };

  return (
    <>
      {letters.map((item) => (
        <BubbleSvgLetter
          key={item.id}
          item={item}
          letterGeometry={letterGeometries[item.letter]}
          foilMaterial={foilMaterial}
          simEnabled={simEnabled}
          onExpired={handleExpired}
        />
      ))}
    </>
  );
}

export function FloatingChromeSpawns() {
  const reduceMotionRef = useRef(false);
  const nextLetterIdxRef = useRef(0);
  const nextIdRef = useRef(0);
  const [letters, setLetters] = useState<BubbleLetter[]>([]);
  const [simEnabled, setSimEnabled] = useState(() =>
    typeof window !== "undefined"
      ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : true,
  );
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const drawingPlane = useMemo(() => new THREE.Plane(), []);
  const cameraForward = useMemo(() => new THREE.Vector3(), []);
  const tmpHit = useMemo(() => new THREE.Vector3(), []);
  const tmpNdc = useMemo(() => new THREE.Vector2(), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceMotionRef.current = mq.matches;
      setSimEnabled(!mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const projectToWorld = (clientX: number, clientY: number): THREE.Vector3 | null => {
      const rect = gl.domElement.getBoundingClientRect();
      if (rect.width < 16 || rect.height < 16) return null;

      const nx = THREE.MathUtils.clamp(((clientX - rect.left) / rect.width) * 2 - 1, -1.3, 1.3);
      const ny = THREE.MathUtils.clamp(-((clientY - rect.top) / rect.height) * 2 + 1, -1.3, 1.3);
      tmpNdc.set(nx, ny);

      raycaster.setFromCamera(tmpNdc, camera);
      camera.getWorldDirection(cameraForward);
      drawingPlane.setFromNormalAndCoplanarPoint(cameraForward, new THREE.Vector3(0, 0, 0));

      if (!raycaster.ray.intersectPlane(drawingPlane, tmpHit)) return null;
      return tmpHit.clone();
    };

    const spawnBubbleLetter = (worldPos: THREE.Vector3) => {
      const letter = PENDOLO_SEQUENCE[nextLetterIdxRef.current % PENDOLO_SEQUENCE.length];
      nextLetterIdxRef.current++;

      const seed = Math.random() * 1000;
      const scale = 0.76 + Math.sin(seed * 0.021) * 0.05;
      const spawnPos = worldPos.clone();
      spawnPos.z += 0.08;

      setLetters((current) => {
        const next = current.length >= MAX_LETTERS ? current.slice(1) : current.slice();
        next.push({
          id: nextIdRef.current++,
          letter,
          born: performance.now(),
          pos: spawnPos.clone(),
          basePos: spawnPos,
          velocity: getHeliumVelocity(camera, seed),
          wobbleSeed: seed,
          scale,
          rotationZ: Math.sin(seed * 0.017) * 0.13,
        });
        return next;
      });
    };

    function handlePointerDown(e: PointerEvent) {
      if (reduceMotionRef.current) return;
      if (blocksChromeSpawn(e)) return;
      if (!isPointerInHeroSection(e.clientX, e.clientY)) return;

      const worldPos = projectToWorld(e.clientX, e.clientY);
      if (!worldPos) return;

      spawnBubbleLetter(worldPos);
    }

    window.addEventListener("pointerdown", handlePointerDown, { capture: true });
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown, { capture: true });
    };
  }, [camera, gl, raycaster, drawingPlane, cameraForward, tmpHit, tmpNdc]);

  return <BubbleSvgLetters letters={letters} setLetters={setLetters} simEnabled={simEnabled} />;
}
