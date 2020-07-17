export const getLessonByHash = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};

export const updateLessonByHash = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};

export const removeLessonByHash = (req, res) => {
    try {
        res.status(204).end();
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};
