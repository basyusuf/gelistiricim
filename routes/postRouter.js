const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');
const PostOwnerAccess = require('../middleware/PostOwnerAccess');
const Post = require('../models/Post');
const postQueryMiddleware = require('../middleware/query/postQueryMiddleware');
const { getAllPosts,
    createNewPost,
    getPostForId,
    updatePostForId,
    likePost,
    unlikePost
    } = require('../controller/postController');

router.get('/',postQueryMiddleware(Post,{
    population:{
        path:"author",
        select:"userName"
    }
}) ,getAllPosts);
router.post('/', createNewPost);
router.get('/:post_id', getPostForId);
router.put('/:post_id',[verifyToken,PostOwnerAccess],updatePostForId);
router.get('/like/:post_id',verifyToken, likePost);
router.get('/unlike/:post_id',verifyToken, unlikePost);

module.exports = router;