// Core
import express from 'express';

// Instruments
import { getLessons, addLesson } from './route';
import { getLessonByHash, updateLessonByHash, removeLessonByHash } from './hash/route';
import { addKeynoteToLesson } from './hash/keynotes/route';
import { getLessonKeynote, removeKeynoteFromLesson } from './hash/keynotes/hash/route';
import { playLessonVideo, removeVideoFromLesson } from './hash/videos/hash/route';
import { addVideoToLesson } from './hash/videos/route';
import { validator, authenticate } from '../../utils';

// Schema
import { createLesson, createVideo, createKeynote } from '../../schemas';

export const router = express.Router();

router.get('/', getLessons);

router.post('/', [ authenticate, validator(createLesson) ], addLesson);

router.get('/:lessonHash', [ authenticate ], getLessonByHash);

router.put(
    '/:lessonHash',
    [ authenticate, validator(createLesson) ],
    updateLessonByHash,
);

router.delete('/:lessonHash', [ authenticate ], removeLessonByHash);

router.post(
    '/:lessonHash/videos',
    [ authenticate, validator(createVideo) ],
    addVideoToLesson,
);

router.post(
    '/:lessonHash/keynotes',
    [ authenticate, validator(createKeynote) ],
    addKeynoteToLesson,
);

router.get(
    '/:lessonHash/videos/:videoHash',
    [ authenticate ],
    playLessonVideo,
);

router.delete(
    '/:lessonHash/videos/:videoHash',
    [ authenticate ],
    removeVideoFromLesson,
);

router.get(
    '/:lessonHash/keynotes/:keynoteHash',
    [ authenticate ],
    getLessonKeynote,
);

router.delete(
    '/:lessonHash/keynotes/:keynoteHash',
    [ authenticate ],
    removeKeynoteFromLesson,
);

export { router as lessons };
