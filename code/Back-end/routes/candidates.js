const {Candidate, validate} = require('../models/candidate');
const {Attempt} = require('../models/attempt');
const {Question} = require('../models/question');
const express= require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../middleware/auth');
var cors = require('cors');


router.post('/:id', cors() , async(req, res)=> {

    try{
        const {error} = validate(req.body);
        if (error) { return res.status(400).send(error.details[0].message);} 
        let attempt = await Attempt.findOne({code: req.params.id});
        attempt.code = null;
        if(attempt.candidateid) return res.status(400).send('Candidate already Attempt Test'); 
        candidate = new Candidate({
            name: req.body.name,
            email: req.body.email
        });
        await candidate.save();
        attempt.candidateid = candidate._id;
        await attempt.save();
        // const question = await Question.find({testid: attempt.testid})
        // res.send({Attempt: attempt , Question: question});
        res.send(attempt._id);
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }

})

router.get('/', cors() , [auth] , async(req, res)=> {

    try{
        const candidate = await Candidate.find().select();
        res.send(candidate);
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }

})

module.exports = router;


// router.post('/', cors() , [auth] , async(req, res)=> {

//     try{
//         candidate = new Candidate({
//             name: req.body.name,
//             email: req.body.email
//         });
    
//         await candidate.save();
//         res.send(candidate);
//     }
//     catch(ex){
//         res.status(400).send({error: ex.message});
//     }

// })