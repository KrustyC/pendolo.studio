"use client";

import dynamic from "next/dynamic";

const HeroPendulumCanvas = dynamic(() => import("./HeroPendulumCanvas"), {
  ssr: false,
});

export const HeroPendulum3d = () => (
  <div
    className="pointer-events-none absolute inset-y-0 left-0 z-0 min-h-full w-[132vw] overflow-hidden md:-left-[16vw] md:w-[124vw] lg:-left-[10vw] lg:w-[116vw]"
    aria-hidden
  >
    <HeroPendulumCanvas />
  </div>
);
