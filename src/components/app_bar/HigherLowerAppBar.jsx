import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"; // Victory / Trophy icon
import { useNavigate } from "react-router";

const HigherLowerAppBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        background: "linear-gradient(135deg, #b53f3fff 0%, #5c6bc0 100%)",
        padding: 1,
        borderRadius: 5,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* Logo Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src="logo.png"
            alt="Higher Lower Logo"
            style={{ width: 80, height: 80, borderRadius: 12, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            Higher vs. Lower
          </Typography>
        </Box>

        {/* Icon Buttons Section */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Question Button */}
          <IconButton onClick={() => navigate("/detailed-tutorial")}>
            <HelpOutlineIcon sx={{ fontSize: 28 }} />
          </IconButton>

          {/* Finish Button */}
          <IconButton onClick={() => navigate("/end-screen")}>
            <EmojiEventsIcon sx={{ fontSize: 28 }} /> {/* Trophy icon / victory vibe */}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HigherLowerAppBar;
