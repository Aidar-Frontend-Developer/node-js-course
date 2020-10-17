
// JWT login authentication imports
// import jwt from 'jsonwebtoken';
// import { promisify } from 'util';
// import { getPassword } from '../../utils';
// const sign = promisify(jwt.sign);

export const loginUser = (req, res) => {
    try {
        // JWT login authentication usage
        // const token = await sign({ email: 'test@test.test' }, getPassword());
        // res.header('X-Token', token);
        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const logoutUser = (req, res) => {
    try {
        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
