import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import type { Profile } from "@/types/resume";
import DownloadButton from "./DownloadButton";

export default function Header({ profile }: { profile: Profile }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "200px 1fr" },
        gap: { xs: 2, sm: 4 },
        alignItems: "center",
        px: { xs: 3, md: 5 },
        pt: { xs: 3, md: 5 },
        pb: 2,
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-start" } }}>
        <Avatar
          src={profile.photoUrl ?? undefined}
          alt={profile.name}
          sx={{
            width: 160,
            height: 160,
            bgcolor: "#E5E5E5",
            color: "#9E9E9E",
            border: "1px solid #D8D8D8",
          }}
        >
          {!profile.photoUrl && <PersonIcon sx={{ fontSize: 80 }} />}
        </Avatar>
      </Box>
      <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontSize: { xs: 32, md: 44 }, color: "text.primary", lineHeight: 1.1 }}
          >
            {profile.name}
          </Typography>
          <DownloadButton />
        </Box>
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: "text.primary",
            mt: 0.5,
            fontSize: { xs: 18, md: 22 },
          }}
        >
          {profile.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 1.5,
            color: "text.primary",
            fontSize: 13,
            lineHeight: 1.5,
            maxWidth: 560,
          }}
        >
          {profile.bio}
        </Typography>
      </Box>
    </Box>
  );
}
