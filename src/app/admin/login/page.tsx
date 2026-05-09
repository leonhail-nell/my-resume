import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import GitHubLoginButton from "@/components/admin/GitHubLoginButton";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const sp = await searchParams;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          border: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 1, color: "text.primary" }}
        >
          Admin Sign In
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          Sign in with GitHub to edit your resume.
        </Typography>
        {sp.error && (
          <Typography
            variant="body2"
            sx={{ color: "error.main", mb: 2, fontSize: 13 }}
          >
            Sign-in failed. Only the configured admin GitHub account is allowed.
          </Typography>
        )}
        <GitHubLoginButton callbackUrl={sp.callbackUrl ?? "/admin"} />
      </Paper>
    </Box>
  );
}
