import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './components/User/Login'
import { useDispatch } from 'react-redux'
import { loginAction } from './redux/slices/authSlice'

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loginAction(localStorage.getItem('token')))
  },[dispatch]);
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
