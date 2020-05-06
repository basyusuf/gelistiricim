const User = require("../models/User");
const Post = require('../models/Post');
const Category = require('../models/Category');
const Subject = require('../models/Subject');
const Level = require('../models/Level');
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const fs = require("fs");
const connectDatabase = require("../helper/db");
const CustomError = require("../helper/error/CustomError");


const path = "/dummy-data/";

const users = JSON.parse(fs.readFileSync(__dirname +path+"users.json","utf8"));
const posts = JSON.parse(fs.readFileSync(__dirname +path+"posts.json","utf8"));
const categories = JSON.parse(fs.readFileSync(__dirname +path+"categories.json","utf8"));
const subjects = JSON.parse(fs.readFileSync(__dirname +path+"subjects.json","utf8"));
const levels = JSON.parse(fs.readFileSync(__dirname +path+"levels.json","utf8"));
const answers = JSON.parse(fs.readFileSync(__dirname +path+"answers.json","utf8"));
const questions = JSON.parse(fs.readFileSync(__dirname +path+"questions.json","utf8"));


connectDatabase();

const importAllData = async function(){
    try {
        await User.create(users);
        console.log("User's Created");
        await Post.create(posts);
        console.log("Post's Created");
        await Category.create(categories);
        console.log("Categories Created");
        await Subject.create(subjects);
        console.log("Subject's Created");
        await Level.create(levels);
        console.log("Level's Created");
        await Answer.create(answers);
        console.log("Answer's Created");
        await Question.create(questions);
        console.log("Question's Created");

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
        await Category.deleteMany();
        await Subject.deleteMany();
        await Level.deleteMany();
        await Answer.deleteMany();
        await Question.deleteMany();
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