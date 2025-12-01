import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate, Link } from "react-router";
import {useEffect, useState} from "react";

const HigherLowerAppBar = ({ scores, currentScore }) => {
  const navigate = useNavigate();
  const [highScore, setHighScore] = useState(0);
  const [currentScoreOfGame, setCurrentScoreOfGame] = useState(null);

  useEffect(() => {
    if (!scores || scores.length === 0) return;
    setHighScore(Math.max(...scores));
  }, [scores]);

    useEffect(() => {
        setCurrentScoreOfGame(currentScore)
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
            style={{ width: 70, height: 70, borderRadius: 12, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Higher vs. Lower
          </Typography>
        </Box>

        {/* Centered Score */}
        <Box sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <Typography variant="h6">
            High-Score: {highScore}
          </Typography>
            {currentScoreOfGame && (
            <Typography variant="h6">
            Score: {currentScoreOfGame}
            </Typography>)}
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => setCurrentScoreOfGame(null)}
            component={Link}
            to="/detailed-tutorial"
            color="white"
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Hilfe
          </Button>

          <Button
            variant="contained"
            onClick={() => setCurrentScoreOfGame(null)}
            component={Link}
            to="/end-screen"
            color="white"
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Statistiken ✌️
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HigherLowerAppBar;
