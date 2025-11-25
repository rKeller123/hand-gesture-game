import {AppBar, Toolbar, Typography, Box, Button} from "@mui/material";
import { useNavigate, Link } from "react-router";
import {useEffect} from "react";

const HigherLowerAppBar = ({ currentScore }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(JSON.stringify(currentScore))
  }, [currentScore]);

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

        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography>
            High-Score: {currentScore ?? "-"}
          </Typography>
          <Button
            variant="contained"
            color="white"
            size="large"
            component={Link}
            to="/detailed-tutorial"
          >
            Hilfe
          </Button>
          <Button
            variant="contained"
            color="white"
            size="large"
            component={Link}
            to="/end-screen"
          >
            Beenden [✌️]
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HigherLowerAppBar;
