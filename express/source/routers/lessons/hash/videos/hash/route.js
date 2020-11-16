// Instruments
import { LessonsController } from '../../../../../controllers';

export const playLessonVideo = async (req, res) => {
    try {
        const { lessonHash, videoHash } = req.params;
        const model = new LessonsController({ hash: lessonHash, videoHash });
        const data = await model.playLessonVideo();

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const removeVideoFromLesson = async (req, res) => {
    try {
        const { lessonHash, videoHash } = req.params;
        const model = new LessonsController({ hash: lessonHash, videoHash });
        await model.removeVideoFromLesson();

        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
