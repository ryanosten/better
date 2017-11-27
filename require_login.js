module.exports = (req, res, next) => {
	if(req.user === null) {
		res.send(401);
	} else {
		next();
	}
}