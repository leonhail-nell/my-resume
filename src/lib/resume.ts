import { eq } from "drizzle-orm";
import { db } from "./db";
import { resume } from "./schema";
import { DEFAULT_RESUME, type ResumeData } from "@/types/resume";

/**
 * Fetch the (single) resume row. If none exists yet, seed with DEFAULT_RESUME.
 */
export async function getResume(): Promise<{
  data: ResumeData;
  photoUrl: string | null;
  updatedAt: Date | null;
}> {
  try {
    const rows = await db.select().from(resume).where(eq(resume.id, 1)).limit(1);
    if (rows.length > 0) {
      const row = rows[0];
      const data = (row.data ?? DEFAULT_RESUME) as ResumeData;
      return {
        data: { ...data, profile: { ...data.profile, photoUrl: row.photoUrl } },
        photoUrl: row.photoUrl,
        updatedAt: row.updatedAt,
      };
    }
  } catch (err) {
    // DB not configured yet — fall through to defaults so the page still renders.
    console.warn("getResume(): DB unavailable, returning defaults.", err);
  }
  return { data: DEFAULT_RESUME, photoUrl: null, updatedAt: null };
}

/**
 * Upsert the single resume row.
 */
export async function saveResume(
  data: ResumeData,
  photoUrl: string | null
): Promise<void> {
  await db
    .insert(resume)
    .values({ id: 1, data, photoUrl })
    .onConflictDoUpdate({
      target: resume.id,
      set: { data, photoUrl, updatedAt: new Date() },
    });
}
