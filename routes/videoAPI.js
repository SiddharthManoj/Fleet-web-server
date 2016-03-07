var LIMIT = 10;

//GET a specific video
exports.getVideo = function(req, res) {
	req.models.Video.findById(req.params.uuid, function(err, video) {
		if (err) throw err;
		if (!video) {
			res.json({ success: false, message: 'Get failed! Video not found.' });
		}
		else {
			var videoObject = { 
				"title": video.title,
				"hashtags": video.hashtags,
				"duration": video.duration,
				"video_focuses": video.video_focuses,
				"thumbnail": video.thumbnail,
				"s3": video.s3
			};
			res.json({
				success: true,
				message: 'Video successfully found!',
				user: videoObject
			});
		}
	});
}

//POST add video
exports.addVideo = function(req, res) {
	models.User.findOne({
		uuid: req.body.uuid
	}, function(err, user) {
		if (!user) {
			res.json({ success: false, message: 'Get failed! User not found.' });
		}
		else {
			//update user
		}
	});
	if(req.body){
		req.models.Video.create({
			title: req.body.title,
			hashtags: req.body.hashtags,
			duration: req.body.duration,
			video_focuses: req.body.video_focuses,
			thumbnail: req.body.thumbnail,
			s3: req.body.s3
		}), function (err, docs) {
			if (err) throw err;
			else {
				res.status(200).json(docs);
			}
		}
	} else {
		throw new Error('no data');
	}
};

//PUT edit video
exports.editVideo = function(req, res) {
	req.models.Video.findById(req.params.uuid, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'Updated failed! User not found.' });
		}
		else {
			if (req.body.username) {
				user.username = req.body.username;
			}
			res.json({
				success: true,
				message: 'User successfully found and updated!',
			});
		}
	});
};

//DELETE delete video
exports.deleteVideo = function(req, res) {
	req.models.Video.findByIdAndRemove(req.params.uuid, function(err, video){
		if (err) throw err;
		if (!video) {
			res.json({ success: false, message: 'Delete failed! Video not found.' });
		}
		else {
			res.json({
				success: true,
				message: 'Video successfully deleted!',
			});
		}
	});
};

//GET video list
exports.getVideos = function(req, res) {
	var limit = req.query.limit || LIMIT;
	req.models.Video.find({}, null, {
		limit: limit,
		sort: {
			'_id: -1'
		}
	}, function(err, docs) {
		if(err || !docs) throw err;
		var videos = [];
		docs.forEach(function(doc, i, list){
			var item = doc.toObject();
			videos.push(item);
		});
		var body = {};
		body.limit = limit;
		body.videos = videos;
		req.models.Video.count({}, function(err, total) {
			if (err) throw err;
			body.total = total;
			res.status(200).json(body);
		});
	});
};
