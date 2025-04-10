// admin

const isAdmin = (req, res, next)=>{
    if(req.user.role !== 'admin'){
        res.status(403).send('Access Denied: only Admin have access')
    }
    next();
}

//Instructor
const isInstructor = (req, res, next)=>{
    if(req.user.role !== 'instructor'){
        res.status(403).send('Access Denied: only Instructor have access')
    }
    next();
}

//Student
const isStudent = (req, res, next)=>{
    if(req.user.role !== 'student'){
        res.status(403).send('Access Denied: only Student have access')
    }
    next();
}

module.exports = {isAdmin,isInstructor,isStudent};