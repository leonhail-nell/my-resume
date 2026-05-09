"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function SaveBar({
  saving,
  dirty,
  onSave,
  onDiscard,
}: {
  saving: boolean;
  dirty: boolean;
  onSave: () => void;
  onDiscard: () => void;
}) {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        bgcolor: "#FFF",
        border: "1px solid",
        borderColor: "divider",
        p: 1.5,
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body2" sx={{ color: dirty ? "warning.main" : "text.secondary" }}>
        {dirty ? "Unsaved changes" : "All changes saved"}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          onClick={onDiscard}
          disabled={!dirty || saving}
          sx={{ textTransform: "none" }}
        >
          Discard
        </Button>
        <Button
          variant="contained"
          onClick={onSave}
          disabled={!dirty || saving}
          startIcon={saving ? <CircularProgress size={16} color="inherit" /> : undefined}
          sx={{ textTransform: "none", bgcolor: "text.primary", "&:hover": { bgcolor: "#222" } }}
        >
          {saving ? "Saving…" : "Save"}
        </Button>
      </Box>
    </Box>
  );
}
