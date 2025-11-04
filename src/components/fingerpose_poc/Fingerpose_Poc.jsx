import { Typography, Box } from "@mui/material";
import { useGestureDetection } from "../../common/gesture_detection/GestureDetectionContext";

export const Fingerpose_Poc = () => {
  const { modelLoading, gesture, gestureArray, gestureProgress } = useGestureDetection();

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Fingerpose Proof of Concept
      </Typography>

      <Typography variant="h5" sx={{ mt: 3 }}>
        {modelLoading ? "model loading..." :
          gesture ?? "no gesture recognized"
        }
      </Typography>
      <Typography variant="h5" sx={{ mt: 3}}>
        {JSON.stringify(gestureArray)} 
      </Typography>
      <Typography variant="h5" sx={{ mt: 3}}>
        {JSON.stringify(gestureProgress)}
      </Typography>
    </Box>
  );
};

export default Fingerpose_Poc;
