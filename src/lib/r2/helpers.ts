import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2, R2_BUCKET, R2_PUBLIC_URL } from './client';

export type UploadImageInput = {
  buffer: Buffer;
  key: string;
  contentType: 'image/png' | 'image/jpeg' | 'image/webp';
};

/**
 * Upload an image buffer to R2.
 * Returns the public URL.
 */
export async function uploadImage({
  buffer,
  key,
  contentType,
}: UploadImageInput): Promise<string> {
  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  );

  return `${R2_PUBLIC_URL}/${key}`;
}

/**
 * Delete an image from R2.
 */
export async function deleteImage(key: string): Promise<void> {
  await r2.send(
    new DeleteObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
    }),
  );
}

/**
 * Get a signed URL for private reading (expires in 1 hour by default).
 */
export async function getSignedDownloadUrl(
  key: string,
  expiresInSeconds = 3600,
): Promise<string> {
  return getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
    }),
    { expiresIn: expiresInSeconds },
  );
}

/**
 * Generate a key for storing a generated image.
 * Format: generations/{userId}/{generationId}.{format}
 */
export function generateImageKey(
  userId: string,
  generationId: string,
  format: 'png' | 'jpeg' | 'webp' = 'png',
): string {
  return `generations/${userId}/${generationId}.${format}`;
}