import {
  pgTable,
  integer,
  jsonb,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import type { ResumeData } from "@/types/resume";

export const resume = pgTable("resume", {
  id: integer("id").primaryKey().default(1),
  data: jsonb("data").$type<ResumeData>().notNull(),
  photoUrl: text("photo_url"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ResumeRow = typeof resume.$inferSelect;
export type NewResumeRow = typeof resume.$inferInsert;
