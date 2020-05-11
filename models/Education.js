//Eğitim
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    category: {
            type:mongoose.Schema.ObjectId,
            ref:"category",
            required:true
        }
    ,
    description:{
        type:String,
        required: true
    },
    level:{
        type:Number,
        required:true,
        default:1
    },
    whatWeWillLearn:{
        type:String
    },
    image:{
        type:String,
        required:true,
        default:null
    }
});

module.exports = mongoose.model('education',EducationSchema);