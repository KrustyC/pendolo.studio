"use client";

import dynamic from "next/dynamic";

const HeroPendulumCanvas = dynamic(
  () => import("./heroPendulum3d/HeroPendulumCanvas"),
  { ssr: false },
);

const HeroPendulum3d = () => (
  <div
    className="pointer-events-none absolute inset-y-0 -left-[24vw] z-0 min-h-full w-[132vw] overflow-hidden md:-left-[16vw] md:w-[124vw] lg:-left-[10vw] lg:w-[116vw]"
    aria-hidden
  >
    <HeroPendulumCanvas />
  </div>
);

export default HeroPendulum3d;
