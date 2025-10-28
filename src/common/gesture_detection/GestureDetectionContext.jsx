import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import * as tf from "@tensorflow/tfjs";
import Gestures from "../Gestures";

const GestureDecectionContext = createContext();

export const GestureDetectionProvider = ({ children }) => {
  const [modelLoading, setModelLoading] = useState(true);
  const [gesture, setGesture] = useState(null);
  const [gestureArray, setGestureArray] = useState([]);
  const webcamRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setModelLoading(true);
        modelRef.current = await handpose.load();
        console.log("handpose model loaded");
        setModelLoading(false);
      } catch (error) {
        console.error("Error loading handpose model: ", error);
      }
    };

    loadModel();
  }, [])

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
    }
    
    if (!modelLoading) intervalId = setInterval(detect, 200);

    return () => clearInterval(intervalId);

  }, [modelLoading])

  return (
    <GestureDecectionContext.Provider
      value={{
        webcamRef,
        modelLoading,
        gesture,
        gestureArray
      }}
    >
      {children}
    </GestureDecectionContext.Provider>
  )


};

export const useGestureDetection = () => {
  const context = useContext(GestureDecectionContext);
  if (!context) throw new Error ("useGestureDetection must be used within a GestureDetectionProvider");
  return context;
}