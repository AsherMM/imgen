import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@resvg/resvg-js', '@resvg/resvg-js-win32-x64-msvc'],
};

export default withSentryConfig(nextConfig, {
  org: 'asherm',
  project: 'asherm',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  automaticVercelMonitors: true,
  disableLogger: true,
});