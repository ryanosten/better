const mongoose = require('mongoose');
require ('./groupModel');
require('./organizationModel');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = mongoose.Schema({
	email: String,
	createdAt: Date,
	admin: Boolean,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = mongoose.model('User', UserSchema);