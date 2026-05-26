import { type MutableRefObject,useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh, MeshBasicMaterial } from "three";
import {
  CanvasTexture,
  ClampToEdgeWrapping,
  MathUtils,
  NormalBlending,
  SRGBColorSpace,
} from "three";

import {
  PENDULUM_ARM,
  PENDULUM_BOB_RADIUS,
  PENDULUM_PIVOT,
  type PendulumSim,
} from "./pendulumMotion";

const SHADOW_GAP_BELOW_BOB = 0.07;
export const SHADOW_FLOOR_Y =
  PENDULUM_PIVOT[1] - PENDULUM_ARM - PENDULUM_BOB_RADIUS - SHADOW_GAP_BELOW_BOB;

// Destructured once at module level — all constants, never change
const [PIVOT_X, PIVOT_Y, PIVOT_Z] = PENDULUM_PIVOT;
const ARM = PENDULUM_ARM;

function makeSoftShadowTexture(): CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new CanvasTexture(canvas);

  const cx = size / 2;
  const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx * 0.92);
  g.addColorStop(0, "rgba(26, 26, 26, 0.42)");
  g.addColorStop(0.35, "rgba(42, 42, 42, 0.14)");
  g.addColorStop(0.65, "rgba(64, 64, 64, 0.04)");
  g.addColorStop(1, "rgba(128, 128, 128, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  const tex = new CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = ClampToEdgeWrapping;
  tex.colorSpace = SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export function FakeSoftShadowPlane({
  simRef,
  bobRadius,
  foucaultAngleRef,
}: {
  simRef: MutableRefObject<PendulumSim>;
  bobRadius: number;
  /** Current Foucault swing-plane Y-rotation angle (radians). */
  foucaultAngleRef: MutableRefObject<number>;
}) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshBasicMaterial>(null);
  const map = useMemo(() => makeSoftShadowTexture(), []);

  useEffect(() => () => map.dispose(), [map]);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;

    const { theta } = simRef.current;

    // Horizontal displacement of the bob in the foucault group's local space.
    const localX = ARM * Math.sin(theta);

    // Three.js Y-rotation φ maps local +X toward world -Z:
    //   world_x = localX · cos(φ)
    //   world_z = −localX · sin(φ)
    const phi = foucaultAngleRef.current;
    const bx = PIVOT_X + localX * Math.cos(phi);
    const bz = PIVOT_Z - localX * Math.sin(phi);

    const by = PIVOT_Y - ARM * Math.cos(theta);
    const shadowToBob = Math.max(0, by - bobRadius - SHADOW_FLOOR_Y);

    meshRef.current.position.set(bx, SHADOW_FLOOR_Y, bz);
    meshRef.current.scale.setScalar(1 + shadowToBob * 0.18);
    materialRef.current.opacity = MathUtils.clamp(
      0.82 - shadowToBob * 0.22,
      0.28,
      0.82
    );
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} renderOrder={0}>
      <planeGeometry args={[1.85, 1.85]} />
      <meshBasicMaterial
        ref={materialRef}
        map={map}
        transparent
        depthWrite={false}
        depthTest
        toneMapped={false}
        blending={NormalBlending}
        polygonOffset
        polygonOffsetFactor={2}
        polygonOffsetUnits={2}
      />
    </mesh>
  );
}
