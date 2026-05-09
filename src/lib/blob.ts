import { put } from "@vercel/blob";

export async function uploadPhoto(
  file: File | Blob,
  filename: string
): Promise<string> {
  const blob = await put(`profile/${Date.now()}-${filename}`, file, {
    access: "public",
    addRandomSuffix: false,
  });
  return blob.url;
}
