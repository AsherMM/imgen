export type PlanId = 'free' | 'starter' | 'pro' | 'business';

export type PlanConfig = {
  id: PlanId;
  name: string;
  description: string;
  price: number; // en cents USD
  priceFormatted: string;
  imagesPerMonth: number;
  maxTemplates: number;
  features: string[];
  stripePriceId: string | null;
  popular?: boolean;
};

export const PLANS: Record<PlanId, PlanConfig> = {
  free: {
    id: 'free',
    name: 'Free',
    description: 'For trying out the product',
    price: 0,
    priceFormatted: '$0',
    imagesPerMonth: 50,
    maxTemplates: 2,
    features: [
      '50 images / month',
      '2 templates',
      'PNG export',
      'API access',
      'Community support',
    ],
    stripePriceId: null,
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    description: 'For indie makers and side projects',
    price: 1900,
    priceFormatted: '$19',
    imagesPerMonth: 1000,
    maxTemplates: 10,
    features: [
      '1,000 images / month',
      '10 templates',
      'PNG, JPEG, WebP exports',
      'API access',
      'Email support',
    ],
    stripePriceId: process.env.STRIPE_PRICE_STARTER_MONTHLY || null,
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    description: 'For growing businesses',
    price: 4900,
    priceFormatted: '$49',
    imagesPerMonth: 10000,
    maxTemplates: 50,
    features: [
      '10,000 images / month',
      'Unlimited templates',
      'All export formats',
      'Priority API access',
      'Priority support',
      'Custom fonts',
    ],
    stripePriceId: process.env.STRIPE_PRICE_PRO_MONTHLY || null,
    popular: true,
  },
  business: {
    id: 'business',
    name: 'Business',
    description: 'For teams and agencies',
    price: 14900,
    priceFormatted: '$149',
    imagesPerMonth: 50000,
    maxTemplates: 999999,
    features: [
      '50,000 images / month',
      'Unlimited everything',
      'White-label option',
      'Dedicated support',
      'SLA',
      'Team accounts',
    ],
    stripePriceId: process.env.STRIPE_PRICE_BUSINESS_MONTHLY || null,
  },
};

export const PLAN_LIST = Object.values(PLANS);

export function getPlanByStripePriceId(priceId: string): PlanConfig | null {
  return PLAN_LIST.find((p) => p.stripePriceId === priceId) ?? null;
}