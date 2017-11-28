const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
	owner: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	name: String,
	createdAt: Date
})

module.exports = mongoose.model('Organization', organizationSchema);