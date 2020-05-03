const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');
const PostOwnerAccess = require('../middleware/PostOwnerAccess');
const { getAllPosts,
    createNewPost,
    getPostForId,
    updatePostForId,
    likePost,
    unlikePost
    } = require('../controller/postController');

router.get('/', getAllPosts);
router.post('/', createNewPost);
router.get('/:post_id', getPostForId);
router.put('/:post_id',[verifyToken,PostOwnerAccess],updatePostForId);
router.get('/like/:post_id',verifyToken, likePost);
router.get('/unlike/:post_id',verifyToken, unlikePost);

module.exports = router;