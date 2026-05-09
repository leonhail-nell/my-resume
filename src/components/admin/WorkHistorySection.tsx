"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import type { ResumeData } from "@/types/resume";
import SectionAccordion from "./SectionAccordion";

function BulletEditor({ jobIndex }: { jobIndex: number }) {
  const { register, watch, setValue } = useFormContext<ResumeData>();
  const bullets = watch(`experience.${jobIndex}.bullets`) ?? [];
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Box sx={{ fontWeight: 500 }}>Bullets</Box>
        <Button
          size="small"
          startIcon={<AddIcon />}
          onClick={() =>
            setValue(`experience.${jobIndex}.bullets`, [...bullets, ""], { shouldDirty: true })
          }
          sx={{ textTransform: "none" }}
        >
          Add bullet
        </Button>
      </Box>
      <Stack spacing={1}>
        {bullets.map((_, i) => (
          <Box key={i} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
            <TextField
              fullWidth
              multiline
              size="small"
              placeholder="Bullet point text"
              {...register(`experience.${jobIndex}.bullets.${i}` as const)}
            />
            <IconButton
              size="small"
              onClick={() => {
                const next = [...bullets];
                next.splice(i, 1);
                setValue(`experience.${jobIndex}.bullets`, next, { shouldDirty: true });
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default function WorkHistorySection() {
  const { control, register } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({ control, name: "experience" });

  return (
    <SectionAccordion title="Work History">
      <Stack spacing={3}>
        {fields.map((field, index) => (
          <Box key={field.id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Box sx={{ fontFamily: "var(--font-serif)", fontSize: 16 }}>
                Job #{index + 1}
              </Box>
              <IconButton size="small" onClick={() => remove(index)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
            <Stack spacing={1.5}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  size="small"
                  fullWidth
                  label="Role"
                  {...register(`experience.${index}.role` as const)}
                />
                <TextField
                  size="small"
                  fullWidth
                  label="Company"
                  {...register(`experience.${index}.company` as const)}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  size="small"
                  fullWidth
                  label="Location"
                  {...register(`experience.${index}.location` as const)}
                />
                <TextField
                  size="small"
                  fullWidth
                  label="Arrangement"
                  placeholder="Remote - Full-time"
                  {...register(`experience.${index}.arrangement` as const)}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  size="small"
                  fullWidth
                  label="Start (YYYY-MM)"
                  {...register(`experience.${index}.startDate` as const)}
                />
                <TextField
                  size="small"
                  fullWidth
                  label="End (YYYY-MM or 'present')"
                  {...register(`experience.${index}.endDate` as const)}
                />
              </Stack>
              <BulletEditor jobIndex={index} />
            </Stack>
            {index < fields.length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={() =>
            append({
              company: "",
              role: "",
              location: "",
              arrangement: "",
              startDate: "",
              endDate: "",
              bullets: [],
            })
          }
          sx={{ textTransform: "none", alignSelf: "flex-start" }}
        >
          Add job
        </Button>
      </Stack>
    </SectionAccordion>
  );
}
