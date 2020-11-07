export const playLessonVideo = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const removeVideoFromLesson = (req, res) => {
    try {
        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
