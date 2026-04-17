import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Clock3,
  CreditCard,
  ExternalLink,
  FileCode2,
  FolderKanban,
  Home,
  ImageIcon,
  KeyRound,
  LogOut,
  Search,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';

import { createClient } from '@/src/lib/supabase/server';
import { db } from '@/src/lib/db';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Generations — Pixelizea',
  description: 'Browse and inspect generated images in your Pixelizea workspace.',
  robots: {
    index: false,
    follow: false,
  },
};

const dashboardNav = [
  { label: 'Overview', href: '/dashboard', icon: Home },
  { label: 'Templates', href: '/dashboard/templates', icon: FolderKanban },
  { label: 'API Keys', href: '/dashboard/api-keys', icon: KeyRound },
  { label: 'Generations', href: '/dashboard/generations', icon: ImageIcon },
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
];

function formatDate(value: Date | null | undefined) {
  if (!value) return '—';

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(value);
}

function formatBytes(bytes: number | null | undefined) {
  if (!bytes || bytes <= 0) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getCurrentPeriod() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
}

type SearchParams = Promise<{
  q?: string;
  template?: string;
  format?: string;
}>;

export default async function GenerationsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

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

  const q = params.q?.trim() ?? '';
  const selectedTemplate = params.template?.trim() ?? '';
  const selectedFormat = params.format?.trim() ?? '';

  const currentPeriod = getCurrentPeriod();

  const generationWhere = {
    userId: dbUser.id,
    ...(selectedFormat ? { format: selectedFormat } : {}),
    ...(selectedTemplate ? { templateId: selectedTemplate } : {}),
    ...(q
      ? {
          OR: [
            {
              template: {
                name: {
                  contains: q,
                  mode: 'insensitive' as const,
                },
              },
            },
            {
              source: {
                contains: q,
                mode: 'insensitive' as const,
              },
            },
          ],
        }
      : {}),
  };

  const [templates, generations, totalCount, usageThisMonth, latestGeneration] =
    await Promise.all([
      db.template.findMany({
        where: { userId: dbUser.id },
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
        },
      }),
      db.generation.findMany({
        where: generationWhere,
        orderBy: { createdAt: 'desc' },
        take: 24,
        select: {
          id: true,
          imageUrl: true,
          format: true,
          width: true,
          height: true,
          fileSize: true,
          renderTimeMs: true,
          source: true,
          createdAt: true,
          templateId: true,
          template: {
            select: {
              name: true,
            },
          },
        },
      }),
      db.generation.count({
        where: generationWhere,
      }),
      db.usage.findUnique({
        where: {
          userId_period: {
            userId: dbUser.id,
            period: currentPeriod,
          },
        },
      }),
      db.generation.findFirst({
        where: { userId: dbUser.id },
        orderBy: { createdAt: 'desc' },
        select: {
          createdAt: true,
        },
      }),
    ]);

  const thisMonthCount = usageThisMonth?.imagesCount ?? 0;
  const averageRenderTime =
    generations.length > 0
      ? Math.round(
          generations.reduce((acc, item) => acc + (item.renderTimeMs ?? 0), 0) /
            generations.length,
        )
      : 0;

  return (
    <div className="min-h-screen bg-zinc-50/70 dark:bg-black">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 text-lg font-semibold tracking-tight"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black">
                <Sparkles className="h-5 w-5" />
              </div>
              Pixelizea
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/docs">
                <Button variant="outline">API Docs</Button>
              </Link>

              <form action="/api/auth/signout" method="post">
                <Button variant="outline" type="submit" className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {dashboardNav.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === '/dashboard/generations';

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'outline'}
                    className="gap-2 rounded-full"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">Generations</h1>
              <Badge variant="secondary">{totalCount} results</Badge>
            </div>

            <p className="max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
              Review generated images, inspect render output, and track activity across your
              templates and API usage.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/templates">
              <Button variant="outline">View templates</Button>
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Matching generations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalCount}</div>
              <p className="mt-2 text-sm text-zinc-500">
                Results for your current filters.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                This month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{thisMonthCount.toLocaleString()}</div>
              <p className="mt-2 text-sm text-zinc-500">
                Images generated in the current billing period.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Avg. render time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {averageRenderTime > 0 ? `${averageRenderTime} ms` : '—'}
              </div>
              <p className="mt-2 text-sm text-zinc-500">
                Based on the currently displayed generations.
              </p>
            </CardContent>
          </Card>
        </section>

        <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="grid gap-4 lg:grid-cols-[1.2fr_1fr_0.8fr_auto]">
              <div className="space-y-2">
                <Label htmlFor="q">Search</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <Input
                    id="q"
                    name="q"
                    placeholder="Search by template name or source"
                    defaultValue={q}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">Template</Label>
                <select
                  id="template"
                  name="template"
                  defaultValue={selectedTemplate}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">All templates</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Format</Label>
                <select
                  id="format"
                  name="format"
                  defaultValue={selectedFormat}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">All formats</option>
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="webp">WEBP</option>
                </select>
              </div>

              <div className="flex items-end gap-3">
                <Button type="submit" className="w-full lg:w-auto">
                  Apply filters
                </Button>

                <Link href="/dashboard/generations">
                  <Button type="button" variant="outline">
                    Reset
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-xl">Generation history</CardTitle>
              <p className="mt-1 text-sm text-zinc-500">
                Latest render output across your workspace.
              </p>
            </div>

            <div className="text-right text-xs text-zinc-500">
              <p>Last activity</p>
              <p className="mt-1 font-medium text-zinc-900 dark:text-white">
                {latestGeneration ? formatDate(latestGeneration.createdAt) : '—'}
              </p>
            </div>
          </CardHeader>

          <CardContent>
            {generations.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-zinc-300 p-10 text-center dark:border-white/10">
                <ImageIcon className="mx-auto h-10 w-10 text-zinc-400" />
                <h3 className="mt-4 text-xl font-semibold">No generations found</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-500">
                  Try adjusting your filters, or generate your first image from a template to start
                  building your history.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link href="/dashboard/templates">
                    <Button>Browse templates</Button>
                  </Link>
                  <Link href="/dashboard/generations">
                    <Button variant="outline">Clear filters</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {generations.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-zinc-200 p-5 dark:border-white/10"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-lg font-semibold">{item.template.name}</h3>
                          <Badge variant="outline">{item.format.toUpperCase()}</Badge>
                          {item.source ? (
                            <Badge variant="secondary">{item.source}</Badge>
                          ) : null}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 className="h-3.5 w-3.5" />
                            {item.renderTimeMs ? `${item.renderTimeMs} ms` : '—'}
                          </span>
                          <span>
                            {item.width}×{item.height}
                          </span>
                          <span>{formatBytes(item.fileSize)}</span>
                          <span>{formatDate(item.createdAt)}</span>
                        </div>

                        <div className="rounded-2xl bg-zinc-100 p-4 text-xs text-zinc-600 dark:bg-white/5 dark:text-zinc-400">
                          <p>
                            <span className="font-medium text-zinc-900 dark:text-white">
                              Generation ID:
                            </span>{' '}
                            {item.id}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-wrap gap-3">
                        <a
                          href={item.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Open image
                          </Button>
                        </a>
                      </div>
                    </div>

                    <Separator className="my-5" />

                    <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
                      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-white/5">
                        <img
                          src={item.imageUrl}
                          alt={`${item.template.name} generation`}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-white/5">
                          <p className="text-xs uppercase tracking-wide text-zinc-500">Template</p>
                          <p className="mt-2 font-medium">{item.template.name}</p>
                        </div>

                        <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-white/5">
                          <p className="text-xs uppercase tracking-wide text-zinc-500">Format</p>
                          <p className="mt-2 font-medium">{item.format.toUpperCase()}</p>
                        </div>

                        <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-white/5">
                          <p className="text-xs uppercase tracking-wide text-zinc-500">Dimensions</p>
                          <p className="mt-2 font-medium">
                            {item.width} × {item.height}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-white/5">
                          <p className="text-xs uppercase tracking-wide text-zinc-500">File size</p>
                          <p className="mt-2 font-medium">{formatBytes(item.fileSize)}</p>
                        </div>

                        <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-white/5">
                          <p className="text-xs uppercase tracking-wide text-zinc-500">Render time</p>
                          <p className="mt-2 font-medium">
                            {item.renderTimeMs ? `${item.renderTimeMs} ms` : '—'}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-white/5">
                          <p className="text-xs uppercase tracking-wide text-zinc-500">Created</p>
                          <p className="mt-2 font-medium">{formatDate(item.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}