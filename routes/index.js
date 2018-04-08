const express = require('express');
const router = express.Router();

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