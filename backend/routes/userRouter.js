const express = require('express');
const usersCtrl = require('../controllers/user');
const isAuth = require('../middlleware/isAuthenciate');
const userRouter = express.Router();

//register
userRouter.post('/register',usersCtrl.register);

//get public profile
userRouter.get('/profile',isAuth,usersCtrl.profile);

//login
userRouter.post('/login',usersCtrl.login);

//get user by id
userRouter.get('/:userId',isAuth,usersCtrl.getUserById);

//get the position
userRouter.get('/position/:courseId',usersCtrl.getAllUsers);

//get private profile
userRouter.get('/profile/private',isAuth,usersCtrl.privateProfile);

//check for authentication
userRouter.get(
    "/checkAuthenticated",
    isAuth,
    usersCtrl.checkAuthenticated
  );

//logout
userRouter.post('/logout',usersCtrl.logout);


module.exports = userRouter;
