const express = require('express');
const isAuth = require('../middlleware/isAuthenciate');
const sectionCtrl = require('../controllers/section');
const { isInstructor } = require('../middlleware/roleMiddleware');
const CSectionRouter = express.Router();

//create section
CSectionRouter.post('/create/:courseId',isAuth,isInstructor,sectionCtrl.create);

//show all section
CSectionRouter.get('/list',isAuth,sectionCtrl.list);

//get section by Id
CSectionRouter.get('/:sectionId',isAuth,sectionCtrl.getSectionById);

//update section
CSectionRouter.put('/:sectionId',isAuth,isInstructor,sectionCtrl.update);

//delete section
CSectionRouter.delete('/:sectionId',isAuth,isInstructor,sectionCtrl.delete);


module.exports = CSectionRouter;