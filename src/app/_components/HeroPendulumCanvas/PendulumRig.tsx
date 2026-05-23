import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  createPendulumSim,
  PENDULUM_BOB_RADIUS,
  PENDULUM_PIVOT,
  PENDULUM_ROD_LENGTH,
  stepPendulum,
} from "./pendulumMotion";
import { type HeroPendulumMouseApi } from "./useHeroPendulumMouse";
import { FakeSoftShadowPlane } from "./FakeSoftShadowPlane";

export function PendulumRig({ mouse }: { mouse: HeroPendulumMouseApi }) {
  const swing = useRef<THREE.Group>(null);
  const sim = useRef(createPendulumSim());
  // Read synchronously so frame 1 already respects the OS preference
  const reduceMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceMotion.current = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useFrame((_, delta) => {
    if (!swing.current) return;
    if (reduceMotion.current) {
      swing.current.rotation.z = sim.current.theta;
      // Drain impulse so it doesn't accumulate and burst when reduced-motion is toggled off
      mouse.takeImpulse();
      return;
    }
    mouse.tick(delta);
    stepPendulum(sim.current, {
      dt: delta,
      mouseSmoothedNdcX: mouse.smoothedNdcX(),
      mouseImpulse: mouse.takeImpulse(),
    });
    swing.current.rotation.z = sim.current.theta;
  });

  return (
    <>
      <FakeSoftShadowPlane simRef={sim} bobRadius={PENDULUM_BOB_RADIUS} />
      <group position={PENDULUM_PIVOT}>
        <group ref={swing}>
          <mesh position={[0, -PENDULUM_ROD_LENGTH / 2, 0]} renderOrder={10}>
            <cylinderGeometry
              args={[0.0045, 0.0045, PENDULUM_ROD_LENGTH, 8]}
            />
            <meshPhysicalMaterial
              color="#2a2a2a"
              roughness={0.35}
              metalness={0.75}
              envMapIntensity={0.48}
            />
          </mesh>
          <mesh
            position={[0, -PENDULUM_ROD_LENGTH - PENDULUM_BOB_RADIUS * 0.85, 0]}
            renderOrder={10}
          >
            <sphereGeometry args={[PENDULUM_BOB_RADIUS, 24, 24]} />
            <meshPhysicalMaterial
              color="#e8eaef"
              roughness={0.02}
              metalness={1.0}
              envMapIntensity={1.1}
            />
          </mesh>
        </group>
      </group>
    </>
  );
}
