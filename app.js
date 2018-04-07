/**
 * Created by HP on 07-04-2018.
 */

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/',(req,res)=>{
   res.send('It Works!');
});

const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});