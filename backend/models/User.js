const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema =mongoose.Schema;

const userSchema = new mongoose.Schema({
    username:{type: String, required: true},
    password:{type: String, required: true},
    email:{type: String, required: true},
    role:{
        type: String,
        enum: ['instructor', 'student'],
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
            enum: ['Completed', 'In Progress', 'Not Started','Paused','Away'],
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
// Hash the password before saving
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 8);
//     next();
//   });

module.exports = mongoose.model("User", userSchema)