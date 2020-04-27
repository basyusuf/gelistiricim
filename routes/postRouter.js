const express = require('express');
const router = express.Router();
const { getAllPosts,
    createNewPost,
    getPostForId,
    updatePostForId
    } = require('../controller/postController');

router.get('/', getAllPosts);
router.post('/', createNewPost);
router.get('/:post_id', getPostForId);
router.put('/:post_id', updatePostForId);
module.exports = router;