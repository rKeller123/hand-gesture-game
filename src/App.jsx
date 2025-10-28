import './App.css'
import { GestureDetectionProvider } from './common/gesture_detection/GestureDetectionContext'
import Fingerpose_Poc from './components/fingerpose_poc'

function App() {

  return (
    <GestureDetectionProvider>
      <Fingerpose_Poc />
    </GestureDetectionProvider>
  )
}

export default App
