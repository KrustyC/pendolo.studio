/** Scene / CSS background */
export const HERO_PENDULUM_BG = "#F25C3D";

/** World-space rotation pivot — kept high so the wire runs off the top of the view */
export const PENDULUM_PIVOT: [number, number, number] = [-1.72, 3.38, 0];

/** Cylinder length from pivot down toward bob attachment */
export const PENDULUM_ROD_LENGTH = 3.62;

export const PENDULUM_BOB_RADIUS = 0.36;

/** Pivot to bob center — used by physics and shadow placement */
export const PENDULUM_ARM =
  PENDULUM_ROD_LENGTH + PENDULUM_BOB_RADIUS * 0.85;

export type PendulumSim = {
  theta: number;
  omega: number;
  t: number;
};

export function createPendulumSim(): PendulumSim {
  return { theta: 0.06, omega: 0, t: 0 };
}

type StepArgs = {
  dt: number;
  mouseSmoothedNdcX: number;
  mouseImpulse: number;
};

/** Gravity pendulum + damping + slow periodic drive + soft mouse bias + impulse */
export function stepPendulum(sim: PendulumSim, { dt, mouseSmoothedNdcX, mouseImpulse }: StepArgs): void {
  const dtClamped = Math.min(Math.max(dt, 0), 1 / 30);

  const g = 9.82;
  const length = PENDULUM_ARM;
  const damping = 0.52;
  const driveOmega = 0.38;
  const driveAmp = 0.32;
  const driveOmega2 = 0.53;
  const driveAmp2 = 0.05;
  /** radians — how far cursor can shift the virtual equilibrium */
  const mouseMaxBias = 0.78;
  /** spring toward that equilibrium (higher = snappier cursor pull) */
  const mouseSpring = 0.46;
  const driveMix = 0.2;

  sim.t += dtClamped;

  const clampedMouse = Math.max(-1, Math.min(1, mouseSmoothedNdcX));
  const equilibriumBias = clampedMouse * mouseMaxBias;

  const drive =
    driveAmp * Math.sin(driveOmega * sim.t + 0.25) +
    driveAmp2 * Math.sin(driveOmega2 * sim.t * 1.031 + 0.9);

  const pendulum = -(g / length) * Math.sin(sim.theta);
  const drag = -damping * sim.omega;
  const driveTorque = driveMix * drive;
  const mouseTorque = -mouseSpring * (sim.theta - equilibriumBias);
  const impulseTorque = mouseImpulse * 8.6;

  const alpha = pendulum + drag + driveTorque + mouseTorque + impulseTorque;
  sim.omega += alpha * dtClamped;
  sim.theta += sim.omega * dtClamped;
}
