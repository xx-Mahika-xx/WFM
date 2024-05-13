const mongoose = require('mongoose');

const user_detail = new mongoose.Schema({
	
	employeeId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
	},
	username: {
		type: String,
		required: true,
	},
	department:{
		type: String,
		required:true
	},
	casual_leave: {
		type: Number,
		default: 10,
	},
    sick_leave: {
		type: Number,
		default: 10,
	},
    paid_leave: {
		type: Number,
		default: 10,
	}
});

const UserDetailModel = mongoose.model('user_detail', user_detail);

module.exports = UserDetailModel;
