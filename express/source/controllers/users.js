// Instruments
import { UserModel } from '../models';

export class UsersController {
    constructor(data) {
        this.models = {
            users: new UserModel(data),
        };
    }

    async create() {
        const data = await this.models.users.create();

        return data;
    }
}
