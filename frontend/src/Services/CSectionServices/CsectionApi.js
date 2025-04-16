import axios from "axios";
import { BASE_API } from "../../Utils/utils";
const Info = JSON.parse(localStorage.getItem('userInfo'));



// ----------Add-Section---------

export const addCourseSectionAPI = async(data)=>{
const response =  await axios.post(`${BASE_API}/section/create/${data.courseId}`,{
 sectionName:data.sectionName
},{
   headers:{
       Authorization: Info.token
   }
})
//  console.log(response)
return response.data;

}