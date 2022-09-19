import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserDocument } from '../types';

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            default: 'user',
        },
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    const user = this as unknown as UserDocument;

    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

UserSchema.methods.comparePassword = async function (enterPassword: string) {
    const user = this as unknown as UserDocument;

    return await bcrypt.compare(enterPassword, user.password).catch(e => false);
};

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
