// Core
import express from 'express';

// Instruments
import { getLessons, createLesson } from './route';
import { getLessonByHash, updateLessonByHash, removeLessonByHash } from './hash/route';
import { addKeynoteToLesson } from './hash/keynotes/route';
import { getLessonKeynote, removeKeynoteFromLesson } from './hash/keynotes/hash/route';
import { playLessonVideo, removeVideoFromLesson } from './hash/videos/hash/route';
import { addVideoToLesson } from './hash/videos/route';

export const router = express.Router();

router.get('/', getLessons);
router.post('/', createLesson);

router.get('/:lessonHash', getLessonByHash);
router.put('/:lessonHash', updateLessonByHash);
router.delete('/:lessonHash', removeLessonByHash);

router.post('/:lessonHash/videos', addVideoToLesson);
router.post('/:lessonHash/keynotes', addKeynoteToLesson);

router.get('/:lessonHash/videos/:videoHash', playLessonVideo);
router.delete('/:lessonHash/videos/:videoHash', removeVideoFromLesson);

router.get('/:lessonHash/keynotes/:keynoteHash', getLessonKeynote);
router.delete('/:lessonHash/keynotes/:keynoteHash', removeKeynoteFromLesson);

export { router as lessons };
