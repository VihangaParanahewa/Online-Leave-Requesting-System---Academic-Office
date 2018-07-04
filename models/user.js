var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    gender: {type: String, required: true},
    mobile: {type: String, required: true},
    role: {type: String, required: true},
    profileImage: {type: String, required: true}
});

userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);  
};

userSchema.methods.validPassword = function(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword);
};

module.exports = mongoose.model('User', userSchema);