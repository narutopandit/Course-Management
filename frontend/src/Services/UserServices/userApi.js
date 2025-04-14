import axios from "axios";

// --------LogIn----------

export const LogInApi = async(data)=>{
   const response =  await axios.post('http://localhost:3000/api/v1/users/login',{
        email:data?.email,
        password:data?.password
    })
    // console.log(response)
    return response.data;
}


// -------Register---------
export const RegisterApi = async(data)=>{
    const response =  await axios.post('http://localhost:3000/api/v1/users/register',{
         email:data?.email,
         password:data?.password,
         username:data?.username
     })
     // console.log(response)
     return response.data;
 }
 