import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadPhoto } from "@/lib/blob";
import { convertHeicToJpegIfNeeded } from "@/lib/imageConvert";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const lowerName = file.name.toLowerCase();
    const isImage =
      file.type.startsWith("image/") ||
      [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"].some((ext) =>
        lowerName.endsWith(ext)
      );
    if (!isImage) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Convert HEIC/HEIF to JPEG so the photo displays in browsers and embeds in PDFs.
    const { buffer, filename, contentType } =
      await convertHeicToJpegIfNeeded(file);

    const url = await uploadPhoto(buffer, filename, contentType);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("[upload] failed:", err);
    const msg = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
