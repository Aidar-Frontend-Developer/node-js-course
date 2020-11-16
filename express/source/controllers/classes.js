// Instruments
import { ClassesModel } from '../models';

export class ClassesController {
    constructor(data) {
        this.models = {
            classes: new ClassesModel(data),
        };
    }

    async create() {
        const data = await this.models.classes.create();

        return data;
    }

    async getClasses() {
        const data = await this.models.classes.getClasses();

        return data;
    }

    async getClassByHash() {
        const data = await this.models.classes.getClassByHash();

        return data;
    }

    async updateClassByHash() {
        const data = await this.models.classes.updateClassByHash();

        return data;
    }

    async removeClassByHash() {
        const data = await this.models.classes.removeClassByHash();

        return data;
    }

    async enrollToClass() {
        const data = await this.models.classes.enrollToClass();

        return data;
    }

    async expelFromClass() {
        const data = await this.models.classes.expelFromClass();

        return data;
    }
}
