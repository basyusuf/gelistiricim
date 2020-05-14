const Education = require('../models/Education');
const EducationPage = require('../models/EducationPage');
const CustomError = require('../helper/error/CustomError');
/**
 * @swagger
 * /education:
 *   get:
 *     description: Get All Education
 *     tags:
 *       - Education
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
/**
 * @swagger
 * /education/create:
 *   post:
 *     description: Create Education
 *     tags:
 *       - Education
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: Education Title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: name
 *         description: Education Name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: category
 *         description: Category ID
 *         in: formData
 *         required: true
 *         type: string
 *         enum: ["5eb2d2b1a9690ea1faf98e06","5eb2d2b9f03aef144b948e24","5eb2d2bf9358c28e1c7eff8e"]
 *       - name: description
 *         description: Education Description
 *         in: formData
 *         required: true
 *         type: string
 *         multiLine: true
 *       - name: image
 *         description: Image Url
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get Post
 *     security:
 *       - ApiKeyAuth: []
 */
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
/**
 * @swagger
 * /education/detail/{eduId}:
 *   get:
 *     description: Get pages for education id
 *     tags:
 *       - Education
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: eduId
 *         description: Education ID.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get Post
 *     security:
 *       - ApiKeyAuth: []
 */
const getAllPageForEducationId = async (req,res,next)=>{
    const edu_id = req.params.eduId;
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

/**
 * @swagger
 * /education/detail/{eduId}/{pageNumber}:
 *   get:
 *     description: Get page for page number
 *     tags:
 *       - Education
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: eduId
 *         description: Education ID.
 *         in: path
 *         required: true
 *         type: string
 *       - name: pageNumber
 *         description: Page Number.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get Post
 *     security:
 *       - ApiKeyAuth: []
 */
const getPageForEduId = async (req,res,next)=>{
    const edu_id = req.params.eduId;
    const page_number = req.params.pageNumber;
    const education = await Education.findById(edu_id);
    if(!education){
        next(new CustomError("System havent education",400));
    }
    const options={
        page:page_number,
        limit:1
    };
    const page =parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 1;

    const startIndex = (page-1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    const total = await EducationPage.find({education_id:edu_id}).countDocuments();
    if(total<1){
        next(new CustomError("Education havent pages",400));
    }
    if(total<page_number){
        next(new CustomError("Sorry, no such page.",400));
    }
    if(startIndex>0){
        pagination.previous={
            page:page-1,
            limit:limit
        }
    }
    if(endIndex<total){
        pagination.next={
            page:page+1,
            limit:limit
        }
    }
    let pages = await EducationPage.find({
        education_id:edu_id
    }).sort('pageNumber').skip(startIndex).limit(limit);
    res.status(200).json({
        message:"Successful",
        data:pages,
        pagination:pagination
    });
}
module.exports={
    getAllEducation,
    createNewEducation,
    getAllPageForEducationId,
    getPageForEduId
};