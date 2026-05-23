"use client";

import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import type { CanvasTexture } from "three";

import { BubbleSvgLetter } from "./BubbleSvgLetter";
import { createAllLetterTextures } from "./createLetterTextures";
import {
  type BubbleLetter,
  type PendoloLetter,
} from "./FloatingChromeSpawns.types";

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
  const [textures, setTextures] = useState<Record<
    PendoloLetter,
    CanvasTexture
  > | null>(null);
  // Keep a ref so the cleanup closure always sees the latest loaded value
  const texturesRef = useRef<Record<PendoloLetter, CanvasTexture> | null>(null);

  useEffect(() => {
    let cancelled = false;

    createAllLetterTextures().then((t) => {
      if (cancelled) {
        for (const tex of Object.values(t)) tex.dispose();
        return;
      }
      texturesRef.current = t;
      setTextures(t);
    });

    return () => {
      cancelled = true;
      if (texturesRef.current) {
        for (const tex of Object.values(texturesRef.current)) tex.dispose();
        texturesRef.current = null;
      }
    };
  }, []);

  const handleExpired = (id: number) => {
    setLetters((current) => current.filter((letter) => letter.id !== id));
  };

  if (!textures) return null;

  return (
    <>
      {letters.map((item) => (
        <BubbleSvgLetter
          key={item.id}
          item={item}
          texture={textures[item.letter]}
          simEnabled={simEnabled}
          onExpired={handleExpired}
        />
      ))}
    </>
  );
};
