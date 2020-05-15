const express = require('express');
const router = express.Router();
const {registerUser,logoutUser,loginUser,welcomeAPI,forgotPassword,resetPassword} = require('../controller/indexController');
//Middleware
const verifyToken = require('../middleware/verify-token');
const profileImageUpload = require('../middleware/libraries/profileImageUpload');
//Child Routes
const postRouter = require('./postRouter');
const usersRouter = require('./userRouter');
const commentRouter = require('./commentRouter');
const educationRouter = require('./educationRouter');
const questionRouter = require('./questionRouter');
const socketRouter = require('./socketRouter');
const profileRouter = require('./profileRouter');
const categoryRouter = require('./categoryRouter');

//Index Routes
router.get('/', welcomeAPI);
router.post('/register',registerUser );
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.post('/forgotpassword',forgotPassword);
router.put('/resetpassword',resetPassword);
//ChildRoutes
router.use('/users', usersRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/education',educationRouter);
router.use('/question',questionRouter);
router.use('/socket',socketRouter);
router.use('/profile',profileRouter);
router.use('/category',categoryRouter);

module.exports = router;
