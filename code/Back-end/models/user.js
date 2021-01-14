const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config=require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:5,
        maxlength:50
    },
    email: {
        type: String,
        required: true,
        minlength:5,
        maxlength:255,
        unique:true,
        match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    },
    password: {
        type: String,
        required: true,
        minlength:5,
        maxlength:1024,
    },
    logo: {
        type: String,
        required: true
    },
    code: {
        type: String
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this.id, name: this.name },config.get('jwtPrivateKey'), {expiresIn: "55m"});
    return token;
 }
 
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(50).required(),
        logo: Joi.string().required()
    }
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;


// userSchema.methods.generateAuthToken = function() {
//     console.log('KEY');
//     console.log(config.get('jwtPrivateKey'));
//     const token = jwt.sign({_id:this._id}, config.get('jwtPrivateKey'), {expiresIn: "15m"});
//     return (token);
// }