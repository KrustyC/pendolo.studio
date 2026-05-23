"use client";

import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

import { BubbleSvgLetters } from "./BubbleSvgLetters";
import { blocksChromeSpawn, isPointerInHeroSection } from "./chromeSpawnUtils";
import { BubbleLetter } from "./FloatingChromeSpawns.types";

const PENDOLO_SEQUENCE = ["p", "e", "n", "d", "o", "l", "oAlt"] as const;

const MAX_LETTERS = 12;
const RISE_SPEED = 0.54;
const FORWARD_SPEED = 0.16;
const DRIFT_SPEED = 0.06;

export const FloatingChromeSpawns = () => {
  const reduceMotionRef = useRef(false);
  const nextLetterIdxRef = useRef(0);
  const nextIdRef = useRef(0);
  const [letters, setLetters] = useState<BubbleLetter[]>([]);
  const [simEnabled, setSimEnabled] = useState(() =>
    typeof window !== "undefined"
      ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : true
  );
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);

  const raycaster = useRef(new THREE.Raycaster());
  const drawingPlane = useRef(new THREE.Plane());
  const cameraForward = useRef(new THREE.Vector3());
  const tmpHit = useRef(new THREE.Vector3());
  const tmpNdc = useRef(new THREE.Vector2());

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceMotionRef.current = mq.matches;
      setSimEnabled(!mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const projectToWorld = (
      clientX: number,
      clientY: number
    ): THREE.Vector3 | null => {
      const rect = gl.domElement.getBoundingClientRect();
      if (rect.width < 16 || rect.height < 16) return null;

      const nx = THREE.MathUtils.clamp(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -1.3,
        1.3
      );
      const ny = THREE.MathUtils.clamp(
        -((clientY - rect.top) / rect.height) * 2 + 1,
        -1.3,
        1.3
      );
      tmpNdc.current.set(nx, ny);

      raycaster.current.setFromCamera(tmpNdc.current, camera);
      camera.getWorldDirection(cameraForward.current);
      drawingPlane.current.setFromNormalAndCoplanarPoint(
        cameraForward.current,
        new THREE.Vector3(0, 0, 0)
      );

      if (!raycaster.current.ray.intersectPlane(drawingPlane.current, tmpHit.current)) return null;
      return tmpHit.current.clone();
    };

    const spawnBubbleLetter = (worldPos: THREE.Vector3) => {
      const letter =
        PENDOLO_SEQUENCE[nextLetterIdxRef.current % PENDOLO_SEQUENCE.length];
      nextLetterIdxRef.current++;

      const seed = Math.random() * 1000;
      const scale = 0.76 + Math.sin(seed * 0.021) * 0.05;
      const spawnPos = worldPos.clone();
      spawnPos.z += 0.08;

      setLetters((current) => {
        const next =
          current.length >= MAX_LETTERS ? current.slice(1) : current.slice();
        next.push({
          id: nextIdRef.current++,
          letter,
          born: performance.now(),
          pos: spawnPos.clone(),
          basePos: spawnPos,
          velocity: getHeliumVelocity(camera, seed),
          wobbleSeed: seed,
          scale,
          rotationZ: Math.sin(seed * 0.017) * 0.13,
        });
        return next;
      });
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (reduceMotionRef.current) return;
      if (blocksChromeSpawn(e)) return;
      if (!isPointerInHeroSection(e.clientX, e.clientY)) return;

      const worldPos = projectToWorld(e.clientX, e.clientY);
      if (!worldPos) return;

      spawnBubbleLetter(worldPos);
    };

    window.addEventListener("pointerdown", handlePointerDown, {
      capture: true,
    });
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown, {
        capture: true,
      });
    };
  }, [camera, gl]);

  return (
    <BubbleSvgLetters
      letters={letters}
      setLetters={setLetters}
      simEnabled={simEnabled}
    />
  );
};

function getHeliumVelocity(camera: THREE.Camera, seed: number): THREE.Vector3 {
  const horiz = new THREE.Vector3(camera.position.x, 0, camera.position.z);
  if (horiz.lengthSq() < 1e-6) {
    horiz.set(0, 0, 1);
  } else {
    horiz.normalize();
  }

  horiz.multiplyScalar(FORWARD_SPEED);

  const driftX = Math.sin(seed * 0.013 + 0.7) * DRIFT_SPEED;
  const driftZ = Math.cos(seed * 0.019 + 1.3) * DRIFT_SPEED * 0.5;
  const lift = RISE_SPEED + Math.cos(seed * 0.023) * 0.06;

  return new THREE.Vector3(horiz.x + driftX, lift, horiz.z + driftZ);
}
