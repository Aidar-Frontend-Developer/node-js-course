// Core
import express from 'express';

// Instruments
import { getClasses, addClass } from './route';
import { getClassByHash, updateClassByHash, removeClassByHash } from './hash/route';
import { enrollToClass, expelFromClass } from './hash/education/route';
import { validator, authenticate, getPassword } from '../../utils';

// Schema
import { createClass, enrollStudent, expelStudent } from '../../schemas';

export const router = express.Router();

router.get('/', getClasses);

router.post('/', [ authenticate, validator(createClass) ], addClass);

router.get('/:classHash', [ authenticate ], getClassByHash);

router.put(
    '/:classHash',
    [ authenticate, validator(createClass) ],
    updateClassByHash,
);

router.delete('/:classHash', [ authenticate ], removeClassByHash);

router.post(
    '/:classHash/enroll',
    [ authenticate, validator(enrollStudent) ],
    enrollToClass,
);

router.post(
    '/:classHash/expel',
    [ authenticate, validator(expelStudent) ],
    expelFromClass,
);

export { router as classes };
