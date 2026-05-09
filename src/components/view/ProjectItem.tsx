import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import type { Project } from "@/types/resume";

export default function ProjectItem({ item }: { item: Project }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        py: 0.5,
        minWidth: 0,
      }}
    >
      <ArrowRightAltIcon
        sx={{ color: "text.primary", fontSize: 18, flexShrink: 0 }}
      />
      <Typography
        sx={{
          color: "text.primary",
          fontSize: 13,
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        {item.name}
      </Typography>
      <Typography
        sx={{
          fontStyle: "italic",
          color: "text.secondary",
          fontSize: 13,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        - {item.description}
      </Typography>
    </Box>
  );
}
