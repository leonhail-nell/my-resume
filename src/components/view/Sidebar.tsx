import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SectionHeading from "./SectionHeading";
import SkillRating from "./SkillRating";
import type { BasicInfo, Skill } from "@/types/resume";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography
        sx={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "text.primary" }}
      >
        {label}
      </Typography>
      <Box sx={{ color: "text.secondary", fontSize: 13 }}>{children}</Box>
    </Box>
  );
}

export default function Sidebar({
  basicInfo,
  skills,
}: {
  basicInfo: BasicInfo;
  skills: Skill[];
}) {
  return (
    <Box sx={{ px: { xs: 3, md: 4 }, py: 3 }}>
      <SectionHeading>Basic Information</SectionHeading>
      <Field label="Address">
        {basicInfo.address.map((line, i) => (
          <Box key={i}>{line}</Box>
        ))}
      </Field>
      <Field label="Birthday">{basicInfo.birthday}</Field>
      <Field label="Hobbies">
        {basicInfo.hobbies.map((line, i) => (
          <Box key={i}>{line}</Box>
        ))}
      </Field>

      <Box sx={{ mt: 3 }}>
        <SectionHeading>Skills</SectionHeading>
        <Stack spacing={0}>
          {skills.map((skill) => (
            <SkillRating key={skill.name} skill={skill} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
