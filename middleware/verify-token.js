const jwt = require('jsonwebtoken');
const CustomError = require('../helper/error/CustomError');
module.exports=(req,res,next)=>{
    const token = req.headers['x-access-token'] || req.body.token;
    if(token){
        jwt.verify(token,req.app.get('api_secret_key'),(err,decoded)=>{
            if(err){
                return next(new CustomError("Failed to authenticate token.",401));
            }
            else{
                req.decode = decoded;
                req.user = {
                    id:decoded.id,
                    name:decoded.userName
                };
                next();
            }
        })//
    }else{
        return next(new CustomError("No token provided.",401));
    }
}