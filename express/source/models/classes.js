// Instruments
import { classes, users } from '../odm';
import { NotFoundError } from '../utils';

export class ClassesModel {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await classes.create(this.data);

        return data;
    }

    async getClasses() {
        const { page, size } = this.data;
        const total = await classes.countDocuments();
        const data = await classes
            .find({})
            .skip(size * page)
            .limit(size)
            .populate('lessons.lesson', '-_id -__v')
            .populate('students.user', '-_id -__v')
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

    async getClassByHash() {
        const { hash } = this.data;
        const data = await classes
            .findOne({ hash })
            .populate('lessons.lesson', '-_id -__v')
            .populate('students.user', '-_id -__v')
            .lean();

        if (!data) {
            throw new NotFoundError(`Class document with hash ${hash} not found`);
        }

        return data;
    }

    async updateClassByHash() {
        const { hash, payload } = this.data;
        const data = await classes.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`Class document with hash ${hash} not found`);
        }

        return data;
    }

    async removeClassByHash() {
        const { hash } = this.data;
        const data = await classes.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`Class document with hash ${hash} not found`);
        }

        return data;
    }

    async enrollToClass() {
        const { hash, payload } = this.data;
        const { userHash, status, notes } = payload;
        const currentUser = await users.findOne({ hash: userHash });

        if (!currentUser) {
            throw new NotFoundError(`User document with hash ${hash} not found`);
        }

        const { _id } = currentUser;
        const isAlreadyEnrolled = await classes.findOne({ hash, 'students.user': _id });

        if (isAlreadyEnrolled) {
            throw new Error(`User with hash ${userHash} already enrolled`);
        }

        const enrolledUser = {
            user: _id,
            status,
            notes,
        };
        const data = await classes.findOneAndUpdate(
            { hash },
            {
                $push: {
                    students: enrolledUser,
                },
            },
        );

        return data;
    }

    async expelFromClass() {
        const { hash, payload } = this.data;
        const { userHash } = payload;
        const currentUser = await users.findOne({ hash: userHash });

        if (!currentUser) {
            throw new NotFoundError(`User document with hash ${hash} not found`);
        }

        const { _id } = currentUser;
        const isAlreadyEnrolled = await classes.findOne({ hash, 'students.user': _id });

        if (!isAlreadyEnrolled) {
            throw new Error(`User with hash ${userHash} not enrolled`);
        }

        const data = await classes.findOneAndUpdate(
            {
                hash,
                students: {
                    $elemMatch: {
                        user: _id,
                    },
                },
            },
            { 'students.$.expelled': true },
        );

        return data;
    }
}
