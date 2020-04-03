const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const token = req.headers['x-access-token'] || req.body.token;
    if(token){
        jwt.verify(token,req.app.get('api_secret_key'),(err,decoded)=>{
            if(err){
                res.json({
                    message:"Failed to authenticate token.",
                    status:false
                })
            }
            else{
                req.decode = decoded;
                next();
            }
        })
    }else{
        res.status(200).json({
            message:"No token provided",
            status:false
        })
    }
}