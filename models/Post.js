const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author:{
        type:mongoose.Schema.ObjectId,//mongoose.Schema.ObjectId
        required:true,
        ref:"user"
    },
    title:{
        type:String,
        required:true,
        unique:true,
        minlength:[6,'`{PATH}` alanı en kısa `{VALUE}` karakter olmalıdır.'],
        maxlength: [120,'`{PATH}` alanı en kısa `{VALUE}` karakter olmalıdır.']
    },
    content:{
        type:String,
        required:true,
        minlength:[10,'`{PATH}` alanı en kısa `{VALUE}` karakter olmalıdır.']
    },
    slug:{
        type:String,
        required:false,
    },
    image_url:{
        type:String,
        default:"https://gelistiricim.herokuapp.com/default_image/post_1.jpeg"
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
    views:{
        type:Number,
        required:true,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    status:{ //Post silinip silinmeme durumu
        type:Boolean,
        default:true
    }
});

PostSchema.pre('save',function(next) {
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