import { useCallback, useEffect, useRef } from "react";

export type HeroPendulumMouseApi = {
  /** Current pointer position in NDC (-1..1, Y-up). */
  ndc: () => { x: number; y: number };
  /**
   * Accumulated NDC displacement since the last call (consumed).
   * Uses NDC convention on both axes (Y-up). Returns {0,0} when the
   * pointer hasn't moved or has left the window.
   */
  takeNdcDelta: () => { dx: number; dy: number };
};

/**
 * Minimal pointer tracker — exposes current NDC position and the accumulated
 * NDC displacement since the last frame. No smoothing or impulse math here;
 * callers project onto whatever axis they need (e.g. the Foucault swing axis).
 */
export function useHeroPendulumMouse(): HeroPendulumMouseApi {
  const curX = useRef(0);   // current NDC X
  const curY = useRef(0);   // current NDC Y
  const dxAcc = useRef(0);  // accumulated NDC Δx (consumed per frame)
  const dyAcc = useRef(0);  // accumulated NDC Δy (consumed per frame)
  const tracking = useRef(false); // false while pointer is outside the window

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const nx = (e.clientX / w) * 2 - 1;
      const ny = -(e.clientY / h) * 2 + 1; // flip to NDC Y-up

      if (tracking.current) {
        dxAcc.current += nx - curX.current;
        dyAcc.current += ny - curY.current;
      }

      curX.current = nx;
      curY.current = ny;
      tracking.current = true;
    };

    const onLeave = () => {
      tracking.current = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    // pointerleave does not bubble — fires only when the cursor exits the document.
    window.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const ndc = useCallback(() => ({ x: curX.current, y: curY.current }), []);

  const takeNdcDelta = useCallback(() => {
    const dx = dxAcc.current;
    const dy = dyAcc.current;
    dxAcc.current = 0;
    dyAcc.current = 0;
    return { dx, dy };
  }, []);

  return { ndc, takeNdcDelta };
}
