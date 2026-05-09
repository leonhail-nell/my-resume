"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import type { ResumeData } from "@/types/resume";
import SectionAccordion from "./SectionAccordion";

export default function ProjectsSection() {
  const { control, register } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({ control, name: "projects" });

  return (
    <SectionAccordion title="My Work / Projects">
      <Stack spacing={1.5}>
        {fields.map((field, index) => (
          <Box
            key={field.id}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr auto",
              gap: 1.5,
              alignItems: "center",
            }}
          >
            <TextField
              size="small"
              placeholder="Project name"
              {...register(`projects.${index}.name` as const)}
            />
            <TextField
              size="small"
              placeholder="Description"
              {...register(`projects.${index}.description` as const)}
            />
            <IconButton size="small" onClick={() => remove(index)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={() => append({ name: "", description: "" })}
          sx={{ textTransform: "none", alignSelf: "flex-start" }}
        >
          Add project
        </Button>
      </Stack>
    </SectionAccordion>
  );
}
