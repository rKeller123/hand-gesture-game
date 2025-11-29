import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Button, Typography, Card, CardContent, Divider } from "@mui/material";
import { Link } from "react-router";

const EndScreen = ({ scores }) => {
  const totalGames = scores.length;
  const bestScore = totalGames > 0 ? Math.max(...scores) : 0;
  const lastScore = totalGames > 0 ? scores[scores.length - 1] : 0;
  const averageScore =
    totalGames > 0 ? (scores.reduce((acc, val) => acc + val, 0) / totalGames).toFixed(1) : 0;

  let feedbackMessage = "";
  if (lastScore === 0) {
    feedbackMessage = "Kopf hoch! Jeder Champion hat mal bei 0 Punkten angefangen 💪";
  } else if (lastScore < 3) {
    feedbackMessage = "Nicht schlecht – du bist auf dem richtigen Weg 🚀";
  } else if (lastScore < 7) {
    feedbackMessage = "Starke Leistung! Du hast ein gutes Gespür ✨";
  } else {
    feedbackMessage = "Unglaublich! Du bist ein echtes Higher-vs-Lower Naturtalent 🧠🔥";
  }

  return (
    <Card
      sx={{
        maxWidth: 900,
        mx: "auto",
        my: 3,
        p: 3,
        borderRadius: 3,
        boxShadow: 6,
        background: "linear-gradient(135deg, #f9f9fb 0%, #ffffff 100%)",
      }}
    >
      <CardContent>
        <Typography variant="h4" align="center" sx={{ fontWeight: 700 }}>
          Spiel beendet!
        </Typography>
        <Typography variant="h6" align="center" color="primary" sx={{ mb: 2 }}>
          Dein letzter Score: {lastScore} Punkte
        </Typography>

        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          {feedbackMessage}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" gutterBottom>
          Punkteverlauf
        </Typography>

        {scores.length === 0 ? (
          <Typography>Noch keine Spiele gespielt.</Typography>
        ) : (
          <LineChart
            series={[{ data: scores }]}
            xAxis={[{ scaleType: "point", data: scores.map((_, i) => `Spiel ${i + 1}`) }]}
            height={300}
            width={600}
          />
        )}

        <Box sx={{ mt: 3 }}>
          <Typography>Durchschnitt: {averageScore}</Typography>
          <Typography>Bester Score: {bestScore}</Typography>
          <Typography>Spiele insgesamt: {totalGames}</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" component={Link} to="/game">
            Nochmals spielen
          </Button>
          <Button variant="outlined" component={Link} to="/detailed-tutorial">
            Tipps & Verbesserung
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EndScreen;
