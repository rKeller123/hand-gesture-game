import { Finger, FingerCurl, FingerDirection, GestureDescription, Gestures } from "fingerpose";

const ThumbsUpGesture = Gestures.ThumbsUpGesture; // 👍
const ThumbsDownGesture = new GestureDescription('thumbs_down'); // 👎
const VictoryGesture = Gestures.VictoryGesture;

// thumbs down

// thumb: no curl, down
// other fingers: full curl


// thumb: no curl, pointing down
ThumbsDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ThumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);
ThumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.9);
ThumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9);

// other fingers: fully curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ThumbsDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ThumbsDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// require the index finger to be somewhat left or right pointing
// but NOT down and NOT fully up
ThumbsDownGesture.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
ThumbsDownGesture.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
ThumbsDownGesture.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);
ThumbsDownGesture.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

export default [ThumbsUpGesture, ThumbsDownGesture, VictoryGesture];