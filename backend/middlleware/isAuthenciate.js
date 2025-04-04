const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req,res,next)=>{
    //get token from headers
    const token = req.header('Authorization');
    if(!token){
        throw new Error('Invalid authorization');
    }
    //verify token
    const data = jwt.verify(token,process.env.JWT_SECRET)
    //find user
    const user = await User.findOne({_id:data.id})
    if(!user){
        throw new Error('User not found');
    }
    //attach user to req.user
    req.user = user;
    next();
}
module.exports = isAuth;