const express = require('express');
const isAuth = require('../middlleware/isAuthenciate');
const progressCtrl = require('../controllers/Progress');
const { isStudent, isAdmin } = require('../middlleware/roleMiddleware');

const progressRouter = express.Router();

//get all course
progressRouter.get('/',isAuth,progressCtrl.getUserProgress);

//apply to course
progressRouter.post('/apply',isAuth,isStudent,progressCtrl.applyCourse);

//update course section
progressRouter.put('/updateSection',isAuth,isAdmin,progressCtrl.updateSection);

//start section
progressRouter.post('/start-section',isAuth,progressCtrl.startSection);

module.exports = progressRouter;