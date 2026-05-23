"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { Texture } from "three";
import { PMREMGenerator } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

import { Scene } from "./Scene";
import { useHeroPendulumMouse } from "./useHeroPendulumMouse";

// Idempotent and context-free — safe to call once at module load
RectAreaLightUniformsLib.init();

export default function HeroPendulumCanvas() {
  const mouse = useHeroPendulumMouse();
  const envTextureRef = useRef<Texture | null>(null);
  const [canvasKey, setCanvasKey] = useState(0);
  // Stays false until onCreated fires — drives the CSS fade-in so the
  // canvas is never seen mid-initialization (no reflections, wrong camera).
  // Not reset on context-loss remounts: recovery should feel instant.
  const [ready, setReady] = useState(false);

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
    const pmrem = new PMREMGenerator(gl);
    const env = pmrem.fromScene(roomEnv, 0.04).texture;
    roomEnv.dispose(); // free internal geometries/materials
    pmrem.dispose();

    envTextureRef.current = env;
    scene.environment = env;
    scene.environmentIntensity = 0.9;

    // Everything is ready — trigger the fade-in.
    setReady(true);

    // Next.js App Router keeps the home page's component tree alive in the
    // DOM during soft navigation (it reconciles rather than unmounts). When
    // the browser hides the canvas element the GPU may reclaim the WebGL
    // context, firing `webglcontextlost`. R3F's `onCreated` never re-fires
    // on reconciliation, so the canvas stays blank on navigate-back.
    //
    // Fix: on context loss, bump `canvasKey` so React tears down the old
    // Canvas and mounts a fresh one — triggering a new `onCreated` with a
    // live context. `{ once: true }` avoids repeated listeners across the
    // remount cycle (each new Canvas registers its own listener).
    gl.domElement.addEventListener(
      "webglcontextlost",
      (e: Event) => {
        e.preventDefault(); // suppress browser's default "do not restore" behavior
        setCanvasKey((k) => k + 1);
      },
      { once: true }
    );
  }, []);

  return (
    <Canvas
      key={canvasKey}
      className={`h-full w-full touch-none transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
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
