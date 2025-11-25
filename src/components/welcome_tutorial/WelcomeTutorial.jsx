import { Button, Typography, Card, CardContent, CardActions, Box, Divider } from "@mui/material";
import {Link} from "react-router";

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
          Im Spiel <b>„Higher vs. Lower“</b> siehst du zwei Optionen auf dem
          Bildschirm. Dir wird eine Frage gestellt, und du musst entscheiden, ob
          die <b>obere</b> oder die <b>untere Option</b> richtig ist.
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
            Du steuerst das Spiel mit Handgesten:
          </Typography>
          <Typography variant="body2" gutterBottom>
            👍 <b>Daumen hoch:</b> Wähle die obere Option
          </Typography>
          <Typography variant="body2" gutterBottom>
            👎 <b>Daumen nach unten:</b> Wähle die untere Option
          </Typography>
          <Typography variant="body2">
            ✌️ <b>Victory:</b> Abbrechen ❌
          </Typography>
        </Box>

        <Typography variant="body1" gutterBottom>
          Wenn du <b>richtig</b> liegst, erhältst du <b>einen Punkt</b>.  
          Bei einer <b>falschen</b> Antwort wird das Spiel <b>beendet</b>.
        </Typography>

        <Typography variant="body1" gutterBottom>
          Versuche, so viele Punkte wie möglich zu sammeln!  
          Bevor das eigentliche Spiel beginnt, wird ein Testversuch durchgeführt.
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
          OK!
        </Button>

        <Typography variant="body2" color="text.secondary">
          Willst du stattdessen die Interaktion üben?  
          Dann klicke auf das Testbeispiel!
        </Typography>

        <Button
          variant="outlined"
          color="secondary"
          size="large"
          sx={{ width: "80%", borderRadius: 2 }}
          component={Link}
          to="/test-game"
        >
          Zum Testbeispiel
        </Button>
      </CardActions>
    </Card>
  );
};

export default WelcomeTutorial;
