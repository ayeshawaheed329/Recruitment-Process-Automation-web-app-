const {Question} = require('../models/question');
const {Attempt} = require('../models/attempt');
const express= require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../middleware/auth');
var cors = require('cors');
const {Test} = require('../models/test');

router.post('/', cors() , [auth] , async(req, res)=> {

    try{
        let test = await Test.findById(req.body.testid);
        if(!test) return res.status(400).send('Test does not exit, please inter correct Test ID');
        let questions = await Question.find({testid: req.body.testid});

        for(var i = 0; i < questions.length; i++){
            var obj = questions[i];
            if(obj.text == req.body.text)
            return res.send("Question Already in the Test")
        }

        question = new Question({
            testid: req.body.testid,
            text: req.body.text,
            answer: req.body.answer,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4
        })
        await question.save();
        test.totalquestion = test.totalquestion+1;
        await test.save();
        res.send(question);
    }
    catch(ex){
        res.status(400).send({errors: ex.message});
    }

})

router.put('/:id', cors() , [auth] , async(req, res)=> {

    try{
        let question = await Question.findById(req.params.id);
        if(!question) return res.status(400).send('Question does not exit, please inter correct Question ID');
        question.text = req.body.text,
        question.answer = req.body.answer,
        question.option1 = req.body.option1,
        question.option2 = req.body.option2,
        question.option3 = req.body.option3,
        question.option4 = req.body.option4
        const result = await question.save();
        res.send(result);
    }
    catch(ex){
        res.status(400).send({errors: ex.message});
    }

})

router.get('/:testid', cors() , async(req, res)=> {

    try{
        const question = await Question.find({testid: req.params.testid});
        res.send(question);
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }
    
})
router.get('/attempt/:id', cors() , async(req, res)=> {

    try{
        const attempt = await Attempt.findById(req.params.id);
        const question = await Question.find({testid: attempt.testid}).select("-answer");
        // res.send({Attempt: attempt , Question: question});
        res.send(question);
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }
    
})



router.delete('/:id', cors() , async(req, res)=> {

    try{
        let question = await Question.findById(req.params.id);
        if(!question) return res.status(400).send('Question does not exit, please inter correct Question ID');
        let test = await Test.findById(question.testid);
        let result = await Question.findByIdAndRemove(req.params.id);
        test.totalquestion = test.totalquestion-1;
        await test.save();
        res.send(result);
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }
    
})

router.get('/all', cors() , [auth] , async(req, res)=> {

    try{
        const question = await Question.find()
        res.send(question);
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }

})

module.exports = router;


// router.post('/array', cors() , [auth] , async(req, res)=> {

//     try{
//         let inputQuestion = req.body.questions;
//         const promises = [];
//         inputQuestion.forEach(element => {
//             let question = new Question({
//                 testid: req.body.testid,
//                 text: req.body.text,
//                 answer: req.body.answer,
//                 option1: req.body.option1,
//                 option2: req.body.option2,
//                 option3: req.body.option3,
//                 option4: req.body.option4
//             })
//             promises.push(question.save());
//         });
//         await Promise.all(promises);
//         res.status(200).send({result: "Records added successfully"});
//     }
//     catch (ex) {
//         let errors = [];
//         for (field in ex.errors)
//             errors.push(ex.errors[field].message);
//         res.status(400).send(errors);
//     }

// })
