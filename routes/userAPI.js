//GET a specific user
exports.getUser = function(req, res) {
	req.models.User.findOne( {
		uuid: req.params.uuid
	}, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'Get failed! User not found.' });
		}
		else {
			var userObject = { 
				"uuid": user.uuid,
				"email": user.email,
				"username": user.username,
			}
			res.json({
				success: true,
				message: 'User successfully found!',
				user: userObject
			});
		}
	});
}

//POST add new user
exports.addUser = function(req, res) {
	var user = new req.models.User(req.body);
	user.save(function(err) {
		if (err) return next (err);
		res.json(user);
	});
};

//PUT update user
exports.updateUser = function(req, res) {
	var user = req.body;
	req.db.User.findByIdAndUpdate(req.params.uuid, {
		$set: user
	}, {
		new: true
	}, function(err, user) {
		if (err) return next (err);
		res.status(200).json(user);
	})
};

//DELETE remove user
exports.deleteUser = function(req, res) {
	req.models.User.findByIdAndRemove(req.params.uuid, function(err, user){
		if (err) next (err);
		res.status(200).json(user);
	});
};

/*
//POST authenticate
exports.authenticateUser = function(req, res) {

};
*/

//GET list of videos uploaded
exports.getUploadedVideos = function(req, res) {
	req.models.User.findOne( {
		uuid: req.params.uuid
	}, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'User not found!' });
		}
		else {
			var uploadedVideos = user.upvoted_videos_arr;
			res.json({
				success: true,
				message: 'Uploaded videos found!',
				vids: uploadedVideos
			});
		}
	});
};

//GET list of videos upvoted
exports.getUpvotedVideos = function(req, res) {
	req.models.User.findOne( {
		uuid: req.params.uuid
	}, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'User not found!' });
		}
		else {
			var upvotedVideos = user.my_videos_arr;
			res.json({
				success: true,
				message: 'Upvoted videos found!',
				vids: uploadedVideos
			});
		}
	});
};




