// Core
import express from 'express';

// Instruments
import { getUsers, createUser } from './route';
import { getUserByHash, updateUserByHash, removeUserByHash } from './hash/route';

export const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);

router.get('/:userHash', getUserByHash);
router.put('/:userHash', updateUserByHash);
router.delete('/:userHash', removeUserByHash);

export { router as users };
