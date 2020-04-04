const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Models
const User = require('../models/User');

/* GET home page. */

router.get('/', (req, res, next) => {
  res.json({
    message:"Index Page"
  });
});
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
router.post('/register', (req, res, next) => {
    const { userName,password,email} =  req.body;

    bcrypt.hash(password, 10).then((hash) => {
        const user = new User({
            userName,
            password:hash,
            email
        });
        const promise = user.save();
        promise.then((data)=>{
            res.status(201).json(data);
        }).catch((err)=>{
            res.json(err);
        })
    });
});
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
router.post('/login',(req,res)=>{
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
            bcrypt.compare(password,data.password).then((result)=>{
               if(!result){
                   res.status(403).json({
                       message:"Authentication failed, wrong password or username",
                       status:false
                   })
               }
               else{
                   const payload ={
                       userName:userName
                   };
                   const token = jwt.sign(payload, req.app.get('api_secret_key'),{
                       expiresIn: 720 //12 Saat
                   });
                   res.json({
                       status:true,
                       token:token
                   })
               }
            });
        }
    })
});

module.exports = router;
