const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.verifyToken = async (req,res,next) => {
    let token; 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
        try {
            const decoded = await jwt.verify(token,process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');
            if(user){
                req.user = user;
                next()
            }else{
                res.status(401);
                return next(new Error("Invalid token Provided"));    
            }
        } catch (error) {
            res.status(401);
            return next(new Error("Invalid token or token may have expired"));
        }
    }

    if(!token){
        res.status(401);
        return next(new Error("Please provide a valid token "))
    }
}