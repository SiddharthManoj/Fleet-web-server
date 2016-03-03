var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var videoSchema = new Schema();
videoSchema.add({
	_id: String,
	created_at: Date,
	updated_at: Date,
	title: String,
  hashtags: [{
    type: String,
  }],
  num_upvotes: Number,
  num_views: Number,
  duration: Number,
  video_focuses:[{
    type: Number,
  }],
  thumbnail: String,
  s3: String,
});

videoSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('Video', videoSchema);
