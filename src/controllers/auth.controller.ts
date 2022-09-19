import { Request, Response } from 'express';
import validator from 'validator';

import { createUser, validatePassword } from '../services/user.service';
import {
    createAccessToken,
    createRefreshToken,
    createSession,
} from '../services/session.service';
import User from '../models/User';

const registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!email || !password) {
        res.status(400);
        throw new Error('Email and password are required');
    }

    if (!validator.isEmail(email)) {
        res.status(400);
        throw new Error('Invalid email address');
    }

    if (user) {
        res.status(400);
        throw new Error(`${email} has already been registered`);
    }

    const newUser = await createUser(req.body);

    res.status(200).send({ success: true, data: newUser });
};

const loginUser = async (req: Request, res: Response) => {
    const user = await validatePassword(req.body);

    if (!user) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    // Create a session
    const session = await createSession(user._id, req.get('user-agent') || '');

    // Create refresh token
    const accessToken = await createAccessToken({ user, session });

    // Create refresh token
    const refreshToken = await createRefreshToken(session, {
        expiresIn: '15m',
    });

    res.status(200).json({ success: true, accessToken, refreshToken });
};

const logoutUser = async (req: Request, res: Response) => {
    
};

export { registerUser, loginUser, logoutUser };
