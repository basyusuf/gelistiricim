const Comment = require('../models/Comment');

const getCommentsForPostID = (req, res, next)=> {
    const postID = req.params.post_id;
    const promise = Comment.find({
        post:postID,
        status:true
    });
    promise.then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.json(err);
    });
}
const createCommentForPostID = (req, res, next)=> {
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
}
const updateCommentForID = (req, res, next)=> {
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
}

const deleteCommentForID = (req, res, next)=> {
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
}

module.exports={
    getCommentsForPostID,
    createCommentForPostID,
    updateCommentForID,
    deleteCommentForID
};