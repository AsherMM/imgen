import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  Eye,
  FileCode2,
  Globe,
  ImageIcon,
  Lock,
  Sparkles,
} from 'lucide-react';

import { createClient } from '@/src/lib/supabase/server';
import { db } from '@/src/lib/db';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'New Template — Pixelizea',
  description: 'Create a new reusable image template in Pixelizea.',
  robots: {
    index: false,
    follow: false,
  },
};

const starterPresets = [
  {
    id: 'og-basic',
    name: 'Open Graph Basic',
    description: 'A simple 1200×630 social sharing template for blog posts and landing pages.',
  },
  {
    id: 'product-spotlight',
    name: 'Product Spotlight',
    description: 'A promo-focused layout for products, launches, and feature highlights.',
  },
  {
    id: 'quote-card',
    name: 'Quote Card',
    description: 'A clean quote visual for social media, testimonials, and founder posts.',
  },
];

const defaultConfig = {
  background: {
    type: 'solid',
    color: '#0f172a',
  },
  elements: [
    {
      id: 'title',
      type: 'text',
      text: '{{title}}',
      x: 80,
      y: 110,
      fontSize: 64,
      fontWeight: 700,
      color: '#ffffff',
      maxWidth: 920,
      lineHeight: 1.1,
    },
    {
      id: 'subtitle',
      type: 'text',
      text: '{{subtitle}}',
      x: 80,
      y: 320,
      fontSize: 28,
      fontWeight: 400,
      color: '#cbd5e1',
      maxWidth: 860,
      lineHeight: 1.4,
    },
    {
      id: 'brand',
      type: 'text',
      text: '{{brand}}',
      x: 80,
      y: 540,
      fontSize: 24,
      fontWeight: 700,
      color: '#818cf8',
    },
  ],
};

function prettyJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export default async function NewTemplatePage() {
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

  const existingTemplateCount = await db.template.count({
    where: { userId: dbUser.id },
  });

  return (
    <div className="min-h-screen bg-zinc-50/70 dark:bg-black">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-5 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-3">
              <Link
                href="/dashboard/templates"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to templates
              </Link>

              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">Create a new template</h1>
                <Badge variant="secondary">Template Builder</Badge>
              </div>

              <p className="max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
                Build a reusable visual template for Open Graph images, social cards, product
                visuals, or branded assets. Start simple now, then evolve it later with a richer
                editor.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard/templates">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" form="new-template-form">
                Create template
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <FileCode2 className="h-3.5 w-3.5" />
              JSON-based configuration
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5" />
              Optimized for 1200×630 by default
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              {existingTemplateCount} template{existingTemplateCount === 1 ? '' : 's'} in your workspace
            </span>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <form
            id="new-template-form"
            action="/dashboard/templates/new"
            method="post"
            className="space-y-6"
          >
            <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-xl">Template details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">Template name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="OG Basic Dark"
                    required
                    maxLength={120}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="A clean social card for blog posts, docs, and landing pages."
                    className="min-h-28"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    name="width"
                    type="number"
                    min={100}
                    max={4096}
                    defaultValue={1200}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    min={100}
                    max={4096}
                    defaultValue={630}
                    required
                  />
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label>Visibility</Label>

                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 p-4 transition hover:border-zinc-300 dark:border-white/10 dark:hover:border-white/20">
                      <input
                        type="radio"
                        name="visibility"
                        value="private"
                        defaultChecked
                        className="mt-1"
                      />
                      <div>
                        <div className="flex items-center gap-2 font-medium">
                          <Lock className="h-4 w-4" />
                          Private
                        </div>
                        <p className="mt-1 text-sm text-zinc-500">
                          Visible only inside your workspace.
                        </p>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 p-4 transition hover:border-zinc-300 dark:border-white/10 dark:hover:border-white/20">
                      <input type="radio" name="visibility" value="public" className="mt-1" />
                      <div>
                        <div className="flex items-center gap-2 font-medium">
                          <Globe className="h-4 w-4" />
                          Public
                        </div>
                        <p className="mt-1 text-sm text-zinc-500">
                          Useful if you later want shareable or community templates.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-xl">Template configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600 dark:bg-white/5 dark:text-zinc-400">
                  Start with a clean JSON config. You can later connect this to a visual editor or a
                  richer template builder.
                </div>

                <div className="space-y-2">
                  <Label htmlFor="config">Config JSON</Label>
                  <Textarea
                    id="config"
                    name="config"
                    className="min-h-[420px] font-mono text-xs leading-6"
                    defaultValue={prettyJson(defaultConfig)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-3">
              <Button type="submit">Create template</Button>
              <Link href="/dashboard/templates">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>

          <div className="space-y-6">
            <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-xl">Starter presets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {starterPresets.map((preset) => (
                  <div
                    key={preset.id}
                    className="rounded-2xl border border-zinc-200 p-4 dark:border-white/10"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{preset.name}</p>
                      <Badge variant="outline">{preset.id}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-zinc-500">{preset.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-xl">Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-start gap-3">
                  <Eye className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    Use 1200×630 for Open Graph and social preview images. It is the safest default
                    for your first template.
                  </p>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    Keep your first template simple: one background, one title, one subtitle, one
                    brand field. Complexity can come later.
                  </p>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <FileCode2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    Stick to predictable variable names like <code>title</code>, <code>subtitle</code>,{' '}
                    <code>brand</code>, and <code>image</code> so your API payloads stay clean.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}