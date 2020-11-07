export const enrollToClass = (req, res) => {
    try {
        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const expelFromClass = (req, res) => {
    try {
        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
