import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
	{
		otp: String,
		jwt: String,
	},
	{
		timestamps: true,
		collection: 'OTP',
	}
);

export default mongoose.model('OTP', otpSchema);
