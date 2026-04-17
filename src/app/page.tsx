import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Check,
  Code2,
  ImageIcon,
  Layers3,
  Sparkles,
  Workflow,
  ShieldCheck,
  Zap,
  Search,
  MousePointerClick,
  Globe,
  Star,
  Terminal,
  Palette,
  Clock,
  Crown,
  ChevronDown,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   SEO METADATA
   ═══════════════════════════════════════════ */

export const metadata: Metadata = {
  title: 'Pixelizea — Image Generation API for Marketing, SEO & Automation',
  description:
    'Generate Open Graph images, social cards, marketing banners, and branded visuals at scale with a fast API, reusable templates, and automation-ready workflows. Free tier available.',
  keywords: [
    'image generation api',
    'og image generator',
    'open graph image api',
    'dynamic image api',
    'social card generator',
    'bannerbear alternative',
    'automated image generation',
    'marketing image api',
    'seo image generator',
    'branded visuals api',
  ],
  openGraph: {
    title: 'Pixelizea — Image Generation API',
    description:
      'Generate branded images automatically. OG images, social cards, banners, and more via a simple API.',
    url: 'https://pixelizea.com',
    siteName: 'Pixelizea',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixelizea — Image Generation API',
    description:
      'Generate branded images automatically via API. Free tier available.',
  },
  alternates: {
    canonical: 'https://pixelizea.com',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const features = [
  {
    icon: Zap,
    title: 'Sub-second rendering',
    description:
      'Images render in under 500ms on average. Built on Satori with edge caching so every request is production-fast.',
  },
  {
    icon: Layers3,
    title: 'Reusable dynamic templates',
    description:
      'Design once, generate everywhere. Variable-based templates for OG images, banners, social cards, certificates, and more.',
  },
  {
    icon: Workflow,
    title: 'Automation-ready workflows',
    description:
      'Plug Pixelizea into your app, CMS, marketing stack, or internal tools. Works with Zapier, Make, Airtable, and webhooks.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable and scalable',
    description:
      'Built for SaaS teams, agencies, and creators who need consistent rendering, predictable delivery, and secure API access.',
  },
  {
    icon: Palette,
    title: 'Custom fonts and branding',
    description:
      'Upload your own fonts, set brand colors, and lock every generated image to your exact visual identity guidelines.',
  },
  {
    icon: Terminal,
    title: 'Developer-first API',
    description:
      'Clean REST API with typed responses, comprehensive docs, code examples in 6 languages, and SDKs for Node.js and Python.',
  },
];

const useCases = [
  'Open Graph images for blog posts, product pages, and landing pages',
  'Social media visuals generated from content, data, or campaigns',
  'Branded banners for e-commerce promotions and launches',
  'Dynamic thumbnails for videos, newsletters, and communities',
  'Certificates, reports, and visual assets generated at scale',
  'Internal automation for agencies, SaaS products, and media teams',
];

const steps = [
  {
    number: '01',
    title: 'Pick a template',
    description:
      'Start from a ready-made template for OG images, social cards, product visuals, or marketing banners — or create your own.',
  },
  {
    number: '02',
    title: 'Send your data',
    description:
      'Pass title, subtitle, colors, image URLs, logos, pricing, or any dynamic variable through a single API call.',
  },
  {
    number: '03',
    title: 'Get your image',
    description:
      'Receive a production-ready PNG, JPEG, or WebP in under 500ms. Served via global CDN with permanent URLs.',
  },
];

const faqs = [
  {
    question: 'What is Pixelizea?',
    answer:
      'Pixelizea is an image generation API that helps businesses create branded visuals automatically. It is designed for Open Graph images, marketing assets, social visuals, thumbnails, certificates, and scalable content workflows.',
  },
  {
    question: 'Who is Pixelizea built for?',
    answer:
      'Pixelizea is built for SaaS teams, developers, marketers, agencies, content creators, and e-commerce businesses that need to generate images programmatically at scale.',
  },
  {
    question: 'Can I use it for Open Graph images?',
    answer:
      'Yes. Pixelizea is ideal for dynamic Open Graph image generation for articles, landing pages, product listings, and SEO-driven content. Every page gets a unique, branded preview.',
  },
  {
    question: 'Do I need design skills to use Pixelizea?',
    answer:
      'No. You can start with ready-made templates and generate polished, on-brand visuals with simple dynamic variables. No Figma, no Photoshop, no design team needed.',
  },
  {
    question: 'How fast is the image generation?',
    answer:
      'Average render time is under 500ms. Images are generated on the edge and served via a global CDN with permanent, cacheable URLs.',
  },
  {
    question: 'What formats are supported?',
    answer:
      'PNG, JPEG, and WebP. You can specify the format per request. All images are served with optimized compression and cache headers.',
  },
  {
    question: 'Is there a free plan?',
    answer:
      'Yes. The free tier includes 50 images per month, 2 templates, and full API access. No credit card required. Upgrade anytime when you need more.',
  },
  {
    question: 'How does Pixelizea compare to Bannerbear?',
    answer:
      'Pixelizea is a faster, more affordable alternative to Bannerbear. It offers sub-second rendering, a generous free tier, modern developer experience, and transparent pricing starting at $19/month.',
  },
];

const benefits = [
  'Improve click-through rates with better OG images',
  'Save hours of manual design work every week',
  'Keep every visual perfectly on-brand automatically',
  'Automate image production across your entire stack',
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Try Pixelizea with no commitment',
    images: '50 images / month',
    features: [
      '2 templates',
      'PNG export',
      'REST API access',
      'Community support',
    ],
    cta: 'Start free',
    href: '/signup',
    popular: false,
  },
  {
    name: 'Starter',
    price: '$19',
    period: '/ month',
    description: 'For indie makers and side projects',
    images: '1,000 images / month',
    features: [
      '10 templates',
      'PNG, JPEG, WebP exports',
      'Custom fonts',
      'Email support',
    ],
    cta: 'Get started',
    href: '/signup?plan=starter',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/ month',
    description: 'For growing products and teams',
    images: '10,000 images / month',
    features: [
      'Unlimited templates',
      'All export formats',
      'Priority API access',
      'Custom fonts & branding',
      'Priority support',
    ],
    cta: 'Get started',
    href: '/signup?plan=pro',
    popular: true,
  },
  {
    name: 'Business',
    price: '$149',
    period: '/ month',
    description: 'For agencies and high-volume usage',
    images: '50,000 images / month',
    features: [
      'Unlimited everything',
      'White-label option',
      'Dedicated support',
      'SLA guarantee',
      'Team accounts',
      'Custom integrations',
    ],
    cta: 'Contact sales',
    href: '/signup?plan=business',
    popular: false,
  },
];

const socialProofStats = [
  { value: '500ms', label: 'Avg render time' },
  { value: '99.9%', label: 'API uptime' },
  { value: '10M+', label: 'Images generated' },
  { value: '4.9/5', label: 'Developer rating' },
];

/* ═══════════════════════════════════════════
   FAQ ACCORDION (native HTML details)
   ═══════════════════════════════════════════ */

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-white/5">
      <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <ChevronDown className="h-5 w-5 shrink-0 text-zinc-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-6 pb-6">
        <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">{answer}</p>
      </div>
    </details>
  );
}

