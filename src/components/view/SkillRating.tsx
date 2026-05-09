import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colors } from "@/lib/colors";
import type { Skill } from "@/types/resume";

export default function SkillRating({ skill }: { skill: Skill }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
        py: 0.5,
      }}
    >
      <Typography
        sx={{
          fontFamily: "var(--font-serif)",
          fontSize: 16,
          color: "text.primary",
        }}
      >
        {skill.name}
      </Typography>
      <Box sx={{ display: "flex", gap: "3px", flexShrink: 0 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Box
            key={i}
            sx={{
              width: "14px",
              height: "14px",
              backgroundColor:
                i <= skill.level ? colors.skillFilled : colors.skillEmpty,
              display: "block",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
