// Core
import express from 'express';

// Instruments
import { loginUser, logoutUser } from './route';

export const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);

export { router as auth };
