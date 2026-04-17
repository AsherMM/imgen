import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Calendar,
  CreditCard,
  Crown,
  ImageIcon,
  KeyRound,
  Plus,
  Sparkles,
  Zap,
  ArrowRight,
  Clock3,
  BarChart3,
  FolderKanban,
  LogOut,
  Home,
  FileCode2,
  Settings,
} from 'lucide-react';

import { createClient } from '@/src/lib/supabase/server';
import { db } from '@/src/lib/db';
import { PLANS, type PlanId } from '@/src/config/plans';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

/* ═══════════════════════════════════════════
   SEO METADATA
   ═══════════════════════════════════════════ */

export const metadata: Metadata = {
  title: 'Dashboard — Pixelizea',
  description: 'Manage your templates, API keys, and image generation usage.',
  robots: { index: false, follow: false },
};

/* ═══════════════════════════════════════════
   PLAN DISPLAY CONFIG
   Extends PLANS from config with dashboard-specific UI fields
   ═══════════════════════════════════════════ */

type PlanKey = 'FREE' | 'STARTER' | 'PRO' | 'BUSINESS';

const PLAN_UI: Record<
  PlanKey,
  {
    highlight: string;
    cta: string;
    tone: 'default' | 'secondary' | 'destructive' | 'outline';
  }
> = {
  FREE: {
    highlight: 'Perfect to test Pixelizea and generate your first branded assets.',
    cta: 'Upgrade plan',
    tone: 'secondary',
  },
  STARTER: {
    highlight: 'Best for solo makers, indie SaaS, and lightweight automation.',
    cta: 'Manage plan',
    tone: 'outline',
  },
  PRO: {
    highlight: 'Ideal for fast-growing products, agencies, and content teams.',
    cta: 'Manage plan',
    tone: 'outline',
  },
  BUSINESS: {
    highlight: 'Built for higher-volume usage, production workloads, and scaling teams.',
    cta: 'Manage plan',
    tone: 'default',
  },
};

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */

function getCurrentPeriod() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
}

function getMonthLabel() {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date());
}

function formatDate(value: Date | null | undefined) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(
    value,
  );
}

