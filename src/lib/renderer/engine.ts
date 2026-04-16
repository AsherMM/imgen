import satori from 'satori';
import { readFile } from 'fs/promises';
import path from 'path';
import type { ReactNode } from 'react';

// Font cache (loaded once, reused)
let fontsLoaded:
  | { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }[]
  | null = null;

function toArrayBuffer(buffer: Buffer): ArrayBuffer {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
}

async function loadFonts() {
  if (fontsLoaded) return fontsLoaded;

  try {
    const fontsDir = path.join(process.cwd(), 'public', 'fonts');

    const [interRegular, interBold] = await Promise.all([
      readFile(path.join(fontsDir, 'Inter-Regular.ttf')),
      readFile(path.join(fontsDir, 'Inter-Bold.ttf')),
    ]);

    fontsLoaded = [
      {
        name: 'Inter',
        data: toArrayBuffer(interRegular),
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: toArrayBuffer(interBold),
        weight: 700,
        style: 'normal',
      },
    ];

    return fontsLoaded;
  } catch (error) {
    throw new Error(
      `Failed to load fonts from /public/fonts. ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export type RenderOptions = {
  width?: number;
  height?: number;
  format?: 'png'; // keep PNG only for now
};

export async function renderToImage(
  element: ReactNode,
  options: RenderOptions = {},
) {
  const { width = 1200, height = 630, format = 'png' } = options;
  const startTime = Date.now();

  const fonts = await loadFonts();

  const svg = await satori(element, {
    width,
    height,
    fonts,
  });

  const { Resvg } = await import('@resvg/resvg-js');

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
  });

  const rendered = resvg.render();
  const buffer = Buffer.from(rendered.asPng());

  const renderTimeMs = Date.now() - startTime;

  return {
    buffer,
    format,
    width,
    height,
    fileSize: buffer.length,
    renderTimeMs,
  };
}