const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"post"
    },
    author:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"user"
    },
    message:{
        type:String,
        required:true,
        mingLength:[3,'`{PATH}` alanı en kısa `{VALUE}` karakter olmalıdır.'],
    },
    likes:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"user"
        }
    ],
    likeCount:{
        type:Number,
        default:0
    },
    status:{ //Post silinip silinmeme durumu
        type:Boolean,
        required:true,
        default:true
    }
});
module.exports = mongoose.model('comment',CommentSchema);