function formatBytes(bytes: number | null | undefined) {
  if (!bytes || bytes <= 0) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getUsagePercentage(used: number, limit: number) {
  if (limit <= 0) return 0;
  return Math.min(100, Math.round((used / limit) * 100));
}

function getUsageTone(percent: number) {
  if (percent >= 90) return 'bg-red-500';
  if (percent >= 70) return 'bg-amber-500';
  return 'bg-emerald-500';
}

function getPlanOrder(plan: PlanKey) {
  const order: Record<PlanKey, number> = { FREE: 0, STARTER: 1, PRO: 2, BUSINESS: 3 };
  return order[plan];
}

function getUpgradeOptions(currentPlan: PlanKey) {
  return (['STARTER', 'PRO', 'BUSINESS'] as PlanKey[])
    .filter((plan) => getPlanOrder(plan) > getPlanOrder(currentPlan))
    .slice(0, 2)
    .map((key) => {
      const planConfig = PLANS[key.toLowerCase() as PlanId];
      const uiConfig = PLAN_UI[key];
      return { key, planConfig, uiConfig };
    });
}

function getPlanConfig(plan: PlanKey) {
  const planId = plan.toLowerCase() as PlanId;
  return PLANS[planId];
}

/* ═══════════════════════════════════════════
   DASHBOARD NAV
   ═══════════════════════════════════════════ */

const dashboardNav = [
  { label: 'Overview', href: '/dashboard', icon: Home },
  { label: 'Templates', href: '/dashboard/templates', icon: FolderKanban },
  { label: 'API Keys', href: '/dashboard/api-keys', icon: KeyRound },
  { label: 'Generations', href: '/dashboard/generations', icon: ImageIcon },
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const dbUser = await db.user.upsert({
    where: { id: user.id },
    update: {
      email: user.email!,
      name: user.user_metadata?.name ?? null,
      avatarUrl: user.user_metadata?.avatar_url ?? null,
    },
    create: {
      id: user.id,
      email: user.email!,
      name: user.user_metadata?.name ?? null,
      avatarUrl: user.user_metadata?.avatar_url ?? null,
    },
  });

  const currentPeriod = getCurrentPeriod();
  const currentPlan = dbUser.plan as PlanKey;
  const planConfig = getPlanConfig(currentPlan);
  const planUi = PLAN_UI[currentPlan];

  const [usage, templateCount, apiKeyCount, generationCount, recentGenerations, recentApiKeys] =
    await Promise.all([
      db.usage.findUnique({
        where: { userId_period: { userId: dbUser.id, period: currentPeriod } },
      }),
      db.template.count({ where: { userId: dbUser.id } }),
      db.apiKey.count({ where: { userId: dbUser.id } }),
      db.generation.count({ where: { userId: dbUser.id } }),
      db.generation.findMany({
        where: { userId: dbUser.id },
        orderBy: { createdAt: 'desc' },
        take: 6,
        select: {
          id: true,
          imageUrl: true,
          format: true,
          width: true,
          height: true,
          fileSize: true,
          renderTimeMs: true,
          createdAt: true,
          template: { select: { name: true } },
        },
      }),
      db.apiKey.findMany({
        where: { userId: dbUser.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          prefix: true,
          lastUsedAt: true,
          createdAt: true,
        },
      }),
    ]);

  const usedImages = usage?.imagesCount ?? 0;
  const monthlyLimit = planConfig.imagesPerMonth;
  const usagePercent = getUsagePercentage(usedImages, monthlyLimit);
  const remainingImages = Math.max(0, monthlyLimit - usedImages);
  const upgradeOptions = getUpgradeOptions(currentPlan);
  const userDisplayName = dbUser.name ?? dbUser.email;
  const initials = (dbUser.name ?? dbUser.email ?? 'U')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-zinc-50/70 dark:bg-black">
      {/* ─── DASHBOARD HEADER ─── */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/70">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-black">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold tracking-tight">Pixelizea</span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {dashboardNav.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === '/dashboard';
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-white'
                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/docs" className="hidden text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white sm:inline-flex">
              API Docs
            </Link>
            <form action="/api/auth/signout" method="post">
              <Button variant="outline" size="sm" className="gap-2">
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        {/* ─── WELCOME BANNER ─── */}
        <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 border border-zinc-200 dark:border-white/10">
              <AvatarFallback className="bg-zinc-900 text-white dark:bg-white dark:text-black">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <Badge variant={planUi.tone}>{planConfig.name}</Badge>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Welcome back,{' '}
                <span className="font-medium text-zinc-900 dark:text-white">
                  {userDisplayName}
                </span>
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Billing cycle: {getMonthLabel()}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  {planUi.highlight}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dashboard/templates/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New template
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" className="gap-2">
                <Crown className="h-4 w-4" />
                {planUi.cta}
              </Button>
            </Link>
          </div>
        </div>

        {/* ─── KPI CARDS ─── */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Monthly usage
                <ImageIcon className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">{usedImages}</span>
                  <span className="pb-1 text-sm text-zinc-500">
                    / {monthlyLimit.toLocaleString()} images
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-500">
                  {remainingImages.toLocaleString()} remaining this month
                </p>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
                <div
                  className={`h-full rounded-full transition-all ${getUsageTone(usagePercent)}`}
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{usagePercent}% used</span>
                <span>{currentPeriod}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Templates
                <FolderKanban className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{templateCount}</div>
              <p className="mt-2 text-sm text-zinc-500">
                Reusable templates in your workspace
              </p>
              <Link
                href="/dashboard/templates"
                className="mt-4 inline-flex items-center text-sm font-medium text-zinc-900 hover:underline dark:text-white"
              >
                Manage templates
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-zinc-600 dark:text-zinc-400">
                API keys
                <KeyRound className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{apiKeyCount}</div>
              <p className="mt-2 text-sm text-zinc-500">
                Secure keys for your integrations
              </p>
              <Link
                href="/dashboard/api-keys"
                className="mt-4 inline-flex items-center text-sm font-medium text-zinc-900 hover:underline dark:text-white"
              >
                Manage keys
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Total generations
                <BarChart3 className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{generationCount.toLocaleString()}</div>
              <p className="mt-2 text-sm text-zinc-500">
                All-time images generated
              </p>
              <Link
                href="/dashboard/generations"
                className="mt-4 inline-flex items-center text-sm font-medium text-zinc-900 hover:underline dark:text-white"
              >
                View history
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* ─── USAGE & PLAN + SIDEBAR ─── */}
        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-xl">Usage & plan</CardTitle>
                <p className="mt-1 text-sm text-zinc-500">
                  Your current subscription and monthly generation allowance
                </p>
              </div>
              <Badge variant={planUi.tone}>{planConfig.name}</Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-white/5">
                  <p className="text-xs uppercase tracking-wide text-zinc-500">Plan</p>
                  <p className="mt-2 text-lg font-semibold">{planConfig.name}</p>
                </div>
                <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-white/5">
                  <p className="text-xs uppercase tracking-wide text-zinc-500">Monthly price</p>
                  <p className="mt-2 text-lg font-semibold">{planConfig.priceFormatted}/mo</p>
                </div>
                <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-white/5">
                  <p className="text-xs uppercase tracking-wide text-zinc-500">Included images</p>
                  <p className="mt-2 text-lg font-semibold">
                    {planConfig.imagesPerMonth.toLocaleString()}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Current month consumption</p>
                    <p className="text-sm text-zinc-500">
                      {usedImages.toLocaleString()} of {monthlyLimit.toLocaleString()} images used
                    </p>
                  </div>
                  <p className="text-sm font-semibold">{usagePercent}%</p>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all ${getUsageTone(usagePercent)}`}
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
                  <span>{remainingImages.toLocaleString()} images left before plan limit</span>
                  <span>Period: {currentPeriod}</span>
                </div>
              </div>

              {currentPlan === 'FREE' ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
                  <div className="flex items-start gap-3">
                    <Zap className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <div>
                      <p className="font-medium text-amber-900 dark:text-amber-200">
                        You are on the free plan
                      </p>
                      <p className="mt-1 text-sm text-amber-800 dark:text-amber-300">
                        Great for testing. Upgrade when you need higher limits, production workflows,
                        or more automation capacity.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                  <div className="flex items-start gap-3">
                    <CreditCard className="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <p className="font-medium text-emerald-900 dark:text-emerald-200">
                        Active {planConfig.name} plan
                      </p>
                      <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-300">
                        Your account is ready for production-volume image generation.
                        {dbUser.stripeCurrentPeriodEnd && (
                          <> Next billing date: {formatDate(dbUser.stripeCurrentPeriodEnd)}.</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Link href="/pricing">
                  <Button>{currentPlan === 'FREE' ? 'Upgrade plan' : 'Manage plan'}</Button>
                </Link>
                <Link href="/dashboard/api-keys">
                  <Button variant="outline">View API keys</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* ─── SIDEBAR ─── */}
          <div className="space-y-6">
            <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-xl">Quick actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Link href="/dashboard/templates/new">
                  <Button className="w-full justify-between">
                    Create template
                    <Plus className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard/api-keys">
                  <Button variant="outline" className="w-full justify-between">
                    Create API key
                    <KeyRound className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button variant="outline" className="w-full justify-between">
                    View API docs
                    <FileCode2 className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="w-full justify-between">
                    {currentPlan === 'FREE' ? 'Upgrade plan' : 'Change plan'}
                    <Crown className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-xl">Recommended next step</CardTitle>
              </CardHeader>
              <CardContent>
                {templateCount === 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      You do not have any templates yet. Start by creating your first dynamic Open
                      Graph template or branded social card.
                    </p>
                    <Link href="/dashboard/templates/new">
                      <Button className="w-full">Create first template</Button>
                    </Link>
                  </div>
                ) : apiKeyCount === 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Your templates are ready. Create an API key to connect Pixelizea to your app,
                      website, or automation workflow.
                    </p>
                    <Link href="/dashboard/api-keys">
                      <Button className="w-full">Create API key</Button>
                    </Link>
                  </div>
                ) : usedImages === 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Everything is set up. Try generating your first image using the API or the
                      dashboard playground.
                    </p>
                    <Link href="/docs">
                      <Button className="w-full">View quickstart guide</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Your workspace is active with {usedImages.toLocaleString()} images generated
                      this month.{' '}
                      {usagePercent >= 70
                        ? 'Consider upgrading to avoid hitting your limit.'
                        : 'Keep building — you have plenty of capacity left.'}
                    </p>
                    <Link href={usagePercent >= 70 ? '/pricing' : '/dashboard/generations'}>
                      <Button className="w-full">
                        {usagePercent >= 70 ? 'Upgrade plan' : 'View generation history'}
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {upgradeOptions.length > 0 && currentPlan === 'FREE' && (
              <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl">Upgrade options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upgradeOptions.map(({ key, planConfig: pc, uiConfig }) => (
                    <div
                      key={key}
                      className="rounded-2xl border border-zinc-200 p-4 dark:border-white/10"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold">{pc.name}</p>
                          <p className="mt-1 text-sm text-zinc-500">{uiConfig.highlight}</p>
                        </div>
                        <Badge variant="outline">{pc.priceFormatted}/mo</Badge>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span>{pc.imagesPerMonth.toLocaleString()} images / month</span>
                        <Link href="/pricing" className="font-medium hover:underline">
                          Choose plan
                        </Link>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* ─── RECENT ACTIVITY ─── */}
        <section className="grid gap-6 xl:grid-cols-2">
          {/* Recent generations */}
          <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-xl">Recent generations</CardTitle>
                <p className="mt-1 text-sm text-zinc-500">Your latest rendered images</p>
              </div>
              <Link href="/dashboard/generations">
                <Button variant="outline" size="sm">
                  View all
                </Button>
              </Link>
            </CardHeader>

            <CardContent>
              {recentGenerations.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center dark:border-white/10">
                  <ImageIcon className="mx-auto h-10 w-10 text-zinc-400" />
                  <h3 className="mt-4 text-lg font-semibold">No generations yet</h3>
                  <p className="mt-2 text-sm text-zinc-500">
                    Generate your first image to start building usage history.
                  </p>
                  <Link href="/docs" className="mt-4 inline-block">
                    <Button size="sm">Read the quickstart</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentGenerations.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 p-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate font-medium">{item.template.name}</p>
                          <Badge variant="outline">{item.format.toUpperCase()}</Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                          <span className="inline-flex items-center gap-1">
                            <Clock3 className="h-3.5 w-3.5" />
                            {item.renderTimeMs ? `${item.renderTimeMs} ms` : '—'}
                          </span>
                          <span>
                            {item.width}×{item.height}
                          </span>
                          <span>{formatBytes(item.fileSize)}</span>
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                      </div>
                      <a href={item.imageUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* API keys */}
          <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-xl">API keys</CardTitle>
                <p className="mt-1 text-sm text-zinc-500">Keys available for your integrations</p>
              </div>
              <Link href="/dashboard/api-keys">
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </Link>
            </CardHeader>

            <CardContent>
              {recentApiKeys.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center dark:border-white/10">
                  <KeyRound className="mx-auto h-10 w-10 text-zinc-400" />
                  <h3 className="mt-4 text-lg font-semibold">No API keys yet</h3>
                  <p className="mt-2 text-sm text-zinc-500">
                    Create your first key to connect Pixelizea to your website or automation stack.
                  </p>
                  <Link href="/dashboard/api-keys" className="mt-4 inline-block">
                    <Button size="sm">Create API key</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentApiKeys.map((key) => (
                    <div
                      key={key.id}
                      className="rounded-2xl border border-zinc-200 p-4 dark:border-white/10"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="truncate font-medium">{key.name}</p>
                          <p className="mt-1 font-mono text-xs text-zinc-500">
                            imgen_{key.prefix}_••••••••
                          </p>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                        <span>Created: {formatDate(key.createdAt)}</span>
                        <span>Last used: {formatDate(key.lastUsedAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}