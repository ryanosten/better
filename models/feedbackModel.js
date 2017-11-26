const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	authorId: String,
	createdAt: Date,
	content: String
});

const FeedbackSchema = new mongoose.Schema({
	authorId: String, 
	createdAt: Date, 
	groupId: String,
	content: String,
	resolved: Boolean,
	comments: [CommentSchema],
});


module.exports = mongoose.model('Feedback', FeedbackSchema);
