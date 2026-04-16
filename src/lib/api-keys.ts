import { nanoid } from 'nanoid';
import crypto from 'crypto';

// Format: imgen_{prefix}_{secret}
const KEY_PREFIX_LENGTH = 8;
const KEY_SECRET_LENGTH = 32;

export function generateApiKey() {
  const prefix = nanoid(KEY_PREFIX_LENGTH);
  const secret = nanoid(KEY_SECRET_LENGTH);
  const rawKey = `imgen_${prefix}_${secret}`;
  const hashedKey = hashApiKey(rawKey);

  return {
    rawKey,
    prefix,
    hashedKey,
  };
}

export function hashApiKey(rawKey: string): string {
  return crypto.createHash('sha256').update(rawKey).digest('hex');
}

export function maskApiKey(prefix: string): string {
  return `imgen_${prefix}_${'*'.repeat(8)}...${'*'.repeat(4)}`;
}

import { db } from '@/src/lib/db';

export async function verifyApiKey(rawKey: string) {
  if (!rawKey.startsWith('imgen_')) return null;

  const hashedKey = hashApiKey(rawKey);

  const apiKey = await db.apiKey.findUnique({
    where: { key: hashedKey },
    include: { user: true },
  });

  if (!apiKey) return null;

  // Update lastUsedAt (fire and forget)
  db.apiKey
    .update({
      where: { id: apiKey.id },
      data: { lastUsedAt: new Date() },
    })
    .catch(() => {});

  return apiKey;
}