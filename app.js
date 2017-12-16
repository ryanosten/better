const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const shortid = require('shortid');

const requireLogin = require('./require_login')

const app = express();

const Feedback = require('./models/feedbackModel.js');
const Group = require('./models/groupModel.js');
const User = require('./models/userModel.js');
const Organization = require('./models/organizationModel.js');

mongoose.connect('mongodb://localhost/better', {
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

app.post('/api/login', passport.authenticate('local'), (req, res) => {
	res.send(req.user);
})

app.post('/api/signup', (req, res, next) => {
	const newUser = new User ({
		email: req.body.email,
	});

	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			res.send(err)
		} else {
			res.send(user)
		}
	});
});

app.get('/api/logout', (req, res) => {
	req.logout();
	res.json('User has logged out');
});

app.get('/api/me', (req,res) => {
	console.log(req.user);
  if(req.user) {
  	res.status(200).send(req.user)
  } else {
  	res.status(401).json({message: 'Unauthorized'})
  }
});

app.get('/api/users', (req, res) => {
	User.find()
		.then(doc => res.send(doc));
})

app.get('/api/feedback', (req, res, next) => {
	Feedback.find().populate('group').exec()
		.then((docs) => {
			res.status(200).send(docs);
		})
		.catch((err) => {
			res.status(400).send(err);
		})
})

app.get('/api/groups',  (req, res, next) => {
	Group.find().populate('organization').exec()
		.then((docs) => {
			res.status(200).send(docs);
		})
		.catch((err) => {
			res.status(400).send(err);
		})
})

// app.get('/api/:organization/:group', (req, res, next) => {
// 	Organization.findOne({ 'name': req.params.organization })
// 		.then((org => {
// 			Group.findOne({ 'organization': org._id, 'group': req.params.group })
// 		}))
// 		.then((docs) => {
// 			res.status(200).send(docs);
// 		})
// 		.catch((err) => {
// 			res.status(400).send(err);
// 		})
// })

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
	req.body.shortId = shortid.generate();

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

app.get('/feedback/:organization/:shortId', (req, res, next) => {
	Group.find({'shortId': req.params.shortId})
	.then((doc) => {
		if(doc.length) {
			next();
		} else {
			res.status(400).send('Sorry this page doesn\'t exist. Make sure you copied your link correctly!'); 
		}
	})
})

//tried to implement .catch((err)) but couldnt, was hanging

app.post('/api/feedback/create/:organization/:shortId', (req, res, next) => {
	const feedbackModel = new Feedback();
	const shortId = req.params.shortId;

	Organization.findOne({ 'name': req.params.organization })
		.then((org) => {
			return Group.find({ $and:[ { 'organization': org._id}, { 'shortId': shortId } ]})      
		})
		.then((doc) => {
			req.body.group = doc[0]._id
			const feedback = Object.assign(feedbackModel, req.body);
			feedback.save()
			.then((docs) => {
				res.status(200).send(docs)
			})
			.catch((err) => {
				res.status(400).send(err);
			})
		})
	})


app.get('*', requireLogin, (req, res, next) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(8080, function() {
	console.log("App is now listening on port 8080!")
})