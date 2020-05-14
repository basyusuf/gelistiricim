const CustomError = require('../helper/error/CustomError');
const User = require('../models/User');
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
    console.log(req.user.id);
    let user = await User.findById(req.user.id);
    res.status(200).json({
        message:"Successful",
        data:user
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
module.exports={
    myProfile,
    uploadImage
}