export const getUserByHash = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const updateUserByHash = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const removeUserByHash = (req, res) => {
    try {
        res.status(204).end();
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
