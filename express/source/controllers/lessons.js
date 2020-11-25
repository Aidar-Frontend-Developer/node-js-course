// Instruments
import { LessonsModel } from '../models';

export class LessonsController {
    constructor(data) {
        this.models = {
            lessons: new LessonsModel(data),
        };
    }

    async create() {
        const data = await this.models.lessons.create();

        return data;
    }

    async getLessons() {
        const data = await this.models.lessons.getLessons();

        return data;
    }

    async getLessonByHash() {
        const data = await this.models.lessons.getLessonByHash();

        return data;
    }

    async updateLessonByHash() {
        const data = await this.models.lessons.updateLessonByHash();

        return data;
    }

    async removeLessonByHash() {
        const data = await this.models.lessons.removeByHash();

        return data;
    }

    async addVideoToLesson() {
        const data = await this.models.lessons.addVideoToLesson();

        return data;
    }

    async addKeynoteToLesson() {
        const data = await this.models.lessons.addKeynoteToLesson();

        return data;
    }

    async playLessonVideo() {
        const data = await this.models.lessons.playLessonVideo();

        return data;
    }

    async removeVideoFromLesson() {
        const data = await this.models.lessons.removeVideoFromLesson();

        return data;
    }

    async getLessonKeynote() {
        const data = await this.models.lessons.getLessonKeynote();

        return data;
    }

    async removeKeynoteFromLesson() {
        const data = await this.models.lessons.removeKeynoteFromLesson();

        return data;
    }
}
