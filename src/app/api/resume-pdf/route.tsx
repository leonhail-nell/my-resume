import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getResume } from "@/lib/resume";
import { ResumePDF } from "@/pdf/ResumePDF";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * Fetch a remote image and convert to a base64 data URL that
 * @react-pdf/renderer can embed inline.
 */
async function fetchImageAsDataUrl(url: string): Promise<string | undefined> {
  try {
    console.log(`[pdf] Fetching photo: ${url}`);
    const res = await fetch(url, { cache: "no-store", redirect: "follow" });
    console.log(
      `[pdf] Photo response: status=${res.status} content-type=${res.headers.get(
        "content-type"
      )}`
    );
    if (!res.ok) {
      console.warn(`[pdf] Photo fetch failed: ${res.status} ${res.statusText}`);
      return undefined;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    let contentType =
      res.headers.get("content-type")?.split(";")[0].trim() || "";
    // @react-pdf/renderer supports JPG and PNG reliably. Default to JPEG.
    if (!contentType.startsWith("image/")) {
      // Sniff by URL extension as fallback
      const ext = url.toLowerCase().split(".").pop()?.split("?")[0];
      contentType =
        ext === "png" ? "image/png" :
        ext === "webp" ? "image/png" : // pdf-renderer may not handle webp; convert later if needed
        "image/jpeg";
    }
    // PDF renderer requires "image/jpeg" or "image/png"; normalize webp to jpeg
    if (contentType === "image/webp") contentType = "image/jpeg";
    const dataUrl = `data:${contentType};base64,${buf.toString("base64")}`;
    console.log(`[pdf] Photo encoded, length=${dataUrl.length}`);
    return dataUrl;
  } catch (err) {
    console.warn("[pdf] Photo fetch threw:", err);
    return undefined;
  }
}

export async function GET() {
  try {
    const { data } = await getResume();

    console.log(`[pdf] photoUrl in data: ${data.profile.photoUrl ?? "(none)"}`);

    const photoDataUrl = data.profile.photoUrl
      ? await fetchImageAsDataUrl(data.profile.photoUrl)
      : undefined;

    const buffer = await renderToBuffer(
      <ResumePDF data={data} photoDataUrl={photoDataUrl} />
    );

    const filename = `${data.profile.name.replace(/\s+/g, "_")}-Resume.pdf`;
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(buffer.length),
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[pdf] PDF generation failed:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    const stack = err instanceof Error ? err.stack : "";
    return NextResponse.json(
      { error: "PDF generation failed", message, stack },
      { status: 500 }
    );
  }
}
