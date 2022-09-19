import { LeanDocument } from 'mongoose';
import jwt from 'jsonwebtoken';

import Session from '../models/Session';
import { SessionDocument } from '../types';

const createSession = async (userId: string, userAgent: string) => {
    const session = await Session.create({ user: userId, userAgent });

    return session;
};

const createAccessToken = async ({
    user,
    session,
}: {
    user: any;
    session:
        | Omit<SessionDocument, 'password'>
        | LeanDocument<Omit<SessionDocument, 'password'>>;
}) => {
    const accessToken = jwt.sign(
        { ...user, session: session._id },
        process.env.JWT_SECRET as string,
        { expiresIn: '15m' }
    );

    return accessToken;
};

const createRefreshToken = async (
    obj: Object,
    options?: jwt.SignOptions | undefined
) => {
    const refreshToken = jwt.sign(
        { ...obj },
        process.env.JWT_SECRET as string,
        options
    );

    return refreshToken;
};

export { createSession, createAccessToken, createRefreshToken };
