// Core
import express from 'express';

// Instruments
import { getClasses, addClass } from './route';
import { getClassByHash, updateClassByHash, removeClassByHash } from './hash/route';
import { enrollToClass, expelFromClass } from './hash/education/route';
import { validator, authorization, getPassword } from '../../utils';

// Schema
import { createClass, enrollStudent, expelStudent } from '../../schemas';

export const router = express.Router();
const password = getPassword();

router.get('/', getClasses);

router.post('/', [authorization(password), validator(createClass)], addClass);

router.get('/:classHash', [authorization(password)], getClassByHash);

router.put(
    '/:classHash',
    [authorization(password), validator(createClass)],
    updateClassByHash,
);

router.delete('/:classHash', [authorization(password)], removeClassByHash);

router.post(
    '/:classHash/enroll',
    [authorization(password), validator(enrollStudent)],
    enrollToClass,
);

router.post(
    '/:classHash/expel',
    [authorization(password), validator(expelStudent)],
    expelFromClass,
);

export { router as classes };
