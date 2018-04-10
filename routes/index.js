const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

require('../models/User');
const User = mongoose.model('users');

router.get('/',(req, res)=>{
   res.render('index/home');
});

router.get('/dashboard',(req,res)=>{
    res.render('index/dashboard');
});

router.get('/login',(req,res)=>{
   res.render('index/login');
});

router.get('/register',(req,res)=>{
    res.render('index/register');
});


module.exports = router;