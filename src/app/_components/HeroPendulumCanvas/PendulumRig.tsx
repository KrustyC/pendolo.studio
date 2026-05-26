import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import type { Group } from "three";

import { FakeSoftShadowPlane } from "./FakeSoftShadowPlane";
import {
  FOUCAULT_OMEGA,
  getSansepolcroFoucaultAngle,
} from "./foucaultPrecession";
import {
  createPendulumSim,
  PENDULUM_ARM,
  PENDULUM_BOB_RADIUS,
  PENDULUM_PIVOT,
  PENDULUM_ROD_LENGTH,
  stepPendulum,
} from "./pendulumMotion";
import { type HeroPendulumMouseApi } from "./useHeroPendulumMouse";

/** Scratch vector reused every frame — avoids per-frame allocation. */
const _bobV = new Vector3();

/**
 * Screen-radius (NDC) within which a moving cursor counts as a "hit".
 * Slightly larger than the visual bob so the interaction feels forgiving.
 */
const HIT_RADIUS = 0.20;
const HIT_RADIUS_SQ = HIT_RADIUS * HIT_RADIUS;

/**
 * Maps cursor speed (NDC/s) to torque impulse.
 * Kept low so a casual pass nudges the bob; only a fast swipe gives a big kick.
 */
const HIT_IMPULSE_SCALE = 0.7;

export function PendulumRig({ mouse }: { mouse: HeroPendulumMouseApi }) {
  const swing = useRef<Group>(null);
  /** Outer group that carries the Foucault swing-plane orientation (Y rotation). */
  const foucaultGroup = useRef<Group>(null);
  /**
   * Scalar mirror of foucaultGroup.rotation.y — passed to FakeSoftShadowPlane
   * so it can correct the shadow world position without holding a Group ref.
   */
  const foucaultAngleRef = useRef<number>(0);

  const sim = useRef(createPendulumSim());

  // Read synchronously so frame 1 already respects the OS preference.
  const reduceMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  /** Whether the cursor was inside the bob last frame — used for entry detection. */
  const wasInsideBob = useRef(false);

  // Set the Sansepolcro-correct initial swing-plane orientation on mount.
  useEffect(() => {
    const angle = getSansepolcroFoucaultAngle();
    if (foucaultGroup.current) foucaultGroup.current.rotation.y = angle;
    foucaultAngleRef.current = angle;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { reduceMotion.current = mq.matches; };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useFrame((state, delta) => {
    if (!swing.current || !foucaultGroup.current) return;

    const dtClamped = Math.min(Math.max(delta, 0), 1 / 30);

    // Advance Foucault precession every frame.
    // Northern hemisphere → clockwise from above → negative Y in Three.js.
    foucaultGroup.current.rotation.y -= FOUCAULT_OMEGA * dtClamped;
    foucaultAngleRef.current = foucaultGroup.current.rotation.y;

    // Always drain delta so it doesn't accumulate across a reduced-motion pause.
    const { dx: dndcX } = mouse.takeNdcDelta();

    if (reduceMotion.current) {
      swing.current.rotation.z = sim.current.theta;
      return;
    }

    const phi   = foucaultAngleRef.current;
    const theta = sim.current.theta;

    // ── Hit detection ───────────────────────────────────────────────────────
    // Project the bob's world position into NDC to test against the cursor.
    _bobV.set(
      PENDULUM_PIVOT[0] + PENDULUM_ARM * Math.sin(theta) * Math.cos(phi),
      PENDULUM_PIVOT[1] - PENDULUM_ARM * Math.cos(theta),
      PENDULUM_PIVOT[2] - PENDULUM_ARM * Math.sin(theta) * Math.sin(phi)
    ).project(state.camera);

    const { x: ndcX, y: ndcY } = mouse.ndc();
    const ddx = ndcX - _bobV.x;
    const ddy = ndcY - _bobV.y;
    const inside = ddx * ddx + ddy * ddy < HIT_RADIUS_SQ;

    let mouseImpulse = 0;
    if (inside && !wasInsideBob.current) {
      // Cursor just entered the bob — use horizontal NDC speed as the impulse.
      // The swing is mostly left-right from the camera, so dndcX is a good proxy.
      mouseImpulse = (dndcX / dtClamped) * HIT_IMPULSE_SCALE;
    }
    wasInsideBob.current = inside;

    stepPendulum(sim.current, { dt: delta, mouseImpulse });
    swing.current.rotation.z = sim.current.theta;
  });

  return (
    <>
      <FakeSoftShadowPlane
        simRef={sim}
        bobRadius={PENDULUM_BOB_RADIUS}
        foucaultAngleRef={foucaultAngleRef}
      />
      <group position={PENDULUM_PIVOT}>
        {/* Foucault group — carries the slow swing-plane azimuth (Y rotation). */}
        <group ref={foucaultGroup}>
          {/* Swing group — oscillates within the current swing plane (Z rotation). */}
          <group ref={swing}>
            <mesh position={[0, -PENDULUM_ROD_LENGTH / 2, 0]} renderOrder={10}>
              <cylinderGeometry args={[0.0045, 0.0045, PENDULUM_ROD_LENGTH, 8]} />
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
      </group>
    </>
  );
}
