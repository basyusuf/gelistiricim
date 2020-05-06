//Soru Levelleri max puanı levelin filan
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LevelSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    value:{
        type:Number,
        required:true
    },
    maxLevelPoint:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('level',LevelSchema);