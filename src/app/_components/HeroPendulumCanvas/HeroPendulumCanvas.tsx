"use client";

import { useCallback, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { useHeroPendulumMouse } from "./useHeroPendulumMouse";
import { Scene } from "./Scene";

// Idempotent and context-free — safe to call once at module load
RectAreaLightUniformsLib.init();

export default function HeroPendulumCanvas() {
  const mouse = useHeroPendulumMouse();
  const envTextureRef = useRef<THREE.Texture | null>(null);

  useEffect(() => {
    return () => {
      envTextureRef.current?.dispose();
    };
  }, []);

  const handleCreated = useCallback(({ camera, gl, scene }) => {
    camera.lookAt(-0.38, -0.08, 0);

    // Build the IBL environment synchronously before frame 1 so the
    // metallic sphere never renders a single frame without reflections.
    const roomEnv = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(roomEnv, 0.04).texture;
    roomEnv.dispose(); // free internal geometries/materials
    pmrem.dispose();

    envTextureRef.current = env;
    scene.environment = env;
    scene.environmentIntensity = 0.9;
  }, []);

  return (
    <Canvas
      className="h-full w-full touch-none"
      frameloop="always"
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
      }}
      camera={{
        fov: 40,
        near: 0.1,
        far: 40,
        position: [3.12, 0.42, 4.35],
      }}
      onCreated={handleCreated}
    >
      <Scene mouse={mouse} />
    </Canvas>
  );
}
