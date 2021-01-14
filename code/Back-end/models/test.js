const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    position: {
        type: String
    },
    date: {
        type: String
    },
    totalquestion: {
        type: Number
    },
    final: {
        type: String,
        default: "false"
    }
    
  });

  const Test = mongoose.model('Test', testSchema);
  
  exports.Test = Test;