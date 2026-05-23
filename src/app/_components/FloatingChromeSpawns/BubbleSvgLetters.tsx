"use client";

import { type Dispatch, type SetStateAction, useEffect, useMemo } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

import { BubbleSvgLetter } from "./BubbleSvgLetter";
import { LETTER_SVGS } from "./FloatingChromeSpawns.constants";
import { BubbleLetter, PendoloLetter } from "./FloatingChromeSpawns.types";

type LetterGeometry = {
  geometry: THREE.BufferGeometry;
  width: number;
  height: number;
};

interface BubbleSvgLettersProps {
  letters: BubbleLetter[];
  setLetters: Dispatch<SetStateAction<BubbleLetter[]>>;
  simEnabled: boolean;
}

export const BubbleSvgLetters: React.FC<BubbleSvgLettersProps> = ({
  letters,
  setLetters,
  simEnabled,
}) => {
  const letterGeometries = useMemo(() => {
    return Object.fromEntries(
      Object.entries(LETTER_SVGS).map(([letter, svg]) => [
        letter,
        createBalloonLetterGeometry(svg),
      ])
    ) as Record<PendoloLetter, LetterGeometry>;
  }, []);

  const foilMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#e6e8ed",
        metalness: 0.96,
        roughness: 0.055,
        specularIntensity: 1,
        specularColor: new THREE.Color("#ffffff"),
        envMapIntensity: 1.35,
        clearcoat: 1,
        clearcoatRoughness: 0.035,
      }),
    []
  );

  useEffect(() => {
    return () => {
      for (const { geometry } of Object.values(letterGeometries)) {
        geometry.dispose();
      }

      foilMaterial.dispose();
    };
  }, [letterGeometries, foilMaterial]);

  const handleExpired = (id: number) => {
    setLetters((current) => current.filter((letter) => letter.id !== id));
  };

  return (
    <>
      {letters.map((item) => (
        <BubbleSvgLetter
          key={item.id}
          item={item}
          letterGeometry={letterGeometries[item.letter]}
          foilMaterial={foilMaterial}
          simEnabled={simEnabled}
          onExpired={handleExpired}
        />
      ))}
    </>
  );
};

function createBalloonLetterGeometry(svgMarkup: string): LetterGeometry {
  const loader = new SVGLoader();
  const data = loader.parse(svgMarkup);
  const geometries: THREE.BufferGeometry[] = [];

  for (const path of data.paths) {
    const shapes = SVGLoader.createShapes(path);
    for (const shape of shapes) {
      geometries.push(
        new THREE.ExtrudeGeometry(shape, {
          depth: 18,
          bevelEnabled: true,
          bevelThickness: 6.2,
          bevelSize: 5.2,
          bevelSegments: 24,
          curveSegments: 32,
        })
      );
    }
  }

  const geometry =
    mergeGeometries(geometries, false) ??
    geometries[0] ??
    new THREE.BoxGeometry(1, 1, 0.12);

  for (const extra of geometries) {
    if (extra !== geometry) {
      extra.dispose();
    }
  }

  geometry.computeBoundingBox();

  const box =
    geometry.boundingBox ??
    new THREE.Box3(
      new THREE.Vector3(-0.5, -0.5, -0.05),
      new THREE.Vector3(0.5, 0.5, 0.05)
    );

  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  geometry.translate(-center.x, -center.y, -center.z);

  const maxAxis = Math.max(size.x, size.y, 1);
  const normalizedScale = 1 / maxAxis;
  geometry.scale(normalizedScale, -normalizedScale, normalizedScale);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();

  return {
    geometry,
    width: size.x * normalizedScale,
    height: size.y * normalizedScale,
  };
}
