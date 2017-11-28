const mongoose = require('mongoose');
require ('./groupModel');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = mongoose.Schema({
	username: String,
	email: String,
	createdAt: Date,
	role: String,
	groups: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	}],
	organization: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Organization'
	}]
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'username' })

module.exports = mongoose.model('User', UserSchema);