const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
	author: String, 
	createdAt: Date, 
	groupName: String,
	groupId: String,
	content: String,
	resolved: Boolean,
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
