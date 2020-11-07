// Instruments
import { lessons } from '../odm';

export class LessonsModel {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await lessons.create(this.data);

        return data;
    }
}
