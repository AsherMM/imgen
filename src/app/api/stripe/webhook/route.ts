import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import type Stripe from 'stripe';

import { stripe } from '@/src/lib/stripe/server';
import { db } from '@/src/lib/db';
import { getPlanByStripePriceId } from '@/src/config/plans';
import type { Plan } from '@prisma/client';

function toPrismaPlan(planId: string | null | undefined): Plan {
  switch (planId) {
    case 'starter':
      return 'STARTER';
    case 'pro':
      return 'PRO';
    case 'business':
      return 'BUSINESS';
    default:
      return 'FREE';
  }
}

function getCurrentPeriodEnd(subscription: Stripe.Subscription): Date | null {
  const firstItem = subscription.items.data[0];
  if (!firstItem?.current_period_end) return null;
  return new Date(firstItem.current_period_end * 1000);
}

async function syncSubscriptionToUser(
  userId: string,
  subscription: Stripe.Subscription,
) {
  const priceId = subscription.items.data[0]?.price.id ?? null;
  const plan = priceId ? getPlanByStripePriceId(priceId) : null;
  const isActive =
    subscription.status === 'active' || subscription.status === 'trialing';

  await db.user.update({
    where: { id: userId },
    data: {
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      stripeCurrentPeriodEnd: getCurrentPeriodEnd(subscription),
      plan: isActive ? toPrismaPlan(plan?.id) : 'FREE',
    },
  });
}

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (!session.subscription) break;

        const subscriptionId =
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription.id;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        // Priority: session metadata > subscription metadata
        const userId =
          session.metadata?.userId ?? subscription.metadata?.userId ?? null;

        if (!userId) {
          console.error('No userId found in checkout.session.completed', {
            sessionId: session.id,
            subscriptionId,
          });
          break;
        }

        await syncSubscriptionToUser(userId, subscription);
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          console.error(`No userId in ${event.type}`, {
            subscriptionId: subscription.id,
          });
          break;
        }

        await syncSubscriptionToUser(userId, subscription);
        break;
      }

      default:
        // Ignore unhandled events for now
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: `Handler failed: ${message}` },
      { status: 500 },
    );
  }
}