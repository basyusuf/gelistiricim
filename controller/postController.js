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
 *     parameters:
 *       - name: page
 *         description: Page Number.
 *         in: query
 *         required: false
 *         type: integer
 *       - name: limit
 *         description: Query Post Limit.
 *         in: query
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: get user
 *     security:
 *       - ApiKeyAuth: []
 */
const getAllPosts = async (req, res, next) =>{
        return res.status(200).json(res.queryResults);
};
/**
 * @swagger
 * /post:
 *   post:
 *     description: Create Post
 *     tags:
 *       - Post
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: Post title.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: content
 *         description: Post content.
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
    const { title,content} = req.body;
    const post = new Post({
        author:req.user.id,
        title:title,
        content:content
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
 *     description: Get Post for Post Id
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
    const promise = Post.findById(postID).populate("likes","userName");
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

/**
 * @swagger
 * /post/{post_id}:
 *   put:
 *     description: Update Post for id
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
 *       - name: content
 *         description: Content.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get Post
 *     security:
 *       - ApiKeyAuth: []
 */
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
/**
 * @swagger
 * /post/{post_id}:
 *   delete:
 *     description: Delete Post for id
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
const deletePostForId = (req, res, next)=> {
    const postID = req.params.post_id;
    const promise = Post.findOneAndDelete(postID);
    promise.then((data)=>{
        res.status(201).json({
            message:"Post deleted successful",
            status:true
        });
    }).catch((err)=>{
        res.json(err);
    });
}
/**
 * @swagger
 * /post/like/{post_id}:
 *   get:
 *     description: Like Post for ID
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
const likePost = async (req,res,next)=>{
    const postID = req.params.post_id;
    console.log("User Id:"+req.user.id);
    const post =await Post.findById(postID);
    if(post.likes.includes(req.user.id)){
        return next(new CustomError("You already liked this post",400));
    }
    post.likes.push(req.user.id);
    post.likeCount = post.likes.length;
    await post.save();
    return res.status(200).json({
        success:true,
        data:post
    })
}
/**
 * @swagger
 * /post/unlike/{post_id}:
 *   get:
 *     description: Unlike Post for ID
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
const unlikePost = async (req,res,next)=>{
    const postID = req.params.post_id;
    const post =await Post.findById(postID);
    if(!post.likes.includes(req.user.id)){
        return next(new CustomError("You can not unlike the this post",400));
    }
    const index = post.likes.indexOf(req.user.id);
    post.likes.splice(index,1);
    post.likeCount = post.likes.length;
    await post.save();
    return res.status(200).json({
        success:true,
        data:post
    })
}
module.exports={
    getAllPosts,
    createNewPost,
    deletePostForId,
    getPostForId,
    updatePostForId,
    likePost,
    unlikePost
};