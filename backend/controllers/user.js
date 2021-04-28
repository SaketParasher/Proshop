const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require('../models/user');
const { getJWTToken } = require('../utils/generateJWT');

module.exports.login = async (req,res,next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email:email});
        if(user){
            const passwordMatches = await bcrypt.compare(password,user.password);
            if(passwordMatches){
                res.json({
                    name:user.name,
                    isAdmin:user.isAdmin,
                    id:user._id,
                    token:getJWTToken(user._id),
                    loginTime:Date.now()
                })
            }else{
                res.status(400);
                return next(new Error("Invalid Password!"));
            } 
        }else{
            res.status(400);
            return next(new Error("Invalid Email Provided!"));
        }
    } catch (error) {
        res.status(500);
        return next(new Error("Unexpected Error "+error.message));        
    }
}

module.exports.registerUser = asyncHandler( async (req,res,next) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        return next(new Error('User with email already exists'));
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        res.json({
            name:user.name,
            isAdmin:user.isAdmin,
            id:user._id,
            token:getJWTToken(user._id),
            loginTime:Date.now()
        })
    }else{
        res.status(500);
        return next(new Error('Error in registering user. please try later'));
    }
})

module.exports.getProfile = async (req,res,next) => {
    const user = req.user;
    if(user){
        res.json({
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            id:user._id,
            token:getJWTToken(user._id)
        });
    }
}

module.exports.updateProfile = async (req,res,next) => {
    const user = req.user;
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save();
        res.json({
            name:updatedUser.name,
            email:user.email,
            isAdmin:updatedUser.isAdmin,
            id:updatedUser._id,
            token:getJWTToken(updatedUser._id)
        })
    }
}