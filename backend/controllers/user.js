const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const usersCtrl = { 
    //register
    register: asyncHandler(async(req,res)=>{
    //take input
    const { username, email, password } = req.body;
    //validate inputs
    if(!username || !email || !password){
        throw new Error('all fields are required');
    }
    //check for user
    const userExists = await User.findOne({email});
    if(userExists){
        throw new Error('Email already in use');
    }

    //hash password
    const salt = bycrpt.genSaltSync(10)
    const hashedPassword = await bycrpt.hash(password, salt);

    //create user and send response
     const userCreate = await User.create({
        username,
        email,
        password:hashedPassword
     })
     res.json({
        username:userCreate.username,
        email:userCreate.email,
        role:userCreate.role,
        id: userCreate._id
     })
}),

    //login
    login: asyncHandler(async(req,res)=>{
        //take input
        const {email, password} = req.body;
        //validate email
        const user = await User.findOne({email});
        if(!user){
            throw new Error('Invalid email or password');
        }
        //check password
        const isMatch = await bycrpt.compare(password,user.password)
        if(!isMatch){
            throw new Error('Invalid email or password');
        }
        //generate token
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{
            expiresIn: '3d'
        })

        //response
        res.json({
            message:'login success',
            token,
            email:user.email,
            id: user._id
        })
}),

    //get user profile
    profile: asyncHandler(async(req,res)=>{
        res.json({message:'hello user!!'})
    })
}

module.exports = usersCtrl;