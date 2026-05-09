import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          color: "text.primary",
          fontSize: 22,
          pb: 0.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
