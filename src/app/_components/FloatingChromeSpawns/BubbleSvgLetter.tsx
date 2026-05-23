"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { BufferGeometry, Group, Material } from "three";

import { BubbleLetter } from "./FloatingChromeSpawns.types";

const WOBBLE_AMP_X = 0.05;
const WOBBLE_AMP_Y = 0.02;
const WOBBLE_AMP_Z = 0.04;
const CULL_Y_TOP = 4.6;
const CULL_RADIUS_SQ = 81;

type LetterGeometry = {
  geometry: BufferGeometry;
  width: number;
  height: number;
};

interface BubbleSvgLetterProps {
  item: BubbleLetter;
  letterGeometry: LetterGeometry;
  foilMaterial: Material;
  simEnabled: boolean;
  onExpired: (id: number) => void;
}

export const BubbleSvgLetter: React.FC<BubbleSvgLetterProps> = ({
  item,
  letterGeometry,
  foilMaterial,
  simEnabled,
  onExpired,
}) => {
  const groupRef = useRef<Group>(null);
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
      item.pos.x =
        item.basePos.x +
        Math.sin(phase * 1.6 + item.wobbleSeed * 0.31) * WOBBLE_AMP_X;
      item.pos.y =
        item.basePos.y +
        Math.sin(phase * 1.25 + item.wobbleSeed * 0.19) * WOBBLE_AMP_Y;
      item.pos.z =
        item.basePos.z +
        Math.cos(phase * 1.9 + item.wobbleSeed * 0.43) * WOBBLE_AMP_Z;
      item.rotationZ += Math.sin(phase * 1.35 + item.wobbleSeed) * 0.003;

      if (
        !expiredRef.current &&
        (item.basePos.y > CULL_Y_TOP ||
          item.basePos.lengthSq() > CULL_RADIUS_SQ)
      ) {
        expiredRef.current = true;
        onExpired(item.id);
      }
    }

    const pulse =
      1 + Math.sin((now - item.born) * 0.005 + item.wobbleSeed) * 0.018;
    group.position.copy(item.pos);
    group.rotation.set(-0.08, 0.13, item.rotationZ);
    group.scale.set(
      item.scale * pulse,
      item.scale * (2 - pulse),
      item.scale * 1.15
    );
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
};
