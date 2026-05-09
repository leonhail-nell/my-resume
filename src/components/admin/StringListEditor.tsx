"use client";

import { useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import type { Path, FieldValues } from "react-hook-form";

export default function StringListEditor<T extends FieldValues>({
  name,
  label,
  placeholder,
}: {
  name: Path<T>;
  label: string;
  placeholder?: string;
}) {
  const { register, watch, setValue } = useFormContext<T>();
  const items = (watch(name) as unknown as string[]) ?? [];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Box sx={{ fontWeight: 500 }}>{label}</Box>
        <Button
          size="small"
          startIcon={<AddIcon />}
          onClick={() =>
            setValue(name, [...items, ""] as unknown as never, { shouldDirty: true })
          }
          sx={{ textTransform: "none" }}
        >
          Add
        </Button>
      </Box>
      <Stack spacing={1}>
        {items.map((_, i) => (
          <Box key={i} sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={placeholder}
              {...register(`${name}.${i}` as Path<T>)}
            />
            <IconButton
              size="small"
              onClick={() => {
                const next = [...items];
                next.splice(i, 1);
                setValue(name, next as unknown as never, { shouldDirty: true });
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
