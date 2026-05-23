import { useCallback, useEffect, useRef } from "react";

const IMPULSE_PER_PX = 0.00042;
/** Lower = pendulum biases toward cursor X sooner (still low-pass filtered for stability). */
const SMOOTH_TAU_SEC = 0.09;

export type HeroPendulumMouseApi = {
  /** Call once per frame before reading values */
  tick: (dt: number) => void;
  smoothedNdcX: () => number;
  /** Torque impulse from horizontal pointer movement (consumed) */
  takeImpulse: () => number;
};

/**
 * Tracks pointer in normalized device coordinates (-1..1 horizontal).
 * Smoothed X feeds a soft force; raw horizontal delta accumulates impulse.
 */
export function useHeroPendulumMouse(): HeroPendulumMouseApi {
  const targetNdcX = useRef(0);
  const smoothNdcX = useRef(0);
  const impulseBank = useRef(0);
  const lastClientX = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      targetNdcX.current = (e.clientX / w) * 2 - 1;
      if (lastClientX.current != null) {
        impulseBank.current +=
          (e.clientX - lastClientX.current) * IMPULSE_PER_PX;
      }
      lastClientX.current = e.clientX;
    };

    const onLeave = () => {
      lastClientX.current = null;
      targetNdcX.current = 0; // reset bias so pendulum returns to centre when cursor leaves
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    // pointerleave does not bubble — fires only when the cursor exits the document,
    // unlike pointerout which fires on every child-element boundary crossing.
    window.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const tick = useCallback((dt: number) => {
    const k = 1 - Math.exp(-dt / SMOOTH_TAU_SEC);
    smoothNdcX.current += (targetNdcX.current - smoothNdcX.current) * k;
  }, []);

  const smoothedNdcX = useCallback(() => smoothNdcX.current, []);

  const takeImpulse = useCallback(() => {
    const v = impulseBank.current;
    impulseBank.current = 0;
    return v;
  }, []);

  return { tick, smoothedNdcX, takeImpulse };
}
