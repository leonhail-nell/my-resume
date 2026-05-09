import Box from "@mui/material/Box";
import { getResume } from "@/lib/resume";
import EditForm from "@/components/admin/EditForm";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { data } = await getResume();
  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh", py: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1000, mx: "auto", px: { xs: 2, md: 4 } }}>
        <EditForm initialData={data} />
      </Box>
    </Box>
  );
}
