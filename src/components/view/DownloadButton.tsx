"use client";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DownloadIcon from "@mui/icons-material/Download";

export default function DownloadButton() {
  return (
    <Tooltip title="Download as PDF">
      <IconButton
        component="a"
        href="/api/resume-pdf"
        download
        aria-label="Download resume as PDF"
        sx={{
          color: "text.primary",
          border: "1px solid",
          borderColor: "divider",
          width: 40,
          height: 40,
          flexShrink: 0,
          "@media print": { display: "none" },
        }}
      >
        <DownloadIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
