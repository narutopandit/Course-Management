import axios from "axios";
import { BASE_API } from "../../Utils/utils";

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
 