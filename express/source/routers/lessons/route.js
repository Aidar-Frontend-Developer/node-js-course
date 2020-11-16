// Instruments
import { LessonsController } from '../../controllers';

export const getLessons = async (req, res) => {
    try {
        const { page = 1, size = 10 } = req.query;
        const model = new LessonsController({ page, size });
        const data = await model.getLessons();

        res.status(200).json({ ...data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const addLesson = async (req, res) => {
    try {
        const model = new LessonsController(req.body);
        const data = await model.create();

        res.status(201).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
