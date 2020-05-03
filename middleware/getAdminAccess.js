const CustomError = require('../helper/error/CustomError');
const User = require('../models/User');
const getAdminAccess = async (req,res,next)=>{
    const {id} = req.user;
    const user = await User.findById(id);
    if(user.role!=="admin"){
        return next(new CustomError("Only admins can access this route",403));
    }
    next();
}
module.exports=getAdminAccess;