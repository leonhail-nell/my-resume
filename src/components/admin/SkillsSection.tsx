"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ResumeData } from "@/types/resume";
import SectionAccordion from "./SectionAccordion";

export default function SkillsSection() {
  const { control, register, watch, setValue } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  return (
    <SectionAccordion title="Skills">
      <Stack spacing={1.5}>
        {fields.map((field, index) => {
          const level = watch(`skills.${index}.level`) ?? 3;
          return (
            <Box
              key={field.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 200px auto",
                gap: 2,
                alignItems: "center",
              }}
            >
              <TextField
                size="small"
                placeholder="Skill name"
                {...register(`skills.${index}.name` as const)}
              />
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Level: {level}
                </Typography>
                <Slider
                  size="small"
                  min={1}
                  max={5}
                  step={1}
                  marks
                  value={level}
                  onChange={(_, v) =>
                    setValue(`skills.${index}.level`, v as 1 | 2 | 3 | 4 | 5, {
                      shouldDirty: true,
                    })
                  }
                />
              </Box>
              <IconButton size="small" onClick={() => remove(index)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          );
        })}
        <Button
          startIcon={<AddIcon />}
          onClick={() => append({ name: "", level: 3 })}
          sx={{ textTransform: "none", alignSelf: "flex-start" }}
        >
          Add skill
        </Button>
      </Stack>
    </SectionAccordion>
  );
}
