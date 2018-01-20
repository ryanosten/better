const passport = require('passport-local-mongoose');
const session = require('express-session');
const User = require('./models/userModel.js');

module.exports = (app) => {

	app.use(passport.initialize());
	app.use(passport.createStrategy());
	app.use(bodyParser.json());
	app.use(session({ secret: 'fugglebuggle', resave: false, saveUninitialized: true }))
	app.use(passport.session());

	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

	app.post('/api/login', passport.authenticate('local'), (req, res) => {
		res.send(req.user);
	});

	app.post('/api/signup', (req, res, next) => {
		const user = new User();
		user.username = req.body.username;
		user.createdAt = new Date();

		User.register(user, req.body.password, (err) => {
			if (err) {
				return res.send(err)
			}

			req.login(user, (err) => {
				if(err) {
					return res.send(err)
				}
				return res.send(user)
			})
		})
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.json('USer has logged out');
	});

	app.get('/api/me', (req,res) => {
	  if (!req.user) {
	    res.status(200).send({ message: 'No user found.' });
	  } else {
	    res.json(req.user);
	  }
	});
}