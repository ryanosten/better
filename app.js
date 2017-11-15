const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const Feedback = require('./models/feedbackModel.js');
const Group = require('./models/groupModel.js');

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/better');

app.use(express.static('public'))

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/groups', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/feedback/*', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/feedback', (req, res, next) => {
	Feedback.find()
		.then((docs) => {
			res.status(200).send(docs);
		})
		.catch((err) => {
			res.status(400).send(err);
		})
})

app.get('/api/groups', (req, res, next) => {
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

app.post('/api/feedback/create', (req, res, next) => {
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

app.post('/api/groups/create', (req, res, next) => {
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

app.listen(8080, function() {
	console.log("App is now listening on port 8080!")
})