const Post = require('../models/Post');
const CustomError = require('../helper/error/CustomError');
/**
 * @swagger
 * /post:
 *   get:
 *     description: Get all post
 *     tags:
 *       - Post
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: get user
 *     security:
 *       - ApiKeyAuth: []
 */
const getAllPosts = (req, res, next) =>{
    const promise = Post.find({status:true});
    promise.then((data)=>{
        if(!data || data==null){
            next({message:"Sisteme kayıtlı hiç bir makale bulunmaktadır.",status:404});
        }
        res.status(200).json(data);
    }).catch((err)=>{
        res.json(err);
    });
};
/**
 * @swagger
 * /post:
 *   post:
 *     description: Get user for user id
 *     tags:
 *       - Post
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: author
 *         description: User ID.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: title
 *         description: Post title.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: message
 *         description: Post message.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Created Post
 *     security:
 *       - ApiKeyAuth: []
 */
const createNewPost = (req, res, next)=> {
    const { title,message} = req.body;
    const post = new Post({
        author:req.user.id,
        title:title,
        message:message
    });
    const promise = post.save();
    promise.then((data)=>{
        res.status(201).json({
            success:true,
            data:data
        });
    }).catch((err)=>{
        res.json(err);
    });
};
/**
 * @swagger
 * /post/{post_id}:
 *   get:
 *     description: Get user for user id
 *     tags:
 *       - Post
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: post_id
 *         description: Post ID.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get Post
 *     security:
 *       - ApiKeyAuth: []
 */
const getPostForId = (req, res, next)=> {
    const postID = req.params.post_id;
    const promise = Post.findById(postID);
    promise.then((data)=>{
        if(!data){
            next({message:"Post not found!",status:404});
        }
        else{
            res.status(200).json(data);
        }
    }).catch((err)=>{
        res.json(err);
    });
};

const updatePostForId = (req, res, next)=> {
    const postID = req.params.post_id;
    const promise = Post.findByIdAndUpdate(
        postID,
        req.body,
        {
            new:true
        });
    promise.then((data)=>{
        res.status(201).json(data);
    }).catch((err)=>{
        res.json(err);
    });
}
const likePost = async (req,res,next)=>{
    const postID = req.params.post_id;
    console.log("User Id:"+req.user.id);
    const post =await Post.findById(postID);
    if(post.likes.includes(req.user.id)){
        return next(new CustomError("You already liked this post",400));
    }
    post.likes.push(req.user.id);
    await post.save();
    return res.status(200).json({
        success:true,
        data:post
    })
}
const unlikePost = async (req,res,next)=>{
    const postID = req.params.post_id;
    const post =await Post.findById(postID);
    if(!post.likes.includes(req.user.id)){
        return next(new CustomError("You can not unlike the this post",400));
    }
    const index = post.likes.indexOf(req.user.id);
    post.likes.splice(index,1);
    await post.save();
    return res.status(200).json({
        success:true,
        data:post
    })
}
module.exports={
    getAllPosts,
    createNewPost,
    getPostForId,
    updatePostForId,
    likePost,
    unlikePost
};