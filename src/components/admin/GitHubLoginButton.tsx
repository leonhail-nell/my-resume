"use client";

import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { signIn } from "next-auth/react";

export default function GitHubLoginButton({ callbackUrl }: { callbackUrl: string }) {
  return (
    <Button
      variant="contained"
      fullWidth
      startIcon={<GitHubIcon />}
      onClick={() => signIn("github", { callbackUrl })}
      sx={{
        bgcolor: "text.primary",
        color: "#fff",
        textTransform: "none",
        py: 1.25,
        "&:hover": { bgcolor: "#222" },
      }}
    >
      Sign in with GitHub
    </Button>
  );
}
