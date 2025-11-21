import './App.css'
import { GestureDetectionProvider } from './common/gesture_detection/GestureDetectionContext'
import Fingerpose_Poc from './components/fingerpose_poc'
import Gamescreen from "./components/gamescreen/Gamescreen.jsx";
import Game from "./components/game";

function App() {

  return (
    <GestureDetectionProvider>
      <Game />
    </GestureDetectionProvider>
  )
}

export default App
