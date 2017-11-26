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

app.post('/api/feedback/create/:groupId', (req, res, next) => {
	const feedbackModel = new Feedback();

	const feedback = Object.assign(feedbackModel, req.body);

	console.log(feedback._id);
	const feedbackId = feedback._id;

	feedback.set({ groupId: req.params.groupId });
	
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
	Feedback.findOne({ '_id': req.params.feedbackId })
		.then((doc) => {
			const comments = doc.comments;
			res.status(200).send(doc)
		})
		.catch((err) => {
			res.status(500).send(err);
		})

})

app.get('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(8080, function() {
	console.log("App is now listening on port 8080!")
})