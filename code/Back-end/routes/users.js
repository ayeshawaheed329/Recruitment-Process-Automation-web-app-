const {User, validate} = require('../models/user');
const express= require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const _ = require('lodash');
var nodemailer = require('nodemailer');
var cors = require('cors');

router.post('/', cors() , async(req, res)=> {

    try{
        const {error} = validate(req.body);
        if (error) { 
          // console.log(error); 
          return res.status(400).send(error.details[0].message);}  
        let user = await User.findOne({email: req.body.email});
        if(user) return res.status(400).send('User already registered');

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            logo: req.body.logo
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user,["_id", "name", "email"]));
    }
    catch(ex){
       res.status(400).send({error: ex.message});
    }

})

router.get('/', cors() , [auth] ,async(req, res)=> {

    try{
      const user = await User.findById(req.user._id).select("-password");
      res.send(user);
    }
    catch(ex){
      res.status(400).send({error: ex.message});
    }

})

router.get('/all', async(req, res)=> {

    try{
      const user = await User.find().select("-password");
      res.send(user);
    }
    catch(ex){
      res.status(400).send({error: ex.message});
    }

})

router.put('/', cors() , [auth] , async(req, res)=> {

  try{
      let user = await User.findById(req.user._id);
      user.name = req.body.name,
      user.email = req.body.email,
      //user.password = req.body.password,
      user.logo = req.body.logo
      if(req.body.password){
        user.password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }

      const result = await user.save();
      res.send(result);
  }
  catch(ex){
      res.status(400).send({errors: ex.message});
  }

})

module.exports = router;