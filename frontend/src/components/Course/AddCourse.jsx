import { useMutation } from '@tanstack/react-query'
import { Field, useFormik } from 'formik'
import React, { useState } from 'react'
import {FiMail, FiLock} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { RegisterApi } from '../../Services/UserServices/userApi'
import { MoonLoader } from 'react-spinners';
import AlertMessage from '../Alert/AlertMessage'
import { FaRegUser } from "react-icons/fa";
import { CourseCreateApi } from '../../Services/CourseServices/courseApi'
//validation schema
const validateSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    difficulty: yup.string().required('Choose the difficulty'),
    duration: yup.string().required('duration is required'),
})

const AddCourse = () => {

    // const navigate = useNavigate();
    // const [loading,setLoading] = useState('');
    const mutation = useMutation({
        mutationFn:CourseCreateApi,
        mutationKey:['Create']
    })
    //handle formik
    const formik = useFormik({
        initialValues:{
            title:'',
            description:'',
            difficulty:'',
            duration:'',
        },
        validationSchema:validateSchema,
        onSubmit: (values)=>{
            // console.log(values);
            mutation.mutateAsync(values).then((data)=>{
                console.log(data);
            }).catch((err)=>console.log(err));
        }
    });
    // console.log(mutation)
    return(
        <div className="flex items-center justify-center min-h-screen bg-custombg">
          <div className="max-w-sm w-full bg-midnight rounded-xl shadow-md p-8 border border-borderHG">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <h1 className="text-2xl font-semibold text-white text-center">
                Add Course
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
                  message="Course Created Sucessfully....."
                />
              )}
              {mutation.isPending && (
                <AlertMessage
                  type="loading"
                  message="Loading please wait..."
                />
              )}
      
              <div className="text-sm text-white block text-center mb-6 ">
                Add a new course that you want your students to keep track of their progress.
              </div>
      
              <div className="flex items-center bg-inputC rounded-full px-3 py-2 border border-borderHG hover:border-borderG">
                <input
                  type="title"
                  id='title'
                  {...formik.getFieldProps("title")}
                  className="w-full bg-inputC focus:ring-0 placeholder-customGray ml-2 text-white"
                  placeholder="Enter title"
                />
              </div>
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.title}
                </div>
              )}
      
              <div className="flex items-center bg-inputC rounded-full px-3 py-2 border border-borderHG hover:border-borderG">
                <textarea
                  type="description"
                  id='Description'
                  {...formik.getFieldProps("description")}
                  className="w-full bg-inputC focus:ring-0 placeholder-customGray ml-2 text-white rounded-full pl-2"
                  placeholder="Enter description"
                />
              </div>
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </div>
              )}

              <div className="flex items-center bg-inputC rounded-full px-3 py-2 border border-borderHG hover:border-borderG">
              <select
             id="difficulty"
             name="difficulty"
             onChange={formik.handleChange}
             value={formik.values.difficulty}
            className="w-full bg-inputC focus:ring-0 placeholder-gray-400 ml-2 text-white"
           >
             <option value="" disabled>Select Difficulty</option>
             <option value="beginner">Beginner</option>
             <option value="intermediate">Intermediate</option>
             <option value="advance">Advanced</option>
           </select>
              </div>
              <div className="flex items-center bg-inputC rounded-full px-3 py-2 border border-borderHG hover:border-borderG">
                <input
                  type="duration"
                  {...formik.getFieldProps("duration")}
                  className="w-full bg-inputC focus:ring-0 placeholder-gray-400 ml-2 text-white"
                  placeholder="Enter duration"
                />
              </div>
              {formik.touched.duration && formik.errors.duration && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.duration}
                </div>
              )}
      
              <button
                className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Add Course
              </button>
            </form>
          </div>
        </div>
      )    
}

export default AddCourse;