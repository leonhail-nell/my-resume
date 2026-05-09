import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBullet from "./ArrowBullet";
import type { Experience } from "@/types/resume";

function formatDate(value: string): string {
  if (!value) return "";
  if (value.toLowerCase() === "present") return "Present";
  // expects YYYY-MM
  const [y, m] = value.split("-");
  if (!y || !m) return value;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const idx = parseInt(m, 10) - 1;
  return `${months[idx] ?? ""} ${y}`.trim();
}

export default function ExperienceItem({ item }: { item: Experience }) {
  const range = `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`;
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "150px 1fr" },
        gap: { xs: 0.5, sm: 3 },
        mb: 2,
      }}
    >
      <Typography sx={{ color: "text.secondary", fontSize: 13, pt: 0.5 }}>
        {range}
      </Typography>
      <Box>
        <Typography
          sx={{
            fontFamily: "var(--font-serif)",
            fontSize: 18,
            color: "text.primary",
            lineHeight: 1.2,
          }}
        >
          {item.role}
        </Typography>
        <Typography
          sx={{ fontStyle: "italic", color: "text.secondary", fontSize: 13, mt: 0.5 }}
        >
          {item.company}
          {item.location ? `, ${item.location}` : ""}
        </Typography>
        {item.arrangement && (
          <Typography
            sx={{ fontStyle: "italic", color: "text.secondary", fontSize: 13 }}
          >
            {item.arrangement}
          </Typography>
        )}
        {item.bullets.length > 0 && (
          <Box sx={{ mt: 1 }}>
            {item.bullets.map((b, i) => (
              <ArrowBullet key={i}>{b}</ArrowBullet>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
