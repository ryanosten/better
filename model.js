const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
	author: String, 
	createdAt: Date, 
	group: String,
	content: String,
	resolved: Boolean,
});

const GroupSchema = new mongoose.Schema({
	createdAt: Date,
	owner: String,
	name: String,
	admins: Array, 
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
module.exports = mongoose.model('Group', GroupSchema);