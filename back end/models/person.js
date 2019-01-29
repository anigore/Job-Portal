var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var person = new Schema({
  firstName: String,
  lastName: String,
  gender: {type:String, enum : ['male','female']},
  hobbies:{type:[String], enum:['cricket','dancing','singing','acting','false']},
 //hobbies:String,  
  phoneNumber: Number,
  address: String,
  city: String,
  state: String,
  zipcode: Number,
  email: String,
  dateOfBirth:Date,
  password: String,
  username: String,
  photo:String,



});

module.exports = mongoose.model('person', person); 