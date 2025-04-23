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
import GetAllCourse from './components/Course/GetAllCourses'
import CourseDetail from './components/Course/CourseDetails'
import GetAllCourseIns from './components/Instructor/Course/InstructorCourses'
import AddCourseSections from './components/Instructor/CSection/AddCourseSection'
import InstructorCourseDetails from './components/Instructor/Course/InstructorCourseDetails'
import UpdateCourse from './components/Instructor/Course/UpdateCourses'
import InstructorAllCourseSections from './components/Instructor/CSection/InstructorAllCourseSection'
import UpdateCourseSection from './components/Instructor/CSection/UpdateCourseSections'
import StudentRankList from './components/Student/Ranking'
import StartSection from './components/Student/StartSection'

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
          <Route  path='/allCourses' element={<GetAllCourse/>}/>
          <Route path='/courses/:courseId' element={<CourseDetail/>}/>
          <Route path='/Ins-courses/:courseId' element={<InstructorCourseDetails/>}/>
          <Route path='/instructor-add-course-sections/:courseId' element={<AddCourseSections/>}/>
          <Route path='/instructor-courses' element={<GetAllCourseIns/>}/>
          <Route path='/instructor-update-course/:courseId' element={<UpdateCourse/>}/>
          <Route path='/instructor-course-sections' element={<InstructorAllCourseSections/>}/>
          <Route path='/update-course-section/:sectionId' element={<UpdateCourseSection/>}/>
          <Route path='/students-position/:courseId' element={<StudentRankList/>}/>
          <Route path='/start-section/:courseId' element={<StartSection/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App