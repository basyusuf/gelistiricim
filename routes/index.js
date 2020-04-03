const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({
    message:"Index Page"
  });
});

router.post('/register', (req, res, next) => {
    const { userName,password,email} =  req.body;

    const user = new User({
      userName,
      password,
      email
    });

    const promise = user.save();
    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    })
});

module.exports = router;
