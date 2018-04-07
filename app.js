/**
 * Created by HP on 07-04-2018.
 */

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

require('./config/passport')(passport);

const auth = require('./routes/auth');

const app = express();

app.get('/',(req,res)=>{
   res.send('It Works!');
});

app.use('/auth',auth);

const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});