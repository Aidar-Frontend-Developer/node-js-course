// Core
import bcrypt from 'bcrypt';

// Instruments
import { users } from '../odm';

export class UserModel {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const user = await this._transformUserObject(this.data);
        const data = await users.create(user);

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
