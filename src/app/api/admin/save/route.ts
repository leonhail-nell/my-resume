import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { saveResume } from "@/lib/resume";
import type { ResumeData } from "@/types/resume";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as ResumeData;
    const photoUrl = body.profile?.photoUrl ?? null;
    await saveResume(body, photoUrl);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Save failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
