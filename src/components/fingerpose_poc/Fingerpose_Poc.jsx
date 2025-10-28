import { useEffect, useRef, useState } from "react";
import { Typography, Box } from "@mui/material";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Gestures from "../../common/Gestures";
import CameraConfig from "../../common/CameraConfig";
import { useGestureDetection } from "../../common/gesture_detection/GestureDetectionContext";

export const Fingerpose_Poc = () => {
  const { webcamRef, modelLoading, gesture, gestureArray } = useGestureDetection();

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Fingerpose Proof of Concept
      </Typography>

      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Webcam
          ref={webcamRef}
          audio={CameraConfig.audio}
          mirrored
          videoConstraints={CameraConfig.video}
          style={{
            width: CameraConfig.video.width,
            height: CameraConfig.video.height,
            borderRadius: "10px",
          }}
        />
      </Box>

      <Typography variant="h5" sx={{ mt: 3 }}>
        {modelLoading ? "model loading..." :
          gesture ?? "no gesture recognized"
        }
      </Typography>
      <Typography variant="h5" sx={{ mt: 3}}>
        {JSON.stringify(gestureArray)}
      </Typography>
    </Box>
  );
};

export default Fingerpose_Poc;
