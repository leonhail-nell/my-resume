/**
 * Convert HEIC/HEIF images to JPEG so they work in browsers and PDF renderers.
 * iPhone photos are typically HEIC by default; Chrome can't display them and
 * @react-pdf/renderer can't embed them.
 */
import convert from "heic-convert";

export type ProcessedImage = {
  buffer: Uint8Array;
  filename: string;
  contentType: string;
};

export async function convertHeicToJpegIfNeeded(
  file: File
): Promise<ProcessedImage> {
  const lowerName = file.name.toLowerCase();
  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    lowerName.endsWith(".heic") ||
    lowerName.endsWith(".heif");

  const arrayBuffer = await file.arrayBuffer();

  if (!isHeic) {
    return {
      buffer: new Uint8Array(arrayBuffer),
      filename: file.name,
      contentType: file.type || "application/octet-stream",
    };
  }

  console.log(`[upload] Converting HEIC to JPEG: ${file.name}`);
  // heic-convert's types expect ArrayBufferLike, so pass the raw ArrayBuffer.
  // Cast handles drift between @types/node generics and the lib's older types.
  const jpegBuffer = await convert({
    buffer: arrayBuffer as Parameters<typeof convert>[0]["buffer"],
    format: "JPEG",
    quality: 0.9,
  });

  return {
    buffer: new Uint8Array(jpegBuffer),
    filename: file.name.replace(/\.(heic|heif)$/i, ".jpg"),
    contentType: "image/jpeg",
  };
}
