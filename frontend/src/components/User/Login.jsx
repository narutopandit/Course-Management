import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React from 'react'
import {FiMail, FiLock} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { LogInApi } from '../../Services/UserServices/userApi'
import { AlertMessage } from './AlertMessage'
import { useDispatch } from 'react-redux'
import { loginAction } from '../../redux/slices/authSlice'

//validation schema
const validateSchema = yup.object({
    email: yup.string().email('Enter a valid Email').required('Email is required'),
    password: yup.string().required('Password is required')
})

const Login = () => {
    const dispatch =  useDispatch();
    const mutation = useMutation({
        mutationFn:LogInApi,
        mutationKey:['login']
    })
    //handle formik
    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema:validateSchema,
        onSubmit: (values)=>{
            // console.log(values);
            mutation.mutateAsync(values).then((data)=>{
                localStorage.setItem('token',data.token)
                //dispatch
                dispatch(loginAction(data.token))
            }).catch((err)=>console.log(err));
  
        }
    });
    // console.log(mutation)
  return (
    <div className="flex items-center justify-center min-h-screen bg-custombg">
      <div className="max-w-sm w-full bg-midnight rounded-xl shadow-md p-8 border border-borderHG">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-semibold text-white text-center">
            Sign In
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
              message="Login success you will be redirected soon..."
            />
          )}

          <Link
            to="/register"
            className="text-sm text-indigo-600 hover:text-indigo-700 transition duration-200 block text-center mb-6"
          >
            New here? <span className="font-medium">Create an account</span>
          </Link>

          <div className="flex items-center bg-inputC rounded-full px-3 py-2 border border-borderHG hover:border-borderG">
            <FiMail className="text-gray-500" />
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              className="w-full  bg-inputC focus:ring-0 placeholder-customGray ml-2 text-white"
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
              id="password"
              {...formik.getFieldProps("password")}
              className="w-full  bg-inputC focus:ring-0 placeholder-gray-400 ml-2 text-white"
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
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login