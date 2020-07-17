// Core
import express from 'express';

// Instruments
import { getClasses, addClass } from './route';
import { getClassByHash, updateClassByHash, removeClassByHash } from './hash/route';
import { enrollToClass, expelFromClass } from './hash/education/route';
import { validator, authorization } from '../../utils';

// Schema
import { createClass, enrollStudent, expelStudent } from '../../schemas';

export const router = express.Router();

router.get('/', getClasses);

router.post('/', [ authorization(process.env.PASSWORD), validator(createClass) ], addClass);

router.get('/:classHash', [ authorization(process.env.PASSWORD) ], getClassByHash);

router.put(
    '/:classHash',
    [ authorization(process.env.PASSWORD), validator(createClass) ],
    updateClassByHash,
);

router.delete('/:classHash', [ authorization(process.env.PASSWORD) ], removeClassByHash);

router.post(
    '/:classHash/enroll',
    [ authorization(process.env.PASSWORD), validator(enrollStudent) ],
    enrollToClass,
);

router.post(
    '/:classHash/expel',
    [ authorization(process.env.PASSWORD), validator(expelStudent) ],
    expelFromClass,
);

export { router as classes };
