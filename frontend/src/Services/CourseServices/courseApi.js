

// --------Create Course--------

import axios from "axios";

export const CourseCreateApi = async(data)=>{
    const Info = JSON.parse(localStorage.getItem('userInfo'));
    // console.log(Info.token);

    const response =  await axios.post('http://localhost:3000/api/v1/course/create',{
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
 