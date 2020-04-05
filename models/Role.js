const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    role:{
        type:String,
        enum:['user','moderator','admin'],
        required:true,
        default: 'user'
    }
});

module.exports = mongoose.model('role',RoleSchema);