// Core
import express from 'express';
import { authorization } from '../../utils';

// Instruments
import { loginUser, logoutUser } from './route';

export const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', [ authorization(process.env.PASSWORD) ], logoutUser);

export { router as auth };
