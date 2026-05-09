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

export default function EducationSection() {
  const { control, register } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({ control, name: "education" });

  return (
    <SectionAccordion title="Education">
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
                Education #{index + 1}
              </Box>
              <IconButton size="small" onClick={() => remove(index)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
            <Stack spacing={1.5}>
              <TextField
                size="small"
                fullWidth
                label="Degree"
                {...register(`education.${index}.degree` as const)}
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  size="small"
                  fullWidth
                  label="School"
                  {...register(`education.${index}.school` as const)}
                />
                <TextField
                  size="small"
                  fullWidth
                  label="Location"
                  {...register(`education.${index}.location` as const)}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  size="small"
                  fullWidth
                  label="Start (YYYY-MM)"
                  {...register(`education.${index}.startDate` as const)}
                />
                <TextField
                  size="small"
                  fullWidth
                  label="End (YYYY-MM)"
                  {...register(`education.${index}.endDate` as const)}
                />
              </Stack>
            </Stack>
            {index < fields.length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={() =>
            append({
              school: "",
              degree: "",
              location: "",
              startDate: "",
              endDate: "",
            })
          }
          sx={{ textTransform: "none", alignSelf: "flex-start" }}
        >
          Add education
        </Button>
      </Stack>
    </SectionAccordion>
  );
}
