import './App.css'
import { GestureDetectionProvider } from './common/gesture_detection/GestureDetectionContext'
import HigherLowerAppBar from './components/app_bar/HigherLowerAppBar'
import WelcomeTutorial from './components/welcome_tutorial'
import Game from "./components/game";
import {Route, Routes} from "react-router";
import {useState, useEffect} from "react";
import EndScreen from "./components/end_screen/index.js";
import DetailedTutorial from "./components/detailed_tutorial/index.js";

function App() {
  const [scores, setScores] = useState(() => {
    const stored = localStorage.getItem("scores");
    return stored ? JSON.parse(stored) : [];
  });
  const [currentScore, setCurrentScore] = useState(null);

  const reportNewScore = (score) => {
    setScores(prev => [...prev, score]);
  };

  const reportCurrentScore = (currentScore) => {
      setCurrentScore(currentScore);
  };

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  return (
    <GestureDetectionProvider>
      <HigherLowerAppBar scores={scores} currentScore={currentScore} />
      <Routes>
        <Route path="/" element={<WelcomeTutorial />} />
        <Route path="/detailed-tutorial" element={<DetailedTutorial />} />
        <Route path="/game" element={<Game reportNewScore={reportNewScore} reportCurrentScore={reportCurrentScore} />} />
        <Route path="/end-screen" element={<EndScreen scores={scores} />} />
      </Routes>
    </GestureDetectionProvider>
  );
}

export default App;
