// Core
import jwt from 'jsonwebtoken';

// Instruments
import { getPassword } from './env';

export const authorizate = (password) => async (req, res, next) => {
    const { authorization } = req.headers;
    const token = req.headers[ 'x-token' ];
    const PASSWORD = getPassword();

    if (authorization === password) {
        try {
            await jwt.verify(token, PASSWORD);
            next();
        } catch ({ message }) {
            return res.status(401).json({ message: 'credentials are not valid' });
        }
    } else {
        res.status(401).json({ message: 'credentials are not valid' });
    }
};
