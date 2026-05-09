"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ResumeData } from "@/types/resume";
import { getSkillIcon, levelOpacity, SUGGESTED_ICONS } from "@/lib/skillIcons";
import SectionAccordion from "./SectionAccordion";

function IconPreview({ name, level }: { name?: string; level: number }) {
  const Icon = getSkillIcon(name);
  if (!Icon) {
    return (
      <Box
        sx={{
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px dashed",
          borderColor: "divider",
          color: "text.disabled",
          fontSize: 11,
        }}
      >
        ?
      </Box>
    );
  }
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: levelOpacity(level),
        color: "text.primary",
      }}
    >
      <Icon size={22} />
    </Box>
  );
}

export default function SkillsSection() {
  const { control, register, watch, setValue } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  return (
    <SectionAccordion title="Skills">
      <Stack spacing={1.5}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
            fontSize: 12,
            mb: 0.5,
          }}
        >
          <HelpOutlineIcon sx={{ fontSize: 16 }} />
          <span>
            Icon names come from{" "}
            <Link
              href="https://react-icons.github.io/react-icons/icons/si/"
              target="_blank"
              rel="noopener"
            >
              react-icons (Simple Icons)
            </Link>
            . Examples: <code>SiPhp</code>, <code>SiReact</code>,{" "}
            <code>SiTypescript</code>. Leave blank for no icon.
          </span>
        </Box>

        {fields.map((field, index) => {
          const name = watch(`skills.${index}.name`);
          const level = watch(`skills.${index}.level`) ?? 3;
          const icon = watch(`skills.${index}.icon`);
          return (
            <Box
              key={field.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "auto 1fr 1fr 200px auto",
                gap: 1.5,
                alignItems: "center",
              }}
            >
              <IconPreview name={icon} level={level} />
              <TextField
                size="small"
                placeholder="Skill name"
                {...register(`skills.${index}.name` as const)}
              />
              <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                <TextField
                  size="small"
                  placeholder="Icon (e.g., SiPhp)"
                  fullWidth
                  {...register(`skills.${index}.icon` as const)}
                />
                {SUGGESTED_ICONS[name?.toUpperCase()] &&
                  SUGGESTED_ICONS[name?.toUpperCase()] !== icon && (
                    <Tooltip
                      title={`Use suggested: ${SUGGESTED_ICONS[name.toUpperCase()]}`}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          minWidth: 0,
                          px: 1,
                          textTransform: "none",
                          fontSize: 11,
                        }}
                        onClick={() =>
                          setValue(
                            `skills.${index}.icon`,
                            SUGGESTED_ICONS[name.toUpperCase()],
                            { shouldDirty: true }
                          )
                        }
                      >
                        Use
                      </Button>
                    </Tooltip>
                  )}
              </Box>
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
          onClick={() => append({ name: "", level: 3, icon: "" })}
          sx={{ textTransform: "none", alignSelf: "flex-start" }}
        >
          Add skill
        </Button>
      </Stack>
    </SectionAccordion>
  );
}
