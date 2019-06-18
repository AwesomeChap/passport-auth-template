const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const LinkedInStrategy = require('passport-linkedin').Strategy;

const mongoose = require('mongoose');
const keys = require('./keys');
const bcrypt = require('bcryptjs');
require('../models/User');
const User = mongoose.model('users');

module.exports = function (passport) {
    passport.use(new LocalStrategy({usernameField : 'email'},
        function(email, password, done) {
            User.findOne({ 'local.email' : email }).then((user)=>{
                if(!user){
                    console.log('No user found!');
                    return done(null,false,{message : 'no user found!'});
                }
                else{
                    bcrypt.compare(password, user.local.password  ,(err,matched)=>{
                        if(matched){
                            console.log('User found!');
                            return done(null,user);
                        }
                        else{
                            console.log('password incorrect');
                            return done(null,false);
                        }
                    })
                }
            }).catch((e)=>{
                console.log((e));
                return;
            });
        }
    ));

    passport.use(new GoogleStrategy({
            clientID: keys.google.id,
            clientSecret: keys.google.secret,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
           //console.log(JSON.stringify(profile,undefined,2));
            const newUser = {
                google : {
                    id : profile.id,
                    firstName : profile.name.givenName,
                    lastName : profile.name.familyName,
                    email : profile.emails[0].value
                }
            };

            User.findOne({'google.email' : profile.emails[0].value}).then((user)=>{
                if(user){
                    done(null,user);
                }
                else{
                    new User(newUser).save().then((user)=>{
                        if(user)
                            done(null,user);
                        else
                            done(null,false);
                    });
                }
            })
        }
    ));

    passport.use(new GitHubStrategy({
            clientID: keys.github.id,
            clientSecret: keys.github.secret,
            callbackURL: "http://localhost:3000/auth/github/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            // console.log(JSON.stringify(profile,undefined,2));
            User.findOne({'github.id' : profile.id}).then((user)=>{
               if(user){
                   done(null,user);
               }
               else{
                   const newUser = {
                       github : {
                           id : profile.id,
                           email : profile._json.email,
                           userName : profile.username,
                           displayName : profile.displayName,
                       }
                   };
                   new User(newUser).save().then((user)=>{
                       if(user)
                            done(null,user);
                       else
                           done(null,false);
                   })
               }
            });
        }
    ));

    passport.use(new LinkedInStrategy({
            consumerKey: keys.linkedin.id,
            consumerSecret: keys.linkedin.secret,
            callbackURL: "http://localhost:3000/auth/linkedin/callback",
            profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
        },
        function(token, tokenSecret, profile, done) {
            const {emailAddress, firstName, lastName,headline,id} = profile._json;
            const newUser = {
                linkedin:{
                    id,
                    firstName,
                    lastName,
                    headline,
                    email : emailAddress
                }
            };

            User.findOne({'linkedin.id' : id}).then((user)=>{
                if(user){
                    return done(null,user);
                }
                else{
                    new User(newUser).save().then((user)=>{
                       if(user)
                           return done(null,user);
                       else
                           return done(null,false);
                    });
                }
            })
        }
    ));

    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=>{
        User.findById(id).then(user => done(null,user));
    });
};