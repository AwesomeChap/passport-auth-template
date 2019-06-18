const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const {Authenticated} = require('../helper/auth');

require('../models/User');
const User = mongoose.model('users');

router.get('/',(req, res)=>{
   res.render('index/home');
});

router.get('/dashboard',Authenticated,(req,res)=>{
    res.render('index/dashboard');
});

router.get('/login',(req,res)=>{
   res.render('index/login');
});

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect : '/dashboard',
        failureRedirect : '/login'
        //,failureFlash : true
    })(req, res, next);
});


router.get('/register',(req,res)=>{
    res.render('index/register');
});


router.post('/register',(req,res)=>{
    const {name,email,password,password2} = req.body;
    const errors = [];
    if(password !== password2){
        errors.push({text : 'Password did not match!'});
    }
    if(password.length < 4){
        errors.push({text : 'Password too short!'});
    }
    if(!errors.length){
        User.findOne({email}).then((user)=>{
            if(user){
                console.log('User already registered!')
                res.redirect('/login');
            }
            else{
                const newUser = new User({
                    local : {
                        email,
                        password,
                        name
                    }
                });

                bcrypt.genSalt(10,(err,salt)=>{
                   bcrypt.hash(password,salt,(err,hash)=>{
                       if(err)
                           throw err;
                       else{
                           newUser.local.password = hash;
                           newUser.save().then((user)=>{
                               console.log('User Saved Successfully!');
                               res.redirect('/login');
                           }).catch((e)=>{
                               console.log(e);
                               return;
                           })
                       }
                   })
                });
            }
        })
    }
});

module.exports = router;