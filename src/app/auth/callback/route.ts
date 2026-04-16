import { NextResponse } from 'next/server';
import { createClient } from '@/src/lib/supabase/server';
import { db } from '@/src/lib/db';
import { sendWelcomeEmail } from '@/src/lib/resend/helpers';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';
  
  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.user) {
      // Sync user into our DB
      await db.user.upsert({
        where: { id: data.user.id },
        update: {
          email: data.user.email!,
          name: data.user.user_metadata?.name ?? data.user.user_metadata?.full_name ?? null,
          avatarUrl: data.user.user_metadata?.avatar_url ?? null,
        },
        create: {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name ?? data.user.user_metadata?.full_name ?? null,
          avatarUrl: data.user.user_metadata?.avatar_url ?? null,
        },
      });
      const wasNewUser = data.user.created_at === data.user.updated_at;
      if (wasNewUser && data.user.email) {
      await sendWelcomeEmail({
          to: data.user.email,
          name: data.user.user_metadata?.name ?? 'there',
      });
}
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}