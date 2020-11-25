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

    async getUsers() {
        const data = await this.models.users.getUsers();

        return data;
    }

    async getUserByHash() {
        const data = await this.models.users.getUserByHash();

        return data;
    }

    async updateUserByHash() {
        const data = await this.models.users.updateUserByHash();

        return data;
    }

    async removeUserByHash() {
        const data = await this.models.users.removeUserByHash();

        return data;
    }
}
