import { NextResponse } from 'next/server';
import { getTemplate } from '@/src/lib/renderer/templates';
import { renderToImage } from '@/src/lib/renderer/engine';

export async function GET() {
  try {
    const template = getTemplate('og-basic');

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 },
      );
    }

    const vars = {
      title: 'Welcome to Pixelizea',
      subtitle: 'Generate branded images automatically via API',
      brand: 'Pixelizea',
      bgColor: '#0f172a',
      accentColor: '#6366f1',
    };

    const element = template.render(vars);
    const result = await renderToImage(element);

    return new Response(result.buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': String(result.fileSize),
        'X-Render-Time': `${result.renderTimeMs}ms`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Test generate error:', error);

    return NextResponse.json(
      {
        error: 'Generation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}