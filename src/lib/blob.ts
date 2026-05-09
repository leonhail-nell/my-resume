import { put } from "@vercel/blob";

/**
 * Upload bytes to Vercel Blob and return the public URL.
 */
export async function uploadPhoto(
  data: Uint8Array | Buffer | Blob | File,
  filename: string,
  contentType?: string
): Promise<string> {
  const blob = await put(`profile/${Date.now()}-${filename}`, data, {
    access: "public",
    addRandomSuffix: false,
    contentType,
  });
  return blob.url;
}
