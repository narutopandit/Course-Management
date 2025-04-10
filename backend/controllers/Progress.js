const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Course = require('../models/Course');

const progressCtrl = {
   //apply course
  applyCourse: asyncHandler(async(req, res)=>{
        //find user
        const user = req.user;
        const {courseId} =req.body;
        //check if user is already enrolled in the course
        const isAlreadyEnrolled = user.progress.some((d)=>d.courseId.toString() === courseId);
        if(isAlreadyEnrolled){
            throw new Error('User is already enrolled in the course');
        }
        //Validate the course
        const course = await Course.findById({_id: courseId});
        if(!course){
            res.status(404)
            throw new Error('Course not found');
        }
        //Add the course to user progress
        user.progress.push({courseId, sections:[]});
        await user.save();

        //push the user to course.students
        course.students.push(user._id);
        await course.save();

        res.json({message: 'Course applied successfully'})
  }),

  //update section to progress
  updateSection : asyncHandler(async(req, res)=>{

    const {courseId,sectionId,newStatus} = req.body;
    //find user
    const user = req.user;
    //find the course in progress
    const courseProgress = user.progress.find((d)=>d.courseId.toString() === courseId);
    if(!courseProgress){
        throw new Error('User is not enrolled in the course');
    }
    //check if section is already started
    const sectionStarted = courseProgress.sections.find((s)=>s.sectionId.toString() === sectionId);

    //add the new section to course progress
    if(sectionStarted){
        sectionStarted.status = newStatus;
        await user.save();
    }else{
        throw new Error('Section not found');
        return;
    }
    //send res
    res.json({message: 'Section Updated!!'});
  }),

  //start the section
  startSection: asyncHandler(async (req, res) => {
    const { courseId, sectionId } = req.body;
    const userId = req.user._id;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find course progress
    const courseProgress = user.progress.find(
      (p) => p.courseId.toString() === courseId
    );
    if (!courseProgress) {
      return res
        .status(404)
        .json({ message: "Course not found in user's progress" });
    }

    // Check if the section is already started
    const existingSection = courseProgress.sections.find(
      (s) => s.sectionId.toString() === sectionId
    );
    if (existingSection) {
      return res.status(400).json({ message: "Section already started" });
    }

    // Add the new section to the course progress
    courseProgress.sections.push({
      sectionId: sectionId,
      status: "Not Started",
    });

    await user.save({
      validateBeforeSave: false,
    });
    res.status(200).json({ message: "Section started successfully" });
  }),

  // Method to get user progress
  getUserProgress: asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).populate(
      "progress.courseId progress.sections.sectionId",
    );
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user.progress);
  }),

 

}

module.exports = progressCtrl;