import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email, sessionId: crypto.randomUUID() }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const getUnixExpiry = (minutes) => {
    return Math.floor(Date.now() / 1000) + minutes * 60;
};

export {
    generateAccessToken,
    getUnixExpiry,
}
