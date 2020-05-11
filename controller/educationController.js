const Education = require('../models/Education');
const EducationPage = require('../models/EducationPage');
const CustomError = require('../helper/error/CustomError');
/**
 * @swagger
 * /education:
 *   get:
 *     description: Get All Education
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: login
 *     security:
 *       - ApiKeyAuth: []
 */
const getAllEducation = async (req, res, next)=> {
    const education = await Education.find();
    if(!education){
        next(new CustomError("System havent user",400));
    }
    res.status(200).json(
        {
            message:"Get All Education Successful",
            data:education
        }
    );
};

const createNewEducation = (req, res, next)=> {
    const { title,name,category,description,image} = req.body;
    const education = new Education({
        title:title,
        name:name,
        category:category,
        description:description,
        image:image
    });
    const promise = education.save();
    promise.then((data)=>{
        res.status(201).json({
            success:true,
            data:data
        });
    }).catch((err)=>{
        next(err)
    });
};

const getAllPageForEducationId = async (req,res,next)=>{
    const edu_id = req.params.id;
    const education = await Education.findById(edu_id);
    if(!education){
        next(new CustomError("System havent education",400));
    }
    let pages = await EducationPage.find({
        education_id:edu_id
    });
    if(!pages){
        next(new CustomError("Education havent pages",400));
    }
    res.status(200).json({
        message:"Successful",
        data:pages
    });
};
module.exports={
    getAllEducation,
    createNewEducation,
    getAllPageForEducationId
};