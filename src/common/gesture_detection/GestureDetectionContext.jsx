import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import * as tf from "@tensorflow/tfjs";
import Gestures from "../Gestures";

const GestureDetectionContext = createContext();

export const GestureDetectionProvider = ({ children }) => {
  const [modelLoading, setModelLoading] = useState(true);
  const [gesture, setGesture] = useState(null);
  const [gestureArray, setGestureArray] = useState([]);
  const [gestureProgress, setGestureProgress] = useState({ gesture: null, progress: 0.0 });
  const webcamRef = useRef(null);
  const modelRef = useRef(null);

  // Load the handpose model
  useEffect(() => {
    const loadModel = async () => {
      try {
        setModelLoading(true);
        modelRef.current = await handpose.load();
        console.log("Handpose model loaded");
        setModelLoading(false);
      } catch (error) {
        console.error("Error loading handpose model:", error);
      }
    };

    loadModel();
  }, []);

  // Setup hidden webcam
  useEffect(() => {
    const setupCamera = async () => {
      const video = document.createElement("video");
      video.style.display = "none"; // keep it hidden
      video.width = 640;
      video.height = 480;
      document.body.appendChild(video); // must be in DOM for TensorFlow

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();
        webcamRef.current = { video };
        console.log("Camera initialized (hidden)");
      } catch (err) {
        console.error("Camera setup failed:", err);
      }
    };

    setupCamera();

    return () => {
      // Cleanup camera stream on unmount
      if (webcamRef.current?.video?.srcObject) {
        webcamRef.current.video.srcObject.getTracks().forEach(track => track.stop());
      }
      if (webcamRef.current?.video) {
        document.body.removeChild(webcamRef.current.video);
      }
    };
  }, []);

  // Detection loop
  useEffect(() => {
    let intervalId;

    const detect = async () => {
      if (
        !webcamRef.current ||
        !webcamRef.current.video ||
        webcamRef.current.video.readyState !== 4 ||
        !modelRef.current
      )
        return;

      const video = webcamRef.current.video;
      const hand = await modelRef.current.estimateHands(video);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator(Gestures);
        const estimate = await GE.estimate(hand[0].landmarks, 7.5);

        if (estimate.gestures && estimate.gestures.length > 0) {
          const confidence = estimate.gestures.map((p) => p.score);
          const maxConfidence = confidence.indexOf(Math.max(...confidence));
          const detected = estimate.gestures[maxConfidence].name;

          setGesture(detected);
          setGestureArray((prev) => [...prev.slice(-9), detected]);
        } else {
          setGesture(null);
          setGestureArray([]);
        }
      } else {
        setGesture(null);
        setGestureArray([]);
      }
    };

    if (!modelLoading) intervalId = setInterval(detect, 200);

    return () => clearInterval(intervalId);
  }, [modelLoading]);

  useEffect(() => {
    if (gestureArray.length === 0) {
      setGestureProgress({ gesture: null, progress: 0.0 });
    } else {
      const currentGesture = gestureArray[gestureArray.length - 1];
      const progress = gestureArray
        .slice() // make a shallow copy
        .reverse() // check from the end
        .findIndex(g => g !== currentGesture); // find where it stops matching
      // if all elements are the same, findIndex returns -1 → handle that
      const consecutiveCount = progress === -1 ? gestureArray.length : progress;
      setGestureProgress({ gesture: currentGesture, progress: consecutiveCount });
    }
  }, [gestureArray])

  return (
    <GestureDetectionContext.Provider
      value={{
        gesture,
        gestureArray,
        gestureProgress,
        modelLoading
      }}
    >
      {children}
    </GestureDetectionContext.Provider>
  );
};

export const useGestureDetection = () => {
  const context = useContext(GestureDetectionContext);
  if (!context) throw new Error("useGestureDetection must be used within a GestureDetectionProvider");
  return context;
};
