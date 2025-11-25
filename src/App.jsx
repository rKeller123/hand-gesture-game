import './App.css'
import { GestureDetectionProvider } from './common/gesture_detection/GestureDetectionContext'
import HigherLowerAppBar from './components/app_bar/HigherLowerAppBar'
import WelcomeTutorial from './components/welcome_tutorial'
import Game from "./components/game";
import {Route, Routes} from "react-router";
import {useState} from "react";
import EndScreen from "./components/end_screen/index.js";

function App() {
  const [scores, setScores] = useState([])

  const reportNewScore = (score) => {
    setScores(prev => [...prev, score])
  }

  return (
    <GestureDetectionProvider>
      <HigherLowerAppBar currentScore={scores.at(scores.length - 1)} />
      <Routes>
        <Route
          path="/"
          element={<WelcomeTutorial />}
        />
        <Route
          path="/detailed-tutorial"
          element={<p>detailed tutorial</p>}
        />
        <Route
          path="/game"
          element={<Game reportNewScore={reportNewScore} />}
        />
        <Route
          path="/test-game"
          element={<p>test spiel</p>}
        />
        <Route
          path="/end-screen"
          element={<EndScreen scores={scores} />}
        />
      </Routes>
    </GestureDetectionProvider>
  )
}

export default App
