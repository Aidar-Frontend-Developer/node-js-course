export const enrollToClass = (req, res) => {
    try {
        res.status(204).end();
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const expelFromClass = (req, res) => {
    try {
        res.status(204).end();
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
