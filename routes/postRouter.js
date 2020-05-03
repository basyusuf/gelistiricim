const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');
const PostOwnerAccess = require('../middleware/PostOwnerAccess');
const { getAllPosts,
    createNewPost,
    getPostForId,
    updatePostForId
    } = require('../controller/postController');

router.get('/', getAllPosts);
router.post('/', createNewPost);
router.get('/:post_id', getPostForId);
router.put('/:post_id',[verifyToken,PostOwnerAccess],updatePostForId);
module.exports = router;