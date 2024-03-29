const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const routes = require('./controller')

const User = require('./models/userModel.js');
const Group = require('./models/groupModel.js');
const requireLogin = require('./require_login')

const app = express();

const db = process.env.MONGODB_SERVER || 'mongodb://localhost/better'

mongoose.connect(db, {
    useMongoClient: true,
});

passport.use(User.createStrategy());
app.use(bodyParser.json());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(session({ secret: 'gushank', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));


//AUTH ROUTES
app.post('/api/login', passport.authenticate('local'), (req, res) => {
	res.send(req.user);
})

app.post('/api/signup', (req, res, next) => {
	const newUser = new User ({
		username: req.body.username,
		role: req.body.role
	});

	let userId = '';

	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			res.send(err)
		} else {
			userId = user._id;
			req.logIn(user, (err) => {
				res.send(user)
			})
			if(req.body.role == 'feedbacker') {
				Group.findOneAndUpdate({ 'shortId': req.body.shortId }, {$push: {users: userId}})
					.then(group => console.log(group))
			}
		}
	})
});

app.get('/api/logout', (req, res) => {
	req.logout();
	res.json('User has logged out');
});

app.get('/api/me', (req,res) => {
  if(req.user) {
  	res.status(200).send(req.user)
  } else {
  	res.status(401).json({message: 'Unauthorized'})
  }
});

//APP GET ROUTES
app.get('/api/users', routes.getUsers);
app.get('/api/allfeedback/:user', routes.getAllFeedback);
app.get('/api/groups/:user', routes.getGroups);
app.get('/api/team/:user', routes.getTeam);
app.get('/api/feedback/:feedbackId', routes.getFeedbackDetail);
app.get('/api/comments/:feedbackId', routes.getComments);
app.get('/feedback/:shortId', routes.anonymousFeedbackPage);
app.get('/api/user/:user', routes.getUser);


//APP POST ROUTES
// app.post('/api/feedback/create', requireLogin, routes.createFeedback);
app.post('/api/groups/create', requireLogin, routes.createGroup)
app.post('/api/comments/create/:feedbackId', routes.createComment);
app.post('/api/feedback/create/:shortId', routes.postFeedback)
app.post('/api/users/invite', routes.inviteUser)


app.get('*', requireLogin, (req, res, next) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(process.env.PORT || 8080, function() {
	console.log("App is now listening on port 8080!")
})