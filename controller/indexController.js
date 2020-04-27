const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
welcomeAPI =(req, res, next) => {
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
registerUser = (req, res, next) => {
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
loginUser = (req,res)=>{
    const {userName,password} = req.body;
    User.findOne({
        userName:userName
    },(err,data)=>{
        if(err)
            throw err;
        if(!data){
            res.status(401).json({
                message:"Authentication failed, user not found.",
                status:false
            })
        }
        else{
            bcrypt.compare(password,data.password,(result)=>{
                if(!result){
                    res.status(403).json({
                        message:"Authentication failed, wrong password or username",
                        status:false
                    })
                }
                else{
                    const token = data.generateJwtFromUser();
                    res.json({
                        status:true,
                        token:token
                    })
                }
            });
        }
    })
}

module.exports={
    registerUser,
    loginUser,
    welcomeAPI
}