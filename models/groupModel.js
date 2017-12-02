const mongoose = require('mongoose');
require('./userModel');

const GroupSchema = new mongoose.Schema({
	createdAt: Date,
	name: String,
	admins: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	organization: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Organization'
	}
});

module.exports = mongoose.model('Group', GroupSchema);