const express = require('express');
const router = express.Router();
const {getCommentsForPostID,createCommentForPostID,updateCommentForID,deleteCommentForID} = require('../controller/commentController');
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
router.post('/:post_id', createCommentForPostID);

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
router.put('/:comment_id', updateCommentForID);

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
router.delete('/:comment_id', deleteCommentForID);
module.exports = router;