"use client";

import { useFormContext } from "react-hook-form";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import type { ResumeData } from "@/types/resume";
import SectionAccordion from "./SectionAccordion";
import StringListEditor from "./StringListEditor";

export default function BasicInfoSection() {
  const { register } = useFormContext<ResumeData>();
  return (
    <SectionAccordion title="Basic Information">
      <Stack spacing={2}>
        <StringListEditor<ResumeData>
          name="basicInfo.address"
          label="Address (one line per row)"
          placeholder="e.g., San Francisco, Panabo City"
        />
        <TextField label="Birthday" fullWidth {...register("basicInfo.birthday")} />
        <StringListEditor<ResumeData>
          name="basicInfo.hobbies"
          label="Hobbies"
          placeholder="e.g., Playing Basketball"
        />
      </Stack>
    </SectionAccordion>
  );
}
