const mongoose = require('mongoose');
require('./userModel')
require('./groupModel')

const CommentSchema = new mongoose.Schema({
	author: String,
	createdAt: Date,
	content: String
});

const FeedbackSchema = new mongoose.Schema({
	// author: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'User'
	// }, 
	createdAt: Date, 
	group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	},
	content: String,
	resolved: Boolean,
	comments: [CommentSchema],
});


module.exports = mongoose.model('Feedback', FeedbackSchema);
