import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  Path,
} from "@react-pdf/renderer";
import type { ResumeData, Skill, Project } from "@/types/resume";

// Built-in PDF fonts — no remote fetching.
const SERIF_FONT = "Times-Roman";
const SANS_FONT = "Helvetica";
const SANS_FONT_OBLIQUE = "Helvetica-Oblique";
const SANS_FONT_BOLD = "Helvetica-Bold";

const COLORS = {
  text: "#3A3A3A",
  textSecondary: "#6B6B6B",
  band: "#D9D6D1",
  divider: "#D8D8D8",
  skillFilled: "#4A4A4A",
  skillEmpty: "#D5D5D5",
  border: "#EEEEEE",
  placeholderBg: "#E5E5E5",
  placeholderBorder: "#BDBDBD",
};

// COMPACT layout — designed to fit one A4 page like the original PDF reference.
const styles = StyleSheet.create({
  page: { backgroundColor: "#FFFFFF", padding: 0, fontSize: 9, color: COLORS.text },
  header: {
    flexDirection: "row",
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 10,
    alignItems: "center",
  },
  photoBox: { width: 110, height: 110, marginRight: 18 },
  photo: { width: 110, height: 110, borderRadius: 55, objectFit: "cover" },
  photoPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.placeholderBg,
    borderWidth: 1,
    borderColor: COLORS.placeholderBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  photoPlaceholderText: {
    fontFamily: SANS_FONT,
    fontSize: 9,
    color: COLORS.textSecondary,
  },
  name: { fontFamily: SERIF_FONT, fontSize: 26, color: COLORS.text },
  title: { fontFamily: SERIF_FONT, fontSize: 14, color: COLORS.text, marginTop: 2 },
  bio: {
    fontFamily: SANS_FONT,
    fontSize: 9,
    color: COLORS.text,
    marginTop: 6,
    lineHeight: 1.4,
  },
  band: {
    backgroundColor: COLORS.band,
    paddingHorizontal: 28,
    paddingVertical: 8,
    flexDirection: "row",
  },
  bandLabel: {
    fontFamily: SANS_FONT,
    fontSize: 7.5,
    color: COLORS.textSecondary,
    marginBottom: 1,
  },
  bandValue: { fontFamily: SANS_FONT, fontSize: 9, color: COLORS.text },
  bandColPhone: { width: 145 },
  bandColRest: { flexDirection: "row", flex: 1, gap: 20 },
  body: { flexDirection: "row" },
  sidebar: { width: 175, paddingHorizontal: 20, paddingVertical: 14 },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },
  sectionHeading: {
    fontFamily: SERIF_FONT,
    fontSize: 13,
    color: COLORS.text,
    paddingBottom: 2,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  field: { marginBottom: 6 },
  fieldLabel: { fontFamily: SERIF_FONT, fontSize: 11, color: COLORS.text },
  fieldValue: {
    fontFamily: SANS_FONT,
    fontSize: 8.5,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2.5,
  },
  skillName: { fontFamily: SERIF_FONT, fontSize: 10, color: COLORS.text },
  skillBoxes: { flexDirection: "row", gap: 1.5 },
  skillBox: { width: 7, height: 7 },
  workItem: { flexDirection: "row", marginBottom: 8 },
  workDate: {
    width: 90,
    fontFamily: SANS_FONT,
    fontSize: 8.5,
    color: COLORS.textSecondary,
    paddingTop: 1,
  },
  workBody: { flex: 1 },
  workRole: { fontFamily: SERIF_FONT, fontSize: 11, color: COLORS.text },
  workCompany: {
    fontFamily: SANS_FONT_OBLIQUE,
    fontSize: 8.5,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  workArrangement: {
    fontFamily: SANS_FONT_OBLIQUE,
    fontSize: 8.5,
    color: COLORS.textSecondary,
  },
  bullet: {
    flexDirection: "row",
    marginTop: 2.5,
    gap: 4,
    alignItems: "flex-start",
  },
  bulletText: {
    flex: 1,
    fontFamily: SANS_FONT,
    fontSize: 8.5,
    color: COLORS.text,
    lineHeight: 1.4,
  },
  arrowSvg: { marginTop: 1 },
  // Projects in two columns to keep them on one page
  projectsGrid: { flexDirection: "row", flexWrap: "wrap" },
  projectCol: { width: "50%", paddingRight: 6 },
  projectRow: {
    flexDirection: "row",
    marginBottom: 3,
    alignItems: "center",
    gap: 4,
  },
  projectNameText: {
    fontFamily: SANS_FONT_BOLD,
    fontSize: 8.5,
    color: COLORS.text,
  },
  projectDesc: {
    fontFamily: SANS_FONT_OBLIQUE,
    fontSize: 8.5,
    color: COLORS.textSecondary,
    flex: 1,
  },
});

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

function ArrowIcon({ size = 8, color = COLORS.text }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={styles.arrowSvg}>
      <Path
        d="M5 12 H19 M13 6 L19 12 L13 18"
        stroke={color}
        strokeWidth={2.5}
        fill="none"
      />
    </Svg>
  );
}

