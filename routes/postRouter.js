const express = require('express');
const router = express.Router();

//models
const Post = require('../models/Post');
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
router.get('/', (req, res, next)=> {
    const promise = Post.find({status:true});
    promise.then((data)=>{
        if(!data || data==null){
            next({message:"Sisteme kayıtlı hiç bir makale bulunmaktadır.",status:404});
        }
        res.status(200).json(data);
    }).catch((err)=>{
        res.json(err);
    });
});
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
router.post('/', (req, res, next)=> {
    const { author,title,message} = req.body;
    const post = new Post({
        author:author,
        title:title,
        message:message
    });
    const promise = post.save();
    promise.then((data)=>{

        res.status(201).json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

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
router.get('/:post_id', (req, res, next)=> {
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
});

router.put('/:post_id', (req, res, next)=> {
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
});
module.exports = router;