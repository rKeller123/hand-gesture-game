import './App.css'
import { GestureDetectionProvider } from './common/gesture_detection/GestureDetectionContext'
import HigherLowerAppBar from './components/app_bar/HigherLowerAppBar'
import Fingerpose_Poc from './components/fingerpose_poc'
import WelcomeTutorial from './components/welcome_tutorial'
import Gamescreen from "./components/gamescreen/Gamescreen.jsx";
import Game from "./components/game";
import {Route, Routes} from "react-router";

function App() {

  return (
    <GestureDetectionProvider>
      <HigherLowerAppBar />
      <Routes>
        <Route
          path="/"
          element={<WelcomeTutorial />}
        />
        <Route
          path="/game"
          element={<Game />}
        />
        <Route
          path="/test-game"
          element={<p>test spiel</p>}
        />
      </Routes>
    </GestureDetectionProvider>
  )
}

export default App
