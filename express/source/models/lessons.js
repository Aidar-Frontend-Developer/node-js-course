// Instruments
import { lessons } from '../odm';
import { NotFoundError } from '../utils';

export class LessonsModel {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await lessons.create(this.data);

        return data;
    }

    async getLessons() {
        const { page, size } = this.data;
        const total = await lessons.countDocuments();
        const data = await lessons
            .find({})
            .skip(size * page)
            .limit(size)
            .lean();

        return {
            data,
            meta: {
                total,
                page,
                size,
            },
        };
    }

    async getLessonByHash() {
        const { hash } = this.data;
        const data = await lessons.findOne({ hash }).lean();

        if (!data) {
            throw new NotFoundError(`Lesson document with hash ${hash} not found`);
        }

        return data;
    }

    async updateLessonByHash() {
        const { hash, payload } = this.data;
        const data = await lessons.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`Lesson document with hash ${hash} not found`);
        }

        return data;
    }

    async removeLessonByHash() {
        const { hash } = this.data;
        const data = await lessons.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`Lesson document with hash ${hash} not found`);
        }

        return data;
    }

    async addVideoToLesson() {
        const { hash, payload } = this.data;
        const data = await lessons.findOneAndUpdate(
            { hash },
            { $addToSet: { 'content.videos': payload } },
            { new: true },
        );

        if (!data) {
            throw new NotFoundError(`Lesson document with hash ${hash} not found`);
        }

        return data;
    }

    async addKeynoteToLesson() {
        const { hash, payload } = this.data;
        const data = await lessons.findOneAndUpdate(
            { hash },
            { $addToSet: { 'content.keynotes': payload } },
            { new: true },
        );

        if (!data) {
            throw new NotFoundError(`Lesson document with hash ${hash} not found`);
        }

        return data;
    }

    async playLessonVideo() {
        const { hash, videoHash } = this.data;
        const source = await lessons.findOne({
            hash,
        });

        if (!source) {
            throw new NotFoundError(`Lesson document with hash ${hash} not found`);
        }

        const {
            content: { videos },
        } = source;
        const [ video ] = videos.filter(({ hash }) => hash === videoHash);

        if (!video) {
            throw new NotFoundError(
                `Video with hash ${videoHash} doesn't exist in lesson document with hash ${hash}`,
            );
        }

        return video;
    }

    async removeVideoFromLesson() {
        const { hash, videoHash } = this.data;
        const source = await lessons.findOneAndUpdate(
            {
                hash,
                'content.videos.hash': videoHash,
            },
            { $pull: { 'content.videos': { hash: videoHash } } },
        );

        if (!source) {
            throw new NotFoundError(`Lesson document with hash ${hash} not found`);
        }

        return source;
    }

    async getLessonKeynote() {
        const { hash, keynoteHash } = this.data;
        const source = await lessons.findOne({
            hash,
        });

        if (!source) {
            throw new NotFoundError(`Lesson document with hash ${hash} not found`);
        }

        const {
            content: { keynotes },
        } = source;
        const [ keynote ] = keynotes.filter(({ hash }) => hash === keynoteHash);

        if (!keynote) {
            throw new NotFoundError(
                `Keynote with hash ${keynoteHash} doesn't exist in lesson document with hash ${hash}`,
            );
        }

        return keynote;
    }

    async removeKeynoteFromLesson() {
        const { hash, keynoteHash } = this.data;
        const source = await lessons.findOneAndUpdate(
            {
                hash,
                'content.keynotes.hash': keynoteHash,
            },
            { $pull: { 'content.keynotes': { hash: keynoteHash } } },
        );

        if (!source) {
            throw new NotFoundError(`Lesson document with hash ${hash} not found`);
        }

        return source;
    }
}
