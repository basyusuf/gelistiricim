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

module.exports={
    getCommentsForPostID
};