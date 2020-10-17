export const getLessonKeynote = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const removeKeynoteFromLesson = (req, res) => {
    try {
        res.status(204).end();
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
