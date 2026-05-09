"use client";

import { useFormContext, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import type { ResumeData } from "@/types/resume";
import SectionAccordion from "./SectionAccordion";
import PhotoUploader from "./PhotoUploader";

export default function ProfileSection() {
  const { control, register, watch, setValue } = useFormContext<ResumeData>();
  const githubs = watch("profile.github") ?? [];

  return (
    <SectionAccordion title="Profile" defaultExpanded>
      <Stack spacing={2}>
        <Controller
          name="profile.photoUrl"
          control={control}
          render={({ field }) => (
            <PhotoUploader
              value={field.value ?? null}
              onChange={(url) => field.onChange(url)}
            />
          )}
        />

        <TextField label="Full name" fullWidth {...register("profile.name")} />
        <TextField label="Title" fullWidth {...register("profile.title")} />
        <TextField
          label="Bio / summary"
          fullWidth
          multiline
          minRows={3}
          {...register("profile.bio")}
        />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField label="Phone" fullWidth {...register("profile.phone")} />
          <TextField label="Email" fullWidth {...register("profile.email")} />
        </Stack>

        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Box sx={{ fontWeight: 500 }}>GitHub usernames</Box>
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setValue("profile.github", [...githubs, ""], { shouldDirty: true })}
              sx={{ textTransform: "none" }}
            >
              Add
            </Button>
          </Box>
          <Stack spacing={1}>
            {githubs.map((_, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="github-username"
                  {...register(`profile.github.${i}` as const)}
                />
                <IconButton
                  size="small"
                  onClick={() => {
                    const next = [...githubs];
                    next.splice(i, 1);
                    setValue("profile.github", next, { shouldDirty: true });
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </SectionAccordion>
  );
}
