const express = require('express');
const usersCtrl = require('../controllers/user');
const isAuth = require('../middlleware/isAuthenciate');
const { isStudent } = require('../middlleware/roleMiddleware');
const userRouter = express.Router();

//register
userRouter.post('/register',usersCtrl.register);

//get public dashboard
userRouter.get('/dashboard',isAuth,isStudent,usersCtrl.studentDashboard);

//get private profile
userRouter.get('/profile-private',isAuth,usersCtrl.privateProfile);

//login
userRouter.post('/login',usersCtrl.login);

//get user by id
userRouter.get('/:userId',isAuth,usersCtrl.getUserById);

//get the position
userRouter.get('/position/:courseId',usersCtrl.getAllUsers);



//check for authentication
userRouter.get(
    "/checkAuthenticated",
    isAuth,
    usersCtrl.checkAuthenticated
  );

//logout
userRouter.post('/logout',usersCtrl.logout);


module.exports = userRouter;
