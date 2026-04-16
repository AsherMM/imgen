import type { ReactNode } from 'react';
import { createElement } from 'react';

export type TemplateVariables = Record<string, string | number | boolean>;

export type TemplateDefinition = {
  id: string;
  name: string;
  description: string;
  width: number;
  height: number;
  variables: {
    name: string;
    type: 'string' | 'number' | 'boolean';
    default: string | number | boolean;
    description: string;
  }[];
  render: (vars: TemplateVariables) => ReactNode;
};

// ============================================
// TEMPLATE 1: OG Image (Social Card)
// ============================================
const ogImage: TemplateDefinition = {
  id: 'og-basic',
  name: 'Basic OG Image',
  description: 'Clean Open Graph image for blog posts and pages',
  width: 1200,
  height: 630,
  variables: [
    { name: 'title', type: 'string', default: 'Hello World', description: 'Main title' },
    { name: 'subtitle', type: 'string', default: 'A great subtitle', description: 'Subtitle text' },
    { name: 'brand', type: 'string', default: 'Imgen', description: 'Brand name in corner' },
    { name: 'bgColor', type: 'string', default: '#0f172a', description: 'Background color (hex)' },
    { name: 'accentColor', type: 'string', default: '#6366f1', description: 'Accent color (hex)' },
  ],
  render: (vars) =>
    createElement(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          backgroundColor: String(vars.bgColor || '#0f172a'),
          fontFamily: 'Inter',
          position: 'relative',
        },
      },
      // Accent bar top
      createElement('div', {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: `linear-gradient(to right, ${String(vars.accentColor || '#6366f1')}, ${String(vars.accentColor || '#6366f1')}80)`,
        },
      }),
      // Title
      createElement(
        'div',
        {
          style: {
            fontSize: '64px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: '20px',
            maxWidth: '900px',
          },
        },
        String(vars.title || 'Hello World'),
      ),
      // Subtitle
      createElement(
        'div',
        {
          style: {
            fontSize: '28px',
            fontWeight: 400,
            color: '#94a3b8',
            lineHeight: 1.4,
            maxWidth: '700px',
          },
        },
        String(vars.subtitle || 'A great subtitle'),
      ),
      // Brand bottom-right
      createElement(
        'div',
        {
          style: {
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            fontSize: '24px',
            fontWeight: 700,
            color: String(vars.accentColor || '#6366f1'),
          },
        },
        String(vars.brand || 'Imgen'),
      ),
    ),
};

// ============================================
// TEMPLATE 2: Banner (Marketing)
// ============================================
const banner: TemplateDefinition = {
  id: 'banner-gradient',
  name: 'Gradient Banner',
  description: 'Eye-catching gradient banner for social media',
  width: 1200,
  height: 630,
  variables: [
    { name: 'title', type: 'string', default: 'Your Title Here', description: 'Main title' },
    { name: 'cta', type: 'string', default: 'Learn More →', description: 'Call to action text' },
    { name: 'colorFrom', type: 'string', default: '#7c3aed', description: 'Gradient start color' },
    { name: 'colorTo', type: 'string', default: '#2563eb', description: 'Gradient end color' },
  ],
  render: (vars) =>
    createElement(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${String(vars.colorFrom || '#7c3aed')}, ${String(vars.colorTo || '#2563eb')})`,
          fontFamily: 'Inter',
          textAlign: 'center',
        },
      },
      createElement(
        'div',
        {
          style: {
            fontSize: '56px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
            maxWidth: '800px',
            marginBottom: '30px',
          },
        },
        String(vars.title || 'Your Title Here'),
      ),
      createElement(
        'div',
        {
          style: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#ffffff',
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '12px 32px',
            borderRadius: '8px',
          },
        },
        String(vars.cta || 'Learn More →'),
      ),
    ),
};

// ============================================
// TEMPLATE 3: Certificate
// ============================================
const certificate: TemplateDefinition = {
  id: 'certificate-simple',
  name: 'Simple Certificate',
  description: 'Clean certificate for courses and achievements',
  width: 1200,
  height: 850,
  variables: [
    { name: 'recipientName', type: 'string', default: 'John Doe', description: 'Recipient name' },
    { name: 'courseName', type: 'string', default: 'Advanced TypeScript', description: 'Course or achievement name' },
    { name: 'issuerName', type: 'string', default: 'Imgen Academy', description: 'Issuer organization' },
    { name: 'date', type: 'string', default: '2026-04-16', description: 'Date of issuance' },
  ],
  render: (vars) =>
    createElement(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          fontFamily: 'Inter',
          border: '3px solid #e2e8f0',
          position: 'relative',
        },
      },
      // Decorative border
      createElement('div', {
        style: {
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
          bottom: '20px',
          border: '2px solid #6366f1',
          borderRadius: '4px',
        },
      }),
      createElement(
        'div',
        {
          style: {
            fontSize: '18px',
            fontWeight: 400,
            color: '#6366f1',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            marginBottom: '20px',
          },
        },
        'Certificate of Completion',
      ),
      createElement(
        'div',
        {
          style: {
            fontSize: '48px',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '16px',
          },
        },
        String(vars.recipientName || 'John Doe'),
      ),
      createElement(
        'div',
        {
          style: {
            fontSize: '20px',
            fontWeight: 400,
            color: '#64748b',
            marginBottom: '8px',
          },
        },
        'has successfully completed',
      ),
      createElement(
        'div',
        {
          style: {
            fontSize: '32px',
            fontWeight: 700,
            color: '#1e293b',
            marginBottom: '40px',
          },
        },
        String(vars.courseName || 'Advanced TypeScript'),
      ),
      createElement(
        'div',
        {
          style: {
            fontSize: '16px',
            fontWeight: 400,
            color: '#94a3b8',
          },
        },
        `Issued by ${String(vars.issuerName || 'Imgen Academy')} • ${String(vars.date || '2026-04-16')}`,
      ),
    ),
};

// ============================================
// REGISTRY
// ============================================
export const TEMPLATES: Record<string, TemplateDefinition> = {
  'og-basic': ogImage,
  'banner-gradient': banner,
  'certificate-simple': certificate,
};

export const TEMPLATE_LIST = Object.values(TEMPLATES);

export function getTemplate(id: string): TemplateDefinition | null {
  return TEMPLATES[id] ?? null;
}