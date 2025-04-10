const express = require('express');
const usersCtrl = require('../controllers/user');
const isAuth = require('../middlleware/isAuthenciate');
const userRouter = express.Router();

//register
userRouter.post('/register',usersCtrl.register);

//login
userRouter.post('/login',usersCtrl.login);

//get the position
userRouter.get('/position/:courseId',usersCtrl.getAllUsers);

//get user by id
userRouter.get('/:userId',isAuth,usersCtrl.getUserById);

//get private profile
userRouter.get('/profile/private',isAuth,usersCtrl.privateProfile);

//get public profile
userRouter.get('/profile',isAuth,usersCtrl.profile);

//logout
userRouter.post('/logout',usersCtrl.logout);

//check for authentication
userRouter.get(
    "/checkAuthenticated",
    isAuthenticated,
    usersCtrl.checkAuthenticated
  );

module.exports = userRouter;
