"use client";

import { type MutableRefObject, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { FloatingChromeSpawns } from "../FloatingChromeSpawns/FloatingChromeSpawns";
import {
  createPendulumSim,
  HERO_PENDULUM_BG,
  PENDULUM_ARM,
  PENDULUM_BOB_RADIUS,
  PENDULUM_PIVOT,
  PENDULUM_ROD_LENGTH,
  type PendulumSim,
  stepPendulum,
} from "./pendulumMotion";
import {
  type HeroPendulumMouseApi,
  useHeroPendulumMouse,
} from "./useHeroPendulumMouse";

const BG = new THREE.Color(HERO_PENDULUM_BG);

function makeSoftShadowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }
  const cx = size / 2;
  const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx * 0.92);
  g.addColorStop(0, "rgba(26, 26, 26, 0.42)");
  g.addColorStop(0.35, "rgba(42, 42, 42, 0.14)");
  g.addColorStop(0.65, "rgba(64, 64, 64, 0.04)");
  g.addColorStop(1, "rgba(128, 128, 128, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function RectAreaLightInit() {
  useEffect(() => {
    RectAreaLightUniformsLib.init();
  }, []);
  return null;
}

function SceneEnvironment({ intensity = 0.82 }: { intensity?: number }) {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    scene.environment = envTexture;
    scene.environmentIntensity = intensity;

    return () => {
      envTexture.dispose();
      scene.environment = null;
    };
  }, [gl, scene, intensity]);

  return null;
}

const SHADOW_GAP_BELOW_BOB = 0.07;
const SHADOW_FLOOR_Y =
  PENDULUM_PIVOT[1] - PENDULUM_ARM - PENDULUM_BOB_RADIUS - SHADOW_GAP_BELOW_BOB;

function FakeSoftShadowPlane({
  simRef,
  bobRadius,
}: {
  simRef: MutableRefObject<PendulumSim>;
  bobRadius: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const map = useMemo(() => makeSoftShadowTexture(), []);

  useEffect(() => {
    return () => {
      map.dispose();
    };
  }, [map]);

  const h = PENDULUM_ARM;
  const [px, py, pz] = PENDULUM_PIVOT;

  useFrame(() => {
    const th = simRef.current.theta;
    const sin = Math.sin(th);
    const cos = Math.cos(th);
    const bx = px + h * sin;
    const by = py - h * cos;
    const bz = pz;
    const shadowToBob = Math.max(0, by - bobRadius - SHADOW_FLOOR_Y);
    if (!meshRef.current) return;

    meshRef.current.position.set(bx, SHADOW_FLOOR_Y, bz);
    const shadowScale = 1 + shadowToBob * 0.18;
    meshRef.current.scale.set(shadowScale, shadowScale, shadowScale);

    const material = meshRef.current.material;
    if (material instanceof THREE.MeshBasicMaterial) {
      material.opacity = THREE.MathUtils.clamp(
        0.82 - shadowToBob * 0.22,
        0.28,
        0.82
      );
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} renderOrder={0}>
      <planeGeometry args={[1.85, 1.85]} />
      <meshBasicMaterial
        map={map}
        transparent
        depthWrite={false}
        depthTest
        toneMapped={false}
        blending={THREE.NormalBlending}
        polygonOffset
        polygonOffsetFactor={2}
        polygonOffsetUnits={2}
      />
    </mesh>
  );
}

function PendulumRig({ mouse }: { mouse: HeroPendulumMouseApi }) {
  const swing = useRef<THREE.Group>(null);
  const sim = useRef<PendulumSim>(createPendulumSim());
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useFrame((_, delta) => {
    if (reduceMotion.current) {
      if (swing.current) swing.current.rotation.z = sim.current.theta;
      return;
    }
    mouse.tick(delta);
    stepPendulum(sim.current, {
      dt: delta,
      mouseSmoothedNdcX: mouse.smoothedNdcX(),
      mouseImpulse: mouse.takeImpulse(),
    });
    if (swing.current) swing.current.rotation.z = sim.current.theta;
  });

  const rodLen = PENDULUM_ROD_LENGTH;
  const bobR = PENDULUM_BOB_RADIUS;

  return (
    <>
      <FakeSoftShadowPlane simRef={sim} bobRadius={bobR} />
      <group position={PENDULUM_PIVOT}>
        <group ref={swing}>
          <mesh position={[0, -rodLen / 2, 0]} renderOrder={10}>
            <cylinderGeometry args={[0.0045, 0.0045, rodLen, 8]} />
            <meshPhysicalMaterial
              color="#2a2a2a"
              roughness={0.35}
              metalness={0.75}
              envMapIntensity={0.48}
            />
          </mesh>
          <mesh position={[0, -rodLen - bobR * 0.85, 0]} renderOrder={10}>
            <sphereGeometry args={[bobR, 24, 24]} />
            <meshPhysicalMaterial
              color="#e8eaef"
              roughness={0.045}
              metalness={0.96}
              envMapIntensity={0.95}
              clearcoat={1}
              clearcoatRoughness={0.04}
            />
          </mesh>
        </group>
      </group>
    </>
  );
}

function Scene({ mouse }: { mouse: HeroPendulumMouseApi }) {
  return (
    <>
      <RectAreaLightInit />
      <color attach="background" args={[BG]} />
      <ambientLight intensity={0.34} />
      <hemisphereLight
        color="#f5f5f5"
        groundColor="#a8a8a6"
        intensity={0.52}
        position={[0, 1, 0]}
      />
      <directionalLight
        position={[4.5, 8, 5]}
        intensity={0.95}
        color="#ffffff"
      />
      <directionalLight
        position={[-5, 5, 3]}
        intensity={0.38}
        color="#f4f6f8"
      />
      <rectAreaLight
        width={5}
        height={5}
        intensity={2.2}
        color="#ffffff"
        position={[3.2, 2.8, 3]}
        rotation={[-0.45, 0.35, 0]}
      />
      <rectAreaLight
        width={3.5}
        height={3.5}
        intensity={1.05}
        color="#f2f2f2"
        position={[-4, 1.5, 2.5]}
        rotation={[-0.4, -0.5, 0]}
      />

      <SceneEnvironment intensity={0.82} />

      <PendulumRig mouse={mouse} />
      <FloatingChromeSpawns />
    </>
  );
}

export default function HeroPendulumCanvas() {
  const mouse = useHeroPendulumMouse();
  return (
    <Canvas
      className="h-full w-full touch-none"
      frameloop="always"
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
      }}
      camera={{
        fov: 40,
        near: 0.1,
        far: 40,
        position: [3.12, 0.42, 4.35],
      }}
      onCreated={({ camera }) => {
        camera.lookAt(-0.38, -0.08, 0);
      }}
    >
      <Scene mouse={mouse} />
    </Canvas>
  );
}
