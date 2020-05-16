const faker = require('faker');
faker.locale = "tr";
const User = require("../models/User");
const Post = require('../models/Post');
const Category = require('../models/Category');
const Subject = require('../models/Subject');
const Level = require('../models/Level');
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const EducationPage = require('../models/EducationPage');
const Education = require('../models/Education');
const Comment = require('../models/Comment');
const fs = require("fs");
const connectDatabase = require("../helper/db");
const CustomError = require("../helper/error/CustomError");
const ImageDomain = "https://gelistiricim.herokuapp.com/default_image/";
let myDefaultImageArray = [];
for(let j = 1; j<11; j++){
    myDefaultImageArray.push(ImageDomain+"post_"+j+".jpeg");
};


const path = "/dummy-data/";

const users = JSON.parse(fs.readFileSync(__dirname +path+"users.json","utf8"));
const posts = JSON.parse(fs.readFileSync(__dirname +path+"posts.json","utf8"));
const categories = JSON.parse(fs.readFileSync(__dirname +path+"categories.json","utf8"));
const subjects = JSON.parse(fs.readFileSync(__dirname +path+"subjects.json","utf8"));
const levels = JSON.parse(fs.readFileSync(__dirname +path+"levels.json","utf8"));
const answers = JSON.parse(fs.readFileSync(__dirname +path+"answers.json","utf8"));
const questions = JSON.parse(fs.readFileSync(__dirname +path+"questions.json","utf8"));
//const educationpages = JSON.parse(fs.readFileSync(__dirname +path+"educationpages.json","utf8"));
const educations = JSON.parse(fs.readFileSync(__dirname +path+"education.json","utf8"));


connectDatabase();

const importAllData = async function(){
    try {
        await User.create(users);
        console.log("User's Created");
        const addedStatPost = addingPost(posts,users,5);
        let postResponse = await Post.create(addedStatPost);
        console.log("Post's Created");
        let categoryResponse = await Category.create(categories);
        console.log("Categories Created");
        let subjectResponse = await Subject.create(subjects);
        console.log("Subject's Created");
        let levelResponse = await Level.create(levels);
        console.log("Level's Created");
        let addedStatAnswers = generateAnswers(answers,6,50);
        let answerResponse = await Answer.create(addedStatAnswers);
        console.log("Answer's Created");
        let addedStatQuestion = generateQuestion(questions,2,40,categoryResponse,subjectResponse,levelResponse,answerResponse);
        await Question.create(addedStatQuestion);
        console.log("Question's Created");
        await Education.create(educations);
        console.log("Education's created");
        const educationPagesCreated = createPageForEducation(educations);
        await EducationPage.create(educationPagesCreated);
        const commentsCreated = createCommentForPost(postResponse,users);
        await Comment.create(commentsCreated);
        console.log("Education Pages Created");
        console.log("********** Import Process Successful **********");
    }
    catch(err) {
        console.log(err);
        console.err("There is a problem with import process");
    }
    finally {
        process.exit();
    }
};

const createPageForEducation = (education) =>{
    let responseArray = [];
    let pageItem;
    for(let i =0;i<education.length;i++){
        for(let j=0;j<25;j++){
            pageItem = {
                "education_id": education[i]._id,
                "title":`${education[i].name} -Title - ${j+1}`,
                "body": `Body - ${j+1}`,
                "pageNumber": j+1
            };
            responseArray.push(pageItem);
        }
    }
    return responseArray;
};
const generateAnswers = (answers,start,end) =>{
    for(let i = start;i<end;i++){
        answers.push(
            {
                text : "Cevap - "+i,
                value: i
            }
        )
    }
    return answers;
}
const generateQuestion = (question,start,end,category,subject,level,answers) =>{
    for(let i = start;i<end;i++){
        let answersCountArray = [];
        for(let k = 0;k<5;k++){
            let randomAnswerId = randomIntFromInterval(0,answers.length-1);
            if(!answersCountArray.includes(randomAnswerId)){
                answersCountArray.push(randomAnswerId);
            }
        }
        let answersArray = [];
        answersCountArray.map((count)=>{
            answersArray.push(answers[count]);
        });
        question.push(
            {
                text: `Test ${i} sorusunun cevabı aşağıdakilerden hangisidir?`,
                value: i,
                category: category[randomIntFromInterval(0,4)],
                multiCorrect: false,
                subjects: [
                    subject[randomIntFromInterval(0,3)]
                ],
                level: level[0],
                answers: answersArray,
                correctAnswer: [
                    answersArray[randomIntFromInterval(0,answersCountArray.length-1)]
                ]
            }
        )
    }
    return question;
}
const createCommentForPost = (addedStatPost,users) => {
    let responseArray = [];
    let randomUser;
    addedStatPost.map((item)=>{
        for(let j=0;j<3;j++){
            randomUser=randomIntFromInterval(0,5);
            responseArray.push({
                post:item._id,
                author:users[randomUser]._id,
                message:faker.lorem.text()
            })
        }
    });
    return responseArray;
}
const addingPost = (posts,users,postCount) => {
    users.map((item)=>{
        for(let j=0;j<postCount;j++){
            let randomImageIndex = randomIntFromInterval(1,10);
            posts.push({
                title : faker.lorem.sentence(),
                content : faker.lorem.paragraph(),
                author : item._id,
                image_url: myDefaultImageArray[randomImageIndex]
            })
        }
    })
    return posts;
}
function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const deleteAllData = async function(){
    try {
        await User.deleteMany();
        await Post.deleteMany();
        await Category.deleteMany();
        await Subject.deleteMany();
        await Level.deleteMany();
        await Answer.deleteMany();
        await Question.deleteMany();
        await EducationPage.deleteMany();
        await Education.deleteMany();
        await Comment.deleteMany();
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