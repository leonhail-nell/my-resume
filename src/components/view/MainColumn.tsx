import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SectionHeading from "./SectionHeading";
import ExperienceItem from "./ExperienceItem";
import ProjectItem from "./ProjectItem";
import type { Experience, Education, Project } from "@/types/resume";

function formatDate(value: string): string {
  if (!value) return "";
  if (value.toLowerCase() === "present") return "Present";
  const [y, m] = value.split("-");
  if (!y || !m) return value;
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[parseInt(m, 10) - 1] ?? ""} ${y}`.trim();
}

export default function MainColumn({
  experience,
  education,
  projects,
}: {
  experience: Experience[];
  education: Education[];
  projects: Project[];
}) {
  return (
    <Box sx={{ px: { xs: 3, md: 4 }, py: 3, borderLeft: { md: "1px solid #EEE" } }}>
      <SectionHeading>Work History</SectionHeading>
      {experience.map((exp, i) => (
        <ExperienceItem key={i} item={exp} />
      ))}

      <Box sx={{ mt: 3 }}>
        <SectionHeading>Education</SectionHeading>
        {education.map((edu, i) => (
          <Box
            key={i}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "150px 1fr" },
              gap: { xs: 0.5, sm: 3 },
              mb: 2,
            }}
          >
            <Typography sx={{ color: "text.secondary", fontSize: 13, pt: 0.5 }}>
              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
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
                {edu.degree}
              </Typography>
              <Typography
                sx={{
                  fontStyle: "italic",
                  color: "text.secondary",
                  fontSize: 13,
                  mt: 0.5,
                }}
              >
                {edu.school}
                {edu.location ? ` - ${edu.location}` : ""}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 3 }}>
        <SectionHeading>My Work</SectionHeading>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            columnGap: 3,
            rowGap: 0,
          }}
        >
          {projects.map((p, i) => (
            <ProjectItem key={i} item={p} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
