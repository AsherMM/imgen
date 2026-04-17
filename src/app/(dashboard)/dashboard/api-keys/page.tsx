'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  KeyRound,
  Plus,
  Trash2,
  Copy,
  Check,
  AlertTriangle,
  Sparkles,
  Home,
  FolderKanban,
  ImageIcon,
  CreditCard,
  LogOut,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */

type ApiKeyDisplay = {
  id: string;
  name: string;
  prefix: string;
  lastUsedAt: string | null;
  createdAt: string;
};

/* ═══════════════════════════════════════════
   DASHBOARD NAV (same as main dashboard)
   ═══════════════════════════════════════════ */

const dashboardNav = [
  { label: 'Overview', href: '/dashboard', icon: Home },
  { label: 'Templates', href: '/dashboard/templates', icon: FolderKanban },
  { label: 'API Keys', href: '/dashboard/api-keys', icon: KeyRound },
  { label: 'Generations', href: '/dashboard/generations', icon: ImageIcon },
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
];

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */

function formatDate(value: string | null | undefined) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function timeAgo(value: string | null | undefined) {
  if (!value) return 'Never';
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(value);
}

/* ═══════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════ */

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKeyDisplay[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showRevealDialog, setShowRevealDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ApiKeyDisplay | null>(null);
  const [copied, setCopied] = useState(false);
  const [deleting, startDeleteTransition] = useTransition();

  // Load keys on mount
  useState(() => {
    fetch('/api/dashboard/api-keys')
      .then((res) => res.json())
      .then((data) => {
        if (data.keys) setKeys(data.keys);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
        toast.error('Failed to load API keys');
      });
  });

  async function handleCreate() {
    if (!newKeyName.trim()) {
      toast.error('Please enter a name for your API key');
      return;
    }

    setCreating(true);

    try {
      const res = await fetch('/api/dashboard/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? 'Failed to create API key');
        return;
      }

      // Add to list
      setKeys((prev) => [data.key, ...prev]);

      // Show the raw key (only time it's visible)
      setRevealedKey(data.rawKey);
      setShowCreateDialog(false);
      setShowRevealDialog(true);
      setNewKeyName('');

      toast.success('API key created');
    } catch {
      toast.error('Failed to create API key');
    } finally {
      setCreating(false);
    }
  }

  function handleDeleteClick(key: ApiKeyDisplay) {
    setDeleteTarget(key);
    setShowDeleteDialog(true);
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;

    startDeleteTransition(async () => {
      try {
        const res = await fetch(`/api/dashboard/api-keys/${deleteTarget.id}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          toast.error('Failed to delete API key');
          return;
        }

        setKeys((prev) => prev.filter((k) => k.id !== deleteTarget.id));
        setShowDeleteDialog(false);
        setDeleteTarget(null);
        toast.success('API key deleted');
      } catch {
        toast.error('Failed to delete API key');
      }
    });
  }

  async function handleCopy() {
    if (!revealedKey) return;
    try {
      await navigator.clipboard.writeText(revealedKey);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50/70 dark:bg-black">
      {/* ─── HEADER ─── */}
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
                const isActive = item.href === '/dashboard/api-keys';
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
            <Link
              href="/docs"
              className="hidden text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white sm:inline-flex"
            >
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

      {/* ─── MAIN ─── */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        {/* Page header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Create and manage API keys to authenticate your requests to the Pixelizea API.
            </p>
          </div>
          <Button className="gap-2" onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4" />
            Create API key
          </Button>
        </div>

        {/* Security notice */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-zinc-500" />
            <div>
              <p className="text-sm font-medium">How API keys work</p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                API keys are used to authenticate requests. Include your key in the{' '}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-white/10">
                  Authorization
                </code>{' '}
                header as{' '}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-white/10">
                  Bearer imgen_xxxxx
                </code>
                . Keys are shown only once at creation — store them securely.
              </p>
            </div>
          </div>
        </div>

        {/* Keys list */}
        <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your API keys</span>
              <Badge variant="secondary">{keys.length} key{keys.length !== 1 ? 's' : ''}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!loaded ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-24 animate-pulse rounded-2xl bg-zinc-100 dark:bg-white/5"
                  />
                ))}
              </div>
            ) : keys.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center dark:border-white/10">
                <KeyRound className="mx-auto h-12 w-12 text-zinc-400" />
                <h3 className="mt-4 text-lg font-semibold">No API keys yet</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
                  Create your first API key to start generating images programmatically. You can
                  create multiple keys for different environments or integrations.
                </p>
                <Button className="mt-6 gap-2" onClick={() => setShowCreateDialog(true)}>
                  <Plus className="h-4 w-4" />
                  Create your first key
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {keys.map((key) => (
                  <div
                    key={key.id}
                    className="flex flex-col gap-4 rounded-2xl border border-zinc-200 p-5 transition hover:border-zinc-300 dark:border-white/10 dark:hover:border-white/20 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <KeyRound className="h-4 w-4 text-zinc-500" />
                        <p className="font-medium">{key.name}</p>
                        <Badge variant="secondary">Active</Badge>
                      </div>

                      <p className="font-mono text-sm text-zinc-500">
                        imgen_{key.prefix}_••••••••••••
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                        <span>Created: {formatDate(key.createdAt)}</span>
                        <span>Last used: {timeAgo(key.lastUsedAt)}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300"
                      onClick={() => handleDeleteClick(key)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Revoke
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Usage hint */}
        <Card className="rounded-3xl border-zinc-200 shadow-sm dark:border-white/10">
          <CardHeader>
            <CardTitle className="text-lg">Quick start</CardTitle>
          </CardHeader>
          <CardContent>
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
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"template": "og-basic", "variables": {"title": "Hello World"}}'`}</code>
                </pre>
              </div>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Replace{' '}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-white/10">
                YOUR_API_KEY
              </code>{' '}
              with one of your keys above.{' '}
              <Link href="/docs" className="font-medium text-zinc-900 hover:underline dark:text-white">
                Read the full documentation →
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════
         DIALOGS
         ═══════════════════════════════════════════ */}

      {/* Create dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create API key</DialogTitle>
            <DialogDescription>
              Give your key a descriptive name so you can identify it later (e.g. &quot;Production
              server&quot;, &quot;Zapier integration&quot;).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="key-name">Key name</Label>
              <Input
                id="key-name"
                placeholder="e.g. Production, Staging, Zapier..."
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreate();
                }}
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={creating || !newKeyName.trim()}>
                {creating ? 'Creating...' : 'Create key'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reveal dialog (shown once after creation) */}
      <Dialog
        open={showRevealDialog}
        onOpenChange={(open) => {
          if (!open) {
            setRevealedKey(null);
            setCopied(false);
          }
          setShowRevealDialog(open);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Your new API key</DialogTitle>
            <DialogDescription>
              Copy this key now. For security, it will not be shown again after you close this dialog.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  This is the only time this key will be displayed. Store it in a secure location
                  like a password manager or environment variable.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-black">
                <code className="block overflow-x-auto p-4 text-sm">
                  {revealedKey}
                </code>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 gap-2"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setShowRevealDialog(false)}>Done</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Revoke API key</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke{' '}
              <span className="font-medium text-zinc-900 dark:text-white">
                {deleteTarget?.name}
              </span>
              ? Any integrations using this key will immediately stop working. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleting}
            >
              {deleting ? 'Revoking...' : 'Revoke key'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}