function SkillRow({ skill }: { skill: Skill }) {
  return (
    <View style={styles.skillRow}>
      <Text style={styles.skillName}>{skill.name}</Text>
      <View style={styles.skillBoxes}>
        {[1, 2, 3, 4, 5].map((i) => (
          <View
            key={i}
            style={[
              styles.skillBox,
              { backgroundColor: i <= skill.level ? COLORS.skillFilled : COLORS.skillEmpty },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <View style={styles.projectRow} wrap={false}>
      <ArrowIcon size={7} />
      <Text style={styles.projectNameText}>{project.name}</Text>
      <Text style={styles.projectDesc}> - {project.description}</Text>
    </View>
  );
}

export function ResumePDF({
  data,
  photoDataUrl,
}: {
  data: ResumeData;
  photoDataUrl?: string;
}) {
  const projects = data.projects;
  const half = Math.ceil(projects.length / 2);
  const projectsLeft = projects.slice(0, half);
  const projectsRight = projects.slice(half);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        {/* Header */}
        <View style={styles.header} wrap={false}>
          <View style={styles.photoBox}>
            {photoDataUrl ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={photoDataUrl} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderText}>Photo</Text>
              </View>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{data.profile.name}</Text>
            <Text style={styles.title}>{data.profile.title}</Text>
            <Text style={styles.bio}>{data.profile.bio}</Text>
          </View>
        </View>

        {/* Contact band */}
        <View style={styles.band} wrap={false}>
          <View style={styles.bandColPhone}>
            <Text style={styles.bandLabel}>Phone</Text>
            <Text style={styles.bandValue}>{data.profile.phone}</Text>
          </View>
          <View style={styles.bandColRest}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bandLabel}>Email</Text>
              <Text style={styles.bandValue}>{data.profile.email}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.bandLabel}>Github</Text>
              <Text style={styles.bandValue}>
                {data.profile.github.map((g) => `github.com/${g}`).join(" / ")}
              </Text>
            </View>
          </View>
        </View>

        {/* Body two-column */}
        <View style={styles.body}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            <Text style={styles.sectionHeading}>Basic Information</Text>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Address</Text>
              {data.basicInfo.address.map((line, i) => (
                <Text key={i} style={styles.fieldValue}>
                  {line}
                </Text>
              ))}
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Birthday</Text>
              <Text style={styles.fieldValue}>{data.basicInfo.birthday}</Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Hobbies</Text>
              {data.basicInfo.hobbies.map((line, i) => (
                <Text key={i} style={styles.fieldValue}>
                  {line}
                </Text>
              ))}
            </View>

            <Text style={[styles.sectionHeading, { marginTop: 10 }]}>Skills</Text>
            {data.skills.map((s) => (
              <SkillRow key={s.name} skill={s} />
            ))}
          </View>

          {/* Main */}
          <View style={styles.main}>
            <Text style={styles.sectionHeading}>Work History</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.workItem} wrap={false}>
                <Text style={styles.workDate}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Text>
                <View style={styles.workBody}>
                  <Text style={styles.workRole}>{exp.role}</Text>
                  <Text style={styles.workCompany}>
                    {exp.company}
                    {exp.location ? `, ${exp.location}` : ""}
                  </Text>
                  {exp.arrangement ? (
                    <Text style={styles.workArrangement}>{exp.arrangement}</Text>
                  ) : null}
                  {exp.bullets.map((b, j) => (
                    <View key={j} style={styles.bullet}>
                      <ArrowIcon size={8} />
                      <Text style={styles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            <Text style={[styles.sectionHeading, { marginTop: 8 }]}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.workItem} wrap={false}>
                <Text style={styles.workDate}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
                <View style={styles.workBody}>
                  <Text style={styles.workRole}>{edu.degree}</Text>
                  <Text style={styles.workCompany}>
                    {edu.school}
                    {edu.location ? ` - ${edu.location}` : ""}
                  </Text>
                </View>
              </View>
            ))}

            <Text style={[styles.sectionHeading, { marginTop: 8 }]}>My Work</Text>
            <View style={styles.projectsGrid}>
              <View style={styles.projectCol}>
                {projectsLeft.map((p, i) => (
                  <ProjectRow key={i} project={p} />
                ))}
              </View>
              <View style={styles.projectCol}>
                {projectsRight.map((p, i) => (
                  <ProjectRow key={i} project={p} />
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
