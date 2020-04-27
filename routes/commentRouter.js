const express = require('express');
const router = express.Router();
const {getCommentsForPostID,
    createCommentForPostID,
    updateCommentForID,
    deleteCommentForID
    } = require('../controller/commentController');

router.get('/:post_id',getCommentsForPostID);
router.post('/:post_id', createCommentForPostID);
router.put('/:comment_id', updateCommentForID);
router.delete('/:comment_id', deleteCommentForID);

module.exports = router;