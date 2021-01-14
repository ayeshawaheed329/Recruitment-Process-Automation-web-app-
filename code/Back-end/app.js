const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const users = require('./routes/users');
const auth = require('./routes/auth');
const tests = require('./routes/tests');
const attempts = require('./routes/attempts');
const candidates = require('./routes/candidates');
const questions = require('./routes/questions');
const answers = require('./routes/answers');
const password = require('./routes/password');
const email = require('./routes/email');
const app = express();
var cors = require('cors');

if (!config.get("jwtPrivateKey")) {
    console.error("FATAL Error: JWT SignatureKey is not defined");
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI || config.connectionstring, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));

app.use(cors());

app.use(express.json());
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/tests',tests);
app.use('/api/attempts',attempts);
app.use('/api/candidates',candidates);
app.use('/api/questions',questions);
app.use('/api/answers',answers);
app.use('/api/password',password);
app.use('/api/email',email);

app.get('/', async(req, res)=> {
    res.send("Shariq");
})

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));

// mongoose.connect(process.env.MONGODB_URI || config.connectionstring,
//     { useNewUrlParser: true , useUnifiedTopology: true })
//     .then(()=>{console.log("Connected to skyline")})
//     .catch(()=>{console.error("Error connecting skyline")});
//"mongodb://localhost/skyline"
//const uri = 'mongodb+srv://skyline:skyline@cluster0.68s8y.mongodb.net/skyline?retryWrites=true&w=majority';
//"mongodb+srv://skyline:skyline@cluster0.68s8y.mongodb.net/skyline?retryWrites=true&w=majority"