"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroPendulumCanvas = dynamic(() => import("./HeroPendulumCanvas/HeroPendulumCanvas"), {
  ssr: false,
});

export const HeroClient = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Defer Three.js bundle evaluation until the main thread is idle so it
    // doesn't compete with hydration and block interactivity (kills TBT).
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => setReady(true));
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => setReady(true), 200);
      return () => clearTimeout(id);
    }
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-0 z-0 min-h-full w-[132vw] overflow-hidden md:-left-[16vw] md:w-[124vw] lg:-left-[10vw] lg:w-[116vw]"
      aria-hidden
    >
      {ready && <HeroPendulumCanvas />}
    </div>
  );
};
