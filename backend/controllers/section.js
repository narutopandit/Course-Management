const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Course = require('../models/Course');
const CourseSection = require('../models/courseSection');

const sectionCtrl = {
    //Cretae section
    create: asyncHandler(async(req, res)=>{
        const { sectionName } = req.body;
        if(!sectionName){
            res.status(400)
            throw new Error('prove a section name');
        }
        const course = await Course.findById(req.params.courseId);
        if(!course){
            res.status(404)
            throw new Error('Course not found');
        }
        const section = await CourseSection.create({
            sectionName
        }) 

        course.sections.push(section._id);
        await course.save();

        res.json({
            message: 'Section created successfully',
            section
        })
    }),

    //get all section 
    list: asyncHandler(async(req, res)=>{
        const section = await CourseSection.find({});
        res.json(section);
    }),

    //get section by id
    getSectionById: asyncHandler(async(req, res)=>{
        const section = await CourseSection.findById(req.params.sectionId);
        if(!section){
            res.status(404)
            throw new Error('Section not found');
        }
        res.json(section);
    }),

    //update section 
    update: asyncHandler(async(req, res)=>{
        const newSection = await CourseSection.findByIdAndUpdate(
            req.params.sectionId,
            req.body,
            {new: true, runValidators: true}
        )
        if(!newSection){
            res.status(404)
            throw new Error('Section not found');
        }
        res.json({
            message: 'Section updated successfully',
            section: newSection
        })
    }),

    //delete section
    delete: asyncHandler(async(req, res)=>{
        //find section
        const section = await CourseSection.findById(req.params.sectionId);
        if(!section){
            res.status(404)
            throw new Error('Section not found');
        }

        //course associated with the section
        const course = await Course.findById({sections:section._id});
        if(course){
            res.status(400);
            throw new Error('Cannot delete section, course associated with it');
            return;
        }

        //remove section
        await CourseSection.findByIdAndDelete(req.params.sectionId);

        //update course
        await Course.findByIdAndUpdate(course._id,
            {
                $pull:{sections: req.params.sectionId}
            }
        );
        res.json({
            message: 'Section deleted successfully'
        })

    })
}

module.exports = sectionCtrl;