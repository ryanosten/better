const mongoose = require('mongoose');
require ('./groupModel');
require('./organizationModel');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	username: String,
	createdAt: Date,
	admin: Boolean,
	groups: Array,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'username' })

module.exports = mongoose.model('User', UserSchema);