import { NextResponse } from 'next/server';
import { verifyApiKey } from '@/src/lib/api-keys';
import { getRatelimiter } from '@/src/lib/redis/ratelimit';
import { checkUsageLimit } from '@/src/lib/usage';

export type AuthenticatedRequest = {
  userId: string;
  userPlan: string;
  apiKeyId: string;
};

export async function authenticateApiRequest(
  request: Request,
): Promise<AuthenticatedRequest | NextResponse> {
  // 1. Extract API key from header
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      {
        error: 'Missing or invalid Authorization header',
        message: 'Use: Authorization: Bearer imgen_xxxxx',
      },
      { status: 401 },
    );
  }

  const rawKey = authHeader.replace('Bearer ', '').trim();

  // 2. Verify the API key
  const apiKey = await verifyApiKey(rawKey);
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Invalid API key' },
      { status: 401 },
    );
  }

  const { user } = apiKey;

  // 3. Rate limiting
  const ratelimiter = getRatelimiter(user.plan);
  const { success, remaining, reset } = await ratelimiter.limit(user.id);

  if (!success) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded',
        retryAfter: Math.ceil((reset - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': String(remaining),
          'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
        },
      },
    );
  }

  // 4. Check usage limits
  const usage = await checkUsageLimit(user.id, user.plan);
  if (usage.exceeded) {
    return NextResponse.json(
      {
        error: 'Monthly image limit exceeded',
        currentCount: usage.currentCount,
        limit: usage.limit,
        message: 'Upgrade your plan for more images',
      },
      { status: 403 },
    );
  }

  return {
    userId: user.id,
    userPlan: user.plan,
    apiKeyId: apiKey.id,
  };
}