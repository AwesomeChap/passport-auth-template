const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

router.get('/',(req, res)=>{
   res.render('index/welcome');
});

router.get('/dashboard',(req,res)=>{
    res.send('Dashboard');
});

router.get('/login',(req,res)=>{
   res.render('index/login');
});

router.get('/register',(req,res)=>{
    res.render('index/register');
});

module.exports = router;