// Core
import express from 'express';

// Instruments
import { getUsers, addUser } from './route';
import { getUserByHash, updateUserByHash, removeUserByHash } from './hash/route';
import { limiter, validator, authorization } from '../../utils';

// Schema
import { createUser } from '../../schemas';

export const router = express.Router();

router.get('/', [ authorization(process.env.PASSWORD), limiter(5, 60 * 1000) ], getUsers);
router.post('/', [ validator(createUser) ], addUser);

router.get('/:userHash', [ authorization(process.env.PASSWORD) ], getUserByHash);

router.put(
    '/:userHash',
    [ authorization(process.env.PASSWORD), validator(createUser) ],
    updateUserByHash,
);

router.delete('/:userHash', [ authorization(process.env.PASSWORD) ], removeUserByHash);

export { router as users };
