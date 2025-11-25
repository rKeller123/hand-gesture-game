import './App.css'
import { GestureDetectionProvider } from './common/gesture_detection/GestureDetectionContext'
import HigherLowerAppBar from './components/app_bar/HigherLowerAppBar'
import Fingerpose_Poc from './components/fingerpose_poc'
import WelcomeTutorial from './components/welcome_tutorial'
import Gamescreen from "./components/gamescreen/Gamescreen.jsx";
import Game from "./components/game";
import {Route, Routes} from "react-router";
import {useState} from "react";

function App() {
  const [currentScore, setCurrentScore] = useState({timestamp: null, score: null});

  const reportNewScore = (timestamp, score) => {
    setCurrentScore({ timestamp, score })
  }

  return (
    <GestureDetectionProvider>
      <HigherLowerAppBar currentScore={currentScore} />
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
          element={<p>end screen</p>}
        />
      </Routes>
    </GestureDetectionProvider>
  )
}

export default App
