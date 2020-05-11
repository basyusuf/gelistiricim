//Web geliştirmemi mobil mi ne?
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    value:{
        type:Number,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('category',CategorySchema);