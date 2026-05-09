import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getResume } from "@/lib/resume";
import { ResumePDF } from "@/pdf/ResumePDF";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { data } = await getResume();
  const buffer = await renderToBuffer(<ResumePDF data={data} />);

  const filename = `${data.profile.name.replace(/\s+/g, "_")}-Resume.pdf`;
  // Wrap Buffer in Uint8Array so it satisfies NextResponse's BodyInit type
  // (newer @types/node makes Buffer extend ArrayBufferLike instead of Uint8Array).
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
