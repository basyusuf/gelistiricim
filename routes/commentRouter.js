const express = require('express');
const router = express.Router();
const {getCommentsForPostID} = require('../controller/commentController');
//models
const Comment = require('../models/Comment');
/**
 * @swagger
 * /comment/{post_id}:
 *   get:
 *     description: Get comment for post id
 *     tags:
 *       - Comment
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
 *         description: Get comment
 *     security:
 *       - ApiKeyAuth: []
 */
router.get('/:post_id',getCommentsForPostID);
/**
 * @swagger
 * /comment/{post_id}:
 *   post:
 *     description: Get comment for post id
 *     tags:
 *       - Comment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: post_id
 *         description: Post ID.
 *         in: path
 *         required: true
 *         type: string
 *       - name: author
 *         description: user ID.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: message
 *         description: Comment Message.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Created Comment.
 *     security:
 *       - ApiKeyAuth: []
 */
router.post('/:post_id', (req, res, next)=> {
    const postID = req.params.post_id;
    const { author,message} = req.body;
    const comment = new Comment({
        post:postID,
        author:author,
        message:message
    });
    const promise = comment.save();
    promise.then((data)=>{
        res.status(201).json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

/**
 * @swagger
 * /comment/{comment_id}:
 *   put:
 *     description: Update comment
 *     tags:
 *       - Comment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: comment_id
 *         description: Comment ID.
 *         in: path
 *         required: true
 *         type: string
 *       - name: message
 *         description: Message.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Updated Comment.
 *     security:
 *       - ApiKeyAuth: []
 */
router.put('/:comment_id', (req, res, next)=> {
    const commentID = req.params.comment_id;
    const promise = Comment.findByIdAndUpdate(commentID,
        {
            message:req.body.message
        },
        {
            new:true
        });
    promise.then((data)=>{
        res.status(204).json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

/**
 * @swagger
 * /comment/{comment_id}:
 *   delete:
 *     description: Soft delete comment
 *     tags:
 *       - Comment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: comment_id
 *         description: Comment ID.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Deleted Comment.
 *     security:
 *       - ApiKeyAuth: []
 */
router.delete('/:comment_id', (req, res, next)=> {
    const commentID = req.params.comment_id;
    const promise = Comment.findByIdAndUpdate(commentID,
        {
            status:false
        },
        {
            new:true
        });
    promise.then((data)=>{
        res.json(
            {
                message:"[DELETED!]" +data.message,
            }
        );
    }).catch((err)=>{
        res.json(err);
    });
});


module.exports = router;