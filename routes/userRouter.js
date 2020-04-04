const express = require('express');
const router = express.Router();

//models
const User = require('../models/User');


router.get('/', (req, res, next)=> {
  const promise = User.find({});
  promise.then((data)=>{
      if(!data){
          next({message:"Sisteme kayıtlı hiç bir kullanıcı bulunmaktadır.",status:404});
      }
    res.status(200).json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.get('/:user_id', (req, res, next)=> {
  const userID = req.params.user_id;
  const promise = User.findById(userID);
  promise.then((data)=>{
      if(!data){
          next({message:"User not found!",status:404});
      }
      else{
          res.json(data);
      }
  }).catch((err)=>{
    res.json(err);
  });
});

router.put('/:user_id', (req, res, next)=> {
    const userID = req.params.user_id;
    const promise = User.findByIdAndUpdate(
        userID,
        req.body,
        {
            new:true
        });
    promise.then((data)=>{
        res.json({
            message:"Başarıyla güncelleme yapılmştır.",
            userId:data._id,
            status:201
        });
    }).catch((err)=>{
        res.json(err);
    });
});

router.post('/', (req, res, next)=> {
    const { firstName,lastName,userName} = req.body;
    const user = new User({
      firstName:firstName,
      lastName:lastName,
      userName:userName
    });
    const promise = user.save();
    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    });
});

module.exports = router;
