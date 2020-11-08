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

    async getAll() {
        const data = await this.models.users.getAll();

        return data;
    }

    async getByHash() {
        const data = await this.models.users.getByHash();

        return data;
    }

    async updateByHash() {
        const data = await this.models.users.updateByHash();

        return data;
    }

    async removeByHash() {
        const data = await this.models.users.removeByHash();

        return data;
    }
}
