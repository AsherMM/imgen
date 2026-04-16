import { db } from '@/src/lib/db';
import { PLANS } from '@/src/config/plans';
import type { Plan } from '@prisma/client';

function getCurrentPeriod(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export async function getCurrentUsage(userId: string) {
  const period = getCurrentPeriod();

  const usage = await db.usage.findUnique({
    where: {
      userId_period: { userId, period },
    },
  });

  return usage?.imagesCount ?? 0;
}

export async function incrementUsage(userId: string) {
  const period = getCurrentPeriod();

  const usage = await db.usage.upsert({
    where: {
      userId_period: { userId, period },
    },
    update: {
      imagesCount: { increment: 1 },
    },
    create: {
      userId,
      period,
      imagesCount: 1,
    },
  });

  return usage.imagesCount;
}

export async function checkUsageLimit(userId: string, plan: Plan) {
  const currentCount = await getCurrentUsage(userId);
  const planKey = plan.toLowerCase() as keyof typeof PLANS;
  const planConfig = PLANS[planKey];
  const limit = planConfig?.imagesPerMonth ?? 50;

  return {
    currentCount,
    limit,
    remaining: Math.max(0, limit - currentCount),
    exceeded: currentCount >= limit,
  };
}