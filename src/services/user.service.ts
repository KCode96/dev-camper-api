import { DocumentDefinition, FilterQuery } from 'mongoose';
import { omit } from 'lodash';
import User from '../models/User';
import { UserDocument } from '../types';

const createUser = async (inputs: DocumentDefinition<UserDocument>) => {
    return await User.create(inputs);
};

const findUser = async (query: FilterQuery<UserDocument>) => {
    return await User.findOne({ email: query.email }).lean();
};

const validatePassword = async ({
    email,
    password,
}: {
    email: UserDocument['email'];
    password: string;
}) => {
    const user = await User.findOne({ email });

    if (!user) return false;

    const isValidPassowrd = await user.comparePassword(password);

    if (!isValidPassowrd) return false;

    return omit(user.toJSON(), 'password');
    
};

export { createUser, findUser, validatePassword };
