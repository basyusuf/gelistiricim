const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
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
    }
});

module.exports = mongoose.model('answer',AnswerSchema);