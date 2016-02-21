var mongoose = require('mongoose');
var bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
	uuid: String,
	created_at: Date,
	updated_at: Date,
	username: String,
  email: String,
});

userSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
