const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/login');
});

router.get('/google',
    passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/dashboard');
});

router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/dashboard');
});

router.get('/linkedin',
    passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));

router.get('/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });


module.exports = router;