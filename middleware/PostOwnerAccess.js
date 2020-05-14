const Post = require('../models/Post');
const CustomError = require('../helper/error/CustomError')
PostOwnerAccess = async (req,res,next) =>
{
    const userId = req.user.id;
    const postId = req.params.post_id;
    const post = await Post.findById(postId);
    if(post.author != userId){
        return next(new CustomError("Only owner can access this route",403));
    }
    next();
}

module.exports=PostOwnerAccess;