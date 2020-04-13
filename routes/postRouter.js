const express = require('express');
const router = express.Router();
const { getAllPosts,createNewPost, getPostForId, updatePostForId } = require('../controller/postController');

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
router.get('/', getAllPosts);
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
router.post('/', createNewPost);

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
router.get('/:post_id', getPostForId);
router.put('/:post_id', updatePostForId);
module.exports = router;