export const getClassByHash = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};

export const updateClassByHash = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};

export const removeClassByHash = (req, res) => {
    try {
        res.status(204).end();
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};
