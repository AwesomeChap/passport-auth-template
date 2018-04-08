const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   googleID : {
       type : String,
   },
   email : {
       type : String,
       required : true
   },
   firstName : {
       type : String
   },
   LastName : {
       type : String
   },
   image : {
       type : String
   }
});

mongoose.model('users',UserSchema);