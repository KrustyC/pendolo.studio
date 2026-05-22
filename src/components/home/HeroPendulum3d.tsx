import HeroPendulumCanvas from "./heroPendulum3d/HeroPendulumCanvas";

/**
 * Full-bleed WebGL layer behind hero copy. Loaded synchronously so layout and
 * pendulum updates always match the main bundle (lazy chunks can appear “stuck” in dev).
 */
const HeroPendulum3d = () => (
  <div
    className="pointer-events-none absolute inset-y-0 -left-[24vw] z-0 min-h-full w-[132vw] overflow-hidden md:-left-[16vw] md:w-[124vw] lg:-left-[10vw] lg:w-[116vw]"
    aria-hidden
  >
    <HeroPendulumCanvas />
  </div>
);

export default HeroPendulum3d;
