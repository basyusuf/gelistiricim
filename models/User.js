const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:[true,'`{PATH}` alanı boş bırakılamaz.'],
        minLength:[3,'`{PATH}` alanı en kısa `{VALUE}` karakter olmalıdır.'],
        maxLength:[40,'`{PATH}` alanı en uzun `{VALUE}` karakter olmalıdır.']
    },
    password:{
        type:String,
        required:true,
        mingLength:5
    },
    email:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:false
    },
    lastName:{
        type: String,
        required: false
    },
    emailConfirmStatus:{
        type:Boolean,
        required:true,
        default: false
    },
    status:{ //User ban olup olmama durumu
        type:Boolean,
        required:true,
        default:true
    }
});

module.exports = mongoose.model('user',UserSchema);