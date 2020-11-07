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
}
