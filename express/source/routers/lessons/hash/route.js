// Instruments
import { LessonsController } from '../../../controllers';

export const getLessonByHash = async (req, res) => {
    try {
        const { lessonHash } = req.params;
        const model = new LessonsController({ hash: lessonHash });
        const data = await model.getLessonByHash();

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const updateLessonByHash = async (req, res) => {
    try {
        const { lessonHash } = req.params;
        const model = new LessonsController({ hash: lessonHash, payload: req.body });
        const data = await model.updateLessonByHash();

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const removeLessonByHash = async (req, res) => {
    try {
        const { lessonHash } = req.params;
        const model = new LessonsController({ hash: lessonHash });
        await model.removeLessonByHash();

        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
