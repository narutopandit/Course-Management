const express = require('express');
const isAuth = require('../middlleware/isAuthenciate');
const courseCtrl = require('../controllers/course');
const courseRouter = express.Router();

courseRouter.post('/api/v1/course/create',isAuth,courseCtrl.create);
courseRouter.get('/api/v1/course/list',isAuth,courseCtrl.lists);
courseRouter.get('/api/v1/course/:courseId',isAuth,courseCtrl.getCourseById);
courseRouter.put('/api/v1/course/:courseId',isAuth,courseCtrl.update);
courseRouter.delete('/api/v1/course/:courseId',isAuth,courseCtrl.delete);


module.exports = courseRouter;