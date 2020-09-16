// Core
import express from 'express';
import { authenticate, limiter } from '../../utils';

// Instruments
import { loginUser, logoutUser } from './route';

export const router = express.Router();

router.post('/login', [ authenticate, limiter(5, 60 * 1000) ], loginUser);
router.post('/logout', [ limiter(5, 60 * 1000) ], logoutUser);

export { router as auth };
