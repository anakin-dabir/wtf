import express from 'express';
import jwt from 'jsonwebtoken';
import Otp from '../models/Otp.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

const userRouter = express.Router();

export const tokenVerification = async (req, res, next) => {
	const token = req.cookies.jwt_token;

	if (!token) {
		return res.status(404).json({ msg: 'Unauthorized: No token provided.' });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(404).json({ msg: 'Server Error' });
	}
};

export const otpMail = async (email, jwt) => {
	const otp = Math.floor(100000 + Math.random() * 900000);
	console.log(`Your OTP is: ${otp}`);
	const newOtp = new Otp({ otp, jwt });
	try {
		await newOtp.save();
		// const transporter = nodemailer.createTransport({
		//     service: 'gmail',
		//     auth: {
		//         user: 'anakindabir@gmail.com', // replace with your email address
		//         pass: 'nbflqxbhrzdydppf' // replace with your email password or app-specific password
		//     }
		// })

		// const info = await transporter.sendMail({
		//     from: 'OTP-Verification <noreply@login.com>', // sender address
		//     to: `${email}`, // list of receivers
		//     subject: "OTP-Verification", // Subject line
		//     //text: "Hello world?", // plain text body
		//     html: `<p>Here is your OTP :) </p>
		//         <b><p>${otp}</p></b>`, // html body
		// });
		return {
			msg: `OTP sent successfully`,
			body: { id: newOtp._id.toString(), email },
		};
	} catch (err) {
		throw new Error('Server');
	}
};

export const otpGeneration = async (req, res) => {
	const { formData, login } = req.body;
	const { email } = formData;
	console.log(req.body);
	try {
		const getUser = await User.findOne({ email });
		if (login) {
			if (!getUser) return res.status(404).json({ msg: 'User not found' });
		} else {
			if (getUser) return res.status(404).json({ msg: 'User Already exists' });
		}

		const token = jwt.sign(formData, process.env.JWT_SECRET);
		const response = await otpMail(email, token);
		console.log(response);
		return res.status(200).json(response);
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error' });
	}
};

export const resendOTP = async (req, res) => {
	const { id } = req.body;
	try {
		const getOtp = await Otp.findById(id);
		const token = jwt.verify(getOtp.jwt, process.env.JWT_SECRET);
		const response = await otpMail(token.email, getOtp.jwt);
		return res.status(200).json(response);
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error' });
	}
};

export const loginRegister = async (req, res) => {
	const { id, otp } = req.body;
	try {
		const getOtp = await Otp.findById(id);
		if (otp != getOtp.otp) return res.status(404).json({ msg: 'Invalid Otp' });

		const token = jwt.verify(getOtp.jwt, process.env.JWT_SECRET);
		//Login
		const { email, name, login } = token;
		console.log({ email, name, login });

		const getUser = await User.findOne({ email });
		if (login) {
			const jwt_token = jwt.sign(getUser.toObject(), process.env.JWT_SECRET);
			res.cookie('jwt_token', jwt_token);
			return res.status(200).json({ msg: 'Login Successful', body: getUser });
		}
		const newUser = new User({ email, name });
		await newUser.save();
		const jwt_token = jwt.sign(newUser.toObject(), process.env.JWT_SECRET);
		res.cookie('jwt_token', jwt_token);
		return res
			.status(201)
			.json({ msg: 'Registered & Login Successful', body: newUser });
	} catch (err) {
		res.status(500).json({ msg: 'Server Error' });
	}
};

export const logout = async (req, res) => {
	console.log('Trigerred...');
	console.log(req.user);
	res.clearCookie('jwt_token');
	res.status(200).json({ msg: 'Successfully logged out', body: '' });
};

export const getUserData = async (req, res) => {
	res.status(200).json({ body: req.user });
};

export const getAll = async (req, res) => {
	try {
		const users = await User.find({});
		return res.status(200).json({ body: users });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error' });
	}
};

export const Profile = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.body.id });
		return res.status(200).json({ body: user });
	} catch (err) {
		return res.status(500);
	}
};

export const updateProf = async (req, res) => {
	const { name, id } = req.body;
	try {
		const user = await User.findById(id);
		if (name !== '') {
			user.name = name;
		}
		user.img = req.file.originalname;
		await user.save();

		return res.status(200).json({ msg: 'Profile Updated', body: user });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error' });
	}
};

userRouter.post('/register', otpGeneration);
userRouter.post('/resendOTP', resendOTP);
userRouter.post('/otpVerification', loginRegister);
userRouter.post('/logout', tokenVerification, logout);
userRouter.post('/getUserData', tokenVerification, getUserData);
userRouter.post('/getAll', tokenVerification, getAll);
userRouter.post('/profile', tokenVerification, Profile);

export default userRouter;
