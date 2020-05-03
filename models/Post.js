const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author:{
        type:String,//mongoose.Schema.ObjectId
        required:true,
        ref:"User"
    },
    title:{
        type:String,
        required:true,
        unique:true,
        minLength:[6,'`{PATH}` alanı en kısa `{VALUE}` karakter olmalıdır.'],
        maxLength: [120,'`{PATH}` alanı en kısa `{VALUE}` karakter olmalıdır.']
    },
    message:{
        type:String,
        required:true,
        mingLength:[24,'`{PATH}` alanı en kısa `{VALUE}` karakter olmalıdır.'],
    },
    slug:{
        type:String,
        required:false,
    },
    image_url:{
        type:String,
        required:true,
        default:"https://images.ctfassets.net/00i767ygo3tc/2LX3UftqFzVDBXTuIILQqn/c95a6ff3b1caa44899048f2b834d08fd/how-to-post-a-picture-with-music-instagram-story.png"
    },
    likes:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }
    ],
    views:{
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

PostSchema.pre('save',function(next) {
    console.log(this.title);
    this.slug = slugify(this.title);
    next();
});

slugify = (text) => {
    var trMap = {
        'çÇ':'c',
        'ğĞ':'g',
        'şŞ':'s',
        'üÜ':'u',
        'ıİ':'i',
        'öÖ':'o'
    };
    for(var key in trMap) {
        text = text.replace(new RegExp('['+key+']','g'), trMap[key]);
    }
    return  text.replace(/[^-a-zA-Z0-9\s]+/ig, '') // remove non-alphanumeric chars
        .replace(/\s/gi, "-") // convert spaces to dashes
        .replace(/[-]+/gi, "-") // trim repeated dashes
        .toLowerCase();
}

module.exports = mongoose.model('post',PostSchema);