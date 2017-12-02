const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const requireLogin = require('./require_login')

const app = express();

const Feedback = require('./models/feedbackModel.js');
const Group = require('./models/groupModel.js');
const User = require('./models/userModel.js');

mongoose.connect('mongodb://localhost/better', {
    useMongoClient: true,
});

app.use(express.static('public'));
app.use(bodyParser.json());

passport.use(User.createStrategy());
app.use(session({ secret: 'fugglebuggle', resave: false, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post('/api/login', passport.authenticate('local'), (req, res) => {
	res.send(req.user);
});

app.post('/api/signup', (req, res, next) => {
	const user = new User();
	user.email = req.body.email;
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
	res.json('User has logged out');
});

app.get('/api/me', (req,res) => {
  if (!req.user) {
    res.status(200).send({ message: 'No user found.' });
  } else {
    res.json(req.user);
  }
});

app.get('/api/feedback', (req, res, next) => {
	Feedback.find().populate('group').exec()
		.then((docs) => {
			res.status(200).send(docs);
		})
		.catch((err) => {
			res.status(400).send(err);
		})
})

app.get('/api/groups', requireLogin,  (req, res, next) => {
	Group.find()
		.then((docs) => {
			res.status(200).send(docs);
		})
		.catch((err) => {
			res.status(400).send(err);
		})
})

app.get('/api/feedback/:feedbackId', (req, res, next) => {
	Feedback.findOne({ '_id': req.params.feedbackId})
		.then((docs) => {
			res.status(200).send(docs);
		})
		.catch((err) => {
			res.status(400).send(err);
		})
})

app.post('/api/feedback/create', requireLogin, (req, res, next) => {
	const feedbackModel = new Feedback();

	const feedback = Object.assign(feedbackModel, req.body);
	
	feedback.save()
		.then((doc) => {
			res.status(200).send(doc);
		})
		.catch((err) => {
			res.status(500).send(err);
	})
});

app.post('/api/groups/create', requireLogin, (req, res, next) => {
	const groupModel = new Group();

	const group = Object.assign(groupModel, req.body);

	group.save()
		.then((doc) => {
			res.status(200).send(doc);
		})
		.catch((err) => {
			res.status(500).send(err);
		})
})

app.post('/api/comments/create/:feedbackId', (req, res, next) => {
	const comment = {
		authorId: req.body.authorId, 
		createdAt: req.body.createdAt, 
		content: req.body.content
	}
	
	const feedbackId = req.params.feedbackId;

	Feedback.findOneAndUpdate({ '_id': req.params.feedbackId}, {$push: {comments: comment }})
		.then((doc) => {
			res.status(200).send(doc);
		})
		.catch((err) => {
			res.status(500).send(err)
		})
});

app.get('/api/comments/:feedbackId', (req, res, next) => {
	Feedback.findOne({ '_id': req.params.feedbackId }).populate('comments.content').exec()
		.then((doc) => {
			const comments = doc.comments;
			res.status(200).send(doc)
		})
		.catch((err) => {
			res.status(500).send(err);
		})
})

app.get('/feedback/create/:groupId', (req, res, next) => {
	Group.find({'_id': req.params.groupId})
	.then((doc) => {
		if(doc.length) {
			next();
		}
	})
	.catch((err) => {
		res.status(400).send('Sorry this page doesn\'t exist. Make sure you copied your link correctly!');
	})
})

app.get('*', requireLogin, (req, res, next) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(8080, function() {
	console.log("App is now listening on port 8080!")
})