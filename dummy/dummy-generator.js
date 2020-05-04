const User = require("../models/User");
const Post = require('../models/Post');
const fs = require("fs");
const connectDatabase = require("../helper/db");
const CustomError = require("../helper/error/CustomError");


const path = "/dummy-data/";

const users = JSON.parse(fs.readFileSync(__dirname +path+"users.json","utf8"));
const posts = JSON.parse(fs.readFileSync(__dirname +path+"posts.json","utf8"));


connectDatabase();

const importAllData = async function(){
    try {
        await User.create(users);
        await Post.create(posts);
        console.log("Import Process Successful");

    }
    catch(err) {
        console.log(err);
        console.err("There is a problem with import process");
    }
    finally {
        process.exit();
    }
};

const deleteAllData = async function(){
    try {
        await User.deleteMany();
        await Post.deleteMany();
        console.log("Delete Process Successful");


    }
    catch(err) {
        console.log(err);
        console.err("There is a problem with delete process");
    }
    finally {
        process.exit();
    }
};

if (process.argv[2] == "--import"){
    importAllData();
}
else if (process.argv[2] == "--delete"){
    deleteAllData();
}