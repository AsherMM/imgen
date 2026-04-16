import { createClient } from '@/src/lib/supabase/server';
import { redirect } from 'next/navigation';
import { db } from '@/src/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Sync user if not already
  const dbUser = await db.user.upsert({
    where: { id: user.id },
    update: { email: user.email! },
    create: {
      id: user.id,
      email: user.email!,
      name: user.user_metadata?.name ?? null,
    },
  });

  return (
    <div className="container mx-auto p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {dbUser.name ?? dbUser.email}</p>
        </div>
        <form action="/api/auth/signout" method="post">
          <Button variant="outline" type="submit">Sign out</Button>
        </form>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current plan: {dbUser.plan}</CardTitle>
        </CardHeader>
        <CardContent>
          <Link href="/pricing">
            <Button>Upgrade</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}