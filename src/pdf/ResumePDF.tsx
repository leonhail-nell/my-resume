import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import type { ResumeData, Skill } from "@/types/resume";

// Register EB Garamond from Google Fonts (works at PDF render time on Vercel).
Font.register({
  family: "EB Garamond",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5FRyTfOwVKitcc4yyjI.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwSDw_ZAPstd6tuIM.ttf",
      fontWeight: 600,
    },
  ],
});

const COLORS = {
  text: "#3A3A3A",
  textSecondary: "#6B6B6B",
  band: "#D9D6D1",
  divider: "#D8D8D8",
  skillFilled: "#4A4A4A",
  skillEmpty: "#D5D5D5",
  border: "#EEEEEE",
  placeholderBg: "#E5E5E5",
};

const styles = StyleSheet.create({
  page: { backgroundColor: "#FFFFFF", padding: 0, fontSize: 10, color: COLORS.text },
  header: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 12,
  },
  photoBox: { width: 140, height: 140, marginRight: 24, alignItems: "center" },
  photo: { width: 140, height: 140, borderRadius: 70, objectFit: "cover" },
  photoPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.placeholderBg,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { fontFamily: "EB Garamond", fontSize: 32, color: COLORS.text },
  title: { fontFamily: "EB Garamond", fontSize: 18, color: COLORS.text, marginTop: 2 },
  bio: { fontSize: 10, color: COLORS.text, marginTop: 8, lineHeight: 1.5 },
  band: {
    backgroundColor: COLORS.band,
    paddingHorizontal: 30,
    paddingVertical: 10,
    flexDirection: "row",
  },
  bandLabel: { fontSize: 8, color: COLORS.textSecondary, marginBottom: 1 },
  bandValue: { fontSize: 10, color: COLORS.text },
  bandColPhone: { width: 160 },
  bandColRest: { flexDirection: "row", flex: 1, gap: 24 },
  body: { flexDirection: "row" },
  sidebar: { width: 200, paddingHorizontal: 24, paddingVertical: 18 },
  main: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },
  sectionHeading: {
    fontFamily: "EB Garamond",
    fontSize: 16,
    color: COLORS.text,
    paddingBottom: 3,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  field: { marginBottom: 8 },
  fieldLabel: { fontFamily: "EB Garamond", fontSize: 12, color: COLORS.text },
  fieldValue: { fontSize: 9.5, color: COLORS.textSecondary },
  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  skillName: { fontFamily: "EB Garamond", fontSize: 12, color: COLORS.text },
  skillBoxes: { flexDirection: "row", gap: 2 },
  skillBox: { width: 9, height: 9 },
  workItem: { flexDirection: "row", marginBottom: 12 },
  workDate: { width: 110, fontSize: 9.5, color: COLORS.textSecondary, paddingTop: 2 },
  workBody: { flex: 1 },
  workRole: { fontFamily: "EB Garamond", fontSize: 13, color: COLORS.text },
  workCompany: { fontStyle: "italic", fontSize: 9.5, color: COLORS.textSecondary, marginTop: 2 },
  workArrangement: { fontStyle: "italic", fontSize: 9.5, color: COLORS.textSecondary },
  bullet: { flexDirection: "row", marginTop: 4, gap: 6 },
  bulletArrow: { fontSize: 11, color: COLORS.text, marginTop: -1 },
  bulletText: { flex: 1, fontSize: 9.5, color: COLORS.text, lineHeight: 1.5 },
  projectRow: { flexDirection: "row", marginBottom: 4, alignItems: "flex-start" },
  projectName: { width: 110, flexDirection: "row", alignItems: "center", gap: 4 },
  projectArrow: { fontSize: 11, color: COLORS.text },
  projectNameText: { fontSize: 9.5, color: COLORS.text, fontWeight: 600 },
  projectDesc: { flex: 1, fontStyle: "italic", fontSize: 9.5, color: COLORS.textSecondary },
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

export function ResumePDF({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.photoBox}>
            {data.profile.photoUrl ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={data.profile.photoUrl} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={{ fontSize: 60, color: "#9E9E9E" }}>·</Text>
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
        <View style={styles.band}>
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

            <Text style={[styles.sectionHeading, { marginTop: 12 }]}>Skills</Text>
            {data.skills.map((s) => (
              <SkillRow key={s.name} skill={s} />
            ))}
          </View>

          {/* Main */}
          <View style={styles.main}>
            <Text style={styles.sectionHeading}>Work History</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.workItem}>
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
                      <Text style={styles.bulletArrow}>{"→"}</Text>
                      <Text style={styles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            <Text style={[styles.sectionHeading, { marginTop: 8 }]}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.workItem}>
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
            {data.projects.map((p, i) => (
              <View key={i} style={styles.projectRow}>
                <View style={styles.projectName}>
                  <Text style={styles.projectArrow}>{"→"}</Text>
                  <Text style={styles.projectNameText}>{p.name}</Text>
                </View>
                <Text style={styles.projectDesc}>- {p.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
