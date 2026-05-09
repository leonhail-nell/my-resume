import Box from "@mui/material/Box";
import { getResume } from "@/lib/resume";
import Header from "@/components/view/Header";
import ContactBand from "@/components/view/ContactBand";
import Sidebar from "@/components/view/Sidebar";
import MainColumn from "@/components/view/MainColumn";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data } = await getResume();

  return (
    <Box
      component="main"
      sx={{
        maxWidth: 960,
        mx: "auto",
        my: { xs: 0, md: 4 },
        bgcolor: "background.default",
        boxShadow: { md: "0 0 24px rgba(0,0,0,0.06)" },
        overflow: "hidden",
      }}
    >
      <Header profile={data.profile} />
      <ContactBand profile={data.profile} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
          gap: 0,
        }}
      >
        <Sidebar basicInfo={data.basicInfo} skills={data.skills} />
        <MainColumn
          experience={data.experience}
          education={data.education}
          projects={data.projects}
        />
      </Box>
    </Box>
  );
}
