
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Course = require('../models/Course');

const courseCtrl = {
    //create course
    create: asyncHandler(async(req,res)=>{
        
        //validate user
        const user = await User.findById({_id:req.user._id});
        if(!user){
            throw new Error('User not found')
        }
        // if(user.role !== 'instructor'){
        //     throw new Error('Only instructors can create courses');
        // }
        //validate course input
        const{title,description,difficulty,duration} = req.body;
        if(!title ||!description || !difficulty || !duration){
            throw new Error('Please provide all required fields')
        }
        //check if course already exists
        const existC= await Course.findOne({title})
        if(existC){
            throw new Error('Course already exists')
        }
        //create new course
        const course = await Course.create({
            title,
            description,
            difficulty,
            duration,
            user: user
        })
        //push course id
        user.courseCreated.push(course._id)
        await user.save()
        //response
        res.json({message:"Coursse Created!",
            course
        })
  }),

  //get all courses 
  lists: asyncHandler(async(req, res)=>{
    const courses = await Course.find({}).populate({
        path:'user',
        model:'User',
        select:'username email'
    });
    res.json(courses)
  }),

  //get single course
  getCourseById: asyncHandler(async(req, res)=>{
    const course = await Course.findById(req.params.courseId).populate({
        path:'sections',
        model:'CourseSection'
    }).populate({
        path:'user',
        model:'User'
    });
    if(!course){
        res.status(404)
        throw new Error('Course not found')
    }
    res.json(course);
  }),

  //update course
  update: asyncHandler(async(req, res)=>{
    const newCourse = await Course.findByIdAndUpdate(
        req.params.courseId,
        req.body,
        {new:true, runValidators:true}
    )
    if(!newCourse){
        res.status(404)
        throw new Error('Course not found')
    }
    res.json(newCourse);
  }),

  //delete course
  delete: asyncHandler(async(req, res)=>{

     //check if a course has students
     const courseFound = await Course.findById(req.params.courseId);

     if (courseFound.students.length > 0) {
       res.status(400);
       throw new Error("Course has students, cannot delete");
     }

    const course = await Course.findByIdAndDelete(req.params.courseId);
    if(!course){
        res.status(404)
        throw new Error('Course not found')
    }
    res.json({message:'Course deleted successfully'})
  })
}

module.exports = courseCtrl;