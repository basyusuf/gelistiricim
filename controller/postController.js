const Post = require('../models/Post');
const getAllPosts = (req, res, next) =>{
    const promise = Post.find({status:true});
    promise.then((data)=>{
        if(!data || data==null){
            next({message:"Sisteme kayıtlı hiç bir makale bulunmaktadır.",status:404});
        }
        res.status(200).json(data);
    }).catch((err)=>{
        res.json(err);
    });
};

const createNewPost = (req, res, next)=> {
    const { author,title,message} = req.body;
    const post = new Post({
        author:author,
        title:title,
        message:message
    });
    const promise = post.save();
    promise.then((data)=>{

        res.status(201).json(data);
    }).catch((err)=>{
        res.json(err);
    });
};

const getPostForId = (req, res, next)=> {
    const postID = req.params.post_id;
    const promise = Post.findById(postID);
    promise.then((data)=>{
        if(!data){
            next({message:"Post not found!",status:404});
        }
        else{
            res.status(200).json(data);
        }
    }).catch((err)=>{
        res.json(err);
    });
};

const updatePostForId = (req, res, next)=> {
    const postID = req.params.post_id;
    const promise = Post.findByIdAndUpdate(
        postID,
        req.body,
        {
            new:true
        });
    promise.then((data)=>{
        res.status(201).json(data);
    }).catch((err)=>{
        res.json(err);
    });
}
module.exports={
    getAllPosts,
    createNewPost,
    getPostForId,
    updatePostForId
};