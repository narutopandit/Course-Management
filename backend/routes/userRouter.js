const express = require('express');
const usersCtrl = require('../controllers/user');
const isAuth = require('../middlleware/isAuthenciate');
const userRouter = express.Router();

userRouter.post('/api/v1/users/register',usersCtrl.register);
userRouter.post('/api/v1/users/login',usersCtrl.login);
userRouter.get('/api/v1/users/profile',isAuth,usersCtrl.profile);

module.exports = userRouter;
