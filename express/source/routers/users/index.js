// Core
import express from 'express';

// Instruments
import { getUsers, addUser } from './route';
import { getUserByHash, updateUserByHash, removeUserByHash } from './hash/route';
import { limiter, validator, authenticate, getPassword } from '../../utils';

// Schema
import { createUser } from '../../schemas';

export const router = express.Router();

router.get('/', [ authenticate, limiter(5, 60 * 1000) ], getUsers);
router.post('/', [ validator(createUser) ], addUser);

router.get('/:userHash', [ authenticate ], getUserByHash);

router.put(
    '/:userHash',
    [ authenticate, validator(createUser) ],
    updateUserByHash,
);

router.delete('/:userHash', [ authenticate ], removeUserByHash);

export { router as users };
