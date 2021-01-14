const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    
    attemptid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attempt'
    },
    questionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    candidateanswer: {
        type: String
    }

  });

  const Answer = mongoose.model('Answer', answerSchema);
  
  exports.Answer = Answer;