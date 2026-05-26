/**
 * Foucault pendulum precession for Sansepolcro, Italy (43.57 °N).
 *
 * A Foucault pendulum's swing plane rotates at:
 *   Ω_F = Ω_Earth × sin(latitude)
 *
 * For Sansepolcro this gives ≈ 5.020 × 10⁻⁵ rad/s, or roughly 10.3°/hour.
 * A full rotation takes ~34.8 hours (the pendulum completes ~248° in one solar day).
 *
 * In the northern hemisphere the plane rotates clockwise when viewed from above,
 * which corresponds to a decreasing (negative) Y-rotation in Three.js's
 * right-hand coordinate system.
 */

const EARTH_OMEGA = (2 * Math.PI) / 86_164.1; // rad/s — one sidereal day
const SANSEPOLCRO_LAT_RAD = (43.57 * Math.PI) / 180;

/**
 * Angular velocity of the Foucault swing plane for Sansepolcro, Italy.
 * ≈ 5.020 × 10⁻⁵ rad/s  →  ~10.3°/hr  →  full rotation in ~34.8 h
 */
export const FOUCAULT_OMEGA = EARTH_OMEGA * Math.sin(SANSEPOLCRO_LAT_RAD);

/**
 * Returns the current swing-plane angle (radians) for a Foucault pendulum
 * in Sansepolcro, Italy.
 *
 * Reference epoch: Sansepolcro midnight local time → 0 rad.
 * Sign convention: negative = clockwise from above (northern hemisphere),
 * matching Three.js −Y rotation semantics.
 *
 * Safe to call on every mount; reads the system clock once.
 */
export function getSansepolcroFoucaultAngle(): number {
  const localStr = new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" });
  const local = new Date(localStr);
  const secondsSinceMidnight =
    local.getHours() * 3600 +
    local.getMinutes() * 60 +
    local.getSeconds();
  return -(FOUCAULT_OMEGA * secondsSinceMidnight);
}
