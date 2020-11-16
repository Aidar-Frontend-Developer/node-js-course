// Instruments
import { LessonsController } from '../../../../controllers';

export const addKeynoteToLesson = async (req, res) => {
    try {
        const { lessonHash } = req.params;
        const model = new LessonsController({ hash: lessonHash, payload: req.body });
        const data = await model.addKeynoteToLesson();

        res.status(201).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
