const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    
    testid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    },
    text: {
        type: String
    },
    answer: {
        type: String
    },
    option1: String,
    option2: String,
    option3: String,
    option4: String

  });

  const Question = mongoose.model('Question', questionSchema);
  
  exports.Question = Question;