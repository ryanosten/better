const mongoose = require('mongoose');
require('./userModel');
require('./organizationModel');

const GroupSchema = new mongoose.Schema({
	createdAt: Date,
	name: String,
	users: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	organization: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Organization'
	},
	shortId: String
});

module.exports = mongoose.model('Group', GroupSchema);