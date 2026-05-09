import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colors } from "@/lib/colors";
import { getSkillIcon, levelOpacity } from "@/lib/skillIcons";
import type { Skill } from "@/types/resume";

export default function SkillRating({ skill }: { skill: Skill }) {
  const Icon = getSkillIcon(skill.icon);
  const opacity = levelOpacity(skill.level);

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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
        {Icon ? (
          <Box
            sx={{
              width: 18,
              height: 18,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity,
              color: colors.skillFilled,
            }}
          >
            <Icon size={18} />
          </Box>
        ) : (
          <Box sx={{ width: 18, flexShrink: 0 }} />
        )}
        <Typography
          sx={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            color: "text.primary",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {skill.name}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: "3px", flexShrink: 0 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Box
            key={i}
            sx={{
              width: "12px",
              height: "12px",
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
