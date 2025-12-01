import { Button, Typography, Card, CardContent, CardActions, Box, Divider } from "@mui/material";
import { Link } from "react-router";

const WelcomeTutorial = () => {
  return (
    <Card
      sx={{
        maxWidth: 800,
        mx: "auto",
        my: 3,
        p: 2,
        borderRadius: 3,
        boxShadow: 6,
        background: "linear-gradient(135deg, #f9f9fb 0%, #ffffff 100%)",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ fontWeight: 600 }}
        >
          Willkommen zu Higher vs. Lower!
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1" gutterBottom>
          Du siehst immer zwei Optionen auf dem Bildschirm und musst entscheiden,
          welche davon richtig ist – <b>oben oder unten</b>.
        </Typography>

        <Box
          sx={{
            backgroundColor: "#f5f7fa",
            borderRadius: 2,
            p: 2,
            mb: 2,
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="body1" gutterBottom>
            Steuerung über Handgesten:
          </Typography>
          <Typography variant="body2" gutterBottom>
            👍 <b>Daumen nach oben:</b> obere Option
          </Typography>
          <Typography variant="body2" gutterBottom>
            👎 <b>Daumen nach unten:</b> untere Option
          </Typography>
          <Typography variant="body2">
            ✌️ <b>Victory:</b> abbrechen ❌
          </Typography>
        </Box>

        <Typography variant="body1" gutterBottom>
          Ist deine Antwort richtig, erhältst du <b>einen Punkt</b>.
          Bei einer falschen Antwort endet das Spiel.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Für mehr Details → klicke oben auf <b>Hilfe</b>.
        </Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: "80%", borderRadius: 2 }}
          component={Link}
          to="/game"
        >
          Spiel starten
        </Button>
      </CardActions>
    </Card>
  );
};

export default WelcomeTutorial;
