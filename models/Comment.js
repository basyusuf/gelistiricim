const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post:{
        type:String,
        required:true,
        minLength:[12,'`{PATH}` alanı en kısa `{VALUE}` karakter olmalıdır.'],
        maxLength:[12,'`{PATH}` alanı en uzun `{VALUE}` karakter olmalıdır.']
    },
    author:{
        type:String,
        required:true,
        minLength:[12,'`{PATH}` alanı en kısa `{VALUE}` karakter olmalıdır.'],
        maxLength:[12,'`{PATH}` alanı en uzun `{VALUE}` karakter olmalıdır.']
    },
    message:{
        type:String,
        required:true,
        mingLength:[3,'`{PATH}` alanı en kısa `{VALUE}` karakter olmalıdır.'],
    },
    likes:{
        type:Number,
        required:true,
        default:0
    },
    status:{ //Post silinip silinmeme durumu
        type:Boolean,
        required:true,
        default:true
    }
});
module.exports = mongoose.model('comment',CommentSchema);