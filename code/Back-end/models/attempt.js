const mongoose = require('mongoose');
const { number } = require('joi');

const attemptSchema = mongoose.Schema({
    
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    testid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    },
    candidateid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    },
    final: {
        type: Boolean,
        default: false
    },
    totalquestions: Number,
    correctanswers: Number,
    code: {
        type: String
    }

  });

  const Attempt = mongoose.model('Attempt', attemptSchema);
  
  exports.Attempt = Attempt;