import { useEffect, useRef, useState } from "react";
import { Typography, Box } from "@mui/material";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Gestures from "../../common/Gestures";
import CameraConfig from "../../common/CameraConfig";

export const Fingerpose_Poc = () => {
  const [modelLoading, setModelLoading] = useState(null);
  const webcamRef = useRef(null);
  const [gesture, setGesture] = useState(null);
  const [gestureArray, setGestureArray] = useState([])

  useEffect(() => {
    const runHandpose = async () => {
      setModelLoading(true)
      const model = await handpose.load();
      console.log("✅ Handpose model loaded.");
      setInterval(() => detect(model), 200);
      setModelLoading(false)
    };
    runHandpose();
  }, []);

  const detect = async (model) => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const hand = await model.estimateHands(video);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator(Gestures);
        const estimate = await GE.estimate(hand[0].landmarks, 7.5);
        if (estimate.gestures && estimate.gestures.length > 0) {
          const confidence = estimate.gestures.map((p) => p.score);
          const maxConfidence = confidence.indexOf(Math.max(...confidence));
          setGesture(estimate.gestures[maxConfidence].name);
          setGestureArray((prev) => [...prev.slice(-9), estimate.gestures[maxConfidence].name])
        } else {
          setGesture(null)
          setGestureArray([])
        }
      } else {
        setGesture(null)
        setGestureArray([])
      }
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Fingerpose Proof of Concept
      </Typography>

      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored
          videoConstraints={CameraConfig.video}
          style={{
            width: 640,
            height: 480,
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
