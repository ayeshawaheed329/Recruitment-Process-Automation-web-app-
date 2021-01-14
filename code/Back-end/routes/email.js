const express= require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var cors = require('cors');

router.post('/', cors() , async(req, res)=> {
    
    try{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'reconlinesl@gmail.com',
            pass: 'SkyLine123'
            }
        });
        
        var mailOptions = {
            from: 'reconlinesl@gmail.com',
            to: 'ayeshawaheed329@gmail.com',
            subject: req.body.subject,
            text: `Name: ${req.body.name}, Email: ${req.body.email}.
            Message: ${req.body.msg}.`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });

        res.send('invitation send');
    }
    catch(ex){
       res.status(400).send({error: ex.message});
    }
    
})

module.exports = router;