// Instruments
import { ClassesController } from '../../controllers';

export const getClasses = async (req, res) => {
    try {
        const { page = 1, size = 10 } = req.query;
        const model = new ClassesController({ page, size });
        const data = await model.getClasses();

        res.status(200).json({ ...data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const addClass = async (req, res) => {
    try {
        const model = new ClassesController(req.body);
        const data = await model.create();

        res.status(201).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
