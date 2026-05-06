import { useLayoutEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import {
  createPendulumSim,
  HERO_PENDULUM_BG,
  PENDULUM_ARM,
  PENDULUM_BOB_RADIUS,
  PENDULUM_PIVOT,
  PENDULUM_ROD_LENGTH,
  stepPendulum,
  type PendulumSim,
} from "./pendulumMotion";
import { useHeroPendulumMouse, type HeroPendulumMouseApi } from "./useHeroPendulumMouse";

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
  const gl = useThree((s) => s.gl);
  useLayoutEffect(() => {
    RectAreaLightUniformsLib.init(gl);
  }, [gl]);
  return null;
}

/** Procedural studio-style reflections (no external HDR fetch). */
function StudioEnvironment() {
  const { gl, scene } = useThree();
  useLayoutEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const rt = pmrem.fromScene(new RoomEnvironment(), 0.018);
    scene.environment = rt.texture;
    return () => {
      scene.environment = null;
      rt.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

const SHADOW_GAP_BELOW_BOB = 0.07;

/** Soft contact-style shadow: tracks bob in XZ, sits just under the sphere in world Y */
function FakeSoftShadowPlane({
  simRef,
  bobRadius,
}: {
  simRef: MutableRefObject<PendulumSim>;
  bobRadius: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const map = useMemo(() => makeSoftShadowTexture(), []);

  useLayoutEffect(() => {
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
    const shadowY = by - bobRadius - SHADOW_GAP_BELOW_BOB;
    if (meshRef.current) {
      meshRef.current.position.set(bx, shadowY, bz);
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

  useLayoutEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame((_, delta) => {
    if (reduceMotion.current) {
      if (swing.current) swing.current.rotation.z = sim.current.theta;
      return;
    }
    const dt = delta;
    mouse.tick(dt);
    stepPendulum(sim.current, {
      dt,
      mouseSmoothedNdcX: mouse.smoothedNdcX(),
      mouseImpulse: mouse.takeImpulse(),
    });
    if (swing.current) swing.current.rotation.z = sim.current.theta;
  });

  const rodLen = PENDULUM_ROD_LENGTH;
  const bobR = PENDULUM_BOB_RADIUS;

  return (
    <>
      {/* Shadow first + lower renderOrder so it reads as ground under the bob */}
      <FakeSoftShadowPlane simRef={sim} bobRadius={bobR} />
      <group position={PENDULUM_PIVOT}>
        <group ref={swing}>
          <mesh position={[0, -rodLen / 2, 0]} renderOrder={10}>
            <cylinderGeometry args={[0.0045, 0.0045, rodLen, 8]} />
            <meshPhysicalMaterial
              color="#2a2a2a"
              roughness={0.35}
              metalness={0.75}
              envMapIntensity={0.55}
            />
          </mesh>
          <mesh position={[0, -rodLen - bobR * 0.85, 0]} renderOrder={10}>
            <sphereGeometry args={[bobR, 32, 32]} />
            <meshPhysicalMaterial
              color="#e8eaef"
              roughness={0.045}
              metalness={0.96}
              envMapIntensity={1.25}
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
      <hemisphereLight color="#f5f5f5" groundColor="#a8a8a6" intensity={0.52} position={[0, 1, 0]} />
      <directionalLight position={[4.5, 8, 5]} intensity={0.95} color="#ffffff" />
      <directionalLight position={[-5, 5, 3]} intensity={0.38} color="#f4f6f8" />
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

      <StudioEnvironment />

      <PendulumRig mouse={mouse} />
    </>
  );
}

function HeroPendulumCanvasInner() {
  const mouse = useHeroPendulumMouse();
  return (
    <Canvas
      className="h-full w-full touch-none"
      dpr={[1, 2]}
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

export default function HeroPendulumCanvas() {
  return <HeroPendulumCanvasInner />;
}
