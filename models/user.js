var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var userSchema = new Schema();

userSchema.add({
	uuid: String,
	created_at: Date,
	updated_at: Date,
	username: String,
  email: String,
  my_videos_arr: [{
    type: String,
  }],
  upvoted_videos_arr: [{
    type: String,
  }],
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
