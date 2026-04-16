import { resend, RESEND_FROM } from './client';
import WelcomeEmail from '../../../emails/welcome';

export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string;
  name: string;
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  try {
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to,
      subject: 'Welcome to Imgen',
      react: WelcomeEmail({
        name,
        dashboardUrl: `${appUrl}/dashboard`,
      }),
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Failed to send welcome email:', err);
    return { success: false, error: err };
  }
}