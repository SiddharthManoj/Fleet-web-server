//get a specific user
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
