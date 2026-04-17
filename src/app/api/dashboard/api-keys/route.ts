import { NextResponse } from 'next/server';
import { createClient } from '@/src/lib/supabase/server';
import { db } from '@/src/lib/db';
import { generateApiKey } from '@/src/lib/api-keys';

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const keys = await db.apiKey.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      prefix: true,
      lastUsedAt: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ keys });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name = body.name?.trim();
  if (!name) {
    return NextResponse.json({ error: 'Key name is required' }, { status: 400 });
  }

  if (name.length > 100) {
    return NextResponse.json({ error: 'Key name must be under 100 characters' }, { status: 400 });
  }

  // Check max keys limit (10 per user)
  const existingCount = await db.apiKey.count({ where: { userId: user.id } });
  if (existingCount >= 10) {
    return NextResponse.json(
      { error: 'Maximum of 10 API keys per account. Delete an existing key first.' },
      { status: 400 },
    );
  }

  // Generate the key
  const { rawKey, prefix, hashedKey } = generateApiKey();

  const key = await db.apiKey.create({
    data: {
      userId: user.id,
      name,
      key: hashedKey,
      prefix,
    },
    select: {
      id: true,
      name: true,
      prefix: true,
      lastUsedAt: true,
      createdAt: true,
    },
  });

  // Return rawKey only this one time
  return NextResponse.json({ key, rawKey }, { status: 201 });
}