// Instruments
import { LessonsController } from '../../../../../controllers';

export const getLessonKeynote = async (req, res) => {
    try {
        const { lessonHash, keynoteHash } = req.params;
        const model = new LessonsController({ hash: lessonHash, keynoteHash });
        const data = await model.getLessonKeynote();

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const removeKeynoteFromLesson = async (req, res) => {
    try {
        const { lessonHash, keynoteHash } = req.params;
        const model = new LessonsController({ hash: lessonHash, keynoteHash });
        await model.removeKeynoteFromLesson();

        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
