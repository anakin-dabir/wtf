import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import multer from 'multer';
import connectDb from './db.js';
import Stripe from 'stripe';

dotenv.config();
const app = express();
const server = http.createServer(app);

// __configs
app.use(
	cors({
		origin: process.env.CLIENT,
		credentials: true,
	})
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/photos', express.static('public'));

// __Multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
export const upload = multer({ storage: storage }).single('image');

// __Otp
// const otp = Math.floor(100000 + Math.random() * 900000);
// console.log(`Your OTP is: ${otp}`);

// __ Socket
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

let users = [];
const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};
const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};
io.on('connection', async (socket) => {
	console.log('connected: ', socket.id);

	socket.on('connected', (userID) => {
		addUser(userID, socket.id);
		console.log(users);
		io.emit('getUsers', users);
	});

	socket.on('disconnect', () => {
		console.log(`Disconnected user with id: ${socket.id}`);
		removeUser(socket.id);
		io.emit('getUsers', users);
	});

	io.emit('newError', 'New Error is Here');
	socket.on('formData', (formData) => {
		console.log(formData);
		io.emit('res:formData', users);
	});
});

// app.use('/', (req, res) => {
// 	res.send('This is server...');
// });

// __test
app.get('/getF', (req, res) => {
	const jwt = req.cookies.auth;
	console.log(jwt);
	const body = {
		name: 'Anakin',
		id: 123,
	};
	return res.status(400).json({ body });
});
app.post('/getF', upload, (req, res) => {
	console.log(req.body);
	const jwt = req.cookies.auth;
	console.log(jwt);
	return res
		.status(200)
		.json({ body: req.body, msg: 'Login & Registeration Successful' });
});

// __stripe
const stripe = new Stripe(
	'sk_test_51IfPckI9Cx0UeZSmapKoMoaL4ro0Nk7zRpiI8jlUjwCMHUIF5SJ836Ma31Xv7WdB7Lb25NjzQP3krHqi7oe6wjsk001G51IKdF',
	{
		maxNetworkRetries: 2,
	}
);
app.post('/create-checkout-session', async (req, res) => {
	const { checkoutItems } = req.body;
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: checkoutItems.map((item) => ({
				price_data: {
					currency: 'usd',
					product_data: {
						name: item.name,
					},
					unit_amount: item.price,
				},
				quantity: item.quantity,
			})),
			mode: 'payment',
			success_url: `${process.env.CLIENT}/success`,
			cancel_url: `${process.env.CLIENT}/cancel`,
		});
		return res.json({ url: session.url });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ msg: 'Checkout Error' });
	}
});

// __connections
connectDb(process.env.MONGOD_URL);
server.listen(process.env.PORT, () => {
	console.log(process.env.SERVER);
});
