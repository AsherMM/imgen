import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import {
  CreditCard,
  Eye,
  FileCode2,
  FolderKanban,
  Globe,
  Home,
  ImageIcon,
  KeyRound,
  Lock,
  LogOut,
  PencilLine,
  Plus,
  Sparkles,
  Clock3,
} from 'lucide-react';

import { createClient } from '@/src/lib/supabase/server';
import { db } from '@/src/lib/db';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Templates — Pixelizea',
  description: 'Create and manage reusable templates for your generated images.',
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

function getJsonElementCount(config: unknown) {
  if (
    typeof config === 'object' &&
    config !== null &&
    'elements' in config &&
    Array.isArray((config as { elements?: unknown[] }).elements)
  ) {
    return (config as { elements: unknown[] }).elements.length;
  }

  return 0;
}

export default async function TemplatesPage() {
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

  const [templates, totalTemplates, publicTemplates] = await Promise.all([
    db.template.findMany({
      where: { userId: dbUser.id },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        description: true,
        width: true,
        height: true,
        config: true,
        previewUrl: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            generations: true,
          },
        },
      },
    }),
    db.template.count({
      where: { userId: dbUser.id },
    }),
    db.template.count({
      where: {
        userId: dbUser.id,
        isPublic: true,
      },
    }),
  ]);

  const privateTemplates = totalTemplates - publicTemplates;

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
              const isActive = item.href === '/dashboard/templates';

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
              <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
              <Badge variant="secondary">{totalTemplates} total</Badge>
            </div>

            <p className="max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
              Create, organize, and reuse branded image templates for Open Graph cards, social
              visuals, product announcements, and automated content generation.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <FolderKanban className="h-3.5 w-3.5" />
                {totalTemplates} template{totalTemplates === 1 ? '' : 's'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                {publicTemplates} public
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                {privateTemplates} private
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/templates/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New template
              </Button>
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Total templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalTemplates}</div>
              <p className="mt-2 text-sm text-zinc-500">
                All reusable templates in your workspace.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Public templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{publicTemplates}</div>
              <p className="mt-2 text-sm text-zinc-500">
                Templates marked as public or shareable.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Private templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{privateTemplates}</div>
              <p className="mt-2 text-sm text-zinc-500">
                Internal workspace-only templates.
              </p>
            </CardContent>
          </Card>
        </section>

        <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-xl">Your templates</CardTitle>
              <p className="mt-1 text-sm text-zinc-500">
                Manage the templates you will use across the API and dashboard.
              </p>
            </div>

            {templates.length > 0 && (
              <Link href="/dashboard/templates/new">
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  New template
                </Button>
              </Link>
            )}
          </CardHeader>

          <CardContent>
            {templates.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-zinc-300 p-10 text-center dark:border-white/10">
                <FolderKanban className="mx-auto h-10 w-10 text-zinc-400" />
                <h3 className="mt-4 text-xl font-semibold">No templates yet</h3>
                <p className="mt-2 mx-auto max-w-xl text-sm text-zinc-500">
                  Start by creating your first template for Open Graph images, social cards,
                  product highlights, or branded content generation.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link href="/dashboard/templates/new">
                    <Button>Create your first template</Button>
                  </Link>
                  <Link href="/docs">
                    <Button variant="outline">Read the docs</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 xl:grid-cols-2">
                {templates.map((template) => {
                  const elementCount = getJsonElementCount(template.config);

                  return (
                    <div
                      key={template.id}
                      className="overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:shadow-md dark:border-white/10 dark:bg-zinc-950"
                    >
                      <div className="border-b border-zinc-200 bg-zinc-100/70 px-5 py-4 dark:border-white/10 dark:bg-white/5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="truncate text-lg font-semibold">{template.name}</h3>
                              <Badge variant={template.isPublic ? 'default' : 'secondary'}>
                                {template.isPublic ? 'Public' : 'Private'}
                              </Badge>
                            </div>

                            <p className="mt-2 text-sm text-zinc-500">
                              {template.description?.trim()
                                ? template.description
                                : 'No description provided yet.'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-5 p-5">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-white/5">
                            <p className="text-xs uppercase tracking-wide text-zinc-500">
                              Dimensions
                            </p>
                            <p className="mt-2 font-semibold">
                              {template.width} × {template.height}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-white/5">
                            <p className="text-xs uppercase tracking-wide text-zinc-500">
                              Generations
                            </p>
                            <p className="mt-2 font-semibold">
                              {template._count.generations.toLocaleString()}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-white/5">
                            <p className="text-xs uppercase tracking-wide text-zinc-500">
                              Elements
                            </p>
                            <p className="mt-2 font-semibold">{elementCount}</p>
                          </div>

                          <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-white/5">
                            <p className="text-xs uppercase tracking-wide text-zinc-500">
                              Last updated
                            </p>
                            <p className="mt-2 text-sm font-medium">
                              {formatDate(template.updatedAt)}
                            </p>
                          </div>
                        </div>

                        {template.previewUrl ? (
                          <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10">
                            <img
                              src={template.previewUrl}
                              alt={`${template.name} preview`}
                              className="h-auto w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center dark:border-white/10">
                            <Eye className="mx-auto h-8 w-8 text-zinc-400" />
                            <p className="mt-3 text-sm text-zinc-500">
                              No preview image available yet.
                            </p>
                          </div>
                        )}

                        <Separator />

                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 className="h-3.5 w-3.5" />
                            Created {formatDate(template.createdAt)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <FileCode2 className="h-3.5 w-3.5" />
                            JSON-driven config
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Link href={`/dashboard/templates/${template.id}`}>
                            <Button variant="outline" className="gap-2">
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                          </Link>

                          <Link href={`/dashboard/templates/${template.id}/edit`}>
                            <Button variant="outline" className="gap-2">
                              <PencilLine className="h-4 w-4" />
                              Edit
                            </Button>
                          </Link>

                          <Link href={`/dashboard/generations?template=${template.id}`}>
                            <Button variant="outline" className="gap-2">
                              <ImageIcon className="h-4 w-4" />
                              Generations
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}