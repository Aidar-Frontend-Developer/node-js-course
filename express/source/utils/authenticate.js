// Core
import passport from 'passport';

// Instruments
// import { NotFoundError } from './errors';


// Cookie usage
// export const authenticate = (req, res, next) => {
// if (!req.session.user) {
// return next(new NotFoundError('cookie not found', 401));
// }

// const { email } = req.session.user;
// if (email) {
// next();
// } else {
// res.status(401).json({ message: 'authentication credentials are not valid' });
// }
// };

// JWT passport usage
// export const authenticate = passport.authenticate('jwt', { session: false });

// GITHUB passport usage
export const authenticate = passport.authenticate('github', { scope: [ 'user:email' ] });
