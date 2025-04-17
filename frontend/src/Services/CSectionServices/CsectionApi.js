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
// ----------show all-Section---------

export const getAllCourseSectionsAPI = async()=>{
const response =  await axios.get(`${BASE_API}/section/list`,{
   headers:{
       Authorization: Info.token
   }
})
//  console.log(response)
return response.data;

}
// ----------Delete-Section---------

export const deleteSectionAPI = async(sectionId)=>{
const response =  await axios.delete(`${BASE_API}/section/${sectionId}`,{
   headers:{
       Authorization: Info.token
   }
})
//  console.log(response)
return response.data;

}

//--------- single section by Id--------
export const getSingleSectionAPI = async(data)=>{
    const response = await axios.get(`${BASE_API}/section/${data}`,{
        headers:{
            Authorization:Info.token
        }
    })
    return response.data
}
//--------- Update Section--------
export const updateSectionAPI = async(data)=>{
    const response = await axios.put(`${BASE_API}/section/${data.sectionId}`,{
        sectionName: data.sectionName
    },{
        headers:{
            Authorization:Info.token
        }
    })
    return response.data
}