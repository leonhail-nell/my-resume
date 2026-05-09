import Box from "@mui/material/Box";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Typography from "@mui/material/Typography";

export default function ArrowBullet({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.25, py: 0.5 }}>
      <ArrowRightAltIcon
        sx={{ color: "text.primary", fontSize: 18, mt: "2px", flexShrink: 0 }}
      />
      <Typography variant="body2" sx={{ fontSize: 13, color: "text.primary", lineHeight: 1.5 }}>
        {children}
      </Typography>
    </Box>
  );
}
