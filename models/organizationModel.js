const mongoose = require('mongoose');
require('./userModel');

const organizationSchema = mongoose.Schema({
	owners: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	name: String,
	createdAt: Date
})

module.exports = mongoose.model('Organization', organizationSchema);