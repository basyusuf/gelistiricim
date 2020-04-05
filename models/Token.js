const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    accessTokenSecret:{
        type:String,
        required:true,
        unique:[true,'`{PATH}` alanı boş bırakılamaz.']
    },
    userId:{
        type:String,
        required:true,
        minLength:[12,'`{PATH}` alanı en kısa `{VALUE}` karakter olmalıdır.'],
        maxLength:[12,'`{PATH}` alanı en uzun `{VALUE}` karakter olmalıdır.']
    },
    algorithm:{
        type:String,
        required:true,
        default:"JWT"
    },
   tokenType:{
       type:String,
       required:true,
       minLength:[12,'`{PATH}` alanı en kısa `{VALUE}` karakter olmalıdır.'],
       maxLength:[12,'`{PATH}` alanı en uzun `{VALUE}` karakter olmalıdır.']
   }
});

module.exports = mongoose.model('token',TokenSchema);