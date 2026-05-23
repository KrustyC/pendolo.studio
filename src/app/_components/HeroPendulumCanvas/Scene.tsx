import { Color } from "three";

import { FloatingChromeSpawns } from "../FloatingChromeSpawns/FloatingChromeSpawns";

import { HERO_PENDULUM_BG } from "./pendulumMotion";
import { PendulumRig } from "./PendulumRig";
import { type HeroPendulumMouseApi } from "./useHeroPendulumMouse";

const BG = new Color(HERO_PENDULUM_BG);

export function Scene({ mouse }: { mouse: HeroPendulumMouseApi }) {
  return (
    <>
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
      <PendulumRig mouse={mouse} />
      <FloatingChromeSpawns />
    </>
  );
}
