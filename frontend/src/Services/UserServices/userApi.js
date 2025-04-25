import axios from "axios";
import { BASE_API } from "../../Utils/utils";
const Info = JSON.parse(localStorage.getItem('userInfo'));
// --------LogIn----------

export const LogInApi = async(data)=>{
   const response =  await axios.post(`${BASE_API}/users/login`,{
        email:data?.email,
        password:data?.password
    })
    // console.log(response)
    return response.data;
}


// -------Register---------
export const RegisterApi = async(data)=>{
    const response =  await axios.post(`${BASE_API}/users/register`,{
         email:data?.email,
         password:data?.password,
         username:data?.username,
         role:data?.role,
     })
     // console.log(response)
     return response.data;
 }


 //--------Student-Ranking---------
 export const getAllUsersAPI = async(courseId)=>{
    const response =  await axios.get(`${BASE_API}/users/position/${courseId}`)
     // console.log(response)
     return response.data;
 }

 //=======Get user profile=====
export const getUserProfileAPI = async (courseId) => {
    const response = await axios.get(
      `${BASE_API}/users/profile-private?courseId=${courseId}`,
      {
        headers:{
            Authorization: Info.token
        }
      }
    );
    return response?.data;
  };
  
  //------------dashBoard----------
  export const getPrivateUserProfileAPI = async () => {
    const response = await axios.get(
      `${BASE_API}/users/dashboard`,
      {
        headers:{
            Authorization: Info.token
        }
      }
    );
    return response?.data;
  };