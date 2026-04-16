import Link from 'next/link';
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
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Fast image generation API',
    description:
      'Generate branded visuals in seconds with a developer-friendly API built for production workloads.',
  },
  {
    icon: Layers3,
    title: 'Reusable dynamic templates',
    description:
      'Create once, reuse everywhere with variable-based templates for Open Graph images, banners, social cards, and more.',
  },
  {
    icon: Workflow,
    title: 'Automation-ready workflows',
    description:
      'Plug Pixelizea into your app, CMS, marketing stack, or internal tools to create visuals automatically.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable and scalable',
    description:
      'Built for SaaS teams, agencies, and creators who need consistent rendering, predictable delivery, and secure access.',
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
    title: 'Choose a template',
    description:
      'Start with a clean template for Open Graph images, social cards, product visuals, or marketing banners.',
  },
  {
    number: '02',
    title: 'Pass your variables',
    description:
      'Send title, subtitle, brand color, image URL, avatar, logo, pricing, or any dynamic field through the API.',
  },
  {
    number: '03',
    title: 'Generate at scale',
    description:
      'Receive production-ready images for your app, website, campaigns, or workflows — automatically.',
  },
];

const faqs = [
  {
    question: 'What is Pixelizea?',
    answer:
      'Pixelizea is an image generation API that helps businesses create branded visuals automatically. It is designed for Open Graph images, marketing assets, social visuals, thumbnails, and scalable content workflows.',
  },
  {
    question: 'Who is it for?',
    answer:
      'Pixelizea is built for SaaS teams, developers, marketers, agencies, creators, and businesses that need to generate images programmatically.',
  },
  {
    question: 'Can I use it for Open Graph images?',
    answer:
      'Yes. Pixelizea is ideal for dynamic Open Graph image generation for articles, pages, product listings, and SEO-driven content.',
  },
  {
    question: 'Do I need design skills?',
    answer:
      'No. You can start with ready-made templates and generate polished visuals with simple dynamic variables.',
  },
  {
    question: 'Is Pixelizea API-first?',
    answer:
      'Yes. Pixelizea is built for API usage first, with templates and automation designed to fit cleanly into developer workflows.',
  },
  {
    question: 'Can I use Pixelizea for marketing automation?',
    answer:
      'Absolutely. Pixelizea helps automate visual production for marketing campaigns, social content, promotions, and branded assets.',
  },
];

