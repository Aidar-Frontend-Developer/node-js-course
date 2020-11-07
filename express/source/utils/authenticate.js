// Core
import jwt from 'jsonwebtoken';

// Instruments
import { getPassword } from './env';

export const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;
    const PASSWORD = getPassword();

    if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = await jwt.sign(req.body, PASSWORD);

    res.setHeader('X-Token', token);

    return next();
};
