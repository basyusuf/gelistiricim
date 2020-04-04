const mongoose = require('mongoose');

module.exports = () =>{
    mongoose.connect('mongodb://gelistiricim_user:gelistiricim1234@ds231956.mlab.com:31956/heroku_nh2fxxd1',{
            useNewUrlParser:true,
            useUnifiedTopology: true
        }
        );
    mongoose.connection.on('open', () =>{
        // console.log('Operation succesfull.MongoDB: Connected.');
    });
    mongoose.connection.on('error',()=>{
        console.log("Operation failed. Couldn't connect to Mongodb !!!");
    });

    mongoose.Promise = global.Promise;
}