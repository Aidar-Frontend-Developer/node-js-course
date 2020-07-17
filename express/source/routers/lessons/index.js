// Core
import express from 'express';

// Instruments
import { getLessons, addLesson } from './route';
import { getLessonByHash, updateLessonByHash, removeLessonByHash } from './hash/route';
import { addKeynoteToLesson } from './hash/keynotes/route';
import { getLessonKeynote, removeKeynoteFromLesson } from './hash/keynotes/hash/route';
import { playLessonVideo, removeVideoFromLesson } from './hash/videos/hash/route';
import { addVideoToLesson } from './hash/videos/route';
import { validator, authorization } from '../../utils';

// Schema
import { createLesson, createVideo, createKeynote } from '../../schemas';

export const router = express.Router();

router.get('/', getLessons);

router.post('/', [ authorization(process.env.PASSWORD), validator(createLesson) ], addLesson);

router.get('/:lessonHash', [ authorization(process.env.PASSWORD) ], getLessonByHash);

router.put(
    '/:lessonHash',
    [ authorization(process.env.PASSWORD), validator(createLesson) ],
    updateLessonByHash,
);

router.delete('/:lessonHash', [ authorization(process.env.PASSWORD) ], removeLessonByHash);

router.post(
    '/:lessonHash/videos',
    [ authorization(process.env.PASSWORD), validator(createVideo) ],
    addVideoToLesson,
);

router.post(
    '/:lessonHash/keynotes',
    [ authorization(process.env.PASSWORD), validator(createKeynote) ],
    addKeynoteToLesson,
);

router.get(
    '/:lessonHash/videos/:videoHash',
    [ authorization(process.env.PASSWORD) ],
    playLessonVideo,
);

router.delete(
    '/:lessonHash/videos/:videoHash',
    [ authorization(process.env.PASSWORD) ],
    removeVideoFromLesson,
);

router.get(
    '/:lessonHash/keynotes/:keynoteHash',
    [ authorization(process.env.PASSWORD) ],
    getLessonKeynote,
);

router.delete(
    '/:lessonHash/keynotes/:keynoteHash',
    [ authorization(process.env.PASSWORD) ],
    removeKeynoteFromLesson,
);

export { router as lessons };
