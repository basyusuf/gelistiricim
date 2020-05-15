const CustomError = require('../helper/error/CustomError');
const User = require('../models/User');
const Post = require('../models/Post');
ObjectId = require('mongodb').ObjectID;
/**
 * @swagger
 * /profile:
 *   get:
 *     description: My Profile
 *     tags:
 *       - Profile
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get My Profile
 *     security:
 *       - ApiKeyAuth: []
 */
const myProfile = async (req,res,next) => {
    let user = await User.findById(req.user.id);
    let userPosts = await Post.find({author:user._id});
    res.status(200).json({
        message:"Successful",
        data:user,
        user_posts:userPosts
    })
}
/**
 * @swagger
 * /profile/upload_image:
 *   post:
 *     description: Change Profile Picture
 *     tags:
 *       - Profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: profile_image
 *         description: The file to upload
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *     security:
 *       - ApiKeyAuth: []
 */
const uploadImage = async (req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.user.id,{
        "images":req.savedProfileImage
    },{
        new:true,
        runValidators:true
    });

    res.status(200).json({
        success:true,
        message:"Image upload succesfull",
        data:user
    });
}
/**
 * @swagger
 * /profile/{username}:
 *   get:
 *     description: Get Profile for Username
 *     tags:
 *       - Profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: username
 *         description: Username
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *     security:
 *       - ApiKeyAuth: []
 */
const publicProfile = async (req,res,next) => {
    let userName = req.params.username;
    let user = await User.findOne({userName:userName});
    if(!user){
        return next(new CustomError("User Not Found",400));
    }
    let userPosts = await Post.find({author:user._id},{title:1,slug:1,createdAt:1});
    let responseData={
        user_data:{
            id:user._id,
            username:user.userName,
            status:user.status,
            email:user.email,
            about:user.about,
            create_date:user.createdAt,
            images:user.images,
            role:user.role
        },
        user_posts:userPosts
    };
    res.status(200).json({
        message:"Successful",
        data:responseData
    });
}

module.exports={
    myProfile,
    uploadImage,
    publicProfile
}