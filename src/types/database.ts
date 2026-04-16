import type { User, ApiKey, Template, Generation, Usage, Plan } from '@prisma/client';

export type { User, ApiKey, Template, Generation, Usage, Plan };

// Types étendus
export type UserWithSubscription = User;

export type TemplateWithPreview = Template & {
  previewUrl: string | null;
};

// Helpers
export type CreateApiKeyInput = {
  name: string;
  userId: string;
};

export type GenerationRequest = {
  templateId: string;
  variables: Record<string, string | number | boolean>;
  format?: 'png' | 'jpeg' | 'webp';
};