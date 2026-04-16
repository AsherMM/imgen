import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticateApiRequest } from '@/src/lib/api-auth';
import { getTemplate, TEMPLATE_LIST } from '@/src/lib/renderer/templates';
import { renderToImage } from '@/src/lib/renderer/engine';
import { uploadImage, generateImageKey } from '@/src/lib/r2/helpers';
import { incrementUsage } from '@/src/lib/usage';
import { db } from '@/src/lib/db';
import { nanoid } from 'nanoid';

const GenerateSchema = z.object({
  template: z.string().min(1, 'Template ID is required'),
  variables: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .default({}),
  width: z.number().min(100).max(4096).optional(),
  height: z.number().min(100).max(4096).optional(),
  format: z.enum(['png']).default('png'),
});

export async function POST(request: Request) {
  try {
    const auth = await authenticateApiRequest(request);
    if (auth instanceof NextResponse) return auth;

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 },
      );
    }

    const parsed = GenerateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { template: templateId, variables, width, height, format } = parsed.data;

    const template = getTemplate(templateId);
    if (!template) {
      return NextResponse.json(
        {
          error: `Template "${templateId}" not found`,
          availableTemplates: TEMPLATE_LIST.map((t) => ({
            id: t.id,
            name: t.name,
            description: t.description,
          })),
        },
        { status: 404 },
      );
    }

    const mergedVars: Record<string, string | number | boolean> = {};
    for (const v of template.variables) {
      mergedVars[v.name] = variables[v.name] ?? v.default;
    }

    const element = template.render(mergedVars);
    const result = await renderToImage(element, {
      width: width ?? template.width,
      height: height ?? template.height,
      format,
    });

    const generationId = nanoid(12);
    const key = generateImageKey(auth.userId, generationId, format);

    const imageUrl = await uploadImage({
      buffer: result.buffer,
      key,
      contentType: 'image/png',
    });

    const [generation] = await Promise.all([
      db.generation.create({
        data: {
          id: generationId,
          userId: auth.userId,
          templateId,
          variables: mergedVars,
          imageUrl,
          format,
          width: result.width,
          height: result.height,
          fileSize: result.fileSize,
          renderTimeMs: result.renderTimeMs,
          source: 'api',
        },
      }),
      incrementUsage(auth.userId),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          id: generation.id,
          url: imageUrl,
          format,
          width: result.width,
          height: result.height,
          fileSize: result.fileSize,
          renderTimeMs: result.renderTimeMs,
          template: templateId,
        },
      },
      {
        headers: {
          'X-Render-Time': `${result.renderTimeMs}ms`,
        },
      },
    );
  } catch (error) {
    console.error('Generate API error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    templates: TEMPLATE_LIST.map((t) => ({
      id: t.id,
      name: t.name,
      description: t.description,
      width: t.width,
      height: t.height,
      variables: t.variables,
    })),
  });
}