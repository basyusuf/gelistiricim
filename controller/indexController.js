const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CustomError = require('../helper/error/CustomError');
const { validateUserInput,comparePassword} = require('../helper/input/inputHelpers');


const welcomeAPI =(req, res, next) => {
    res.json({
        message:"Welcome Gelistiricim API V1"
    });
}
/**
 * @swagger
 * /register:
 *   post:
 *     description: Register to the application
 *     tags:
 *       - Index
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userName
 *         description: User's username.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: User's email.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: register
 */
const registerUser = (req, res, next) => {
    const { userName,password,email} =  req.body;

    const user = new User({
        userName,
        password:password,
        email
    });
    const promise = user.save();
    promise.then((data)=>{
        res.status(201).json(data);
    }).catch((err)=>{
        next(err);
    })

}
/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     tags:
 *       - Index
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userName
 *         description: User's username.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *         format: password
 *     responses:
 *       200:
 *         description: login
 */
const loginUser = async (req,res,next)=>{
    const {userName,password} = req.body;

    if(!validateUserInput(userName,password)){
        return next(new CustomError("Please check your inputs",400));
    }
    await User.findOne({
        userName:userName
    },(err,data)=>{
        if(err)
            return next(new CustomError("Server error",500));
        if(!data){
            return next(new CustomError("Authentication failed, user not found.",401));
        }
        else{
                if(!comparePassword(password,data.password)){
                    return next(new CustomError("Authentication failed, wrong password or username",401));
                }
                else{
                    const token = data.generateJwtFromUser();
                    res.json({
                        status:true,
                        token:token
                    })
                }
        }
    }).select('+password')
}
const logoutUser = async (req,res,next) =>{
    return res.status(200)
        .cookie({
            httpOnly:true,
            expires:new Date(Date.now())
        }).json({
            status:true,
            message:"Logout Successfull"
        })
};
const forgotPassword = async (req,res,next)=>{
    const resetEmail = req.body.email;
    const user =await User.findOne({email:resetEmail});
    if(!user){
        return next(new CustomError("There is no user with that email",400));
    }
    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    await user.save();
    res.json({
        success:true,
        message:"Token Sent To Your Email"
    })
}


module.exports={
    registerUser,
    loginUser,
    welcomeAPI,
    logoutUser,
    forgotPassword
}