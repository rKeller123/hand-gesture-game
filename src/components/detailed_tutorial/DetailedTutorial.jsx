import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress, LinearProgress
} from "@mui/material";
import {Link} from "react-router";
import {useGestureDetection} from "../../common/gesture_detection/GestureDetectionContext.jsx";

const DetailedTutorial = () => {

  const {modelLoading, gestureProgress} = useGestureDetection();

  const gestureNameToEmoji = (gesture) => {
    switch (gesture) {
      case "thumbs_up":
        return "👍";
      case "thumbs_down":
        return "👎";
      case "victory":
        return "✌️";
      default:
        return null;
    }
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
        <Typography variant="h4" align="center" sx={{ fontWeight: 700 }} gutterBottom>
          Higher vs. Lower
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="body1" gutterBottom>
          In diesem Spiel wirst du zu verschiedenen Themen Fragen erhalten.
          Jedes Mal siehst du <b>zwei Antwortmöglichkeiten</b> – oben und unten.
        </Typography>

        <Box sx={{ p: 2, mb: 3, bgcolor: "#f5f7fa", borderRadius: 2, border: "1px solid #e0e0e0" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
            Spielablauf
          </Typography>

          <List>
            <ListItem><ListItemText primary="Eine Frage erscheint auf dem Bildschirm." /></ListItem>
            <ListItem><ListItemText primary="Du musst entscheiden, welche Option richtig ist." /></ListItem>
            <ListItem><ListItemText primary="Du antwortest durch Handgesten – ganz ohne Knöpfe!" /></ListItem>
            <ListItem><ListItemText primary="Bei einer richtigen Antwort bekommst du einen Punkt." /></ListItem>
            <ListItem><ListItemText primary="Bei einer falschen Antwort endet das Spiel." /></ListItem>
          </List>
        </Box>

        <Box sx={{ p: 2, mb: 3, bgcolor: "#eef5ff", borderRadius: 2, border: "1px solid #d0d8e0" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
            Steuerung mit Handgesten
          </Typography>

          <Typography variant="body2" gutterBottom>
            👍 <b>Daumen hoch:</b> obere Option wählen
          </Typography>
          <Typography variant="body2" gutterBottom>
            👎 <b>Daumen nach unten:</b> untere Option wählen
          </Typography>
          <Typography variant="body2" gutterBottom>
            ✌️ <b>Victory:</b> Spiel abbrechen ❌
          </Typography>
          <br/>

          <Typography variant="body1" gutterBottom>
            Teste die Gestensteuerung hier!
          </Typography>
          {modelLoading ? (
            <CircularProgress />
          ) : (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px dashed #b0bec5",
                bgcolor: "#fafafa",
                textAlign: "center",
              }}
            >
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
                Aktuelle Geste:
              </Typography>

              <Typography variant="h4">
                {gestureNameToEmoji(gestureProgress.gesture) || "-"}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={gestureProgress.progress * 10}
                sx={{ mt: 2, height: 10, borderRadius: 5 }}
              />
              <Typography variant="caption">
                Erkennung: {Math.round(gestureProgress.progress * 10)}%
              </Typography>
            </Box>
          )}

        </Box>

        <Box sx={{ p: 2, mb: 3, bgcolor: "#e9fff1", borderRadius: 2, border: "1px solid #bde5c8" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
            Geste erkannt? Fortschrittsanzeige!
          </Typography>

          <Typography variant="body1" gutterBottom>
            Sobald deine Geste erkannt wurde, beginnt ein <b>Fortschrittsbalken</b> zu laden.
            Erst wenn der Balken vollständig gefüllt ist, wird deine Antwort <b>„fixiert“</b>.
          </Typography>

          <Typography variant="body2">
            Dadurch vermeidest du zufällige Bewegungen oder Fehlinterpretationen.
          </Typography>
        </Box>

        <Box sx={{ p: 2, mb: 3, bgcolor: "#fff4e6", borderRadius: 2, border: "1px solid #e6d0b0" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
            Auswertung am Ende des Spiels
          </Typography>

          <Typography variant="body1" gutterBottom>
            Wenn das Spiel endet (bei einer falschen Antwort),
            siehst du einen <b>Übersichtsbildschirm</b> mit deiner Leistung:
          </Typography>

          <List>
            <ListItem><ListItemText primary="Punktezahl" /></ListItem>
            <ListItem><ListItemText primary="Verlauf deiner letzten Spiele" /></ListItem>
            <ListItem><ListItemText primary="Persönliche Bestleistung" /></ListItem>
          </List>

          <Typography variant="body2">
            Diese Daten helfen dir, deine Fortschritte zu verfolgen und dich zu verbessern!
          </Typography>
        </Box>

        {/* ZIEL */}
        <Typography variant="body1" gutterBottom>
          <b>Ziel des Spiels:</b> Sammle so viele Punkte wie möglich – jeder Fehler beendet den Lauf!
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          pb: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: "80%", borderRadius: 2 }}
          component={Link}
          to="/game"
        >
          Direkt zum Spiel
        </Button>

        <Button size="small" sx={{ mt: 2 }} component={Link} to="/">
          Zurück zur Startseite
        </Button>
      </CardActions>
    </Card>
  );
};

export default DetailedTutorial;
