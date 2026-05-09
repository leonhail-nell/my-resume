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
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
