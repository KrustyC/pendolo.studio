import { type Vector3 } from "three";

import { PENDOLO_SEQUENCE } from "./FloatingChromeSpawns.constants";

export type PendoloLetter = (typeof PENDOLO_SEQUENCE)[number];

export type BubbleLetter = {
  id: number;
  letter: PendoloLetter;
  born: number;
  pos: Vector3;
  basePos: Vector3;
  velocity: Vector3;
  wobbleSeed: number;
  scale: number;
  rotationZ: number;
};
