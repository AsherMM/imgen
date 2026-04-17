import { NextResponse } from 'next/server';
import { createClient } from '@/src/lib/supabase/server';
import { db } from '@/src/lib/db';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  // Verify the key belongs to this user
  const key = await db.apiKey.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!key) {
    return NextResponse.json({ error: 'API key not found' }, { status: 404 });
  }

  if (key.userId !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await db.apiKey.delete({ where: { id } });

  return NextResponse.json({ deleted: true });
}