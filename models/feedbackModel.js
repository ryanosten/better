const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
	author: String, 
	createdAt: Date, 
	group: String,
	content: String,
	resolved: Boolean,
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
