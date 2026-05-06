import { useEffect, useRef, useState } from "react";

const SIZE = 28;

/**
 * Site-wide custom cursor: small frosted disc with difference blending so it stays visible on any background.
 * Disabled on coarse pointers and when the user prefers reduced motion.
 */
export function GlassCursor() {
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const [xy, setXy] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const flush = () => {
      raf.current = 0;
      const { x, y } = pos.current;
      setXy({ x, y });
    };

    const onPointerMove = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (raf.current === 0) {
        raf.current = requestAnimationFrame(flush);
      }
    };

    const sync = () => {
      window.removeEventListener("pointermove", onPointerMove);
      const ok = fine.matches && !reduceMotion.matches;
      setActive(ok);
      document.documentElement.classList.toggle("glass-cursor-on", ok);
      if (ok) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
      } else if (raf.current) {
        cancelAnimationFrame(raf.current);
        raf.current = 0;
      }
    };

    sync();
    fine.addEventListener("change", sync);
    reduceMotion.addEventListener("change", sync);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      fine.removeEventListener("change", sync);
      reduceMotion.removeEventListener("change", sync);
      document.documentElement.classList.remove("glass-cursor-on");
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      aria-hidden
      className="glass-cursor-root"
      style={{
        width: SIZE,
        height: SIZE,
        transform: `translate3d(${xy.x}px, ${xy.y}px, 0) translate(-50%, -50%)`,
      }}
    />
  );
}
