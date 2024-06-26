const mongoose = require('mongoose');

const User = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		private: true,
	},
	lastName: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	access: {
		type: String,
		required: true,
	},
	credits: {
		type: Number,
		default: 0,
	}
});

const UserModel = mongoose.model('User', User);

module.exports = UserModel;
