const {Test} = require('../models/test');
const express= require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../middleware/auth');
var cors = require('cors');
const date = require('date-and-time');

router.post('/', cors() , [auth] , async(req, res)=> {

    const now = new Date();
    const pattern = date.compile('MMM DD YYYY');
    try {
        test = new Test({
            userid: req.user._id,
            position: req.body.position,
            date: date.format(now, pattern).toString(),
            totalquestion: 0
            })
        await test.save();
        res.send(test);
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }

})

router.post('/save/:id', cors() , async(req, res)=> {
    try {
        const test = await Test.findById(req.params.id);
        if (!test)
        {
            res.status(400).send({error:"Test Id not found"});
            return;
        }
        test.final = "true"
        const result = await test.save();
        res.send(result);
    }
    catch (ex){
        res.status(400).send({error :ex.message});
    }
})

router.get('/draft', cors() , [auth] , async(req, res)=> {

    try{
        const test = await Test.find({userid: req.user._id, final: "false"});
        res.send(test);
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }

})

router.get('/final', cors() , [auth] , async(req, res)=> {

    try{
        const test = await Test.find({userid: req.user._id, final: "true"});
        res.send(test);
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }

})

router.get('/:id', cors() , [auth] , async(req, res)=> {

    try{
        const test = await Test.findById(req.params.id);
        res.send(test);
    }
    catch(ex){
        res.status(400).send({error: ex.message});
    }

})

router.get('/all', cors() , async(req, res)=> {
    const test = await Test.find().select();
    res.send(test);
})

router.delete('/:id', cors() , [auth] , async(req, res)=> {
    
    try {
        // const result = await Test.deleteOne({_id: req.params.id});
        // const result = await Test.findByIdAndRemove({_id: req.params.id});
        // const result = await Test.deleteMany({isOnline: req.params.status});
        const test = await Test.findById(req.params.id);
        if (!test)
        {
            res.status(400).send({error:"Test Id not found"});
            return;
        }
        test.final = "delete"
        const result = await test.save();
        
        res.send(result);
    }
    catch (ex){
        res.status(400).send({error: ex.message});
    }
    
})

module.exports = router;