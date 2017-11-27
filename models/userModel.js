const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = mongoose.Schema({
	username: String,
	email: String,
	createdAt: Date
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'username' })

module.exports = mongoose.model('User', UserSchema);