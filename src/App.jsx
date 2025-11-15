import './App.css'
import { GestureDetectionProvider } from './common/gesture_detection/GestureDetectionContext'
import Fingerpose_Poc from './components/fingerpose_poc'
import Gamescreen from "./components/gamescreen/Gamescreen.jsx";

function App() {

  return (
    <GestureDetectionProvider>
      <Gamescreen />
      <Fingerpose_Poc />
    </GestureDetectionProvider>
  )
}

export default App
