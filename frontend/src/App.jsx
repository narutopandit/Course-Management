import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

const Homepage = ()=><div>Welcome</div>
function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
