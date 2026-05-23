import { CanvasTexture } from "three";

import { LETTER_SVGS } from "./FloatingChromeSpawns.constants";
import type { PendoloLetter } from "./FloatingChromeSpawns.types";

const TEX_SIZE = 256;

/**
 * Renders a single SVG letter to a canvas with a chrome foil gradient, then
 * clips the gradient to the letter shape via destination-in compositing.
 * No SVGLoader, no ExtrudeGeometry — just a canvas + Blob URL.
 */
async function buildLetterTexture(svgMarkup: string): Promise<CanvasTexture> {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new CanvasTexture(canvas);

  // Chrome foil gradient — off-centre highlight mimics a convex balloon surface
  const grad = ctx.createRadialGradient(
    TEX_SIZE * 0.37,
    TEX_SIZE * 0.32,
    2,
    TEX_SIZE * 0.5,
    TEX_SIZE * 0.5,
    TEX_SIZE * 0.56
  );
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.15, "#f0f2f5");
  grad.addColorStop(0.45, "#d0d2d8");
  grad.addColorStop(0.75, "#b0b3bc");
  grad.addColorStop(1, "#858890");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);

  // Parse viewBox to preserve each letter's natural aspect ratio
  const vbNums =
    (svgMarkup.match(/viewBox="([^"]+)"/) ?? [])[1]
      ?.split(/[\s,]+/)
      .map(Number) ?? [];
  const svgW = vbNums[2] ?? 100;
  const svgH = vbNums[3] ?? 100;
  const aspect = svgW / svgH;

  const pad = TEX_SIZE * 0.08;
  const avail = TEX_SIZE - pad * 2;
  const dw = aspect >= 1 ? avail : avail * aspect;
  const dh = aspect >= 1 ? avail / aspect : avail;
  const dx = (TEX_SIZE - dw) / 2;
  const dy = (TEX_SIZE - dh) / 2;

  // Load SVG as an image via a Blob URL, then clip the gradient to the letter
  await new Promise<void>((resolve) => {
    const blob = new Blob([svgMarkup], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.globalCompositeOperation = "source-over";
      URL.revokeObjectURL(url);
      // Subtle upper-left shine on top of clipped shape
      const shine = ctx.createRadialGradient(
        TEX_SIZE * 0.37,
        TEX_SIZE * 0.3,
        0,
        TEX_SIZE * 0.37,
        TEX_SIZE * 0.3,
        TEX_SIZE * 0.28
      );
      shine.addColorStop(0, "rgba(255,255,255,0.45)");
      shine.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = shine;
      ctx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);
      resolve();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve();
    };
    img.src = url;
  });

  const tex = new CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/** Builds all seven letter textures in parallel. Call once on component mount. */
export async function createAllLetterTextures(): Promise<
  Record<PendoloLetter, CanvasTexture>
> {
  const pairs = await Promise.all(
    Object.entries(LETTER_SVGS).map(async ([letter, svg]) => [
      letter,
      await buildLetterTexture(svg),
    ])
  );
  return Object.fromEntries(pairs) as Record<PendoloLetter, CanvasTexture>;
}
