const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
	author: String, 
	createdAt: Date, 
	groupId: String,
	content: String,
	resolved: Boolean,
	comments: [{
		authorId: String,
		createdAt: Date,
		content: ''
	}],
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
