const mongoose = require('mongoose');

const Schema =mongoose.Schema;

const userSchema = new mongoose.Schema({
    username:{type: String, required: true},
    password:{type: String, required: true},
    email:{type: String, required: true},
    role:{
        type: String,
        enum: ['admin', 'instructor', 'student'],
        default: 'student'
    },
    progress:[{
        courseId:{
            type: Schema.Types.ObjectId,
            ref: 'Course'
        },
        sections:[{
           sectionId:{
            type: Schema.Types.ObjectId,
            ref: 'CourseSection',
            required: true
           },
           status:{
            type: String,
            enum: ['Completed', 'In Progress', 'Not Started'],
            default: 'Not Started'
           }  
        }]
    }],
    courseCreated:[{type: Schema.Types.ObjectId,ref:"Course"}],
    courseApplied:[{type: Schema.Types.ObjectId,ref:"Course"}], 
    lastLogin: Date,
},{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema)