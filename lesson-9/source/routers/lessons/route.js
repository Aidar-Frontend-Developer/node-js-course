export const getLessons = (req, res) => {
    try {
        const data = [];

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};

export const createLesson = (req, res) => {
    try {
        const data = {};

        res.status(201).json({ data });
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};
