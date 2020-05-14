const Question = require('../models/Question');
const Category = require('../models/Category');
const Subject = require('../models/Subject');
const Answer = require('../models/Answer');
const CustomError = require('../helper/error/CustomError');
/**
 * @swagger
 * /question:
 *   get:
 *     description: Get All Question
 *     tags:
 *       - Question
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: login
 *     security:
 *       - ApiKeyAuth: []
 */
const getAllQuestion = async (req,res,next) => {
    const questions = await Question.find({})
        .populate({ path: 'category', select: 'name' })
        .populate({ path: 'subjects', select: 'name' })
        .populate({ path: 'answers', select: 'text' })
        .populate({ path: 'correctAnswer', select: 'text' });
    if(!questions){
        next(new CustomError('System havent questions',500));
    }
    res.status(200).json({
        data:questions,
        message:"Get All Question Successful"
    });
}
module.exports={
    getAllQuestion
};