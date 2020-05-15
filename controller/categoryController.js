const Category = require('../models/Category');
const CustomError = require('../helper/error/CustomError');

/**
 * @swagger
 * /category:
 *   get:
 *     description: Get All Categories
 *     tags:
 *       - Category
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get Categories
 *     security:
 *       - ApiKeyAuth: []
 */
getAllCategories = async (req,res,next)=>{
    const categories = await Category.find();
    if(!categories){
        return next(new CustomError("System havent category",404));
    }
    res.status(200).json({
        message:"Successful",
        data:categories
    })
}
/**
 * @swagger
 * /category:
 *   post:
 *     description: Create Category
 *     tags:
 *       - Category
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: name
 *         description: Category Name
 *         required: true
 *         type: string
 *       - in: formData
 *         name: value
 *         description: Category Value
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get Categories
 *     security:
 *       - ApiKeyAuth: []
 */
createCategory = async (req,res,next)=>{
    const {name,value} = req.body;
    const category = new Category(
        {
            name:name,
            value:value
        }
    );
    console.log(category)
    res.status(200).json({
        message:"Successful created"
    })
}
/**
 * @swagger
 * /category/{id}:
 *   get:
 *     description: Get  Category for Id
 *     tags:
 *       - Category
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Category ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get Categories
 *     security:
 *       - ApiKeyAuth: []
 */
getCategoryForId = async (req,res,next)=>{
    let paramId = req.params.id;
    const categories = await Category.findById(paramId);
    if(!categories){
        return next(new CustomError("System havent category",404));
    }
    res.status(200).json({
        message:"Successful",
        data:categories
    })
}
module.exports={
    getAllCategories,
    createCategory,
    getCategoryForId
};