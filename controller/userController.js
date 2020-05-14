const User = require('../models/User');
const CustomError = require('../helper/error/CustomError');
/**
 * @swagger
 * /users:
 *   get:
 *     description: List All User
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: login
 *     security:
 *       - ApiKeyAuth: []
 */
const getAllUser = async (req, res, next)=> {
    const user = await User.find();
        if(!user){
            next(new CustomError("System havent user",400));
        }
        res.status(200).json(
            {
                users:user
            }
        );
}

/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     description: Get user for user id
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         description: User ID.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: get user
 *     security:
 *       - ApiKeyAuth: []
 */
const getUserForID = (req, res, next)=> {
    const userID = req.params.user_id;
    const promise = User.findById(userID);
    promise.then((data)=>{
        if(!data){
            next(new CustomError("User not found",404));
        }
        else{
            res.json(data);
        }
    }).catch((err)=>{
        res.json(err);
    });
}
const updateUserForID = (req, res, next)=> {
    const userID = req.params.user_id;
    const promise = User.findByIdAndUpdate(
        userID,
        req.body,
        {
            new:true
        });
    promise.then((data)=>{
        res.json({
            message:"Başarıyla güncelleme yapılmştır.",
            userId:data._id,
            status:201
        });
    }).catch((err)=>{
        res.json(err);
    });
}

const createUser = (req, res, next)=> {
    const { firstName,lastName,userName} = req.body;
    const user = new User({
        firstName:firstName,
        lastName:lastName,
        userName:userName
    });
    const promise = user.save();
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
}
/**
 * @swagger
 * /users/ban/{user_id}:
 *   delete:
 *     description: Ban user for user id
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         description: User ID.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: get user
 *     security:
 *       - ApiKeyAuth: []
 */
const banUser = (req, res, next)=> {
    const userID = req.params.user_id;
    const promise = User.findByIdAndUpdate(
        userID,
        {
            status:false
        },
        {
            new:true
        });
    promise.then((data)=>{
        res.status(200).json({
            user_id:userID,
            status:false,
            message:"User banned"
        });
    }).catch((err)=>{
        res.json(err);
    });
}
/**
 * @swagger
 * /users/delete/{user_id}:
 *   delete:
 *     description: Delete user for user id
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         description: User ID.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: get user
 *     security:
 *       - ApiKeyAuth: []
 */
const deleteUser = async (req,res,next)=>{
    const {id} = req.params;
    const user = await User.findById(id);

    await user.remove();
    return res.status(200)
        .json({
            success:true,
            message:"Delete operation successfull"
        });
}
module.exports={
    getAllUser,
    getUserForID,
    updateUserForID,
    createUser,
    banUser,
    deleteUser
}