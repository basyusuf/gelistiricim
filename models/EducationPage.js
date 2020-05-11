//Eğitim
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationPageSchema = new Schema({
    education_id:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    page_type:{
        type:String,
        required:true,
        enum:["text","withImage","withQuestion","question"],
        default:"text"
    },
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    pageNumber:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('EducationPage',EducationPageSchema);