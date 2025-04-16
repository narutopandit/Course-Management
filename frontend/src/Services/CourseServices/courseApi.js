

// --------Create Course--------

import axios from "axios";
import { BASE_API } from "../../Utils/utils";
const Info = JSON.parse(localStorage.getItem('userInfo'));
export const CourseCreateApi = async(data)=>{

    // console.log(Info.token);

    const response =  await axios.post(`${BASE_API}/course/create`,{
         title:data?.title,
         description:data?.description,
         difficulty:data?.difficulty,
         duration:data?.duration
     },{
        headers:{
            Authorization: Info.token
        }
     })
    //  console.log(response)
     return response.data;
 }
 
 //-------Get all Courses--------

 export const GetCoursesApi = async()=>{

    const response =  await axios.get(`${BASE_API}/course/list`)
    //  console.log(response)
     return response.data;
 }
 //-------Get single Courses--------

 export const GetCourseByIdApi = async(id)=>{

    const response =  await axios.get(`${BASE_API}/course/${id}`)
    //  console.log(response)
     return response.data;
 }

 //----apply for Course-----
 export const startCourseAPI = async(data)=>{

    const response =  await axios.post(`${BASE_API}/progress/apply`,data,{
        headers:{
            Authorization: Info.token
        }
    })
    //  console.log(response)
     return response?.data;
 }

 //-----delete a course-------

 export const deleteCourseAPI = async(data)=>{

    const response =  await axios.delete(`${BASE_API}/course/${data}`,{
        headers:{
            Authorization: Info.token
        }
    })
    //  console.log(response)
     return response?.data;
 }

//  --------Update Course--------
export const updateCourseAPI = async(data)=>{

    const response =  await axios.put(`${BASE_API}/course/${data.courseId}`,{
        title:  data?.title,
        description: data?.description,
        difficulty: data?.difficulty,
        duration: data?.duration
    },{
        headers:{
            Authorization: Info.token
        }
    })
    //  console.log(response)
     return response?.data;
 }