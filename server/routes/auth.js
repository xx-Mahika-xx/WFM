const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserDetailModel = require('../models/Userdetail');
const bcrypt = require('bcrypt');
const {
	getToken,
	getScore,
	testLink,
	interviewLink,
	newDescription,
} = require('../utils/helper');
const passport = require('passport');

// POST request to  register the user to teh portal from signup form
router.post('/register', async (req, res) => {
	try {

		const { email, password, firstName, lastName, username, access } = req.body;
		
		const user = await User.findOne({ email: email });
		
		if (user) {
			return res
			.status(403)
			.json({ error: 'A user with this email already exists' });
		}
		
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUserData = {
			email,
			password: hashedPassword,
			firstName,
			lastName,
			username,
			access,
		};
		const newUser = await User.create(newUserData);
		
		const userDetailData = {
			employeeId: newUser._id,
			department:"General Surgery Unit",
			casual_leave: 10,
			sick_leave: 10,
			paid_leave: 10,
			username: username
		};
		
		const newUserDetail = await UserDetailModel.create(userDetailData);
		console.log(newUserDetail);
		
		const token = await getToken(email, newUser);
		
		const userToReturn = { ...newUser.toJSON(), token };
		
		return res.status(200).json(userToReturn);
	}
	catch (error) {
		console.error("Error creating user:", error);
		return res.status(500).json({ success: false, error: "Error creating user" });
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email });
	if (!user) {
		return res.status(403).json({ err: 'Invalid credentials' });
	}

	console.log(user);

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(403).json({ err: 'Invalid credentials' });
	}

	const token = await getToken(user.email, user);
	const userToReturn = { ...user.toJSON(), token };
	delete userToReturn.password;
	return res.status(200).json(userToReturn);
});

module.exports = router;
