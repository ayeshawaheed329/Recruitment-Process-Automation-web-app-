const {Attempt} = require('../models/attempt');
const {Answer} = require('../models/answer');
const {Question} = require('../models/question');
const {Candidate} = require('../models/candidate');
const {Test} = require('../models/test');
const express= require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../middleware/auth');
var cors = require('cors');
var nodemailer = require('nodemailer');

router.post('/invitation', cors() , [auth] , async(req, res)=> {
    
    try{
        const link = req.body.link;
        var rand = Math.floor(100000 + Math.random() * 900000);
        const attempt = new Attempt({
            userid: req.user._id,
            testid: req.body.testid,
            code: rand
        });
        await attempt.save();
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'reconlinesl@gmail.com',
            pass: 'SkyLine123'
            }
        });
        
        var mailOptions = {
            from: 'reconlinesl@gmail.com',
            to: req.body.to,
            subject: req.body.subject,
            text: `${req.body.msg} 
        Invitation Link: ${link}.
        Your Test Code: ${rand}`
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

router.post('/feedback/:id', cors() , [auth] , async(req, res)=> {
    
    try{
        
        let attempt = await Attempt.findById(req.params.id);
        const candidate = await Candidate.findById(attempt.candidateid);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'reconlinesl@gmail.com',
            pass: 'SkyLine123'
            }
        });
        
        var mailOptions = {
            from: 'reconlinesl@gmail.com',
            to: candidate.email,
            subject: req.body.subject,
            text: req.body.msg
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

router.get('/', cors() , [auth] , async(req, res)=> {

    try{
        let results = [];
        const attempt = await Attempt.find({userid: req.user._id, final: true});
        for(var i = 0; i < attempt.length; i++){
            var obj = attempt[i];
            const candidate = await Candidate.findById(obj.candidateid);
            const test = await Test.findById(obj.testid);
            results.push( { _id: obj._id, name: candidate.name, email: candidate.email,
                position: test.position, totalquestions: obj.totalquestions,
                correctanswers: obj.correctanswers } );
        }
        res.send(results)
        // res.send(attempt)
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }

})

router.get('/:id', cors() , [auth] , async(req, res)=> {

    try{
        let attempt = await Attempt.findById(req.params.id);
        if(!attempt) return res.status(400).send('User does not attempt test');
        const candidate = await Candidate.findById(attempt.candidateid);
        const test = await Test.findById(attempt.testid);
        res.send({Attempt: attempt, Candidate: candidate, Test: test});
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }
})

router.get('/result/:id', cors() , [auth] , async(req, res)=> {

    try{
        let questionanswer = [];
        let attempt = await Attempt.findById(req.params.id);
        if(!attempt) return res.status(400).send('User does not attempt test');
        const answer = await Answer.find({attemptid: attempt._id});

        for(var i = 0; i < answer.length; i++){
            const obj = answer[i];
            const question = await Question.findById(obj.questionid);
            questionanswer.push({
                question: question.text, a: question.option1, b: question.option2, c: question.option3, d: question.option4,
                answer: question.answer, candidateanswer: obj.candidateanswer
            })
        }

        res.send({
            // Attempt: attempt, Candidate: candidate, Test: test,
            // Result: answer,
            QuestionAnswer: questionanswer
        });
        
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }
})

// router.get('/result/:id', cors() , [auth] , async(req, res)=> {

//     try{
//         let questionanswer = [];
//         let attempt = await Attempt.findById(req.params.id);
//         if(!attempt) return res.status(400).send('User does not attempt test');
//         // let test = await Test.findById(attempt.testid);
//         const question = await Question.find({testid: attempt.testid});

//         for(var i = 0; i < question.length; i++){
//             const obj = question[i];
//             const answer = await Answer.findOne({questionid: obj._id});
//             questionanswer.push({
//                 question: obj.text, a: obj.option1, b: obj.option2, c: obj.option3, d: obj.option4,
//                 answer: obj.answer, candidateanswer: answer.candidateanswer, answerid: answer._id
//             })
//         }

//         res.send({
//             // Attempt: attempt, Candidate: candidate, Test: test,
//             // Result: result,
//             QuestionAnswer: questionanswer
//         });
        
//     }
//     catch(ex){
//         res.status(400).send({error: ex.message});
//     }
// })

router.delete('/:id', cors() , [auth] , async(req, res)=> {
    
    try {
        //const result = await Attempt.deleteOne({_id: req.params.id});
        const result = await Attempt.findByIdAndRemove({_id: req.params.id});
        // const result = await Attempt.deleteMany({isOnline: req.params.status});
        res.send(result);
    }
    catch (ex){
        res.status(400).send({error: ex.message});
    }
    
})

module.exports = router;