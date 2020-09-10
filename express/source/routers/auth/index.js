// Core
import express from 'express';
import { authorization, getPassword } from '../../utils';

// Instruments
import { loginUser, logoutUser } from './route';

export const router = express.Router();
const password = getPassword();

router.post('/login', loginUser);
router.post('/logout', [authorization(password)], logoutUser);

export { router as auth };
