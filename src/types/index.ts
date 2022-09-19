import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    createdAat: Date;
    updatedAat: Date;
    comparePassword(enterPassword: string): Promise<boolean>;
}

export interface SessionDocument extends mongoose.Document {
    user: UserDocument['_id'];
    valid: boolean;
    userAgent: string;
    cratedAat: Date;
    updatedAat: Date;
}
