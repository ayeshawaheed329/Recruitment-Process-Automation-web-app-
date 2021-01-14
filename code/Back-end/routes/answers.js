const {Answer} = require('../models/answer');
const {Question} = require('../models/question');
const {Attempt} = require('../models/attempt');
const {Candidate} = require('../models/candidate');
const {Test} = require('../models/test');
const express= require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../middleware/auth');
var cors = require('cors');

router.post('/:attemptid', cors() , async(req, res)=> {

    try{
        
        const inputAnswers = req.body.answers;
        const promises = [];
        inputAnswers.forEach(element => {
            let answer = new Answer({
                attemptid: req.params.attemptid,
                questionid: element.questionid,
                candidateanswer: element.candidateanswer
            })
            promises.push(answer.save());
        });
        await Promise.all(promises);
        //res.status(200).send({result: "Records added successfully"});
        let attempt = await Attempt.findById(req.params.attemptid);
        const ans = req.body.answers;
        var correctanswers = 0;
        for(var i = 0; i < ans.length; i++){
            var obj = ans[i];
            var question = await Question.findById(obj.questionid);
            if(question.answer == obj.candidateanswer){
                correctanswers++;
            }
        }
        attempt.correctanswers = correctanswers;
        // attempt.totalquestions = ans.length;
        const test = await Test.findById(attempt.testid);
        attempt.totalquestions = test.totalquestion;
        attempt.final = true;
        await attempt.save();
        res.status(200).send({Attempt: attempt});
    }
    catch (ex) {
        let errors = [];
        for (field in ex.errors)
            errors.push(ex.errors[field].message);
        res.status(400).send(errors);
    }

})

router.get('/', cors() , [auth] , async(req, res)=> {

    try{
        const answer = await Answer.find().select();
        res.send(answer);
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }

})

module.exports = router;