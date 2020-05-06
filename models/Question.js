const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    text:{
        type:String,
        required:true,
    },
    value:{
        type:Number,
        required: true
    },
    image:{
        type:String,
        required:false,
        default:null
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"category",
        required:true
    },
    subjects:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"subject",
            required:true
        }
    ],
    level:{
        type:mongoose.Schema.ObjectId,
        ref:"level",
        required:true
    },
    answers:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"answer"
        }
    ],
    multiCorrect:{
        type:Boolean,
        required:true,
        default: false
    },
    correctAnswer:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"answer"
        }
    ]

});

module.exports = mongoose.model('question',QuestionSchema);