import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Products from './components/Products/Products'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Products></Products>
    </>
  )
}

export default App
