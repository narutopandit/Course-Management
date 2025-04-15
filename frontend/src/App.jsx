import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './components/User/Login'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from './redux/slices/authSlice'
import Register from './components/User/register'
import Homepage from './components/Home/HomePage'
import PrivateNavbar from './components/NavBar/PrivateNav'
import InstructorNavbar from './components/NavBar/InstructorNav'
import PublicNavbar from './components/NavBar/PublicNav'
import AddCourse from './components/Course/AddCourse'

function App() {
  const userData = JSON.parse(localStorage.getItem('userInfo'));

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loginAction(localStorage.getItem('userInfo')))
  },[dispatch]);
  // const userData = useSelector((state)=>state?.auth?.userInfo);
  // console.log(userData.role)
  // Add a check for userData before accessing userData.role
  let navbar;
  if (userData) {
    navbar = (userData?.role === 'student') ? <PrivateNavbar /> :
             (userData?.role === 'instructor') ? <InstructorNavbar /> :
             <PublicNavbar />;
  } else {
    navbar = <PublicNavbar />; // Or some other default
  }

  return (
    <>
      <BrowserRouter>
        {navbar}
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/instructor-add-course' element={<AddCourse/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App