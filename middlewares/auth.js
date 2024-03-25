const jwt = require('jsonwebtoken');

require('dotenv').config();

const auth = async(req, res, next) => {
    const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");
    if(!token || token === undefined) {
        res.status(404).json({
            success: false,
            message: "Token not found"
        })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);

        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "token is invalid",
        })
    }
}
const isStudent = async(req, res, next) => {
    try {
        if(req.user.role !== 'Student') {
            res.status(401).json({
                success: false,
                message: "This is a protected route for students"
            })
        } else {
            next();
        }
       
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
   
} 

const isAdmin = async(req, res, next) => {
    try {
        if(req.user.role !== 'Admin') {
            res.status(401).json({
                success: false,
                message: "This is a protected route for Admin"
            })
        } else {
            next();
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
    
}

module.exports = { auth, isStudent, isAdmin }