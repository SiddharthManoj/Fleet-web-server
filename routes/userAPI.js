//GET a specific user
exports.getUser = function(req, res) {
	req.models.User.findById(req.params.uuid, function(err, user) {
		if (err) throw err;
		console.log(user);
		if (!user) {
			res.json({ success: false, message: 'Get failed! User not found.' });
		}
		else {
			var userObject = { 
				"uuid": user._id,
				"email": user.email,
				"username": user.username,
				"uploaded_videos_arr": user.uploaded_videos_arr,
				"upvoted_videos_arr": user.upvoted_videos_arr
			}
			res.json({
				success: true,
				message: 'User successfully found!',
				user: userObject
			});
		}
	});
}

//PUT update user
exports.update = function(req, res) {
	req.models.User.findById(req.params.uuid, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'Updated failed! User not found.' });
		}
		else {
			if (req.body.email) {
				user.email = req.body.email;
			}
			if (req.body.username) {
				user.username = req.body.username;
			}
			user.save(function (err){
				if (err) throw err;
				res.json({
					success: true,
					message: 'User successfully found and updated!',
				});
			});
		}
	});
};

//DELETE remove user
exports.delete = function(req, res) {
	req.models.User.findById( req.params.uuid, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'Delete failed! User not found.' });
		}
		else{
			var uploadedVideos = user.uploaded_videos_arr;
			for (var x = 0; x < uploadedVideos.length; x++){
				req.models.Video.findByIdAndRemove(uploadedVideos[x], function(err, video){
					if (err) throw err;
					if (!video) {
						res.json({ success: false, message: 'Delete failed! Video not found.' });
					}
					else {
						if (x == uploadedVideos.length-1) {
							req.models.User.findByIdAndRemove(req.params.uuid, function(err, user){
								res.json({
									success: true,
									message: 'User successfully deleted!',
								});
							});
						}
					}
				});
			}
		}
	});
};

//GET list of videos uploaded
exports.getUploadedVideos = function(req, res) {
	req.models.User.findById( req.params.uuid, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'Get uploaded videos failed. User not found' });
		}
		else {
			var uploadedVideos = user.uploaded_videos_arr;
			if (uploadedVideos) {
				res.json({
					success: true,
					message: 'Uploaded videos found!',
					vids: uploadedVideos
				});
			}
			else {
				res.json({
					success: false,
					message: 'Uploaded videos not found!',
				});
			}
		}
	});
};

//GET list of videos upvoted
exports.getUpvotedVideos = function(req, res) {
	req.models.User.findById( req.params.uuid, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'Get upvoted videos failed. User not found' });
		}
		else {
			var upvotedVideos = user.upvoted_videos_arr;
			if (upvotedVideos) {
				res.json({
					success: true,
					message: 'Upvoted videos found!',
					vids: upvotedVideos
				});
			}
			else {
				res.json({
					success: false,
					message: 'Upvoted videos not found!',
				});
			}
		}
	});
};
