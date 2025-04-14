import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import {FiMail, FiLock} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { RegisterApi } from '../../Services/UserServices/userApi'
import { MoonLoader } from 'react-spinners';
import AlertMessage from '../Alert/AlertMessage'
import { FaRegUser } from "react-icons/fa";
//validation schema
const validateSchema = yup.object({
    email: yup.string().email('Enter a valid Email').required('Email is required'),
    password: yup.string().required('Password is required'),
    username: yup.string().required('Username is required')
})

const Register = () => {

    const navigate = useNavigate();
    const [loading,setLoading] = useState('');
    const mutation = useMutation({
        mutationFn:RegisterApi,
        mutationKey:['register']
    })
    //handle formik
    const formik = useFormik({
        initialValues:{
            email:'',
            password:'',
            username:'',
        },
        validationSchema:validateSchema,
        onSubmit: (values)=>{
            // console.log(values);
            mutation.mutateAsync(values).then((data)=>{
                setLoading('loading');
                setTimeout(()=>{
                    setLoading('');
                    navigate('/login')
                },3000)
            }).catch((err)=>console.log(err));
  
        }
    });
    // console.log(mutation)
    return (loading === '' ? (
        <div className="flex items-center justify-center min-h-screen bg-custombg">
          <div className="max-w-sm w-full bg-midnight rounded-xl shadow-md p-8 border border-borderHG">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <h1 className="text-2xl font-semibold text-white text-center">
                Sign Up
              </h1>
      
              {mutation.isError && (
                <AlertMessage
                  type="error"
                  message={mutation.error.response?.data?.message}
                />
              )}
      
              {mutation.isSuccess && (
                <AlertMessage
                  type="success"
                  message="Registration success you will be redirected soon..."
                />
              )}
              {mutation.isPending && (
                <AlertMessage
                  type="loading"
                  message="Loading please wait..."
                />
              )}
      
              <Link
                to="/login"
                className="text-sm text-indigo-600 hover:text-indigo-700 transition duration-200 block text-center mb-6"
              >
                Already have account? <span className="font-medium">LogIn</span>
              </Link>
      
              <div className="flex items-center bg-inputC rounded-full px-3 py-2 border border-borderHG hover:border-borderG">
                <FaRegUser className="text-gray-500" />
                <input
                  type="text"
                  {...formik.getFieldProps("username")}
                  className="w-full bg-inputC focus:ring-0 placeholder-customGray ml-2 text-white"
                  placeholder="Username"
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </div>
              )}
      
              <div className="flex items-center bg-inputC rounded-full px-3 py-2 border border-borderHG hover:border-borderG">
                <FiMail className="text-gray-500" />
                <input
                  type="email"
                  {...formik.getFieldProps("email")}
                  className="w-full bg-inputC focus:ring-0 placeholder-customGray ml-2 text-white"
                  placeholder="Email address"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
      
              <div className="flex items-center bg-inputC rounded-full px-3 py-2 border border-borderHG hover:border-borderG">
                <FiLock className="text-gray-500" />
                <input
                  type="password"
                  {...formik.getFieldProps("password")}
                  className="w-full bg-inputC focus:ring-0 placeholder-gray-400 ml-2 text-white"
                  placeholder="Password"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              )}
      
              <button
                className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className='w-full h-full'>
            <div className='flex justify-center items-center'>
                <MoonLoader color="#00fada" loading />                
            </div>
        </div>
      ));
      
}

export default Register;