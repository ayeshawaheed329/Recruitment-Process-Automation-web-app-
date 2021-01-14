const {User} = require('../models/user');
const express= require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
var cors = require('cors');


router.post('/', cors() , async(req, res)=> {

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send({error:"User is not registered"});
    await bcrypt.compare(req.body.password, user.password)
        .then((validPassword) => {
            if(validPassword) {
                const token = user.generateAuthToken();
                res.header('x-auth-token',token).status(200).send({token: token, logo: user.logo});
            }
            else {
                res.status(400).send({error:"Invalid email or password"});
            }
        })
        .catch((errors)=> {return res.status(400).send(errors)});
})

module.exports = router;