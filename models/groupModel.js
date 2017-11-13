const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
	createdAt: Date,
	owner: String,
	groupName: String,
	admins: Array, 
});

module.exports = mongoose.model('Group', GroupSchema);