const mongoose = require('mongoose');
const Joi = require('joi');

const candidateSchema = mongoose.Schema({
   
    name: {
        type: String
    },
    email: {
        type: String
    }
    
  });

  const Candidate = mongoose.model('Candidate', candidateSchema);

  function validateCandidate(candidate) {
    const schema = {
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(5).max(255).required().email()
    }
    return Joi.validate(candidate, schema);
}
  
  exports.Candidate = Candidate;
  exports.validate = validateCandidate;