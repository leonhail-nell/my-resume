"use client";

import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PhotoUploader({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error(await res.text());
      const { url } = (await res.json()) as { url: string };
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar
        src={value ?? undefined}
        sx={{
          width: 100,
          height: 100,
          bgcolor: "#E5E5E5",
          color: "#9E9E9E",
          border: "1px solid #D8D8D8",
        }}
      >
        {!value && <PersonIcon sx={{ fontSize: 56 }} />}
      </Avatar>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        <Button
          variant="outlined"
          startIcon={uploading ? <CircularProgress size={16} /> : <UploadIcon />}
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          sx={{ textTransform: "none" }}
        >
          {uploading ? "Uploading…" : value ? "Replace photo" : "Upload photo"}
        </Button>
        {value && (
          <Button
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => onChange(null)}
            sx={{ textTransform: "none" }}
          >
            Remove
          </Button>
        )}
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
