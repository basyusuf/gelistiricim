const CustomError = require('../helper/error/CustomError');
const customErrorHandler = (err,req,res,next)=>{
    let customError = err;
    if(err.name === "SyntaxError"){
        customError = new CustomError("Unexpected Sytanx",400);
    }
    if(err.name === "ValidationError"){
        customError = new CustomError(err.message,400);
    }

    if(err.code === 11000) {
        customError = new CustomError("Duplicated input error. Check your input field's :*",400);
    }
    res.status(customError.status || 500).json({
        success:false,
        message:customError.message || "Internal server error."
    })
};
module.exports = customErrorHandler;