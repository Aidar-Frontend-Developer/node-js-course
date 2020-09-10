// Core
import express from 'express';

// Instruments
import { getLessons, addLesson } from './route';
import { getLessonByHash, updateLessonByHash, removeLessonByHash } from './hash/route';
import { addKeynoteToLesson } from './hash/keynotes/route';
import { getLessonKeynote, removeKeynoteFromLesson } from './hash/keynotes/hash/route';
import { playLessonVideo, removeVideoFromLesson } from './hash/videos/hash/route';
import { addVideoToLesson } from './hash/videos/route';
import { validator, authorization, getPassword } from '../../utils';

// Schema
import { createLesson, createVideo, createKeynote } from '../../schemas';

export const router = express.Router();
const password = getPassword();

router.get('/', getLessons);

router.post('/', [authorization(password), validator(createLesson)], addLesson);

router.get('/:lessonHash', [authorization(password)], getLessonByHash);

router.put(
    '/:lessonHash',
    [authorization(password), validator(createLesson)],
    updateLessonByHash,
);

router.delete('/:lessonHash', [authorization(password)], removeLessonByHash);

router.post(
    '/:lessonHash/videos',
    [authorization(password), validator(createVideo)],
    addVideoToLesson,
);

router.post(
    '/:lessonHash/keynotes',
    [authorization(password), validator(createKeynote)],
    addKeynoteToLesson,
);

router.get(
    '/:lessonHash/videos/:videoHash',
    [authorization(password)],
    playLessonVideo,
);

router.delete(
    '/:lessonHash/videos/:videoHash',
    [authorization(password)],
    removeVideoFromLesson,
);

router.get(
    '/:lessonHash/keynotes/:keynoteHash',
    [authorization(password)],
    getLessonKeynote,
);

router.delete(
    '/:lessonHash/keynotes/:keynoteHash',
    [authorization(password)],
    removeKeynoteFromLesson,
);

export { router as lessons };
