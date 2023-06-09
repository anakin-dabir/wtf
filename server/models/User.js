import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		name: String,
		email: { type: String, unique: true },
		about: { type: String, default: '' },
		interest: {
			type: [{ type: String }],
			default: [],
		},
	},
	{
		collection: 'User',
		timestamps: true,
	}
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
