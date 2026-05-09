import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colors } from "@/lib/colors";
import type { Profile } from "@/types/resume";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{ display: "block", color: "text.secondary", fontSize: 11, lineHeight: 1.2 }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.primary", fontSize: 13 }}>
        {children}
      </Typography>
    </Box>
  );
}

export default function ContactBand({ profile }: { profile: Profile }) {
  return (
    <Box
      sx={{
        bgcolor: colors.band,
        px: { xs: 3, md: 5 },
        py: 1.5,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "200px 1fr" },
        gap: { xs: 1, sm: 4 },
        alignItems: "center",
      }}
    >
      <Field label="Phone">{profile.phone}</Field>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 1.5,
        }}
      >
        <Field label="Email">{profile.email}</Field>
        <Field label="Github">
          {profile.github
            .map((g) => `github.com/${g}`)
            .join(" / ")}
        </Field>
      </Box>
    </Box>
  );
}
