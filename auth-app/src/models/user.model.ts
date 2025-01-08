import mongoose from 'mongoose';
import { User } from '../types/user.types';

const userSchema = new mongoose.Schema({
    nik: {
        type: String,
        required: true,
        unique: true
    },
    role: String,
    password: String
});

export const UserModel = mongoose.model<User>('User', userSchema);