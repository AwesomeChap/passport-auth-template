const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   local : {
       name : {
           type : String
       },
       email : {
           type : String
       },
       password : {
           type : String
       }
   },
   google : {
       id : {
           type : String
       },
       email : {
           type : String
       },
       firstName : {
           type : String
       },
       lastName : {
           type : String
       }
   },
   github : {
       id : {
           type : String
       },
       email :{
           type : String
       },
       displayName : {
           type :String
       },
       userName : {
           type : String
       }
   },
   linkedin : {
       id : {
           type : String
       },
       email : {

       },
       headline : {
           type : String
       },
       firstName : {
           type : String
       },
       lastName:{
           type : String
       }
   }
});

mongoose.model('users',UserSchema);