import './App.css'
import { GestureDetectionProvider } from './common/gesture_detection/GestureDetectionContext'
import HigherLowerAppBar from './components/app_bar/HigherLowerAppBar'
import WelcomeTutorial from './components/welcome_tutorial'
import Game from "./components/game";
import {Route, Routes} from "react-router";
import {useState, useEffect} from "react";      // ⬅ added useEffect
import EndScreen from "./components/end_screen/index.js";
import DetailedTutorial from "./components/detailed_tutorial/index.js";

function App() {
  // Load initial scores from localStorage
  const [scores, setScores] = useState(() => {
    const stored = localStorage.getItem("scores");
    return stored ? JSON.parse(stored) : [];
  });

  const reportNewScore = (score) => {
    setScores(prev => [...prev, score]);
  };

  // Save scores to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  return (
    <GestureDetectionProvider>
      <HigherLowerAppBar scores={scores} />
      <Routes>
        <Route path="/" element={<WelcomeTutorial />} />
        <Route path="/detailed-tutorial" element={<DetailedTutorial />} />
        <Route path="/game" element={<Game reportNewScore={reportNewScore} />} />
        <Route path="/test-game" element={<p>test spiel</p>} />
        <Route path="/end-screen" element={<EndScreen scores={scores} />} />
      </Routes>
    </GestureDetectionProvider>
  );
}

export default App;
