const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { model, default: mongoose } = require('mongoose');
const Course = require('../models/Course');

const usersCtrl = { 
    //register
    register: asyncHandler(async(req,res)=>{
    //take input
    const { username, email, password ,role} = req.body;
    //validate inputs
    if(!username || !email || !password || !role){
        throw new Error('all fields are required');
    }
    //check for user
    const userExists = await User.findOne({email});
    if(userExists){
        throw new Error('Email already in use');
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);

    //create user and send response
     const userCreate = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, salt),
        role
     })
     res.json({
        username:userCreate.username,
        email:userCreate.email,
        role:userCreate.role,
        id: userCreate._id
     })
}),

    //login
    login: asyncHandler(async(req,res)=>{
        //take input
        const {email, password} = req.body;
        //validate email
        const user = await User.findOne({email});
        
        if(!user){
            throw new Error('Invalid email or password');
        }
        //check password
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            throw new Error('Invalid email or password');
        }
        //generate token
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{
            expiresIn: '3d'
        })
            // Set token in HttpOnly cookie
            // res.cookie("token", token, {
            //   httpOnly: true, // The cookie is not accessible via JavaScript
            //   secure: process.env.NODE_ENV === "production", // Use HTTPS in production
            //   sameSite: "strict", // Strictly same site
            //   maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            // });

        //response
        res.json({
            message:'login success',
            token,
            username:user.username,
            email:user.email,
            role:user.role,
            id: user._id
        })
}),

    //get all user
    getAllUsers: asyncHandler(async(req, res)=>{
        const courseId = req.params.courseId; // Get course ID from query parameters

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const users = await User.find({}).populate({
      path: "progress",
      populate: {
        path: "courseId",
        model: "Course",
        match: { _id: courseId },
        populate: {
          path: "sections",
          model: "CourseSection",
        },
      },
    });

    
        let userProgressData = users
      .map((user) => {
        const courseProgress = user.progress.find(
          (cp) => cp.courseId && cp.courseId._id.toString() === courseId
        );

        if (!courseProgress) {
          return null;
        }

        const totalSections = courseProgress.courseId.sections.length;
        const sectionsCompleted = courseProgress.sections.filter(
          (section) => section.status === "Completed"
        ).length;
        const progressPercentage =
          totalSections > 0
            ? parseFloat(((sectionsCompleted / totalSections) * 100).toFixed(1))
            : 0;

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          totalSections,
          sectionsCompleted,
          progressPercentage,
          position: null, // Position will be determined after sorting
          username: user.username,
          dateJoined: user?.createdAt,
        };
      })
      .filter((item) => item !== null); // Remove users without progress in the specified course

    // Sort users based on sectionsCompleted and assign positions
    // Sort users based on sectionsCompleted
    userProgressData.sort((a, b) => b.sectionsCompleted - a.sectionsCompleted);

    // Assign positions with dense ranking
    let lastRank = 0;
    let lastSectionsCompleted = -1;
    userProgressData.forEach((user) => {
      if (user.sectionsCompleted !== lastSectionsCompleted) {
        lastRank++;
        lastSectionsCompleted = user.sectionsCompleted;
      }
      user.position = `${lastRank}${
        ["st", "nd", "rd"][((((lastRank + 90) % 100) - 10) % 10) - 1] || "th"
      }`;
    });

    res.json(userProgressData);
  }),

   //get user by id
   getUserById: asyncHandler(async(req, res)=>{
    const userId = req.params.userId;
    const user = await User.findById({_id:userId}).populate({
        path:'progress',
        populate:{
          path:'courseId',
          model:'Course',
          populate:{
            path:'sections',
            model:'CourseSection'
          }
        }
    });
    if(!user){
      res.status(404);
      throw new Error('User not found!')
    }
    res.json(user);
  }),

  //user profile
  studentDashboard: asyncHandler(async(req, res)=>{
    //get user Id
    const id = req.user._id;    
    //find user and populate
    const user = await User.findById(id).populate({
      path:'progress',
      populate:[
        {
          path:'courseId',
          model:'Course',
          populate:{
            path:'sections',
            model:'CourseSection'
          }
        }
      ]
    });
    //validate user
    if(!user){
      res.status(404);
      throw new Error('user not found')
    }
    //filter course from progress
    const progressCourse = user?.progress.map((cp)=>{
      let totalSections = cp.courseId.sections.length;
      let completed=0,ongoing=0,notStarted=0;
    
      cp.sections.forEach((s)=>{
      if(s.status === 'Completed') completed++;
      else if(s.status === 'In Progress') ongoing++;
      else notStarted++;
    });

    return{
      courseId: cp.courseId._id,
      CourseTitle: cp.courseId.title,
      totalSections,
      completed,
      ongoing,
      notStarted
    }
  })
    //res-->user,course,summary
    res.json({
      totalCourse:user.progress.length,
      progressCourse
    })
  }),

  //private profile
  privateProfile: asyncHandler(async(req, res)=>{
     //get user Id
     const id = req.user._id;  
     //get CourseId from query params
     const {courseId} = req.query;
     //find user and populate
     const user = await User.findById(id).populate({
       path:'progress',
       populate:[
         {
           path:'courseId',
           model:'Course',
           populate:{
             path:'sections',
             model:'CourseSection'
           }
         },
         {
           path:'sections.sectionId',
           model:'CourseSection'
         }
       ]
     });
     //validate user
     if(!user){
       res.status(404);
       throw new Error('user not found')
     }
     
     //filter course from progress
     let progressCourse = courseId?user?.progress?.find((c)=>c.courseId._id.toString()===courseId):null;
     
     //prepare summary-->courseId,courseTitle,totalSections,completed,ongoing,notStarted
     let progressSummary = null;
     if(progressCourse){
       let totalSections = user.progress.sections?.length;
       let completed=0,ongoing=0,notStarted=0;
     
       progressCourse.sections.forEach((s)=>{
       if(s.status === 'Completed') completed++;
       else if(s.status === 'In Progress') ongoing++;
       else notStarted++;
     })
     progressSummary = {
       courseId: courseId,
       CourseTitle: progressCourse.title,
       totalSections,
       completed,
       ongoing,
       notStarted
     }
   }
     //res-->user,course,summary
     res.json({
       user,progressCourse,progressSummary
     })
  }),

   // Check if user is authenticated
  checkAuthenticated: asyncHandler(async (req, res) => {
    const token = req.cookies["token"];

    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).populate({
        path: "coursesCreated",
      });
      if (!user) {
        return res.status(401).json({ isAuthenticated: false });
      }
      return res.status(200).json({ isAuthenticated: true, user: user });
    } catch (error) {
      return res.status(401).json({ isAuthenticated: false, error });
    }
  }),

  //logout
  logout: asyncHandler(async (req, res) => {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({ message: "Logged out successfully" });
  }),

}

module.exports = usersCtrl;