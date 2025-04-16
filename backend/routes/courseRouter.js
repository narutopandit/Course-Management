const express = require('express');
const isAuth = require('../middlleware/isAuthenciate');
const courseCtrl = require('../controllers/course');
const { isInstructor } = require('../middlleware/roleMiddleware');
const courseRouter = express.Router();


//create course
courseRouter.post('/create',isAuth,isInstructor,courseCtrl.create);

//show all the courses
courseRouter.get('/list',courseCtrl.lists);

//get the course by Id
courseRouter.get('/:courseId',courseCtrl.getCourseById);

//update the course
courseRouter.put('/:courseId',isAuth,isInstructor,courseCtrl.update);

//delete the course
courseRouter.delete('/:courseId',isAuth,isInstructor,courseCtrl.delete);


module.exports = courseRouter;