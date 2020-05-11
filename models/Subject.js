//Komular ve diller
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubjectSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    value:{
        type:Number,
        required: true
    },
    description:{
        type:String,
        required:false,
        default:"Subject Description"
    }
});

module.exports = mongoose.model('subject',SubjectSchema);