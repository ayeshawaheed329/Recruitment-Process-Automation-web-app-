const {User, validate} = require('../models/user');
const express= require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const _ = require('lodash');
var nodemailer = require('nodemailer');
var cors = require('cors');


router.post('/sendcode', cors() , async(req, res)=> {

    try{
      let users = await User.findOne({email: req.body.email});
          if(!users) return res.status(400).send('User not registered');
          var rand = Math.floor(100000 + Math.random() * 900000);
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'reconlinesl@gmail.com',
          pass: 'SkyLine123'
        }
      });
      var mailOptions = {
        from: 'reconlinesl@gmail.com',
        to: users.email,
        subject: 'Password Reset Code',
        text: `Your Password Reset Code is: ${rand.toString()}` //users._id.toString()
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      users.code = rand;
      await users.save();
      res.send("Code Sended")  
      //res.send(_.pick(users,["_id"]));

    }
    catch(ex){
      res.status(400).send({error: ex.message});
    }
    
  })

  router.post('/verifycode', cors() , async(req, res)=> {
  
    try{
        let user = await User.findOne({code: req.body.code});
            if(!user) return res.status(400).send('please Enter correct code');
            res.send(_.pick(user,["_id"]));
        // if(user.code == req.body.code){
        //   res.send(_.pick(user,["_id"]));
        // }
        // // else{
        // //   res.send('please Enter correct code');
        // // }
    }
    catch(ex){
      res.status(400).send({error: ex.message});
    }
    
  })


  router.post('/newpassword', cors() , async(req, res)=> {
  
    try{
        let user = await User.findById(req.body.id);
            if(!user) return res.status(400).send('User not registered');
        user.password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.code = null;
        await user.save();
        res.send('password successfully changed');
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }
    
  })
  
  
  module.exports = router;