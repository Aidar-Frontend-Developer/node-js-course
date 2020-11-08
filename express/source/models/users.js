// Core
import bcrypt from 'bcrypt';

// Instruments
import { users } from '../odm';
import { NotFoundError } from '../utils';

export class UserModel {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const user = await this._transformUserObject(this.data);
        const data = await users.create(user);

        return data;
    }

    async getAll() {
        const { page, size } = this.data;
        const total = await users.countDocuments();

        const data = await users
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

    async getByHash() {
        const { hash } = this.data;

        const data = await users.findOne({ hash }).lean();

        if (!data) {
            throw new NotFoundError(`User document with hash ${hash} not found`);
        }

        return data;
    }

    async updateByHash() {
        const { hash, payload } = this.data;

        const data = await users.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`User document with hash ${hash} not found`);
        }

        return data;
    }

    async removeByHash() {
        const { hash } = this.data;

        const data = await users.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`User document with hash ${hash} not found`);
        }

        return data;
    }

    async _transformUserObject(data) {
        const { name, email, phone, password, sex, role } = data;
        const [ first, last ] = name.split(' ');
        const hashedPassword = await bcrypt.hash(password, 10);
        const transformedUser = {
            name: {
                first,
                last,
            },
            emails: [
                {
                    email,
                    primary: true,
                },
            ],
            phones: [
                {
                    phone,
                    primary: true,
                },
            ],
            password: hashedPassword,
            sex,
            roles:    [ role ],
        };

        return transformedUser;
    }
}
