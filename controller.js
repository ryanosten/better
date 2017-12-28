const Feedback = require('./models/feedbackModel.js');
const Group = require('./models/groupModel.js');
const User = require('./models/userModel.js');
const Organization = require('./models/organizationModel.js');
const shortid = require('shortid');
const bodyParser = require('body-parser');
const _ = require('lodash');

const routes = {};

//GET
routes.getUsers = (req, res) => {
	User.find()
		.then(doc => res.send(doc));
}

routes.getAllFeedback = (req, res, next) => {

	Group.find({ 'admins': { $in: [req.params.user]}})
		.then((groups) => {
			const user_groups = groups.map(item => item._id);
			return user_groups
			})
		.then((user_groups) => {
			Feedback.find({ 'group': {$in: user_groups}}).populate('group').exec()
				.then((docs) => {
					res.status(200).send(docs);
				})
				.catch((err) => {
					res.status(400).send(err);
				})
		})
}

routes.getGroups = (req, res, next) => {
	Group.find({ 'users': { $in: [req.params.user] } })
		.then((docs) => {
			res.status(200).send(docs);
		})
		.catch((err) => {
			res.status(400).send(err);
		})
}

routes.getFeedbackDetail = (req, res, next) => {
	Feedback.findOne({ '_id': req.params.feedbackId})
		.then((docs) => {
			res.status(200).send(docs);
		})
		.catch((err) => {
			res.status(400).send(err);
		})
}

routes.getComments = (req, res, next) => {
	Feedback.findOne({ '_id': req.params.feedbackId }).populate('comments.content').exec()
		.then((doc) => {
			const comments = doc.comments;
			res.status(200).send(doc)
		})
		.catch((err) => {
			res.status(500).send(err);
		})
}

routes.getTeam = (req, res) => {
	Group.find({ 'users': req.params.user})
		.then(groups => {
			let userArr = groups.map(group => {
				return group.users
			})
				return userArr;
			// const userList = groups.reduce((userArr, group) => {
			// 	group.users.forEach((user) => {
			// 		console.log(user + 'line71');
			// 		console.log(req.params.user + 'line 72');
			// 		if(!user == req.params.user) {
			// 			console.log('condition passed')
			// 			userArr.push(user);
			// 		}
			// 	})
			// 	console.log(userArr)
			// 	return userArr
			// }, [])
			// return userList;
		}).then(users => {
			let teams = users.reduce((team, users) => {
					// console.log(users);
					users.forEach((item) => {
							team.push(item)
						})
					// 	if(team.indexOf(item) == -1){
					// 		console.log('run')
					// 		team.push(item)
					// 		return true
					// 	}
					// 	return false 
							
					// 	})
		
					// console.log(team)
					return team 			

				}, [])
			return teams
		}).then(teams => {
			const ids = {}
			teams.forEach(_id => (ids[_id.toString()] = _id))
			return Object.values(ids)
		}).then(team => res.send(team))
	}
routes.anonymousFeedbackPage = (req, res, next) => {
	Group.find({'shortId': req.params.shortId})
	.then((doc) => {
		if(doc.length) {
			next();
		} else {
			res.status(400).send('Sorry this page doesn\'t exist. Make sure you copied your link correctly!'); 
		}
	})
}

//POST
routes.createGroup = (req, res, next) => {
	const groupModel = new Group();
	req.body.shortId = shortid.generate();
	req.body.users = req.body.user

	const group = Object.assign(groupModel, req.body);

	group.save()
		.then((doc) => {
			res.status(200).send(doc);
		})
		.catch((err) => {
			res.status(500).send(err);
		})
}

routes.createComment = (req, res, next) => {
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
}

routes.postFeedback = (req, res, next) => {
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
}


module.exports = routes;