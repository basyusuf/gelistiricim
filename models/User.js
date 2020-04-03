const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type:String,
        required:[true,'`{PATH}` alanı boş bırakılamaz.']
    },
    lastName:{
        type: String,
        required: [true,'`{PATH}` alanı boş bırakılamaz.']
    },
    userName:{
        type:String,
        required:true,
        unique:[true,'`{PATH}` alanı boş bırakılamaz.'],
        minLength:[3,'`{PATH}` alanı en kısa `{VALUE}` karakter olmalıdır.'],
        maxLength:[40,'`{PATH}` alanı en uzun `{VALUE}` karakter olmalıdır.']
    },
    status:{ //User ban olup olmama durumu
        type:Boolean,
        required:true,
        default:true
    }
});

module.exports = mongoose.model('user',UserSchema);