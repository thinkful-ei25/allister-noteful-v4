'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = new mongoose.Schema({
  fullName : String,
  username : {type: String, required: true, unique: true},
  password : {type : String, required: true}
});

schema.set('toJSON', {
    virtuals: true,
    transform: (doc, result) => {
      delete result._id;
      delete result.__v;
      delete result.password;
    }
  });

//   schema.methods.validatePassword = function (incomingPassword) {
//     const user = this; // for clarity
//     return incomingPassword === user.password;
//   };

  schema.methods.validatePassword = function (incomingPassword) {
    return bcrypt.compare(incomingPassword, this.password);
  };
  
  schema.statics.hashPassword = function (incomingPassword) {
    const digest = bcrypt.hash(incomingPassword, 10);
    return digest;
  };



module.exports = mongoose.model('User', schema)
