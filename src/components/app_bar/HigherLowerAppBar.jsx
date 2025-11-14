import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const HigherLowerAppBar = () => {
  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        background: "linear-gradient(135deg, #b53f3fff 0%, #5c6bc0 100%)",
        padding: 1,
        borderRadius: 5
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
            style={{ width: 80, height: 80, borderRadius: 12 }}
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

        {/* Right section (optional future actions, e.g., settings or help) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Placeholder for buttons/icons if needed later */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HigherLowerAppBar;
