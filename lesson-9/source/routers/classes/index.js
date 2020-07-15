// Core
import express from 'express';

// Instruments
import { getClasses, createClass } from './route';
import { getClassByHash, updateClassByHash, removeClassByHash } from './hash/route';
import { enrollToClass, expelFromClass } from './hash/education/route';

export const router = express.Router();

router.get('/', getClasses);
router.post('/', createClass);

router.get('/:classHash', getClassByHash);
router.put('/:classHash', updateClassByHash);
router.delete('/:classHash', removeClassByHash);

router.post('/:classHash/enroll', enrollToClass);
router.post('/:classHash/expel', expelFromClass);

export { router as classes };
