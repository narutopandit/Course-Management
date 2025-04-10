const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req,res,next)=>{
//     //get token from headers
//     const token = req.header('Authorization');
//     if(!token){
//         throw new Error('Invalid authorization');
//     }
//     //verify token
//     const data = jwt.verify(token,process.env.JWT_SECRET)
//     //find user
//     const user = await User.findOne({_id:data.id})
//     if(!user){
//         throw new Error('User not found');
//     }
//     //attach user to req.user
//     req.user = user;
//     next();

// Check if token is in cookies
if (req.cookies.token) {
    try {
      // Verify token
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      // Get user from the token
      // console.log("decoded", decoded);
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

}
module.exports = isAuth;