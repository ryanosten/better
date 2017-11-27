const mongoose = require('mongoose');
require('./userModel')
require('./groupModel')

const CommentSchema = new mongoose.Schema({
	authorId: String,
	createdAt: Date,
	content: String
});

const FeedbackSchema = new mongoose.Schema({
	authorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}, 
	createdAt: Date, 
	groupId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	},
	content: String,
	resolved: Boolean,
	comments: [CommentSchema],
});


module.exports = mongoose.model('Feedback', FeedbackSchema);
