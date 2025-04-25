import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './components/User/Login'
import { useDispatch, useSelector } from 'react-redux'
import { intialLoadingComplete, loginAction } from './redux/slices/authSlice'
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
import ProgressUpdate from './components/Student/UpdateProgress'
import Dashboard from './components/Student/StudentDashboard'
import AuthRoute from './Auth/AuthRoute'



function App() {
  // const userData = JSON.parse(localStorage.getItem('userInfo')); // REMOVE THIS LINE

  const { userInfo, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        dispatch(loginAction(userInfo));
      } catch (error) {
        console.error("Error parsing userInfo from localStorage:", error);
        // Handle the error appropriately (e.g., clear local storage)
      }
    }
    dispatch(intialLoadingComplete()); // Move this line here
  }, [dispatch]);

  // const userData = useSelector((state)=>state?.auth?.userInfo); // REMOVE THIS LINE
  // console.log(userData.role)
  // Add a check for userData before accessing userData.role
  let navbar;
  if (userInfo) { // Change userData to userInfo
    navbar = (userInfo?.role === 'student') ? <PrivateNavbar /> : // Change userData to userInfo
             (userInfo?.role === 'instructor') ? <InstructorNavbar /> : // Change userData to userInfo
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
          <Route path='/instructor-add-course' element={<AuthRoute><AddCourse/></AuthRoute> }/>
          <Route  path='/allCourses' element={<GetAllCourse/>}/>
          <Route path='/courses/:courseId' element={<CourseDetail/>}/>
          <Route path='/Ins-courses/:courseId' element={
            <AuthRoute>
              <InstructorCourseDetails/>
            </AuthRoute>
            }/>
          <Route path='/instructor-add-course-sections/:courseId' element={
            <AuthRoute>
              <AddCourseSections/>
            </AuthRoute>
            }/>
          <Route path='/instructor-courses' element={
            <AuthRoute>
              <GetAllCourseIns/>
            </AuthRoute>
            }/>
          <Route path='/instructor-update-course/:courseId' element={
            <AuthRoute>
              <UpdateCourse/>
            </AuthRoute>
            }/>
          <Route path='/instructor-course-sections' element={
            <AuthRoute>
              <InstructorAllCourseSections/>
            </AuthRoute>
            }/>
          <Route path='/update-course-section/:sectionId' element={
            <AuthRoute>
              <UpdateCourseSection/>
            </AuthRoute>
            }/>
          <Route path='/students-position/:courseId' element={<StudentRankList/>}/>
          <Route path='/start-section/:courseId' element={
            <AuthRoute>
              <StartSection/>
            </AuthRoute>
            }/>
          <Route path='/progress-update/:courseId' element={
            <AuthRoute>
              <ProgressUpdate/>
            </AuthRoute>
            }/>
          <Route path='/student-dashboard' element={
            <AuthRoute>
              <Dashboard/>
            </AuthRoute>
            }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;