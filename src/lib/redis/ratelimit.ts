import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './client';

// Rate limiters par plan
// Free: 10 req/min, Starter: 60, Pro: 300, Business: 1000

export const ratelimits = {
  free: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    analytics: true,
    prefix: 'rl:free',
  }),
  starter: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '1 m'),
    analytics: true,
    prefix: 'rl:starter',
  }),
  pro: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(300, '1 m'),
    analytics: true,
    prefix: 'rl:pro',
  }),
  business: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1000, '1 m'),
    analytics: true,
    prefix: 'rl:business',
  }),
};

export function getRatelimiter(plan: string) {
  const key = plan.toLowerCase() as keyof typeof ratelimits;
  return ratelimits[key] ?? ratelimits.free;
}