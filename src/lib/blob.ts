import { put } from "@vercel/blob";

/**
 * Upload bytes (or an existing Blob/File) to Vercel Blob and return the public URL.
 * Wraps Uint8Array/Buffer in a Blob since @vercel/blob's `put()` types
 * don't accept raw byte arrays.
 */
export async function uploadPhoto(
  data: Uint8Array | Buffer | Blob | File,
  filename: string,
  contentType?: string
): Promise<string> {
  const body: Blob =
    data instanceof Blob
      ? data
      : new Blob([data as BlobPart], {
          type: contentType ?? "application/octet-stream",
        });

  const blob = await put(`profile/${Date.now()}-${filename}`, body, {
    access: "public",
    addRandomSuffix: false,
    contentType,
  });
  return blob.url;
}
