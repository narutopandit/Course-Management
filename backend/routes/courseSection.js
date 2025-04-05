const express = require('express');
const isAuth = require('../middlleware/isAuthenciate');
const { create } = require('../models/courseSection');
const sectionCtrl = require('../controllers/section');
const CSectionRouter = express.Router();

CSectionRouter.post('/api/v1/section/create/:courseId',isAuth,sectionCtrl.create);
CSectionRouter.get('/api/v1/section/list',isAuth,sectionCtrl.list);
CSectionRouter.get('/api/v1/section/:sectionId',isAuth,sectionCtrl.getSectionById);
CSectionRouter.put('/api/v1/section/:sectionId',isAuth,sectionCtrl.update);
CSectionRouter.delete('/api/v1/section/:sectionId',isAuth,sectionCtrl.delete);


module.exports = CSectionRouter;