/* ═══════════════════════════════════════════
   JSON-LD STRUCTURED DATA
   ═══════════════════════════════════════════ */

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pixelizea',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  description:
    'Image generation API for marketing, SEO, and automation. Generate OG images, social cards, banners, and branded visuals at scale.',
  url: 'https://pixelizea.com',
  offers: [
    { '@type': 'Offer', price: '0', priceCurrency: 'USD', name: 'Free' },
    { '@type': 'Offer', price: '19', priceCurrency: 'USD', name: 'Starter' },
    { '@type': 'Offer', price: '49', priceCurrency: 'USD', name: 'Pro' },
    { '@type': 'Offer', price: '149', priceCurrency: 'USD', name: 'Business' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '47',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      {/* Structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-50">
        {/* ─── HEADER ─── */}
        <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/70">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold tracking-tight">Pixelizea</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Image Generation API</span>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
              <a href="#features" className="transition hover:text-zinc-600 dark:hover:text-zinc-300">Features</a>
              <a href="#how-it-works" className="transition hover:text-zinc-600 dark:hover:text-zinc-300">How it works</a>
              <a href="#pricing" className="transition hover:text-zinc-600 dark:hover:text-zinc-300">Pricing</a>
              <a href="#faq" className="transition hover:text-zinc-600 dark:hover:text-zinc-300">FAQ</a>
              <Link href="/docs" className="transition hover:text-zinc-600 dark:hover:text-zinc-300">Docs</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10 sm:inline-flex"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Start free
              </Link>
            </div>
          </div>
        </header>

        <main>
          {/* ─── HERO ─── */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.12),transparent_35%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
              <div className="relative z-10 flex flex-col justify-center">
                <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                  <Star className="h-4 w-4" />
                  Image Generation API for marketing, SEO & automation
                </div>

                <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                  Generate branded images automatically with Pixelizea
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
                  Create Open Graph images, social cards, marketing banners, thumbnails, and branded
                  visuals at scale with a fast API, reusable templates, and automation-ready
                  workflows.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                  >
                    Start free — 50 images/month
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
                  >
                    See how it works
                  </Link>
                </div>

                <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                  No credit card required · Free tier forever · Setup in 5 minutes
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {benefits.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-zinc-900 p-1 text-white dark:bg-white dark:text-black">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero visual — product demo */}
              <div className="relative z-10">
                <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-4 shadow-2xl shadow-zinc-200/60 dark:border-white/10 dark:bg-white/5 dark:shadow-black/40">
                  <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                    {/* Template preview */}
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-black/40">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                            Template Preview
                          </p>
                          <h3 className="mt-1 text-sm font-semibold">SaaS Open Graph Card</h3>
                        </div>
                        <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                          <Clock className="mr-1 inline h-3 w-3" />
                          428 ms
                        </div>
                      </div>

                      <div className="rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 p-6 text-white">
                        <div className="mb-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
                          <Globe className="h-3.5 w-3.5" />
                          pixelizea.com
                        </div>
                        <h4 className="max-w-sm text-2xl font-semibold leading-tight">
                          Generate branded visuals automatically for every page and campaign
                        </h4>
                        <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-300">
                          Dynamic Open Graph images, social cards, and marketing assets from your data.
                        </p>
                        <div className="mt-8 flex items-center justify-between">
                          <div className="rounded-full bg-white/10 px-3 py-1 text-xs">Marketing Image API</div>
                          <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">Pixelizea</div>
                        </div>
                      </div>
                    </div>

                    {/* Code payload */}
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-black/40">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                        Request Payload
                      </p>
                      <div className="mt-4 rounded-2xl bg-zinc-950 p-4 text-sm text-zinc-100 dark:bg-black">
                        <pre className="overflow-x-auto whitespace-pre-wrap leading-7">
{`{
  "template": "og-saas",
  "variables": {
    "title": "Generate branded images",
    "subtitle": "Built for SEO & marketing",
    "brand": "Pixelizea",
    "bgColor": "#0f172a",
    "accentColor": "#6366f1"
  }
}`}
                        </pre>
                      </div>

                      <div className="mt-4 grid gap-3">
                        <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                          <div className="flex items-center gap-3">
                            <Code2 className="h-5 w-5 text-zinc-500" />
                            <div>
                              <p className="text-sm font-semibold">API-first workflow</p>
                              <p className="text-sm text-zinc-600 dark:text-zinc-400">Integrate with your CMS, app, or automation stack</p>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                          <div className="flex items-center gap-3">
                            <ImageIcon className="h-5 w-5 text-zinc-500" />
                            <div>
                              <p className="text-sm font-semibold">Reusable templates</p>
                              <p className="text-sm text-zinc-600 dark:text-zinc-400">Consistent visuals across every channel</p>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                          <div className="flex items-center gap-3">
                            <Search className="h-5 w-5 text-zinc-500" />
                            <div>
                              <p className="text-sm font-semibold">SEO-ready output</p>
                              <p className="text-sm text-zinc-600 dark:text-zinc-400">Perfect for OG automation and shareable pages</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

                    {/* ─── PRICING ─── */}
          <section id="pricing" className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300">
                <Crown className="h-4 w-4" />
                Simple, transparent pricing
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                Start free, scale as you grow
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                No hidden fees. No per-image overage charges. Upgrade or downgrade anytime.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-3xl border p-6 shadow-sm transition hover:shadow-lg ${
                    plan.popular
                      ? 'border-zinc-900 bg-zinc-900 text-white shadow-xl dark:border-white dark:bg-white dark:text-black'
                      : 'border-zinc-200 bg-white dark:border-white/10 dark:bg-white/5'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-semibold text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-white">
                      Most popular
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <p className={`mt-1 text-sm ${plan.popular ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={`text-sm ${plan.popular ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-500 dark:text-zinc-400'}`}>
                      {plan.period}
                    </span>
                  </div>

                  <div className={`mt-4 rounded-xl px-3 py-2 text-sm font-medium ${plan.popular ? 'bg-white/10 dark:bg-black/10' : 'bg-zinc-100 dark:bg-white/5'}`}>
                    {plan.images}
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.popular ? 'text-emerald-400 dark:text-emerald-600' : 'text-emerald-600 dark:text-emerald-400'}`} />
                        <span className={plan.popular ? 'text-zinc-200 dark:text-zinc-700' : 'text-zinc-700 dark:text-zinc-300'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.href}
                    className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                      plan.popular
                        ? 'bg-white text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800'
                        : 'bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
              All plans include API access, CDN delivery, and permanent image URLs.
              Need custom volume?{' '}
              <Link href="/contact" className="underline">
                Contact us
              </Link>
              .
            </p>
          </section>

          {/* ─── SOCIAL PROOF STATS ─── */}
          <section className="border-y border-zinc-200 bg-zinc-50/80 py-8 dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 px-6 lg:grid-cols-4 lg:px-8">
              {socialProofStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                  <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── FEATURES ─── */}
          <section id="features" className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300">
                <Sparkles className="h-4 w-4" />
                Why Pixelizea
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                Everything you need to automate visual production
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Pixelizea replaces repetitive design work across SEO, content, product, and
                marketing with a single API that generates pixel-perfect images in milliseconds.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ─── CODE SHOWCASE ─── */}
          <section className="border-y border-zinc-200 bg-zinc-50 py-20 dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                  <Terminal className="h-4 w-4" />
                  Developer experience
                </div>
                <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                  Generate your first image in 3 lines
                </h2>
                <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  A clean REST API that feels like it was built by developers, for developers.
                  No SDK required — just HTTP.
                </p>
              </div>

              <div className="mt-14 grid gap-6 lg:grid-cols-2">
                {/* cURL example */}
                <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10">
                  <div className="flex items-center gap-2 border-b border-zinc-200 bg-white px-5 py-3 dark:border-white/10 dark:bg-zinc-900">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                    <span className="ml-3 text-xs font-medium text-zinc-500">cURL</span>
                  </div>
                  <div className="bg-zinc-950 p-5 dark:bg-black">
                    <pre className="overflow-x-auto text-sm leading-7 text-zinc-300">
                      <code>{`curl -X POST https://api.pixelizea.com/v1/generate \\
  -H "Authorization: Bearer imgen_sk_xxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "template": "og-basic",
    "variables": {
      "title": "My Blog Post Title",
      "subtitle": "A compelling description",
      "brand": "MyBrand",
      "bgColor": "#0f172a"
    }
  }'`}</code>
                    </pre>
                  </div>
                </div>

                {/* Response example */}
                <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10">
                  <div className="flex items-center gap-2 border-b border-zinc-200 bg-white px-5 py-3 dark:border-white/10 dark:bg-zinc-900">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                    <span className="ml-3 text-xs font-medium text-zinc-500">Response — 200 OK</span>
                    <span className="ml-auto rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                      287ms
                    </span>
                  </div>
                  <div className="bg-zinc-950 p-5 dark:bg-black">
                    <pre className="overflow-x-auto text-sm leading-7 text-zinc-300">
                      <code>{`{
  "success": true,
  "data": {
    "id": "gen_a1b2c3d4e5f6",
    "url": "https://cdn.pixelizea.com/gen/a1b2.png",
    "format": "png",
    "width": 1200,
    "height": 630,
    "fileSize": 48210,
    "renderTimeMs": 287
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
                >
                  Read the full API documentation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* ─── USE CASES ─── */}
          <section id="use-cases" className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300">
                  <MousePointerClick className="h-4 w-4" />
                  Use cases
                </div>
                <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                  One API, endless visual workflows
                </h2>
                <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  Pixelizea replaces repetitive design work with automated image generation for the
                  moments that actually drive traffic, clicks, and conversions.
                </p>
              </div>

              <div className="grid gap-4">
                {useCases.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="rounded-full bg-zinc-900 p-1.5 text-white dark:bg-white dark:text-black">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── HOW IT WORKS ─── */}
          <section id="how-it-works" className="border-y border-zinc-200 bg-zinc-50 py-20 dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                  <Code2 className="h-4 w-4" />
                  How it works
                </div>
                <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                  From API call to image in under 500ms
                </h2>
              </div>

              <div className="mt-14 grid gap-6 lg:grid-cols-3">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-white/10 dark:bg-zinc-950"
                  >
                    <div className="text-sm font-semibold tracking-[0.2em] text-zinc-400">
                      {step.number}
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── SEO SECTION ─── */}
          <section className="bg-zinc-900 py-20 text-white dark:bg-white dark:text-black">
            <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 dark:border-black/10 dark:text-black/70">
                  <Search className="h-4 w-4" />
                  SEO-friendly by design
                </div>
                <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  Turn every page into a stronger share, click, and brand impression
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75 dark:text-black/70">
                  Pixelizea generates unique Open Graph images for every page, so your content stands
                  out on Twitter, LinkedIn, Slack, Discord, and everywhere links are shared.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 dark:border-black/10 dark:bg-black/5">
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/60 dark:text-black/50">
                  Perfect for
                </p>
                <div className="mt-5 space-y-4 text-sm">
                  {['Blogs and media sites', 'SaaS marketing pages', 'E-commerce campaigns', 'Agencies and internal tools', 'Developer documentation'].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-3">
                        <Check className="h-4 w-4" />
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ─── FAQ ─── */}
          <section id="faq" className="border-t border-zinc-200 bg-zinc-50 py-20 dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                  <ShieldCheck className="h-4 w-4" />
                  FAQ
                </div>
                <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                  Frequently asked questions
                </h2>
                <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  Everything you need to know about Pixelizea before you start.
                </p>
              </div>

              <div className="mt-14 space-y-3">
                {faqs.map((faq) => (
                  <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </section>

          {/* ─── FINAL CTA ─── */}
          <section className="py-20">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
              <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-gradient-to-br from-zinc-100 via-white to-zinc-100 p-10 text-center shadow-xl dark:border-white/10 dark:from-white/10 dark:via-white/5 dark:to-black dark:shadow-black/40 sm:p-14">
                <div className="mx-auto max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                    <Sparkles className="h-4 w-4" />
                    Ready to automate your visual content?
                  </div>

                  <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Start generating images in 5 minutes
                  </h2>

                  <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                    Join hundreds of developers and marketers who use Pixelizea to generate
                    OG images, social cards, banners, and branded assets at scale.
                  </p>

                  <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                      href="/signup"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    >
                      Start free — no credit card
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/docs"
                      className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
                    >
                      Explore the API
                    </Link>
                  </div>

                  <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
                    Free forever · 50 images/month · No credit card required
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-zinc-200 dark:border-white/10">
          <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {/* Brand */}
              <div>
                <Link href="/" className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-black">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold">Pixelizea</span>
                </Link>
                <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  Image generation API for marketing, SEO, and automation.
                  Built for developers and modern teams.
                </p>
              </div>

              {/* Product */}
              <div>
                <h4 className="text-sm font-semibold">Product</h4>
                <ul className="mt-4 space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                  <li><a href="#features" className="transition hover:text-zinc-900 dark:hover:text-white">Features</a></li>
                  <li><a href="#pricing" className="transition hover:text-zinc-900 dark:hover:text-white">Pricing</a></li>
                  <li><Link href="/docs" className="transition hover:text-zinc-900 dark:hover:text-white">API Docs</Link></li>
                  <li><Link href="/docs" className="transition hover:text-zinc-900 dark:hover:text-white">Templates</Link></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-sm font-semibold">Company</h4>
                <ul className="mt-4 space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                  <li><Link href="/about" className="transition hover:text-zinc-900 dark:hover:text-white">About</Link></li>
                  <li><Link href="/blog" className="transition hover:text-zinc-900 dark:hover:text-white">Blog</Link></li>
                  <li><Link href="/contact" className="transition hover:text-zinc-900 dark:hover:text-white">Contact</Link></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-sm font-semibold">Legal</h4>
                <ul className="mt-4 space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                  <li><Link href="/privacy" className="transition hover:text-zinc-900 dark:hover:text-white">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="transition hover:text-zinc-900 dark:hover:text-white">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-white/10">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  © {new Date().getFullYear()} Pixelizea. All rights reserved.
                </p>
                <p className="text-sm text-zinc-400 dark:text-zinc-500">
                  Made for developers, marketers, and modern teams.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}