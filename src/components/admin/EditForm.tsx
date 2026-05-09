"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { ResumeData } from "@/types/resume";
import SaveBar from "./SaveBar";
import ProfileSection from "./ProfileSection";
import BasicInfoSection from "./BasicInfoSection";
import SkillsSection from "./SkillsSection";
import WorkHistorySection from "./WorkHistorySection";
import EducationSection from "./EducationSection";
import ProjectsSection from "./ProjectsSection";

export default function EditForm({ initialData }: { initialData: ResumeData }) {
  const methods = useForm<ResumeData>({ defaultValues: initialData });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    msg: string;
    severity: "success" | "error";
  }>({ open: false, msg: "", severity: "success" });

  const onSubmit = async (data: ResumeData) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      setToast({ open: true, msg: "Saved successfully", severity: "success" });
      methods.reset(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Save failed";
      setToast({ open: true, msg, severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ color: "text.primary" }}>
          Edit Resume
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            component="a"
            href="/"
            variant="outlined"
            startIcon={<VisibilityIcon />}
            sx={{ textTransform: "none" }}
          >
            View site
          </Button>
          <Button
            variant="text"
            startIcon={<LogoutIcon />}
            onClick={() => signOut({ callbackUrl: "/" })}
            sx={{ textTransform: "none" }}
          >
            Sign out
          </Button>
        </Box>
      </Box>

      <SaveBar
        saving={saving}
        dirty={methods.formState.isDirty}
        onSave={methods.handleSubmit(onSubmit)}
        onDiscard={() => methods.reset(initialData)}
      />

      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <ProfileSection />
        <BasicInfoSection />
        <SkillsSection />
        <WorkHistorySection />
        <EducationSection />
        <ProjectsSection />
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      >
        <Alert severity={toast.severity} onClose={() => setToast((t) => ({ ...t, open: false }))}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </FormProvider>
  );
}
