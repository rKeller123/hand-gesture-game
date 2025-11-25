import './App.css'
import { GestureDetectionProvider } from './common/gesture_detection/GestureDetectionContext'
import HigherLowerAppBar from './components/app_bar/HigherLowerAppBar'
import Fingerpose_Poc from './components/fingerpose_poc'
import WelcomeTutorial from './components/welcome_tutorial'
import Gamescreen from "./components/gamescreen/Gamescreen.jsx";
import Game from "./components/game";

function App() {

  return (
    <GestureDetectionProvider>
      <HigherLowerAppBar />
      <WelcomeTutorial />
      <Fingerpose_Poc />
      <Game />
    </GestureDetectionProvider>
  )
}

export default App