const benefits = [
  'Improve click-through rate with better Open Graph images',
  'Save hours of manual design work every week',
  'Keep every visual perfectly on-brand',
  'Automate image production across your website and workflows',
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-50">
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/70">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold tracking-tight">Pixelizea</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">pixelizea.com</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <a href="#features" className="transition hover:text-zinc-600 dark:hover:text-zinc-300">
              Features
            </a>
            <a href="#use-cases" className="transition hover:text-zinc-600 dark:hover:text-zinc-300">
              Use Cases
            </a>
            <a href="#how-it-works" className="transition hover:text-zinc-600 dark:hover:text-zinc-300">
              How it works
            </a>
            <a href="#faq" className="transition hover:text-zinc-600 dark:hover:text-zinc-300">
              FAQ
            </a>
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
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.12),transparent_35%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)]" />
          <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div className="relative z-10 flex flex-col justify-center">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                <Star className="h-4 w-4" />
                Image Generation API for marketing, SEO, and automation
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
                  Start free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
                >
                  View API docs
                </Link>
              </div>

              <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                No credit card required · Fast setup · Built for developers, marketers, and SaaS
                teams
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

            <div className="relative z-10">
              <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-4 shadow-2xl shadow-zinc-200/60 dark:border-white/10 dark:bg-white/5 dark:shadow-black/40">
                <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-black/40">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                          Template Preview
                        </p>
                        <h3 className="mt-1 text-sm font-semibold">SaaS Open Graph Card</h3>
                      </div>
                      <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                        Generated in 428 ms
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
                        Dynamic Open Graph images, social cards, and marketing assets from your
                        data.
                      </p>
                      <div className="mt-8 flex items-center justify-between">
                        <div className="rounded-full bg-white/10 px-3 py-1 text-xs">
                          Marketing Image API
                        </div>
                        <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                          Pixelizea
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-black/40">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                      Request Payload
                    </p>
                    <div className="mt-4 rounded-2xl bg-zinc-950 p-4 text-sm text-zinc-100 dark:bg-black">
                      <pre className="overflow-x-auto whitespace-pre-wrap leading-7">
{`{
  "template": "og-saas",
  "title": "Generate branded images automatically",
  "subtitle": "Built for SEO, social, and marketing",
  "brand": "Pixelizea",
  "theme": "dark",
  "logo": "https://pixelizea.com/logo.png"
}`}
                      </pre>
                    </div>

                    <div className="mt-4 grid gap-3">
                      <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="flex items-center gap-3">
                          <Code2 className="h-5 w-5 text-zinc-500" />
                          <div>
                            <p className="text-sm font-semibold">API-first workflow</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                              Integrate with your CMS, app, or automation stack
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="flex items-center gap-3">
                          <ImageIcon className="h-5 w-5 text-zinc-500" />
                          <div>
                            <p className="text-sm font-semibold">Reusable templates</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                              Generate consistent visuals across every channel
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="flex items-center gap-3">
                          <Search className="h-5 w-5 text-zinc-500" />
                          <div>
                            <p className="text-sm font-semibold">SEO-ready output</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                              Perfect for Open Graph automation and shareable pages
                            </p>
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

        <section className="border-y border-zinc-200 bg-zinc-50/80 py-6 dark:border-white/10 dark:bg-white/5">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 text-sm text-zinc-600 lg:px-8 dark:text-zinc-400">
            <span>Built for SaaS teams</span>
            <span>Made for agencies</span>
            <span>Ideal for e-commerce</span>
            <span>Designed for marketers</span>
            <span>Loved by indie makers</span>
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300">
              <Sparkles className="h-4 w-4" />
              Why Pixelizea
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              A complete image generation platform for modern teams
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Pixelizea helps you automate visual production across SEO, content, product,
              marketing, and branded workflows without repeating the same manual design work over
              and over again.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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

        <section
          id="use-cases"
          className="bg-zinc-50 py-20 dark:bg-white/5"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                <MousePointerClick className="h-4 w-4" />
                Use cases
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                One API, endless visual workflows
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Pixelizea is built to replace repetitive design work with automated image generation
                for the moments that actually drive traffic, clicks, and conversions.
              </p>
            </div>

            <div className="grid gap-4">
              {useCases.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-black/20"
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

        <section id="how-it-works" className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300">
              <Code2 className="h-4 w-4" />
              How it works
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Launch visual automation in three simple steps
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-white/10 dark:bg-white/5"
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
        </section>

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
                Pixelizea is ideal for dynamic Open Graph images, social previews, and branded
                visuals that make your content more clickable, more consistent, and more scalable.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 dark:border-black/10 dark:bg-black/5">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/60 dark:text-black/50">
                Perfect for
              </p>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4" />
                  Blogs and media sites
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4" />
                  SaaS marketing pages
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4" />
                  E-commerce campaigns
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4" />
                  Agencies and internal tools
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto w-full max-w-5xl px-6 py-20 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300">
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

          <div className="mt-14 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-gradient-to-br from-zinc-100 via-white to-zinc-100 p-10 text-center shadow-xl dark:border-white/10 dark:from-white/10 dark:via-white/5 dark:to-black dark:shadow-black/40 sm:p-14">
              <div className="mx-auto max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                  <Sparkles className="h-4 w-4" />
                  Ready to automate your visual content?
                </div>

                <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                  Start building with Pixelizea today
                </h2>

                <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  Generate Open Graph images, social visuals, banners, and branded assets at scale
                  with a clean API built for modern teams.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                  >
                    Start free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/docs"
                    className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
                  >
                    Explore the API
                  </Link>
                </div>

                <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                  Pixelizea.com · Built for developers, marketers, agencies, and SaaS teams
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-8 dark:border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-8 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Pixelizea. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy" className="transition hover:text-zinc-900 dark:hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-zinc-900 dark:hover:text-white">
              Terms
            </Link>
            <Link href="/docs" className="transition hover:text-zinc-900 dark:hover:text-white">
              API Docs
            </Link>
            <Link href="/contact" className="transition hover:text-zinc-900 dark:hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}