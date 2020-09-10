// Core
import express from 'express';

// Instruments
import { getUsers, addUser } from './route';
import { getUserByHash, updateUserByHash, removeUserByHash } from './hash/route';
import { limiter, validator, authorization, getPassword } from '../../utils';

// Schema
import { createUser } from '../../schemas';

export const router = express.Router();
const password = getPassword();

router.get('/', [authorization(password), limiter(5, 60 * 1000)], getUsers);
router.post('/', [validator(createUser)], addUser);

router.get('/:userHash', [authorization(password)], getUserByHash);

router.put(
    '/:userHash',
    [authorization(password), validator(createUser)],
    updateUserByHash,
);

router.delete('/:userHash', [authorization(password)], removeUserByHash);

export { router as users };
